import { DayPickerSingleProps, DayPickerRangeProps, DayPickerMultipleProps } from 'react-day-picker';
import { LucideIcon } from 'lucide-react';

export type CalendarProps = {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean | ((date: Date) => boolean);
  initialFocus?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export type CalendarComponents = {
  IconLeft?: LucideIcon;
  IconRight?: LucideIcon;
  IconToday?: LucideIcon;
  IconCalendar?: LucideIcon;
}