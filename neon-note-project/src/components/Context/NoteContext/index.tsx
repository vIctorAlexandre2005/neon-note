import { defaultValueNoteContextData, NoteContextData } from "@/Interface/NoteContext";
import { db } from "@/services/firebase";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";

const NoteProvider = createContext<NoteContextData>(defaultValueNoteContextData);

const NoteContext = ({ children }: { children: ReactNode }) => {

    const [noteList, setNoteList] = useState<any[]>([]);
    const [activeNote, setActiveNote] = useState<number | null | any>(null); // Para rastrear o ID da nota ativa

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    /* function addNote(note: any) {
        const newNote = { ...note, id: Math.random(), date:  Date.now() };
        const updatedNoteList = [newNote, ...noteList];
        setNoteList(updatedNoteList);
        setActiveNote(newNote.id); // Define a nova nota como ativa

        if (typeof window !== "undefined") {
            localStorage.setItem("listNotes", JSON.stringify(updatedNoteList));
        };

        
    }; */

    async function addNote(note: any) {
        const newNote = { ...note, date: Date.now() }; // Não inclua o id aqui
        try {
            setLoading(true);
            // Adiciona a nota ao Firestore e obtém o documento adicionado
            const docRef = await addDoc(collection(db, "notes"), newNote);
            // Atualiza o ID da nova nota com o ID gerado pelo Firestore
            const updatedNote = { id: docRef.id, ...newNote };
            setNoteList((prev) => [updatedNote, ...prev]); // Atualiza a lista de notas
            setActiveNote(docRef?.id); // Define a nova nota como ativa
        } catch (e) {
            console.error("Erro ao adicionar a nota ao Firestore: ", e);
        } finally {
            setLoading(false);
        }
    }
    

    function selectNote(noteId: number) {
        setActiveNote(noteId);
    };

    function updateNote(id: number, updatedFields: any) {
        setNoteList((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, ...updatedFields } : note
            )
        );

        /* if(typeof window !== "undefined") {
            localStorage.setItem("listNotes", JSON.stringify(noteList))
        }; */
    };

    async function deleteNote(id: string) {
        try {
            const noteRef = doc(db, "notes", id);
            const noteSnap = await getDoc(noteRef);
    
            if (!noteSnap.exists()) {
                console.error("Nota não encontrada para exclusão:", id);
                return; // Retorna se a nota não existe
            }
    
            // Atualiza a lista de notas no estado local antes de tentar deletar
            setNoteList((prevNotes) => {
                const updatedNotes = prevNotes.filter((note) => note?.id !== id);
                if (typeof window !== "undefined") {
                    localStorage.setItem("listNotes", JSON.stringify(updatedNotes));
                }
                return updatedNotes;
            });
    
            // Tenta excluir a nota do Firestore
            await deleteDoc(noteRef);
            console.log("Nota excluída com sucesso:", id);
            setActiveNote(null); // Desativa a nota ativa
        } catch (error) {
            console.error("Erro ao deletar a nota:", error);
        }
    }
    


    /* useEffect(() => {
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
            };
        }
    }, []); */

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "notes"));
                const notesArray: any[] = [];
                querySnapshot.forEach((doc) => {
                    notesArray.push({ id: doc.id, ...doc.data() });
                });
                setNoteList(notesArray);
            } catch (error) {
                console.error("Erro ao buscar as notas do Firestore:", error);
                setNoteList([]);  // Se houver erro, inicializa como array vazio
            }
        };

        fetchNotes();
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
                onOpen,
                loading,
            }}
        >
            {children}
        </NoteProvider.Provider>
    );
};

export const useContextNoteData = () => useContext(NoteProvider);
export default NoteContext;
