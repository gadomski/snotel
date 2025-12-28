import { useQuery } from '@tanstack/react-query';
import { snotelAPI } from '@/services/api/snotel';
import { Station } from '@/types/station';

export const useStations = (params?: {
  networkCode?: string;
  stateCode?: string;
}) => {
  const stationTriplets = `*:${params?.stateCode || '*'}:${params?.networkCode || 'SNTL'}`;
  return useQuery<Station[], Error>({
    queryKey: ['stations', params],
    queryFn: () => snotelAPI.getStations({ stationTriplets }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
};
