import { useQueries } from '@tanstack/react-query';

import { awdbApi } from '@/services/api/awdb';

export const useStationData = (params: {
  stationTriplets: string[];
  elements: string[];
  beginDate: string;
  endDate: string;
}) => {
  return useQueries({
    queries: params.stationTriplets.map((stationTriplet) => {
      return {
        queryKey: ['station-data', stationTriplet, params.elements],
        queryFn: () =>
          awdbApi.getStationData({
            stationTriplets: [stationTriplet],
            elements: params.elements,
            beginDate: params.beginDate,
            endDate: params.endDate,
          }),
      };
    }),
  });
};
