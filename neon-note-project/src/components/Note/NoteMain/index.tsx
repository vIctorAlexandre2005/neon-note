import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { NoteList } from "./NoteList";
import { useTheme } from "@/components/ThemeDark";

export function NoteMain() {
    const [noteList, setNoteList] = useState([]);
    const { darkMode } = useTheme();

    useEffect(() => {
        // Carregar comentários salvos do localStorage, se disponível, apenas no lado do cliente
        if (typeof window !== 'undefined' && window.localStorage) {
          const savedNotes = localStorage.getItem('notes');
          if (savedNotes) {
            setNoteList(JSON.parse(savedNotes));
          }
        }
    }, []);

    function handleSendNote(note : never) {
        const newNotes = [...noteList, note];
        setNoteList(newNotes);

        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('notes', JSON.stringify(newNotes));
        };
    };

    function handleDeleteNote(noteId: any) {
        const updatedNotes = noteList.filter((_, index) => index !== noteId);
        setNoteList(updatedNotes);
        // Atualizar os comentários salvos no localStorage após a exclusão, se disponível
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
        };
      };

      return (
        <div className={`${darkMode ? 'bg-black-900' : 'bg-neon-50'}`}>
        <NoteInput handleSendNote={handleSendNote} />
        <NoteList noteList={noteList} handleDeleteNote={handleDeleteNote} />
        </div>
    )
    }