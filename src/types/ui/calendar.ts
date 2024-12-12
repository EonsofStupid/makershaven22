import React from 'react';
import { DayPicker } from 'react-day-picker';
import { CustomComponents } from 'react-day-picker'; // Ensure correct import

// Define your custom PrevButton component
const MyCustomPrevButton = () => <button>Previous</button>;

// Extend CustomComponents to include PrevButton if not present
interface ExtendedCustomComponents extends CustomComponents {
  PrevButton?: React.ReactNode;
}

const customComponents: Partial<ExtendedCustomComponents> = {
  PrevButton: <MyCustomPrevButton />,
  // ...other custom components
};

const Calendar: React.FC<CalendarProps> = ({
  mode,
  selected,
  onSelect,
  disabled,
  initialFocus,
  weekStartsOn,
  className,
}) => {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      disabled={disabled}
      initialFocus={initialFocus}
      weekStartsOn={weekStartsOn}
      className={className}
      components={customComponents} // Pass custom components here
    />
  );
};

export default Calendar;
