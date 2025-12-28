export interface Measurement {
  stationId: string;
  stationTriplet: string;
  elementCode: string; // SNWD, WTEQ, TOBS, PREC, etc.
  datetime: string;
  value: number;
  flags?: string;
}

export interface TimeSeriesData {
  stationId: string;
  elementCode: string;
  elementName: string;
  unit: string;
  data: DataPoint[];
}

export interface DataPoint {
  datetime: string;
  value: number;
  flags?: string;
}

export interface ElementCode {
  code: string;
  name: string;
  unit: string;
  description: string;
}

// Common SNOTEL element codes
export const ELEMENT_CODES = {
  SNWD: 'Snow Depth',
  WTEQ: 'Snow Water Equivalent',
  TOBS: 'Temperature Observed',
  TMAX: 'Temperature Maximum',
  TMIN: 'Temperature Minimum',
  PREC: 'Precipitation Accumulation',
  PRCP: 'Precipitation Increment',
} as const;

export type ElementCodeKey = keyof typeof ELEMENT_CODES;
