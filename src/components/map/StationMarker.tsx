import { Marker } from '@vis.gl/react-maplibre';
import { useMapStore } from '@/store/useMapStore';
import { useUIStore } from '@/store/useUIStore';
import { Station } from '@/types/station';
import { MARKER_STYLES } from '@/lib/mapConfig';

interface StationMarkerProps {
  station: Station;
  isSelected?: boolean;
}

export default function StationMarker({
  station,
  isSelected,
}: StationMarkerProps) {
  const { setPopupInfo } = useMapStore();
  const { setSelectedStation } = useUIStore();

  const handleClick = () => {
    setPopupInfo({
      longitude: station.longitude,
      latitude: station.latitude,
      stationId: station.id,
    });
    setSelectedStation(station.id);
  };

  const style = isSelected ? MARKER_STYLES.selected : MARKER_STYLES.default;

  return (
    <Marker
      longitude={station.longitude}
      latitude={station.latitude}
      anchor="bottom"
      onClick={handleClick}
    >
      <svg
        height={style.size * 2}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: style.color,
          stroke: 'white',
          strokeWidth: 2,
          transform: `scale(${isSelected ? 1.2 : 1})`,
          transition: 'transform 0.2s',
        }}
      >
        <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
      </svg>
    </Marker>
  );
}
