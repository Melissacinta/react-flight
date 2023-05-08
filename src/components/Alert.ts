/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import { DefaultToastOptions, ToastType } from 'react-hot-toast';

export interface ToastOptions extends DefaultToastOptions {
  type?: ToastType;
}

export const notify = (message: string, options?: ToastOptions): string => {
  options = options || {};
  options.type = (options.type || 'custom') as ToastType;
  options.position = 'top-right';

  return toast[options.type](message, options);
};
