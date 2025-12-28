import { useMemo } from 'react';
import {
  getCurrentWaterYear,
  getCurrentWaterYearRange,
  getWaterYearRange,
  WaterYearRange,
} from '@/utils/waterYear';

export const useWaterYear = () => {
  const currentWaterYear = useMemo(() => getCurrentWaterYear(), []);
  const currentWaterYearRange = useMemo(() => getCurrentWaterYearRange(), []);

  return {
    currentWaterYear,
    currentWaterYearRange,
    getWaterYearRange,
  };
};

export const useWaterYearRange = (waterYear?: number): WaterYearRange => {
  return useMemo(() => {
    if (waterYear) {
      return getWaterYearRange(waterYear);
    }
    return getCurrentWaterYearRange();
  }, [waterYear]);
};
