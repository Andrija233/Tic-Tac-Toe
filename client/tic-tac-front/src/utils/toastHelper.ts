export type ToastType = "SUCCESS" | "ERROR";

let toastCallback: ((message: string, type: ToastType) => void) | null = null;

export const setToastCallback = (
  callback: (message: string, type: ToastType) => void
) => {
  toastCallback = callback;
};

export const showToast = (message: string, type: ToastType) => {
  if (toastCallback) {
    toastCallback(message, type);
  }
};
