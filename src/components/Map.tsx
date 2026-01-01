import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox';
import { point } from '@turf/helpers';
import Map, { NavigationControl } from '@vis.gl/react-maplibre';
import { GeoJsonLayer, Position } from 'deck.gl';
import { Feature, Point } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMemo, useState } from 'react';
import { useControl } from 'react-map-gl/maplibre';

import { useStationData } from '@/hooks/useStationData';
import { useStations } from '@/hooks/useStations';
import { INITIAL_VIEW_STATE, MAP_OPTIONS, MAP_STYLE } from '@/lib/mapConfig';

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function OurMap() {
  const { data: snotelStations } = useStations({ networkCode: 'SNTL' });

  const stationTriplets = useMemo(() => {
    const stationTriplets = [];
    if (snotelStations) {
      for (const station of snotelStations) {
        if (station.stationTriplet) {
          stationTriplets.push(station.stationTriplet);
        }
      }
    }
    return stationTriplets;
  }, [snotelStations]);

  const stationDataResults = useStationData({
    stationTriplets,
    elements: ['WTEQ'],
    beginDate: '2025-12-31',
    endDate: '2026-01-01',
  });

  const stations = useMemo(() => {
    if (snotelStations) {
      const stationData: Record<string, number> = {};
      for (const result of stationDataResults) {
        if (result.data) {
          for (const data of result.data) {
            if (data.stationTriplet) {
              const value = data.data?.[0].values?.[0].value;
              const average = data.data?.[0].values?.[0].average;
              if (value && average) {
                stationData[data.stationTriplet] =
                  (value - average) / average + 1;
              }
            }
          }
        }
      }

      const stations = [];

      for (const station of snotelStations) {
        if (station.stationTriplet) {
          const value = stationData[station.stationTriplet];
          if (value) {
            stations.push(
              point([station.longitude as number, station.latitude as number], {
                value: value,
              })
            );
          }
        }
      }

      return stations;
    }
  }, [snotelStations, stationDataResults]);

  const [zoom, setZoom] = useState(INITIAL_VIEW_STATE.zoom);

  const radius = useMemo(() => {
    return 20000 / Math.pow(2, zoom - INITIAL_VIEW_STATE.zoom);
  }, [zoom]);

  const layers = [];

  if (stations) {
    layers.push(
      new HexagonLayer<Feature>({
        id: 'hexagons',
        data: stations,
        getPosition: (f: Feature) =>
          (f.geometry as Point).coordinates as Position,
        getColorWeight: (f: Feature) => f.properties?.value,
        radius,
        colorAggregation: 'MEAN',
        colorDomain: [0, 2],
        colorRange: [
          [213, 62, 79, 200],
          [244, 109, 67, 200],
          [253, 174, 97, 200],
          [254, 224, 139, 200],
          [230, 245, 152, 200],
          [171, 221, 164, 200],
        ],
      })
    );

    layers.push(
      new GeoJsonLayer({
        id: 'points',
        data: stations,
        pointType: 'circle',
        pointRadiusMinPixels: 5,
        pointRadiusMaxPixels: 10,
        getFillColor: (f: Feature) => {
          const value = f.properties?.value || 0;
          const normalized = Math.max(0, Math.min(1, value / 2));
          const colorRange = [
            [213, 62, 79],
            [244, 109, 67],
            [253, 174, 97],
            [254, 224, 139],
            [230, 245, 152],
            [171, 221, 164],
          ];
          const index = Math.floor(normalized * (colorRange.length - 1));
          const nextIndex = Math.min(index + 1, colorRange.length - 1);
          const t = normalized * (colorRange.length - 1) - index;
          const color = colorRange[index].map((c, i) =>
            Math.round(c * (1 - t) + colorRange[nextIndex][i] * t)
          );
          return [...color, 200];
        },
        getLineColor: [0, 0, 0, 255],
        lineWidthMinPixels: 1,
      })
    );
  }

  return (
    <Map
      mapStyle={MAP_STYLE}
      initialViewState={INITIAL_VIEW_STATE}
      style={{ width: '100%', height: '100dvh' }}
      onZoomEnd={(e) => setZoom(e.viewState.zoom)}
      {...MAP_OPTIONS}
    >
      <NavigationControl position="top-right" />
      {stations && <DeckGLOverlay layers={layers} />}
    </Map>
  );
}
