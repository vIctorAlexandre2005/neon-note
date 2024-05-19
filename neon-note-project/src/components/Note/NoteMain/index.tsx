import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { NoteList } from "./NoteList";
import { useTheme } from "@/components/ThemeDark";

interface Note {
    // Defina aqui a estrutura de uma nota
    // Por exemplo:
    id: number;
    title: string;
    content: string;
    newNotes: any
}

export function NoteMain() {
    const [noteList, setNoteList] = useState<any[]>([]);
    const { darkMode } : any = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          const savedNotes = localStorage.getItem('notes');
          if (savedNotes) {
            setNoteList(JSON.parse(savedNotes));
          }
        }
    }, []);

    function handleSendNote(newNote : any) {
        const newNotes = [...noteList, newNote];
        setNoteList(newNotes);
        console.log("New Notes:", newNotes);

        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('notes', JSON.stringify(newNotes));
        }
    }

    function handleDeleteNote(noteId: any) {
        const updatedNotes = noteList.filter((_, index) => index !== noteId);
        setNoteList(updatedNotes);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
    }

    function handleUpdateNote(idx: number, newTitle: string, newText: string) {
        const updatedNotes = noteList.map((note, index) =>
            index === idx ? [newTitle, newText] : note
        );
        setNoteList(updatedNotes);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
    }

    return (
        <div className={`${darkMode ? 'bg-black-900' : 'bg-neon-50'} h-max`}>
            <NoteInput handleSendNote={handleSendNote} />
            <NoteList noteList={noteList} handleDeleteNote={handleDeleteNote} handleUpdateNote={handleUpdateNote} />
        </div>
    )
}
