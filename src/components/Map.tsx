import { GeoJsonLayer } from '@deck.gl/layers';
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox';
import Map, { NavigationControl } from '@vis.gl/react-maplibre';
import { Feature } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
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

  const layers = [
    new GeoJsonLayer({
      id: 'stations',
      data: params.snotelStations,
      getPointRadius: 5,
      pointRadiusUnits: 'pixels',
      pickable: true,
      onClick: (info) => {
        if (info.object) {
          setStation(info.object.properties);
        }
      },
    }),
  ];
  return (
    <Map
      mapStyle={MAP_STYLE}
      initialViewState={INITIAL_VIEW_STATE}
      {...MAP_OPTIONS}
    >
      <NavigationControl position="top-right" />
      <DeckGLOverlay
        layers={layers}
        interleaved
        getTooltip={(info) => {
          if (info.object && info.object.properties.name) {
            return info.object.properties.name;
          } else {
            return null;
          }
        }}
      />
    </Map>
  );
}
