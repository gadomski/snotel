import { useRef, useCallback } from 'react'
import Map, { MapRef, Popup, NavigationControl } from 'react-map-gl'
import { Box } from '@chakra-ui/react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useStations } from '@/hooks/useStations'
import { useMapStore } from '@/store/useMapStore'
import { useUIStore } from '@/store/useUIStore'
import { MAP_STYLE, MAP_OPTIONS } from '@/lib/mapConfig'
import StationMarker from './StationMarker'
import StationPopup from './StationPopup'

export default function SnotelMap() {
  const mapRef = useRef<MapRef>(null)
  const { data: stations, isLoading } = useStations({ network: 'SNOTEL' })
  const { viewState, setViewState, popupInfo, closePopup } = useMapStore()
  const { selectedStationId } = useUIStore()

  const onMove = useCallback(
    (evt: any) => {
      setViewState(evt.viewState)
    },
    [setViewState]
  )

  if (isLoading) {
    return (
      <Box h="full" display="flex" alignItems="center" justifyContent="center">
        Loading map...
      </Box>
    )
  }

  return (
    <Box h="full" position="relative">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={onMove}
        mapLib={import('maplibre-gl') as any}
        mapStyle={MAP_STYLE}
        style={{ width: '100%', height: '100%' }}
        {...MAP_OPTIONS}
      >
        <NavigationControl position="top-right" />

        {stations?.map((station) => (
          <StationMarker
            key={station.id}
            station={station}
            isSelected={station.id === selectedStationId}
          />
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            maxWidth="300px"
          >
            <StationPopup stationId={popupInfo.stationId} />
          </Popup>
        )}
      </Map>
    </Box>
  )
}
