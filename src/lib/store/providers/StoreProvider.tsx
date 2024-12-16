import React from 'react';
import { Provider } from 'jotai';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

interface StoreProviderProps {
  children: React.ReactNode;
}

const store = createStore((set) => ({
  // Add your store state and actions here
}));

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};