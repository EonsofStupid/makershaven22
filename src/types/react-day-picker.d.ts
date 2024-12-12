import 'react-day-picker';

declare module 'react-day-picker' {
  interface CustomComponents {
    CaptionNavigationIcon?: React.ComponentType<{
      className?: string;
      direction: 'previous' | 'next';
    }>;
  }
}