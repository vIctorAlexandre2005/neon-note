import {
  defaultValueNoteContextData,
  NoteContextData,
} from '@/Interface/NoteContext';
import { db } from '@/services/firebase';
import { useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useContextGlobal } from '..';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';

const NoteProvider = createContext<NoteContextData>(
  defaultValueNoteContextData
);

const NoteContext = ({ children }: { children: ReactNode }) => {
  const [noteList, setNoteList] = useState<any[]>([]);
  const [activeNote, setActiveNote] = useState<number | null | any>(null); // Para rastrear o ID da nota ativa

  const [isBlockEdited, setIsBlockEdited] = useState(false);

  const [titleNote, setTitleNote] = useState('');
  const [textNote, setTextNote] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const { user } = useContextGlobal();

  async function addNote(note: any) {
    // Obtém o usuário autenticado

    if (!user || !user.uid) {
      console.error('Usuário não autenticado.');
      return;
    }

    const newNote = {
      ...note,
      date: Date.now(),
      userId: user.uid, // Inclui o userId
    };

    try {
      setLoading(true);
      // Referência à subcoleção de notas do usuário
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/notes`),
        newNote
      );
      const updatedNote = { id: docRef.id, ...newNote };
      setNoteList(prev => [updatedNote, ...prev]); // Atualiza a lista de notas
      setActiveNote(docRef.id); // Define a nova nota como ativa
    } catch (e) {
      console.error('Erro ao adicionar a nota ao Firestore: ', e);
    } finally {
      setLoading(false);
    }
  }

  function selectNote(noteId: number) {
    setActiveNote(noteId);
  }

  function updateNote(id: number, updatedFields: any) {
    setNoteList(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  }

  function blockNote(id: number) {
    setIsBlockEdited(!isBlockEdited);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isBlockEdited', JSON.stringify(!isBlockEdited));
    }
  }

  useEffect(() => {
    const activeNoteData = noteList.find(note => note.id === activeNote);
    if (activeNoteData) {
      setTitleNote(activeNoteData.title);
      setTextNote(activeNoteData.text);
    }
  }, [activeNote, noteList]);

  async function deleteNote(id: string) {
    try {
      const noteRef = doc(db, `users/${user.uid}/notes`, id);
      const noteSnap = await getDoc(noteRef);

      if (!noteSnap.exists()) {
        console.error('Nota não encontrada para exclusão:', id);
        return; // Retorna se a nota não existe
      }

      // Atualiza a lista de notas no estado local antes de tentar deletar
      setNoteList(prevNotes => {
        const updatedNotes = prevNotes.filter(note => note?.id !== id);
        if (typeof window !== 'undefined') {
          localStorage.setItem('listNotes', JSON.stringify(updatedNotes));
        }
        return updatedNotes;
      });

      // Tenta excluir a nota do Firestore
      await deleteDoc(noteRef);
      console.log('Nota excluída com sucesso:', id);
      setActiveNote(null); // Desativa a nota ativa
    } catch (error) {
      console.error('Erro ao deletar a nota:', error);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveNote(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const user = getAuth().currentUser; // Obtém o usuário autenticado

      if (!user || !user.uid) {
        console.error('Usuário não autenticado.');
        return;
      }

      const parsedIsBlockEdited = localStorage.getItem('isBlockEdited');
      if (parsedIsBlockEdited) {
        setIsBlockEdited(JSON.parse(parsedIsBlockEdited));
      }

      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${user.uid}/notes`)
        );
        const notesArray: any[] = [];
        querySnapshot.forEach(doc => {
          notesArray.push({ id: doc.id, ...doc.data() });
        });
        setNoteList(notesArray);
      } catch (error) {
        console.error('Erro ao buscar as notas do Firestore:', error);
        setNoteList([]); // Se houver erro, inicializa como array vazio
      } finally {
        setLoadingNotes(false);
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
        titleNote,
        setTitleNote,
        textNote,
        setTextNote,
        selectNote,
        deleteNote,
        isOpen,
        onClose,
        onOpen,
        loading,
        isBlockEdited,
        blockNote,
        loadingNotes,
      }}
    >
      {children}
    </NoteProvider.Provider>
  );
};

export const useContextNoteData = () => useContext(NoteProvider);
export default NoteContext;
