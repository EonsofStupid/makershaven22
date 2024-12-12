import { LucideIcon } from 'lucide-react';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | null) => void;
  disabled?: boolean | ((date: Date) => boolean);
  initialFocus?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export interface CalendarComponents {
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