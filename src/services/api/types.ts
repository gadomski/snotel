import { Station } from '@/types/station'
import { Measurement } from '@/types/measurement'

export interface APIResponse<T> {
  data: T
  status: number
  message?: string
}

export interface StationsResponse {
  stations: Station[]
  count: number
}

export interface StationDataRequest {
  stationTriplets: string | string[]
  elementCodes: string | string[]
  beginDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
  ordinal?: number
  duration?: string
}

export interface StationDataResponse {
  data: Measurement[]
}

export interface MetadataRequest {
  network?: string
  state?: string
  county?: string
  huc?: string
  minElevation?: number
  maxElevation?: number
}

export interface ReferenceDataResponse {
  elements: ElementReference[]
}

export interface ElementReference {
  elementCd: string
  name: string
  storedUnitCd: string
  description?: string
}

export interface APIError {
  message: string
  code: string
  details?: unknown
}
