import * as React from "react";
import { dispatch, memoryState } from "./toast/state";
import { genId } from "./toast/utils";

interface Toast {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const listeners: Array<(state: typeof memoryState) => void> = [];

export function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    const listener = (newState: typeof memoryState) => setState(newState);
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  function toast(props: Toast) {
    const id = genId();
    dispatch({ type: "ADD_TOAST", toast: { id, ...props, open: true } });
    return { id, dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
  }

  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}

export { toast } from "sonner";