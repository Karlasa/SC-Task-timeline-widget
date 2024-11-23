export interface IQuartalHeaderProps {
  quarter: number;
  year: number;
  nextQuarter: () => void;
  previousQuarter: () => void;
}
