import { debounce } from '@/utils/debounce';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { auth, db } from '@/services/firebase';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/common/Effects/FadeIn';
import { doc, updateDoc } from 'firebase/firestore';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { InputComponent } from '@/components/common/InputField';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';
import { useDisclosure } from '@chakra-ui/react';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { OptionsHeaderNote } from './optionsHeaderNote';
import { ModalDelete } from './modalDelete';

export function NoteInput() {
  const { darkMode } = useContextGlobal();
  const {
    setTitleNote,
    setTextNote,
    noteList,
    activeNote,
    deleteNote,
    titleNote,
    textNote,
    blockNote,
    isBlockEdited,
    selectedFolderId,
  } = useContextNoteData();

  const { user } = useContextGlobal();

  const {
    open: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const activeNoteId = noteList.find(note => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const debouncedUpdateNote = debounce(
    async (id: string, updatedFields: any) => {
      setSaving(true);
      try {
        const noteRef = doc(
          db,
          `users/${user?.uid}/folders/${selectedFolderId}/notes/${id}`
        );
        const sanitizedFields: any = Object.fromEntries(
          Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
        );
        await updateDoc(noteRef, sanitizedFields);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error('Erro ao atualizar a nota:', error);
      } finally {
        setSaving(false);
      }
    },
    500
  );

  // Manipuladores de mudanças no título e texto
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitleNote(newTitle); // Atualiza o estado local imediatamente
    debouncedUpdateNote(activeNote, { title: newTitle }); // Atualiza no Firebase com debounce
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTextNote(newText); // Atualiza o estado local imediatamente
    debouncedUpdateNote(activeNote, { text: newText }); // Atualiza no Firebase com debounce
  };

  // Atualiza os campos quando a nota ativa muda
  useEffect(() => {
    if (activeNoteId) {
      setTitleNote(activeNoteId.title || '');
      setTextNote(activeNoteId.text || '');
    }
  }, [activeNote, noteList]);

  return (
    <>
      {activeNoteId && (
        <div className='flex flex-col h-full gap-4'>
          <OptionsHeaderNote
            isModalOpen={isModalOpen}
            activeNoteId={activeNoteId}
            blockNote={blockNote}
            deleteNote={deleteNote}
            isBlockEdited={isBlockEdited}
            onModalClose={onModalClose}
            onModalOpen={onModalOpen}
            saved={saved}
            saving={saving}
          />
          {/* Título */}
          <div className='flex items-center'>
            <InputComponent
              className={`
            border-none
            bg-transparent
            rounded-md 
            ${darkMode ? 'text-white' : 'text-black-800'}
            px-2 
            focus:outline-none
            placeholder:text-3xl 
            ${darkMode ? 'placeholder:opacity-50' : 'placeholder:opacity-95'}
            text-3xl
            font-semibold
            w-full
        `}
              disabled={isBlockEdited ? true : false}
              id='title'
              placeholder='Título'
              value={titleNote} // Use titleNote aqui
              onChange={handleTitleChange} // Atualiza o título
            />
          </div>

          {/* Textarea */}
          <textarea
            placeholder='Criar nota...'
            value={textNote} // Use textNote aqui
            onChange={handleTextChange}
            disabled={isBlockEdited ? true : false}
            id='text'
            className={`
        border-none
        resize-none
        mt-2
        w-full
        h-full
        bg-transparent
        px-4 
        text-lg
        py-2 
        ${darkMode ? 'text-white' : 'text-black-700'}
        placeholder:text-start
        focus:outline-none  
        ${darkMode ? 'placeholder:opacity-50' : 'placeholder:opacity-95'}
    `}
          />
        </div>
      )}
    </>
  );
}
