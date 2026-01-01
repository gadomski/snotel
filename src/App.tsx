import { Box } from '@chakra-ui/react';
import { point } from '@turf/helpers';

import LoadingOverlay from './components/LoadingOverlay';
import Map from './components/Map';
import StationDrawer from './components/StationDrawer';
import { useStations } from './hooks/useStations';

function App() {
  const { data: snotelStations, isLoading: isLoadingSnotelStations } =
    useStations({ networkCode: 'SNTL' });
  const loadingText = isLoadingSnotelStations && 'Loading SNOTEL stations';

  return (
    <>
      <Box position="relative" width="100%" height="100dvh">
        <Map
          snotelStations={snotelStations
            ?.filter((station) => station.latitude && station.longitude)
            .map((station) =>
              point(
                [station.longitude as number, station.latitude as number],
                station
              )
            )}
        />
        {loadingText && <LoadingOverlay text={loadingText} />}
      </Box>
      <StationDrawer />
    </>
  );
}

export default App;
