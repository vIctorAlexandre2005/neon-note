import FadeIn from '@/components/common/Effects/FadeIn';
import {
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { truncateText } from '@/utils/truncate';
import { Fragment, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { NoteMain } from '../InputsNote/NoteMain';
import { DrawerToUseNote } from '../DrawerOpenSelectedNote/DrawerToUseNote';
import { useContextNoteData } from '../../Context/NoteContext';
import { doc, updateDoc } from 'firebase/firestore';
import { debounce } from '@/utils/debounce';
import { db } from '@/services/firebase';
import { useContextGlobal } from '@/Context';
import { useDisclosure } from '@chakra-ui/react';
import { useNoteMain } from '../../ViewModel/useNoteMain';

interface Props {
  activeNote: any;
  handleSelectNote: (note: any) => void;
  onOpen: () => void;
  darkMode: boolean;
  moveNote: (fromIndex: any, toIndex: any) => void;
  note: any;
  index: any;
}

const ItemType = {
  NOTE: 'note',
};

export function CardNotes({
  activeNote,
  handleSelectNote,
  onOpen,
  darkMode,
  moveNote,
  note,
  index,
}: Props) {
  const [, ref] = useDrag({
    type: ItemType.NOTE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.NOTE,
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveNote(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const { user } = useContextGlobal()

  const {
      setTitleNote,
      setTextNote,
      noteList,
      deleteNote,
      titleNote,
      textNote,
      blockNote,
      isBlockEdited,
      selectedFolderId,
      updateNote
    } = useContextNoteData();

    const {
      open: isOpenDrawerCardNote,
      onOpen: onOpenDrawerCardNote,
      onClose: onCloseDrawerCardNote
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

    const { isMobile } = useNoteMain();

  return (
    <>
      <FadeIn key={note.id}>
        <Fragment key={index}>
          <DrawerRoot open={isOpenDrawerCardNote} size={'full'}>
            <DrawerTrigger w={'full'} textAlign={'left'}>
              <div
                ref={node => {
                  if (node !== null) {
                    ref(drop(node));
                  }
                }}
                onClick={() => {
                  handleSelectNote(note);
                  isMobile && onOpenDrawerCardNote();
                }}
                className={`
                  ${activeNote === note.id ? 'bg-neon-500' : darkMode ? 'bg-neon-800' : 'bg-neon-400'} w-full rounded-xl p-2 cursor-pointer
                `}
              >
                {note.title && (
                  <h2
                    className={`text-white text-xl mb-2 font-bold ${darkMode ? 'opacity-96' : ''}`}
                  >
                    {truncateText(note.title, 28)}
                  </h2>
                )}

                {note.text && (
                  <p
                    className={`text-white text-base text-opacity-80 ${darkMode ? 'opacity-96' : ''}`}
                  >
                    {truncateText(note.text, 55)}
                  </p>
                )}
                <div className='mt-4 flex justify-end'>
                  <p
                    className={`
                text-xs
                ${darkMode ? 'text-white opacity-60' : 'text-white opacity-60'} 
                `}
                  >
                    Criada em {new Date(note.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </DrawerTrigger>
              <DrawerToUseNote 
                activeNoteId={activeNoteId}
                darkMode={darkMode}
                deleteNote={deleteNote}
                handleTextChange={handleTextChange}
                handleTitleChange={handleTitleChange}
                saved={saved}
                saving={saving}
                textNote={textNote}
                titleNote={titleNote}
                updateNote={updateNote}
                isOpen={isOpenDrawerCardNote}
                onClose={onCloseDrawerCardNote}
              />
          </DrawerRoot>
        </Fragment>
      </FadeIn>
    </>
  );
}
