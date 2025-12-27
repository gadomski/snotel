
/**
 * Water year runs from October 1 to September 30
 * For example, water year 2024 is from Oct 1, 2023 to Sep 30, 2024
 */

export interface WaterYearRange {
  start: string // YYYY-MM-DD format
  end: string // YYYY-MM-DD format
  year: number
}

/**
 * Get the current water year
 * If current month is Oct-Dec (9-11), water year is next calendar year
 * Otherwise, water year is current calendar year
 */
export const getCurrentWaterYear = (): number => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 0-indexed (0 = Jan, 9 = Oct)

  // If Oct, Nov, or Dec, water year is next year
  return month >= 9 ? year + 1 : year
}

/**
 * Get the start and end dates for a given water year
 */
export const getWaterYearRange = (waterYear: number): WaterYearRange => {
  const startYear = waterYear - 1
  const endYear = waterYear

  return {
    start: `${startYear}-10-01`,
    end: `${endYear}-09-30`,
    year: waterYear,
  }
}

/**
 * Get the current water year's date range
 */
export const getCurrentWaterYearRange = (): WaterYearRange => {
  return getWaterYearRange(getCurrentWaterYear())
}

/**
 * Get the previous water year
 */
export const getPreviousWaterYear = (waterYear: number): number => {
  return waterYear - 1
}

/**
 * Get the next water year
 */
export const getNextWaterYear = (waterYear: number): number => {
  return waterYear + 1
}

/**
 * Calculate which water year a given date falls into
 */
export const getWaterYearFromDate = (date: Date): number => {
  const year = date.getFullYear()
  const month = date.getMonth()

  return month >= 9 ? year + 1 : year
}

/**
 * Format a water year for display
 * Example: 2024 => "WY 2024 (Oct 2023 - Sep 2024)"
 */
export const formatWaterYear = (waterYear: number): string => {
  return `WY ${waterYear} (Oct ${waterYear - 1} - Sep ${waterYear})`
}

/**
 * Get last N water years
 */
export const getRecentWaterYears = (count: number = 5): number[] => {
  const currentYear = getCurrentWaterYear()
  return Array.from({ length: count }, (_, i) => currentYear - i)
}
