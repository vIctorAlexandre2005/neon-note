import { NoteHeader } from "./NoteHeader";
import { NoteMain } from "./NoteMain";
import { useTheme } from "../ThemeDark";
import { SidebarNote } from "../SidebarNote";
import { useEffect, useState } from "react";
import { useContextNoteData } from "../Context/NoteContext";
import { useContextGlobal } from "../Context";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, ModalBody, ModalHeader, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import { BiArrowBack, BiCheck, BiDotsVertical, BiTrash } from "react-icons/bi";
import { InputComponent } from "../InputComponent";
import { debounce } from "@/utils/debounce";
import { db } from "@/services/firebase";
import FadeIn from "../Effects/FadeIn";
import { DrawerComponent } from "../Modals/Drawer";
import { collection, doc, updateDoc } from "firebase/firestore";

export function NeonNote() {

  const { activeNote, isOpen, onClose } = useContextNoteData();
  const { darkMode } = useTheme();
  const { isMobile } = useContextGlobal();
  const { setTitleNote, setTextNote, noteList, updateNote, deleteNote, titleNote, textNote } = useContextNoteData();

  const { user } = useContextGlobal();

  const activeNoteId = noteList.find((note) => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false); // Inicia como falso
  const [saved, setSaved] = useState(false);

  const debouncedUpdateNote = debounce(async (id: string, updatedFields: any) => {
    setSaving(true); // Inicia o estado de salvamento

    try {
      // Cria a referência ao documento usando o ID da nota
      const noteRef = doc(db, "users", user.uid, "notes", id); // Assumindo que você está usando a estrutura correta de usuários

      // Remove campos com valores undefined
      const sanitizedFields: any = Object.fromEntries(
        Object.entries(updatedFields).filter(([_, v]) => v !== undefined)
      );

      await updateDoc(noteRef, sanitizedFields); // Atualiza o documento no Firestore
      setSaved(true); // Marca como salvo

      // Limpa a mensagem "Salvo!" após 2 segundos
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Erro ao atualizar a nota:", error); // Log de erro
    } finally {
      setSaving(false); // Para o estado de salvando
    }
  }, 500);
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
    const activeNoteData = noteList.find((note) => note.id === activeNote);
    if (activeNoteData) {
      setTitleNote(activeNoteData.title);
      setTextNote(activeNoteData.text);
    }
  }, [activeNote, noteList]);

  return (
    <div className="flex min-h-full p-4 gap-8">
      <div className="md:flex-none xs:w-full md:w-80">
        <SidebarNote />
      </div>

      {isOpen && isMobile && (
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

      <div className="xs:hidden w-full md:block md:flex-1">
        {activeNote ? (
          <NoteMain />
        ) : (
          <div className="flex mt-20 flex-col justify-end items-center">
            <img src="/empty.svg" alt="empty" className="object-cover" height={300} width={300} />
            <h3 className={`${darkMode ? "text-white" : "text-black"} text-xl mt-5`}>Nenhuma nota encontrada ainda.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
