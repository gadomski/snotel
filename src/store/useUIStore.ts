import { create } from 'zustand'
import { StationFilters } from '@/types/station'
import { getCurrentWaterYearRange } from '@/utils/waterYear'

interface DateRange {
  start: string
  end: string
}

interface UIState {
  // Selected station
  selectedStationId: string | null
  setSelectedStation: (id: string | null) => void

  // Station filters
  filters: StationFilters
  setFilters: (filters: Partial<StationFilters>) => void
  resetFilters: () => void

  // Date range for historical data
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  resetDateRange: () => void

  // Sidebar visibility (for mobile)
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Selected element codes for display
  selectedElements: string[]
  setSelectedElements: (elements: string[]) => void
  toggleElement: (element: string) => void
}

const initialWaterYearRange = getCurrentWaterYearRange()

export const useUIStore = create<UIState>((set) => ({
  // Selected station
  selectedStationId: null,
  setSelectedStation: (id) => set({ selectedStationId: id }),

  // Filters
  filters: {},
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: {} }),

  // Date range
  dateRange: {
    start: initialWaterYearRange.start,
    end: initialWaterYearRange.end,
  },
  setDateRange: (range) => set({ dateRange: range }),
  resetDateRange: () =>
    set({
      dateRange: {
        start: initialWaterYearRange.start,
        end: initialWaterYearRange.end,
      },
    }),

  // Sidebar
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  // Selected elements
  selectedElements: ['SNWD', 'WTEQ', 'TOBS', 'PREC'],
  setSelectedElements: (elements) => set({ selectedElements: elements }),
  toggleElement: (element) =>
    set((state) => ({
      selectedElements: state.selectedElements.includes(element)
        ? state.selectedElements.filter((e) => e !== element)
        : [...state.selectedElements, element],
    })),
}))
