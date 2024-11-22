import { NoteMain } from './NoteMain';
import { useTheme } from '../../ThemeDark';
import { useEffect, useState } from 'react';
import { BiArrowBack, BiCheck, BiDotsVertical, BiTrash } from 'react-icons/bi';
import { InputComponent } from '../../common/InputField';
import { debounce } from '@/utils/debounce';
import { db } from '@/services/firebase';
import FadeIn from '../../Effects/FadeIn';
import { DrawerComponent } from '../../Modals/Drawer/DrawerModal';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useContextNoteData } from '@/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { SidebarNote } from './SidebarNote';

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
    onClose,
  } = useContextNoteData();

  const { darkMode } = useTheme();
  const { isMobile, user } = useContextGlobal();

  const activeNoteId = noteList.find(note => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { selectedItem } = useContextGlobal();

  const debouncedUpdateNote = debounce(
    async (id: string, updatedFields: any) => {
      setSaving(true); // Inicia o estado de salvamento

      try {
        const noteRef = doc(db, 'users', user.uid, 'notes', id);

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
            Crie, selecione e anote!
          </h3>
        </div>
      );
  }

  if (selectedItem && !isMobile) {
    return (
      <div className='flex h-full pl-4 pt-2 gap-4'>
        <div className='md:flex-none xs:w-full md:w-80 max-h-full'>
          <SidebarNote />
        </div>

        <div className='xs:hidden w-full h-full md:block md:flex-1'>
          {activeNote ? (
            <NoteMain />
          ) : (
            <div className='flex mt-20 flex-col justify-end items-center animate-flute'>
              <img
                src='/empty.svg'
                alt='empty'
                className='object-cover'
                height={300}
                width={300}
              />
              <h3
                className={`${darkMode ? 'text-gray-300' : 'text-black-700'} text-xl mt-5`}
              >
                Lembre-se das coisas mais importantes
              </h3>
            </div>
          )}
        </div>

        {isOpen &&
          isMobile && ( // abre modal apenas no mobile
            <DrawerComponent
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
    );
  }

  if(isMobile) {
    return (
      <div className='flex h-full pl-4 pt-2 gap-4'>
        <div className='md:flex-none xs:w-full md:w-80 max-h-full'>
          <SidebarNote />
        </div>

        <div className='xs:hidden w-full md:block md:flex-1'>
          {activeNote ? (
            <NoteMain />
          ) : (
            <div className='flex mt-20 flex-col justify-end items-center animate-flute'>
              <img
                src='/empty.svg'
                alt='empty'
                className='object-cover'
                height={300}
                width={300}
              />
              <h3
                className={`${darkMode ? 'text-white' : 'text-black'} text-xl mt-5`}
              >
                Lembre-se das coisas mais importantes
              </h3>
            </div>
          )}
        </div>

        {isOpen &&
          isMobile && ( // abre modal apenas no mobile
            <DrawerComponent
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
