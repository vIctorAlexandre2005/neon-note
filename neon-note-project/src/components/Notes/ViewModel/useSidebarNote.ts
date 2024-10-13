import { useContextGlobal } from "@/Context";
import { useContextNoteData } from "@/Context/NoteContext";
import { useState } from "react";

export function useSidebarNote() {
    const {
        addNote, noteList,
        setTitleNote, setTextNote,
        activeNote, setActiveNote,
        onOpen, loading,
        textNote, titleNote
    } = useContextNoteData();

    const { user } = useContextGlobal();

    const [searchNotes, setSearchNotes] = useState("");

    function filterAndSortNotes(array: any[], search: string) {
        return array
            .filter((note) => {
                return note.title.toLowerCase().includes(search.toLowerCase()) || note.text.toLowerCase().includes(search.toLowerCase());
            })
            .sort((a, b) => b.date - a.date);
    };

    const filteredNotes = filterAndSortNotes(noteList, searchNotes);

    return {
        addNote, noteList,
        setTitleNote, setTextNote,
        activeNote, setActiveNote,
        onOpen, loading,
        textNote, titleNote,
        searchNotes, setSearchNotes,
        filteredNotes, user
    };
};