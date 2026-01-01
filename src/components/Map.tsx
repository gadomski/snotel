import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox';
import Map, { NavigationControl } from '@vis.gl/react-maplibre';
import { Feature, Point } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMemo, useState } from 'react';
import { useControl } from 'react-map-gl/maplibre';

import { INITIAL_VIEW_STATE, MAP_OPTIONS, MAP_STYLE } from '@/lib/mapConfig';
import { useStore } from '@/store/useStore';

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function OurMap(params: {
  snotelStations: Feature[] | undefined;
}) {
  const setStation = useStore((state) => state.setStation);
  const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom);

  const radius = useMemo(() => {
    return 50000 / Math.pow(2, zoom - INITIAL_VIEW_STATE.zoom);
  }, [zoom]);

  const layers = [
    new HexagonLayer<Feature>({
      id: 'hexagons',
      data: params.snotelStations?.filter(
        (f) => f.properties?.value !== undefined
      ),
      getPosition: (f: Feature) =>
        (f.geometry as Point).coordinates as [number, number],
      getColorWeight: (f: Feature) => f.properties?.value ?? 1,
      radius,
      colorAggregation: 'MEAN',
      colorDomain: [0, 2],
      colorRange: [
        [178, 24, 43, 200], // Dark red (0.0)
        [214, 96, 77, 200], // Red (0.25)
        [244, 165, 130, 200], // Light red (0.5)
        [253, 219, 199, 200], // Very light red (0.75)
        [247, 247, 247, 200], // White/neutral (1.0)
        [209, 229, 240, 200], // Very light blue (1.25)
        [146, 197, 222, 200], // Light blue (1.5)
        [67, 147, 195, 200], // Blue (1.75)
        [33, 102, 172, 200], // Dark blue (2.0)
      ],
      elevationScale: 0,
    }),
    new GeoJsonLayer({
      id: 'stations',
      data: params.snotelStations,
      getPointRadius: 6,
      pointRadiusUnits: 'pixels',
      pickable: true,
      onClick: (info) => {
        if (info.object) {
          setStation(info.object.properties);
        }
      },
      getFillColor: (f: Feature): [number, number, number, number] => {
        const value = f.properties?.value;
        if (value === undefined || value === null) {
          return [128, 128, 128, 200]; // Gray for missing data
        }

        // Clamp value between 0 and 2
        const clampedValue = Math.max(0, Math.min(2, value));

        // Diverging color scale: Red (0) -> White (1) -> Blue (2)
        // ColorBrewer RdBu scale
        const colorScale = [
          [178, 24, 43], // Dark red (0.0)
          [214, 96, 77], // Red (0.25)
          [244, 165, 130], // Light red (0.5)
          [253, 219, 199], // Very light red (0.75)
          [247, 247, 247], // White/neutral (1.0)
          [209, 229, 240], // Very light blue (1.25)
          [146, 197, 222], // Light blue (1.5)
          [67, 147, 195], // Blue (1.75)
          [33, 102, 172], // Dark blue (2.0)
        ];

        // Interpolate between colors
        const index = (clampedValue / 2) * (colorScale.length - 1);
        const lowerIndex = Math.floor(index);
        const upperIndex = Math.min(lowerIndex + 1, colorScale.length - 1);
        const t = index - lowerIndex;

        const color = colorScale[lowerIndex].map((c, i) =>
          Math.round(c * (1 - t) + colorScale[upperIndex][i] * t)
        );

        return [color[0], color[1], color[2], 200];
      },
      getLineColor: [255, 255, 255, 255],
      lineWidthMinPixels: 1,
    }),
  ];
  return (
    <Map
      mapStyle={MAP_STYLE}
      initialViewState={INITIAL_VIEW_STATE}
      onZoomEnd={(e) => setZoom(e.viewState.zoom)}
      {...MAP_OPTIONS}
    >
      <NavigationControl position="top-right" />
      <DeckGLOverlay
        layers={layers}
        interleaved
        getTooltip={(info) => {
          if (info.object && info.object.properties.name) {
            if (info.object.properties.value) {
              return `${info.object.properties.name}: ${Math.round(info.object.properties.value * 100)}%`;
            } else {
              return info.object.properties.name;
            }
          } else {
            return null;
          }
        }}
      />
    </Map>
  );
}
