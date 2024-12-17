import { reducer, State, ToastAction } from "./reducer";

const listeners: Array<(state: State) => void> = [];
export let memoryState: State = { toasts: [] };

export function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}
