import { Dispatch, SetStateAction } from 'react';
import { InstallPromptEvent } from './pwa';

export interface ContextData {
  user: any;
  /* installPrompt: InstallPromptEvent | null; */
  isMobile: boolean;
  loading: boolean;
  selectedItem: string | null;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  handleItemClick: (id: number, nameFolder: string) => void;
  selectedFolderId: number | null | string;
  setSelectedFolderId: (folderId: string | number | null | any) => void;
}

export const defaultValueContextData: ContextData = {
  user: null,
  isMobile: false,
  loading: false,
  selectedItem: '',
  handleItemClick(name) {
    console.log(name);
  },
  setSelectedItem: () => {},
  selectedFolderId: null,
  setSelectedFolderId: () => {}
};
