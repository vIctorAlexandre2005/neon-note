import FadeIn from "@/components/Effects/FadeIn";
import { InputComponent } from "@/components/InputComponent";
import { Drawer, DrawerContent } from "@chakra-ui/react";
import { BiArrowBack, BiCheck, BiTrash } from "react-icons/bi";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    darkMode: boolean;
    activeNoteId: any;
    saving: boolean;
    saved: boolean;
    deleteNote: (id: any) => void;
    updateNote: (id: number, updatedFields: any) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    titleNote: string;
    textNote: string;
}

export function DrawerComponent({ 
    isOpen, onClose, 
    darkMode, activeNoteId, 
    saving, saved, 
    deleteNote, updateNote, 
    handleTextChange, handleTitleChange,
    titleNote, textNote
}: DrawerProps) {
    return (
        <Drawer isOpen={isOpen} onEsc={onClose} closeOnEsc placement="left" size={"full"} onClose={onClose}>
          <DrawerContent bg={darkMode ? "#0f172a" : "#d2e8ff"}>
          {activeNoteId && (
        <div className="flex flex-col h-full gap-4">
          <div className="flex p-4 justify-between items-center">

            <button onClick={onClose}>
              <BiArrowBack size={24} color={darkMode ? "white" : "black"} />
            </button>

            <div className="flex gap-2 items-center justify-start">
              {!saving && saved && (
                <>
                  <FadeIn>
                  <div className="flex gap-1 items-center">
                  <p className="text-white">Salvo</p> <BiCheck size={24} className="text-green-400" />
                  </div>
                  </FadeIn>
                </>
              )}
            </div>
            <div className="flex gap-2 items-center justify-end">
              <button
                className={`${darkMode ? "text-white hover:text-red-500 duration-200 transition-all" : "text-black-800 hover:text-red-500 duration-200 transition-all"}`}
                onClick={() => {
                  deleteNote(activeNoteId.id);
                  onClose();
                }}
              >
                <BiTrash size={24} />
              </button>
            </div>
          </div>
          {/* Título */}
          <div className="flex items-center">
            <InputComponent
              className={`
                border-none
                bg-transparent
                rounded-md 
                ${darkMode ? "text-white" : "text-black-800"}
                px-4 
                py-2 
                focus:outline-none
                placeholder:text-3xl 
                ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
                text-3xl
                font-semibold
                w-full
              `}
              placeholder="Título"
              value={titleNote}
              onChange={handleTitleChange} // Atualiza o título
            />
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Criar nota..."
            value={textNote}
            onChange={handleTextChange}
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
                ${darkMode ? "text-white" : "text-black-700"}
                placeholder:text-start
                focus:outline-none  
                ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
              `}
          />
        </div>
      )}
          </DrawerContent>
        </Drawer>
    )
}