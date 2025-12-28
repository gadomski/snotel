import { ViewState } from '@vis.gl/react-maplibre';

export interface MapViewState extends Partial<ViewState> {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface MarkerData {
  id: string;
  longitude: number;
  latitude: number;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface PopupData {
  longitude: number;
  latitude: number;
  content: React.ReactNode;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
