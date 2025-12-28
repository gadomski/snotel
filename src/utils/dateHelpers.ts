import { format, parseISO } from 'date-fns';

/**
 * Format a date string for display
 */
export const formatDate = (
  dateString: string,
  formatStr: string = 'MMM dd, yyyy'
): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string for API requests (YYYY-MM-DD)
 */
export const formatDateForAPI = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Format datetime for display with time
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, 'MMM dd, yyyy HH:mm');
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayFormatted = (): string => {
  return formatDateForAPI(new Date());
};

/**
 * Get N days ago in YYYY-MM-DD format
 */
export const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDateForAPI(date);
};
