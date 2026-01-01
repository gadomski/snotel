import { Box } from '@chakra-ui/react';
import { point } from '@turf/helpers';
import { useMemo } from 'react';

import DatePicker from './components/DatePicker';
import LoadingOverlay from './components/LoadingOverlay';
import Map from './components/Map';
import StationDrawer from './components/StationDrawer';
import { useStationData } from './hooks/useStationData';
import { useStations } from './hooks/useStations';
import { useStore } from './store/useStore';
import { formatDate } from './utils/dateHelpers';

function App() {
  const date = useStore((state) => state.date);
  const { data: snotelStations, isLoading: isLoadingSnotelStations } =
    useStations({ networkCode: 'SNTL' });
  const { data: snotelStationData, isLoading: isLoadingSnotelStationData } =
    useStationData({
      networkCode: 'SNTL',
      elements: ['WTEQ'],
      beginDate: formatDate(new Date(date.getTime() - 24 * 60 * 60 * 1000)),
      endDate: formatDate(date),
    });

  const snotelStationValues = useMemo(() => {
    const values: Record<string, number> = {};
    if (snotelStationData) {
      for (const data of snotelStationData) {
        if (data.stationTriplet) {
          const value = data.data?.[0].values?.[0].value;
          const average = data.data?.[0].values?.[0].average;
          if (value && average) {
            values[data.stationTriplet] = (value - average) / average + 1;
          }
        }
      }
    }
    return values;
  }, [snotelStationData]);

  const loadingText =
    (isLoadingSnotelStations && 'Loading SNOTEL stations') ||
    (isLoadingSnotelStationData && 'Loading SNOTEL station data');

  return (
    <>
      <Box position="relative" width="100%" height="100dvh">
        <Map
          snotelStations={snotelStations
            ?.filter((station) => station.latitude && station.longitude)
            .map((station) => {
              const value = station.stationTriplet
                ? snotelStationValues[station.stationTriplet]
                : undefined;
              return point(
                [station.longitude as number, station.latitude as number],
                {
                  ...station,
                  value,
                }
              );
            })}
        />
        <DatePicker />
        {loadingText && <LoadingOverlay text={loadingText} />}
      </Box>
      <StationDrawer />
    </>
  );
}

export default App;
