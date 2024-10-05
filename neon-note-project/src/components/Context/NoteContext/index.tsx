import { defaultValueNoteContextData, NoteContextData } from "@/Interface/NoteContext";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const NoteProvider = createContext<NoteContextData>(defaultValueNoteContextData);

const NoteContext = ({ children }: { children: ReactNode }) => {

    const [noteList, setNoteList] = useState<any[]>([]);
    const [activeNote, setActiveNote] = useState<number | null>(null); // Para rastrear o ID da nota ativa

    const {isOpen, onOpen, onClose} = useDisclosure();

    function addNote(note: any) {
        const newNote = { ...note, id: Math.random(), date:  Date.now() };
        const updatedNoteList = [newNote, ...noteList];
        setNoteList(updatedNoteList);
        setActiveNote(newNote.id); // Define a nova nota como ativa

        if (typeof window !== "undefined") {
            localStorage.setItem("listNotes", JSON.stringify(updatedNoteList));
        };
    };

    function selectNote(noteId: number) {
        setActiveNote(noteId);
    };

    function updateNote(id: number, updatedFields: any) {
        setNoteList((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, ...updatedFields } : note
            )
        );

        if(typeof window !== "undefined") {
            localStorage.setItem("listNotes", JSON.stringify(noteList));
        };
    };

    function deleteNote(id: number) {
        setNoteList((prevNotes) => {
            const updatedNotes = prevNotes.filter((note) => note.id !== id);
            
            if (typeof window !== "undefined") {
                localStorage.setItem("listNotes", JSON.stringify(updatedNotes));
            }
            
            return updatedNotes;
        });
    
        setActiveNote(null);
    };

    useEffect(() => {
        const notes = localStorage.getItem("listNotes");
        if (notes) {
            try {
                const parsedNotes = JSON.parse(notes);
                if (Array.isArray(parsedNotes)) {
                    setNoteList(parsedNotes);
                } else {
                    setNoteList([]); // Se o valor não for um array, inicializa como vazio
                }
            } catch (error) {
                console.error("Erro ao parsear notas:", error);
                setNoteList([]); // Se houver erro no parse, inicializa como array vazio
            }
        }
    }, []);

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
                setTitleNote: () => { },
                textNote: "",
                setTextNote: () => { },
                selectNote,
                deleteNote,
                isOpen,
                onClose,
                onOpen
            }}
        >
            {children}
        </NoteProvider.Provider>
    );
};

export const useContextNoteData = () => useContext(NoteProvider);
export default NoteContext;
