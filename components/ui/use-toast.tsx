import * as React from "react";
import { ToastAction } from "@/components/ui/toast";
import { ToastData } from "@/components/ui/toast-state";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastData & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactElement<typeof ToastAction>;
    variant?: "success" | "error" | "info" | "warning";
};

const ActionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let toastCounter = 0;

const generateId = () => (++toastCounter).toString();

type Action =
    | { type: typeof ActionTypes.ADD_TOAST; toast: ToasterToast }
    | { type: typeof ActionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
    | { type: typeof ActionTypes.DISMISS_TOAST; toastId?: string }
    | { type: typeof ActionTypes.REMOVE_TOAST; toastId?: string };

interface State {
    toasts: ToasterToast[];
}

const listeners: Array<(toast: ToasterToast) => void> = [];

function toast(toast: Omit<ToasterToast, "id">) {
    const id = generateId();
    const newToast = { id, ...toast };
    listeners.forEach((listener) => listener(newToast));
}

function useToast() {
    const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

    React.useEffect(() => {
        const listener = (toast: ToasterToast) => {
            setToasts((currentToasts) => [toast, ...currentToasts].slice(0, TOAST_LIMIT));
            setTimeout(() => {
                setToasts((currentToasts) =>
                    currentToasts.map((t) => (t.id === toast.id ? { ...t, open: false } : t))
                );
            }, TOAST_REMOVE_DELAY);
        };

        listeners.push(listener);

        return () => {
            listeners.splice(listeners.indexOf(listener), 1);
        };
    }, []);

    const dismissToast = (id: string) => {
        setToasts((currentToasts) =>
            currentToasts.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
        );
    };

    return { toasts, dismissToast };
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };

        case ActionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
                ),
            };

        case ActionTypes.DISMISS_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toastId ? { ...toast, open: false } : toast
                ),
            };

        case ActionTypes.REMOVE_TOAST:
            return {
                ...state,
                toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
            };

        default:
            return state;
    }
};

export { toast, useToast, reducer, generateId, ActionTypes, TOAST_LIMIT, TOAST_REMOVE_DELAY };
