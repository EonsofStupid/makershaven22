import * as React from "react";
import type { ToasterToast } from "@/components/ui/toast";

export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 1000000;

export type State = {
  toasts: ToasterToast[];
};

export const memoryState: State = { toasts: [] };

export const listeners: Array<(state: State) => void> = [];

export const dispatch = (action: any) => {
  memoryState.toasts = [...memoryState.toasts];
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};