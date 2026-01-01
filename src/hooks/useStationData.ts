import { useQuery } from '@tanstack/react-query';

import { awdbApi } from '@/services/api/awdb';

export const useStationData = (params: {
  networkCode: string;
  elements: string[];
  beginDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: [
      'station-data',
      params.networkCode,
      params.elements,
      params.beginDate,
      params.endDate,
    ],
    queryFn: () =>
      awdbApi.getStationData({
        stationTriplets: [`*:CO:${params.networkCode}`],
        elements: params.elements,
        beginDate: params.beginDate,
        endDate: params.endDate,
      }),
  });
};
