import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type: "default" | "success" | "error" | "warning";
}

export interface ToastActionElement {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToasterToast = Toast & {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type: "default" | "success" | "error" | "warning";
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t } : t
          ),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t })),
      };
    }

    case "REMOVE_TOAST": {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== toastId),
        };
      }

      return {
        ...state,
        toasts: [],
      };
    }
  }
};

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] });

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = genId();
    const newToast = { id, ...props };

    setState((prevState) => reducer(prevState, { type: "ADD_TOAST", toast: newToast }));

    return id;
  };

  const update = (props: Partial<ToasterToast>) => {
    setState((prevState) => reducer(prevState, { type: "UPDATE_TOAST", toast: props }));
  };

  const dismiss = (toastId?: string) => {
    setState((prevState) => reducer(prevState, { type: "DISMISS_TOAST", toastId }));
  };

  const remove = (toastId?: string) => {
    setState((prevState) => reducer(prevState, { type: "REMOVE_TOAST", toastId }));
  };

  useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toastTimeouts.has(toast.id)) {
        return;
      }

      const timeout = setTimeout(() => {
        remove(toast.id);
        toastTimeouts.delete(toast.id);
      }, TOAST_REMOVE_DELAY);

      toastTimeouts.set(toast.id, timeout);
    });
  }, [state.toasts]);

  return {
    toasts: state.toasts,
    toast,
    update,
    dismiss,
    remove,
  };
}
