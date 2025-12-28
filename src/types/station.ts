export interface Station {
  stationId: string;
  name: string;
  stationTriplet: string;
  latitude: number;
  longitude: number;
  elevation: number;
  elevationUnits: string;
  state: string;
  county: string;
  network: string;
  huc: string;
  actonId: string;
}

export interface StationFilters {
  state?: string | null;
  minElevation?: number | null;
  maxElevation?: number | null;
  network?: string | null;
  searchTerm?: string;
}

export interface StationData {
  station: Station;
  currentConditions?: CurrentConditions;
}

export interface CurrentConditions {
  snowDepth?: number;
  snowWaterEquivalent?: number;
  temperature?: number;
  precipitation?: number;
  lastUpdated: string;
}
