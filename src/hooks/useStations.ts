import { useQuery } from '@tanstack/react-query';

import { Station, awdbApi } from '@/services/api/awdb';

export const useStations = (params: { networkCode: string }) => {
  return useQuery<Station[], Error>({
    queryKey: ['stations', params.networkCode],
    queryFn: () => awdbApi.getStations(params),
  });
};
