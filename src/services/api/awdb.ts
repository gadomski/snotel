import type { components } from '../../types/awdb';
import { apiClient } from './client';

export type Station = components['schemas']['StationDTO'];
export type StationData = components['schemas']['StationDataDTO'];

export const awdbApi = {
  getStations: async (params: { networkCode: string }): Promise<Station[]> => {
    const response = await apiClient.get('/services/v1/stations', {
      params: {
        stationTriplets: '*:*:' + params.networkCode,
      },
    });
    return response.data;
  },

  getStationData: async (params: {
    stationTriplets: string[];
    elements: string[];
    beginDate: string;
    endDate: string;
  }): Promise<StationData[]> => {
    const response = await apiClient.get('/services/v1/data', {
      params: {
        stationTriplets: params.stationTriplets.join(','),
        elements: params.elements.join(','),
        beginDate: params.beginDate,
        endDate: params.endDate,
        duration: 'DAILY',
        centralTendencyType: 'ALL',
      },
    });
    return response.data;
  },
};
