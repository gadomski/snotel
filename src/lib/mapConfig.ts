import { MAP_DEFAULTS } from '@/utils/constants'

export const MAP_STYLE =
  import.meta.env.VITE_MAP_STYLE ||
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

export const DARK_MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export const INITIAL_VIEW_STATE = {
  longitude: MAP_DEFAULTS.CENTER_LONGITUDE,
  latitude: MAP_DEFAULTS.CENTER_LATITUDE,
  zoom: MAP_DEFAULTS.ZOOM,
}

export const MAP_OPTIONS = {
  minZoom: MAP_DEFAULTS.MIN_ZOOM,
  maxZoom: MAP_DEFAULTS.MAX_ZOOM,
}

// Marker styling
export const MARKER_STYLES = {
  default: {
    color: '#2563eb', // blue
    size: 8,
  },
  selected: {
    color: '#dc2626', // red
    size: 12,
  },
  cluster: {
    color: '#059669', // green
    size: 40,
  },
}
