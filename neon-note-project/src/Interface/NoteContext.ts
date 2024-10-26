import { Dispatch, SetStateAction } from 'react';
import { InstallPromptEvent } from './pwa';

interface PropsNoteList {
  title: string;
  text: string;
  id: number;
  date: number;
  folderId: string;
}
export interface NoteContextData {
  noteList: PropsNoteList[];
  loadingNotes: boolean;
  setNoteList: Dispatch<SetStateAction<PropsNoteList[]>>;
  addNote: (note: any) => void;
  titleNote: string;
  setTitleNote: Dispatch<SetStateAction<string>>;
  textNote: string;
  setTextNote: Dispatch<SetStateAction<string>>;
  activeNote: any;
  setActiveNote: Dispatch<SetStateAction<any>>;
  selectNote: (noteId: number) => void;
  updateNote: (noteId: number, updatedFields: any) => void;
  deleteNote: (id: any) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  loading: boolean;
  isBlockEdited: boolean;
  blockNote: (id: number) => void;
}

export const defaultValueNoteContextData: NoteContextData = {
  noteList: [],
  setNoteList: () => {},
  addNote: () => {},
  titleNote: '',
  setTitleNote: () => {},
  textNote: '',
  setTextNote: () => {},
  activeNote: {},
  setActiveNote: () => {},
  selectNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  loading: false,
  isBlockEdited: false,
  blockNote: () => {},
  loadingNotes: true,
};
