import { useEffect, useState } from "react";
import { NoteInput } from "./NoteInput";
import { NoteList } from "./NoteList";
import { useTheme } from "@/components/ThemeDark";
import { Note } from "@/utils/interface";

export function NoteMain() {
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [handleNote, setHandleNote] = useState<boolean>(false);
  const { darkMode } = useTheme();

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


  return (
    <div className={`${darkMode ? "bg-black-900" : "bg-neon-50"}`}>
      <NoteInput 
        handleNote={handleNote} 
        setHandleNote={setHandleNote} 
        handleSendNote={handleSendNote} 
      />
      {noteList.length === 0 && !handleNote ? (
        <div className="flex mt-20 flex-col justify-center items-center">
          <img src="/empty.svg" alt="empty" className="object-cover" height={300} width={300} />
          <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl mt-5`}>Nenhuma nota encontrada ainda.</h3>
        </div>
      ) : (
        <NoteList
          noteList={noteList}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      )}

    </div>
  );
}
