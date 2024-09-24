import { defaultValueNoteContextData, NoteContextData } from "@/Interface/NoteContext";
import { createContext, ReactNode, useContext, useState } from "react";

const NoteProvider = createContext<NoteContextData>(defaultValueNoteContextData);

const NoteContext = ({ children }: { children: ReactNode }) => {

    const [noteList, setNoteList] = useState<any[]>([]);
    const [activeNote, setActiveNote] = useState<number | null>(null); // Para rastrear o ID da nota ativa

    function addNote(note: any) {
        const newNote = { ...note, id: Math.random() };
        setNoteList((prevNotes) => [...prevNotes, newNote]);
        setActiveNote(newNote.id); // Define a nova nota como ativa
    }

    function selectNote(noteId: number) {
        setActiveNote(noteId);
    }

    function updateNote(id: number, updatedFields: any) {
        setNoteList((prevNotes) => 
            prevNotes.map((note) =>
                note.id === id ? { ...note, ...updatedFields } : note
            )
        );
    }

    return (
        <NoteProvider.Provider
            value={{
                noteList,
                setNoteList,
                addNote,
                activeNote,
                setActiveNote,
                updateNote,
                titleNote: "",
                setTitleNote: () => {},
                textNote: "",
                setTextNote: () => {},
                selectNote
            }}
        >
            {children}
        </NoteProvider.Provider>
    );
};

export const useContextNoteData = () => useContext(NoteProvider);
export default NoteContext;
