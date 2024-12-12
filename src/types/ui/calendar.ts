import { CustomComponents } from 'react-day-picker';
import { LucideIcon } from 'lucide-react';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean | ((date: Date) => boolean);
  initialFocus?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export type CalendarComponents = Partial<CustomComponents> & {
  IconLeft?: LucideIcon;
  IconRight?: LucideIcon;
  IconToday?: LucideIcon;
  IconCalendar?: LucideIcon;
}

export interface DayProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  onClick?: () => void;
}