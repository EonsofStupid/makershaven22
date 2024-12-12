import type { DayPickerSingleProps } from "react-day-picker";

export type CalendarProps = Omit<DayPickerSingleProps, "mode"> & {
  mode?: "single";
};