import { create } from 'zustand'
import { MapViewState } from '@/types/map'
import { MAP_DEFAULTS } from '@/utils/constants'

interface MapState {
  // Viewport state
  viewState: MapViewState
  setViewState: (state: Partial<MapViewState>) => void

  // Selected marker
  selectedMarkerId: string | null
  setSelectedMarker: (id: string | null) => void

  // Popup
  showPopup: boolean
  popupInfo: {
    longitude: number
    latitude: number
    stationId: string
  } | null
  setPopupInfo: (info: {
    longitude: number
    latitude: number
    stationId: string
  } | null) => void
  closePopup: () => void

  // Map style
  mapStyle: string
  setMapStyle: (style: string) => void

  // Clustering
  enableClustering: boolean
  toggleClustering: () => void
}

export const useMapStore = create<MapState>((set) => ({
  // Viewport
  viewState: {
    longitude: MAP_DEFAULTS.CENTER_LONGITUDE,
    latitude: MAP_DEFAULTS.CENTER_LATITUDE,
    zoom: MAP_DEFAULTS.ZOOM,
  },
  setViewState: (state) =>
    set((prev) => ({
      viewState: { ...prev.viewState, ...state },
    })),

  // Selected marker
  selectedMarkerId: null,
  setSelectedMarker: (id) => set({ selectedMarkerId: id }),

  // Popup
  showPopup: false,
  popupInfo: null,
  setPopupInfo: (info) =>
    set({ popupInfo: info, showPopup: info !== null }),
  closePopup: () =>
    set({ showPopup: false, popupInfo: null }),

  // Map style
  mapStyle: import.meta.env.VITE_MAP_STYLE || 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  setMapStyle: (style) => set({ mapStyle: style }),

  // Clustering
  enableClustering: true,
  toggleClustering: () =>
    set((state) => ({ enableClustering: !state.enableClustering })),
}))
