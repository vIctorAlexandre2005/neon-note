import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { NoteList } from "./NoteList";
import { useTheme } from "@/components/ThemeDark";
import { Note } from "@/utils/interface";

export function NoteMain() {
  const [noteList, setNoteList] = useState<Note[]>([]);
  const { darkMode } = useTheme();

  const loadNotesFromLocalStorage = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        setNoteList(JSON.parse(savedNotes));
      }
    }
  };

  useEffect(() => {
    loadNotesFromLocalStorage();
  }, []);

  const saveNotesToLocalStorage = (notes: Note[]) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  };

  const handleSendNote = (newNote: Note) => {
    const newNotes = [newNote, ...noteList];
    setNoteList(newNotes);
    saveNotesToLocalStorage(newNotes);
  };


  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = noteList.filter((_, index) => index !== noteId);
    setNoteList(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleUpdateNote = (idx: number, updatedNote: Note) => {
    const updatedNotes = noteList.map((note, index) =>
      index === idx ? { ...note, title: updatedNote.title, text: updatedNote.text } : note
    );
    setNoteList(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };


  return (
    <div className={`${darkMode ? "bg-black-900" : "bg-neon-50"}`}>
      <NoteInput handleSendNote={handleSendNote} />
      <NoteList
        noteList={noteList}
        handleDeleteNote={handleDeleteNote}
        handleUpdateNote={handleUpdateNote}
      />
    </div>
  );
}
