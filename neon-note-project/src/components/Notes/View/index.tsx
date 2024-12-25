import { NoteMain } from './InputsNote/NoteMain';
import { useEffect, useState } from 'react';
import { BiArrowBack, BiCheck, BiDotsVertical, BiTrash } from 'react-icons/bi';
import { InputComponent } from '../../common/InputField';
import { debounce } from '@/utils/debounce';
import { db } from '@/services/firebase';
import FadeIn from '../../common/Effects/FadeIn';
import { DrawerToUseNote } from '../../Modals/Drawer/DrawerModal';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { SidebarNote } from './SidebarNote/SidebarNote';
import { ContainerSidebarAndNoteMain } from './SidebarNote/ContainerSidebarAndNoteMain';
import { ThereIsNoFolderMobile } from '@/components/common/ThereIsNoFolderMobile';

export function NeonNote() {
  const {
    setTitleNote,
    setTextNote,
    noteList,
    updateNote,
    deleteNote,
    titleNote,
    textNote,
    activeNote,
    isOpen,
    selectedFolderId,
    setSelectedFolderId,
    onClose,
  } = useContextNoteData();

  const { isMobile, user, darkMode } = useContextGlobal();

  const activeNoteId = noteList.find(note => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { selectedItem } = useContextNoteData();

  const debouncedUpdateNote = debounce(async (id: string, updatedFields: any) => {
      setSaving(true);
      try {
        const noteRef = doc(db, `users/${user?.uid}/folders/${selectedFolderId}/notes/${id}`);
        const sanitizedFields: any = Object.fromEntries(
          Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
        );
        await updateDoc(noteRef, sanitizedFields);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error("Erro ao atualizar a nota:", error);
      } finally {
        setSaving(false);
      }
    }, 500);

  // Funções de handle para capturar as mudanças nos inputs
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitleNote(newTitle);
    debouncedUpdateNote(activeNote, { title: newTitle }); // Atualiza no Firebase
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTextNote(newText);
    debouncedUpdateNote(activeNote, { text: newText }); // Atualiza no Firebase
  };

  useEffect(() => {
    if (activeNoteId) {
      setTitleNote(activeNoteId.title);
      setTextNote(activeNoteId.text);
    }
  }, [activeNote, noteList]);

  if (!isMobile && !selectedItem) {
    
      return (
        <div className='flex flex-col justify-end items-center animate-flute'>
          <img
            src='/noFolders.svg'
            alt='empty'
            className='object-cover mt-24'
            height={300}
            width={300}
          />
          <h3
            className={`${darkMode ? 'text-white' : 'text-black'} text-xl mt-5`}
          >
            Crie e inspire-se!
          </h3>
        </div>
      );
  }

  if (selectedItem && !isMobile) {
    return <ContainerSidebarAndNoteMain activeNote={activeNote} darkMode={darkMode} />
  };

  if(isMobile) {
    return (
      <div className='flex h-full justify-center gap-4'>
      {selectedFolderId ? (
          <div className='md:flex-none xs:w-full md:w-80 max-h-full'>
          <SidebarNote />
        </div>
        ) : (
          <ThereIsNoFolderMobile />
        )}

        {isOpen &&
          isMobile && ( // abre modal apenas no mobile
            <DrawerToUseNote
              isOpen={isOpen}
              onClose={onClose}
              activeNoteId={activeNoteId}
              titleNote={titleNote}
              textNote={textNote}
              darkMode={darkMode}
              deleteNote={deleteNote}
              saved={saved}
              saving={saving}
              updateNote={updateNote}
              handleTextChange={handleTextChange}
              handleTitleChange={handleTitleChange}
            />
          )}
      </div>
    )
  }
}
