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
  
  // loaders
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [loadingFolders, setLoadingFolders] = useState(true);

  const [selectedItem, setSelectedItem] = useState<string | null>('');
  const [selectedFolderId, setSelectedFolderId] = useState<number | null | string>(null);

  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  function handleItemClick(id: number, nameFolder: string) {
    console.log(id, nameFolder);
    setSelectedItem(nameFolder);

    setSelectedFolderId(id);
    setActiveNote(null);
  }

  const { user } = useContextGlobal();

  async function addNote(note: any) {
    const newNote = {
      ...note,
      date: Date.now(),
      userId: user.uid,
      folderId: selectedItem,
    };

    try {
      setLoading(true);
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/folders/${selectedFolderId}/notes`),
        newNote
      );
      const updatedNote = { id: docRef.id, ...newNote };
      setNoteList(prev => [updatedNote, ...prev]);
      setActiveNote(docRef.id);
    } catch (e) {
      console.error('Erro ao adicionar a nota ao Firestore:', e);
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
      const noteRef = doc(
        db,
        `users/${user.uid}/folders/${selectedFolderId}/notes`,
        id
      );
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
      const user = getAuth().currentUser;

      if (!user || !user.uid) {
        console.error('Usuário não autenticado.');
        return;
      }

      const notesArray: any[] = [];

      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${user.uid}/folders/${selectedFolderId}/notes`)
        );
        querySnapshot.forEach(doc => {
          notesArray.push({ id: doc.id, ...doc.data() });
        });

        // Define noteList dependendo da seleção
        console.log(selectedFolderId);
        if (selectedFolderId === 1) {
          setNoteList(notesArray);
        } else {
          setNoteList(
            notesArray.filter(note => note.itemId === selectedFolderId)
          );
        }

        console.log(
          'Notas recuperadas:',
          notesArray.filter(note => note.itemId === selectedFolderId)
        );
      } catch (error) {
        console.error('Erro ao buscar as notas do Firestore:', error);
        setNoteList([]);
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchNotes();
  }, [selectedItem]);

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
        loadingFolders,
        setLoadingFolders,
        isBlockEdited,
        blockNote,
        loadingNotes,
        filteredNotes,
        setFilteredNotes,
        handleItemClick,
        isOpenModal,
        onCloseModal,
        onOpenModal,
        selectedItem,
        setSelectedItem,
        selectedFolderId,
        setSelectedFolderId,
      }}
    >
      {children}
    </NoteProvider.Provider>
  );
};

export const useContextNoteData = () => useContext(NoteProvider);
export default NoteContext;
