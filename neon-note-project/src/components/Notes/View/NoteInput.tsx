import { useTheme } from '@/components/ThemeDark';
import { debounce } from '@/utils/debounce';
import { BiCheck, BiTrash } from 'react-icons/bi';
import { auth, db } from '@/services/firebase';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/Effects/FadeIn';
import { doc, updateDoc } from 'firebase/firestore';
import { useContextNoteData } from '@/Context/NoteContext';
import { useContextGlobal } from '@/Context';
import { InputComponent } from '@/components/common/InputField';
import { TbLock, TbLockOpen2 } from 'react-icons/tb';
import { useDisclosure } from '@chakra-ui/react';
import { ModalComponent } from '@/components/Modals/modal';
import { errorToast, successToast } from '@/utils/toasts/toasts';
import { OptionsHeaderNote } from './optionsHeaderNote';

export function NoteInput() {
  const { darkMode } = useTheme();
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
  } = useContextNoteData();

  const { user } = useContextGlobal();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const activeNoteId = noteList.find(note => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false); // Inicia como falso
  const [saved, setSaved] = useState(false);

  const debouncedUpdateNote = debounce(
    async (id: string, updatedFields: any) => {
      setSaving(true); // Inicia o estado de salvamento

      try {
        // Cria a referência ao documento usando o ID da nota
        const noteRef = doc(db, 'users', user.uid, 'notes', id); // Assumindo que você está usando a estrutura correta de usuários

        // Remove campos com valores undefined
        const sanitizedFields: any = Object.fromEntries(
          Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
        );

        await updateDoc(noteRef, sanitizedFields); // Atualiza o documento no Firestore
        setSaved(true); // Marca como salvo

        // Limpa a mensagem "Salvo!" após 2 segundos
        setTimeout(() => setSaved(false), 2000);
      } catch (error) {
        console.error('Erro ao atualizar a nota:', error); // Log de erro
      } finally {
        setSaving(false); // Para o estado de salvando
      }
    },
    500
  );
  // Debounce com 500ms de atraso

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
    const activeNoteData = noteList.find(note => note.id === activeNote);
    if (activeNoteData) {
      setTitleNote(activeNoteData.title);
      setTextNote(activeNoteData.text);
    }
  }, [activeNote, noteList]);

  return (
    <>
      {activeNoteId && (
        <div className='flex flex-col h-full gap-4'>
          <OptionsHeaderNote
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
            px-4 
            py-2 
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

          {isModalOpen && (
            <ModalComponent
              onClose={onModalClose}
              isOpen={isModalOpen}
              size='md'
              isCentered
              bg={darkMode ? '#1a1a1a' : 'white'}
              w={'auto'}
            >
              <div className='p-4'>
                <p className={`text-lg ${darkMode ? 'text-white' : 'text-black-800'} font-medium`}>
                  Tem certeza que deseja excluir esta nota?
                </p>
                <div className='flex justify-center gap-4 mt-6'>
                  <button
                    className='bg-red-600 text-white w-full font-medium text-lg hover:bg-red-500 duration-300 transition-all rounded-lg p-2'
                    onClick={() => {
                      deleteNote(activeNoteId.id);
                      onModalClose();
                      successToast('Nota excluída com sucesso!');
                    }}
                  >
                    Sim
                  </button>
                  <button
                    className='bg-blue-600 text-white w-full font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2'
                    onClick={onModalClose}
                  >
                    Não
                  </button>
                </div>
              </div>
            </ModalComponent>
          )}
        </div>
      )}
    </>
  );
}
