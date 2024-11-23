export interface WeekInfo {
  weekNumber: number;
  month: string;
  startDate: string;
  endDate: string;
}

export interface QuarterInfo {
  quarter: number;
  startDate: string;
  endDate: string;
  weeks: WeekInfo[];
  year: number;
}
