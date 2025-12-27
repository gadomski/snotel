import { apiClient } from './client'
import { Station } from '@/types/station'
import { Measurement } from '@/types/measurement'
import { StationDataRequest, ElementReference } from './types'

export const snotelAPI = {
  /**
   * Get all SNOTEL stations
   */
  getStations: async (params?: {
    network?: string
    state?: string
  }): Promise<Station[]> => {
    const response = await apiClient.get('/metadata/stations', {
      params: {
        network: params?.network || 'SNOTEL',
        ...params,
      },
    })
    return response.data
  },

  /**
   * Get station data for specific elements and date range
   */
  getStationData: async (
    stationTriplet: string,
    elementCodes: string[],
    beginDate: string,
    endDate: string
  ): Promise<Measurement[]> => {
    const params: StationDataRequest = {
      stationTriplets: stationTriplet,
      elementCodes: elementCodes.join(','),
      beginDate,
      endDate,
    }

    const response = await apiClient.get('/data', { params })
    return response.data
  },

  /**
   * Get data for multiple stations
   */
  getMultiStationData: async (
    stationTriplets: string[],
    elementCodes: string[],
    beginDate: string,
    endDate: string
  ): Promise<Measurement[]> => {
    const params: StationDataRequest = {
      stationTriplets: stationTriplets.join(','),
      elementCodes: elementCodes.join(','),
      beginDate,
      endDate,
    }

    const response = await apiClient.get('/data', { params })
    return response.data
  },

  /**
   * Get reference data for element codes
   */
  getElementCodes: async (): Promise<ElementReference[]> => {
    const response = await apiClient.get('/reference-data/elements')
    return response.data
  },

  /**
   * Get latest data for a station
   */
  getCurrentData: async (
    stationTriplet: string,
    elementCodes: string[]
  ): Promise<Measurement[]> => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const endDate = today.toISOString().split('T')[0]
    const beginDate = yesterday.toISOString().split('T')[0]

    return snotelAPI.getStationData(
      stationTriplet,
      elementCodes,
      beginDate,
      endDate
    )
  },
}
