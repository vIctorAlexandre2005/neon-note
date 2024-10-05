import { NoteHeader } from "./NoteHeader";
import { NoteMain } from "./NoteMain";
import { useTheme } from "../ThemeDark";
import { SidebarNote } from "../SidebarNote";
import { useEffect, useState } from "react";
import { useContextNoteData } from "../Context/NoteContext";
import { useContextGlobal } from "../Context";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, ModalBody, ModalHeader, Popover, PopoverAnchor, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import { BiArrowBack, BiDotsVertical, BiTrash } from "react-icons/bi";
import { InputComponent } from "../InputComponent";

export function NeonNote() {

  const { activeNote, isOpen, onClose } = useContextNoteData();
  const { darkMode } = useTheme();
  const { isMobile } = useContextGlobal();
  const { isOpen: isOpenPopover, onOpen: onOpenPopover, onClose: onClosePopover } = useDisclosure();

  const { setTitleNote, setTextNote, noteList, updateNote, deleteNote } = useContextNoteData();

  const activeNoteId = noteList.find((note) => note.id === activeNote); // Encontra a nota ativa

  // Funções de handle para capturar as mudanças nos inputs
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleNote(e.target.value);
    updateNote(activeNote, { title: e.target.value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextNote(e.target.value);
    updateNote(activeNote, { text: e.target.value });
  };

  return (
    <div className="flex min-h-full p-4 gap-8">
      <div className="md:flex-none xs:w-full md:w-80">
        <SidebarNote />
      </div>

      {isOpen && isMobile && (
        <Drawer isOpen={isOpen} onEsc={onClose} closeOnEsc placement="left" size={"full"} onClose={onClose}>
          <DrawerContent bg={darkMode ? "#0f172a" : "#d2e8ff"}>
            {activeNoteId && (
              <div className="flex flex-col h-full">
                <ModalHeader>
                  <div className="flex items-center justify-between">

                    <button onClick={onClose}>
                      <BiArrowBack size={20} color={darkMode ? "#d2e8ff" : "#0f172a"} />
                    </button>

                    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
                      <PopoverTrigger>
                        <button onClick={onOpenPopover}>
                          <BiDotsVertical size={20} color={darkMode ? "#d2e8ff" : "#0f172a"} />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent w={"fit-content"} bg={darkMode ? "#1e293b" : "#d2e8ff"}>
                        <PopoverBody>
                          <button
                            className={` flex gap-2 text-base items-center ${darkMode ? "text-white hover:text-red-500 duration-200 transition-all" : "text-black-800 hover:text-red-500 duration-200 transition-all"}`}
                            onClick={() => {
                              deleteNote(activeNoteId.id);
                              onClosePopover();
                              onClose();
                            }}
                          >
                            Excluir <BiTrash size={20} />
                          </button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </div>
                </ModalHeader>

                <ModalBody onClick={onClosePopover}>

                  <InputComponent
                    className={`
                border-none
                bg-transparent
                rounded-md 
                ${darkMode ? "text-white" : "text-black-800"}
                xs:px-2 md:px-4 
                xs:py-0 md:py-2 
                focus:outline-none
                xs:placeholder:text-xl   md:placeholder:text-3xl 
                ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
                xs:text-xl md:text-3xl
                font-semibold
                w-full
              `}
                    placeholder="Título"
                    value={activeNoteId.title}
                    onChange={handleTitleChange}
                  />

                  <textarea
                    placeholder="Criar nota..."
                    value={activeNoteId.text}
                    onChange={handleTextChange}
                    className={`
                border-none
                resize-none
                mt-2
                w-full
                h-full
                bg-transparent
                xs:px-2 md:px-4 
                xs:py-0 md:py-2
                xs:text-sm md:text-lg
                ${darkMode ? "text-white" : "text-black-700"}
                placeholder:text-start
                focus:outline-none  
                ${darkMode ? "placeholder:opacity-50" : "placeholder:opacity-95"}
              `}
                  />
                </ModalBody>
              </div>
            )}
          </DrawerContent>
        </Drawer>
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
