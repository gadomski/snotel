export interface Measurement {
  stationTriplet: string;
  data: Data[];
}

export interface Data {
  stationElement: StationElement;
  values: Value[];
}

export interface StationElement {
  elementCode: ElementCodeKey;
  ordinal: number;
  durationName: string;
  dataPrecision: number;
  storedUnitCode: string;
  originalUnitCode: string;
  beginDate: string;
  endDate: string;
  derivedData: boolean;
}

export interface Value {
  date: string;
  value: number;
}

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
