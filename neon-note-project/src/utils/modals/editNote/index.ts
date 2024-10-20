import { Dispatch, SetStateAction } from 'react';

export interface PropsEditModal {
  onSave: (newTitle: string, newText: string) => void;
  open: boolean;
  onClose: () => void;
  item: string;
  item2: string;
  note: string;
  title: string;
  text: string;
}

export interface PropsModalEdit {
  open: boolean;
  onClose: () => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  handleSave: () => void;
}
