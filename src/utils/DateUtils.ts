import { QuarterInfo, WeekInfo } from "../types/dateTypes";

const getAdjustedDayIndex = (date: Date): number => {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
};

/**
 * Normalizes the date to the beginning of the day.
 */
export const normalizeDate = (dateStr: string): Date => {
  const date = new Date(dateStr);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
};

const getWeekday = (date: Date, index: number): Date => {
  const currentDayIndex = getAdjustedDayIndex(date);
  const weekday = new Date(date);
  weekday.setDate(date.getDate() + (index - currentDayIndex));
  return weekday;
};

const getWeekNumber = (date: Date): number => {
  const quarter = getQuarter(date);
  const firstDay = new Date(Date.UTC(quarter.year, 0, 1));

  const dayIndex = getAdjustedDayIndex(firstDay);

  const days = Math.floor(
    (date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  const weekNumber = Math.floor((days + dayIndex) / 7) + 1;

  return weekNumber;
};

const getWeeks = (startDate: Date, endDate: Date): WeekInfo[] => {
  const weeks: WeekInfo[] = [];
  let currentStartDate = new Date(startDate);

  let weekNumber = getWeekNumber(currentStartDate);

  while (currentStartDate <= endDate) {
    const currentEndDate = new Date(currentStartDate);
    currentEndDate.setDate(currentEndDate.getDate() + 6);

    const weekThuesday = getWeekday(currentStartDate, 3);
    const monthName = new Intl.DateTimeFormat("en-us", {
      month: "short",
    }).format(weekThuesday);

    weeks.push({
      startDate: currentStartDate.toISOString(),
      endDate: currentEndDate.toISOString(),
      weekNumber: weekNumber,
      month: monthName,
    });

    weekNumber++;
    currentStartDate.setDate(currentStartDate.getDate() + 7);
  }

  return weeks;
};

/**
 * Gets the quarter detailed information for a given date.
 */
export const getQuarterInfo = (inputDate: string): QuarterInfo => {
  const date = normalizeDate(inputDate);
  const quarter = getQuarter(date);

  const quarterRange = getQuarterRange(quarter.year, quarter.quarter);
  const weeks = getWeeks(quarterRange.startDate, quarterRange.endDate);

  return {
    quarter: quarter.quarter,
    year: quarter.year,
    startDate: quarterRange.startDate.toISOString(),
    endDate: quarterRange.endDate.toISOString(),
    weeks: weeks,
  };
};

/**
 * Gets the quarter basic information for a given date.
 */
const getQuarter = (date: Date): { quarter: number; year: number } => {
  const weekThuesday = getWeekday(date, 3);
  const year = weekThuesday.getFullYear();
  const quarterIndex = Math.floor(weekThuesday.getMonth() / 3);

  return {
    quarter: quarterIndex + 1,
    year: year,
  };
};

const getQuarterRange = (
  year: number,
  quarter: number
): { startDate: Date; endDate: Date } => {
  const startMonth = (quarter - 1) * 3;

  const startDate = new Date(Date.UTC(year, startMonth, 1));
  const startDayIndex = getAdjustedDayIndex(startDate);

  if (startDayIndex > 3) {
    startDate.setDate(startDate.getDate() + (7 - startDayIndex));
  } else {
    startDate.setDate(startDate.getDate() - startDayIndex);
  }

  const endDate = new Date(Date.UTC(year, startMonth + 3, 0));
  const endDayIndex = getAdjustedDayIndex(endDate);

  if (endDayIndex < 3) {
    endDate.setDate(endDate.getDate() - (endDayIndex + 1));
  } else {
    endDate.setDate(endDate.getDate() + (7 - (endDayIndex + 1)));
  }

  return {
    startDate,
    endDate,
  };
};

export const hasMatchingDate = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const [startDate1, endDate1, startDate2, endDate2] = [
    start1,
    end1,
    start2,
    end2,
  ].map(normalizeDate);

  return startDate1 <= endDate2 && startDate2 <= endDate1;
};
