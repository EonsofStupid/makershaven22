import 'react-day-picker';

declare module 'react-day-picker' {
  interface DayPickerRootProps {
    components?: {
      IconLeft?: React.ComponentType<{ className?: string }>;
      IconRight?: React.ComponentType<{ className?: string }>;
    };
  }
}