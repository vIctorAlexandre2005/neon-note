import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import { InstallPromptEvent } from "./pwa";
import { Dispatch, SetStateAction } from "react";

export interface VariablesContextType {
    user: User | null | undefined;
    installPrompt: InstallPromptEvent | null;
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    handleInstall: () => void;
    onClose: () => void;
}

export const defaultValue: VariablesContextType = {
    user: null,
    installPrompt: null,
    isOpenModal: true,
    setIsOpenModal: () => { },
    handleInstall: () => { },
    onClose: () => { },
};

export interface Note {
    title: string;
    text: string;
}

export interface ParamsNoteListProps {
    noteList: Note[];
    handleDeleteNote: (noteId: number) => void;
    handleUpdateNote: (idx: number, updatedNote: Note) => void;
}

export interface PropsEditModal {
    onClose: () => void;
    open: boolean;
    note: Note;
    onSave: (updatedNote: Note) => void;
}