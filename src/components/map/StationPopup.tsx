import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useStations } from '@/hooks/useStations';
import { useCurrentStationData } from '@/hooks/useStationData';
import { ELEMENT_DESCRIPTIONS, ELEMENT_UNITS } from '@/utils/constants';

interface StationPopupProps {
  stationId: string;
}

export default function StationPopup({ stationId }: StationPopupProps) {
  const navigate = useNavigate();
  const { data: stations } = useStations();
  const station = stations?.find((s) => s.id === stationId);

  const { data: currentData, isLoading } = useCurrentStationData(
    station?.stationTriplet || '',
    ['SNWD', 'WTEQ', 'TOBS']
  );

  if (!station) return null;

  const handleViewDetails = () => {
    navigate(`/station/${stationId}`);
  };

  return (
    <Box p={2}>
      <VStack align="stretch" spacing={2}>
        <Heading size="sm">{station.name}</Heading>
        <Text fontSize="xs" color="gray.600">
          {station.state} | Elevation: {station.elevation}{' '}
          {station.elevationUnits}
        </Text>

        {isLoading ? (
          <Text fontSize="xs">Loading current data...</Text>
        ) : currentData && currentData.length > 0 ? (
          <VStack align="stretch" spacing={1} fontSize="xs">
            {currentData.map((measurement) => (
              <Text key={measurement.elementCode}>
                <strong>
                  {ELEMENT_DESCRIPTIONS[measurement.elementCode]}:
                </strong>{' '}
                {measurement.value} {ELEMENT_UNITS[measurement.elementCode]}
              </Text>
            ))}
          </VStack>
        ) : (
          <Text fontSize="xs" color="gray.500">
            No current data available
          </Text>
        )}

        <Button size="sm" colorScheme="blue" onClick={handleViewDetails}>
          View Details
        </Button>
      </VStack>
    </Box>
  );
}
