import { create } from 'zustand';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  setShow: (show: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: 'success' | 'error' | 'info') => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const useToastState = create<ToastState>((set) => ({
  show: false,
  message: '',
  type: 'info',
  setShow: (show) => set({ show }),
  setMessage: (message) => set({ message }),
  setType: (type) => set({ type }),
  showToast: (message, type) => {
    set({ show: true, message, type });
    setTimeout(() => {
      set({ show: false, message: '', type: 'info' });
    }, 3000); // Hide toast after 3 seconds
  },
}));

export const useToast = () => {
  const { show, message, type, setShow, setMessage, setType, showToast } =
    useToastState();
  return { show, message, type, setShow, setMessage, setType, showToast };
};
export const useToastActions = () => {
  const { showToast } = useToastState();
  return { showToast };
};
export const useToastVisibility = () => {
  const { show, setShow } = useToastState();
  return { show, setShow };
};
export const useToastMessage = () => {
  const { message, setMessage } = useToastState();
  return { message, setMessage };
};
export const useToastType = () => {
  const { type, setType } = useToastState();
  return { type, setType };
};
export const useToastStateActions = () => {
  const { setShow, setMessage, setType } = useToastState();
  return { setShow, setMessage, setType };
};
export const useToastStateValues = () => {
  const { show, message, type } = useToastState();
  return { show, message, type };
};
export const useToastStateSelectors = () => {
  const { show, message, type, setShow, setMessage, setType } = useToastState();
  return { show, message, type, setShow, setMessage, setType };
};
export const useToastStateFull = () => {
  const { show, message, type, setShow, setMessage, setType, showToast } =
    useToastState();
  return { show, message, type, setShow, setMessage, setType, showToast };
};

// ToastData
export interface ToastData {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}
