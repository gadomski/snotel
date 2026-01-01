import { DataList, Drawer, Heading } from '@chakra-ui/react';

import { useStore } from '@/store/useStore';

export default function StationDrawer() {
  const station = useStore((state) => state.station);
  const setStation = useStore((state) => state.setStation);

  const isOpen = station !== null;
  const onClose = () => setStation(null);

  return (
    <Drawer.Root
      open={isOpen}
      placement="end"
      onOpenChange={(e) => !e.open && onClose()}
      size="md"
    >
      <Drawer.Backdrop />
      <Drawer.Trigger />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Heading>{station?.name || 'Station Details'}</Heading>
          </Drawer.Header>

          <Drawer.Body>
            {station && (
              <DataList.Root>
                <DataList.Item>
                  <DataList.ItemLabel>Station ID</DataList.ItemLabel>
                  <DataList.ItemValue>{station.stationId}</DataList.ItemValue>
                </DataList.Item>
                {station.stationTriplet && (
                  <DataList.Item>
                    <DataList.ItemLabel>Triplet</DataList.ItemLabel>
                    <DataList.ItemValue>
                      {station.stationTriplet}
                    </DataList.ItemValue>
                  </DataList.Item>
                )}
                {station.latitude && station.longitude && (
                  <DataList.Item>
                    <DataList.ItemLabel>Location</DataList.ItemLabel>
                    <DataList.ItemValue>{`${station.latitude.toFixed(4)}, ${station.longitude.toFixed(4)}`}</DataList.ItemValue>
                  </DataList.Item>
                )}
                {station.elevation && (
                  <DataList.Item>
                    <DataList.ItemLabel>Elevation</DataList.ItemLabel>
                    <DataList.ItemValue>{`${station.elevation} ft`}</DataList.ItemValue>
                  </DataList.Item>
                )}
              </DataList.Root>
            )}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
