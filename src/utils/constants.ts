export const APP_NAME = 'SNOTEL Data Viewer';

export const DEFAULT_ELEMENT_CODES = ['SNWD', 'WTEQ', 'TOBS', 'PREC'];

export const ELEMENT_UNITS: Record<string, string> = {
  SNWD: 'inches',
  WTEQ: 'inches',
  TOBS: '°F',
  TMAX: '°F',
  TMIN: '°F',
  PREC: 'inches',
  PRCP: 'inches',
};

export const ELEMENT_DESCRIPTIONS: Record<string, string> = {
  SNWD: 'Snow Depth',
  WTEQ: 'Snow Water Equivalent',
  TOBS: 'Temperature Observed',
  TMAX: 'Temperature Maximum',
  TMIN: 'Temperature Minimum',
  PREC: 'Precipitation Accumulation',
  PRCP: 'Precipitation Increment',
};

export const MAP_DEFAULTS = {
  CENTER_LATITUDE: 39.5, // Center of Colorado
  CENTER_LONGITUDE: -105.0,
  ZOOM: 6,
  MIN_ZOOM: 3,
  MAX_ZOOM: 18,
};

export const QUERY_STALE_TIMES = {
  STATIONS: 1000 * 60 * 60 * 24, // 24 hours
  CURRENT_DATA: 1000 * 60 * 5, // 5 minutes
  HISTORICAL_DATA: 1000 * 60 * 15, // 15 minutes
};

export const REFETCH_INTERVALS = {
  REAL_TIME: 1000 * 60 * 15, // 15 minutes
};
