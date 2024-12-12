import type { DayPicker } from "react-day-picker";

export type CalendarProps = {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from?: Date; to?: Date } | undefined;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
} & Partial<Pick<DayPicker, "mode" | "selected" | "onSelect" | "disabled" | "initialFocus">>;