import { Dispatch, SetStateAction } from 'react';
import { InstallPromptEvent } from './pwa';

export interface ContextData {
  user: any;
  /* installPrompt: InstallPromptEvent | null; */
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
  isMobile: boolean;
  loading: boolean;
}

export const defaultValueContextData: ContextData = {
  user: null,
  isMobile: false,
  loading: false,
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
};
