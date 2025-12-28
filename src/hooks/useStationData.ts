import { useQuery } from '@tanstack/react-query';
import { snotelAPI } from '@/services/api/snotel';
import { Measurement } from '@/types/measurement';

export interface UseStationDataParams {
  stationTriplet: string;
  elementCodes: string[];
  beginDate: string;
  endDate: string;
  enabled?: boolean;
}

export const useStationData = ({
  stationTriplet,
  elementCodes,
  beginDate,
  endDate,
  enabled = true,
}: UseStationDataParams) => {
  return useQuery<Measurement[], Error>({
    queryKey: ['stationData', stationTriplet, elementCodes, beginDate, endDate],
    queryFn: () =>
      snotelAPI.getStationData(
        stationTriplet,
        elementCodes,
        beginDate,
        endDate
      ),
    enabled: enabled && !!stationTriplet && elementCodes.length > 0,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchInterval: 1000 * 60 * 15, // Refetch every 15 minutes
    retry: 2,
  });
};

export const useCurrentStationData = (
  stationTriplet: string,
  elementCodes: string[]
) => {
  return useQuery<Measurement[], Error>({
    queryKey: ['currentData', stationTriplet, elementCodes],
    queryFn: () => snotelAPI.getCurrentData(stationTriplet, elementCodes),
    enabled: !!stationTriplet && elementCodes.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 15, // Refetch every 15 minutes
    retry: 2,
  });
};
