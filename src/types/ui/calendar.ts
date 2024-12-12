import type { DayPickerSingleProps } from "react-day-picker";

export type CalendarProps = Omit<DayPickerSingleProps, "mode"> & {
  mode?: "single";
  className?: string;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};