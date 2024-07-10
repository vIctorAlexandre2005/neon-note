import { useTheme } from "@/components/ThemeDark";
import { Note } from "@/utils/interface";
import { NoteTextareaField } from "@/utils/modals/InputsNote/text";
import { NoteInputField } from "@/utils/modals/InputsNote/title";
import React, { useState } from "react";

interface SendNoteProps {
  handleSendNote: (newNote: Note) => void;
}

export function NoteInput({ handleSendNote }: SendNoteProps) {
  const { darkMode } = useTheme();
  const [handleNote, setHandleNote] = useState(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");

  function handleToggleNote() {
    setHandleNote(!handleNote);
  }

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitleValue(event.target.value);
  }

  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(event.target.value);
  }

  const handleSubmit = () => {
    const newNote: Note = {
      title: titleValue,
      text: textValue,
    };
    handleSendNote(newNote);
    console.log("newnote:", newNote);
    setTextValue(""); // Limpar o valor do texto após enviar
    setTitleValue(""); // Limpar o valor do título após enviar
    setHandleNote(!handleNote);
  };

  return (
    <>
      <div className="xs:p-4 sm:p-2">
        <header className={`flex mt-10 justify-center items-center`}>
          {handleNote ? (
            <>
              <div
                className={`parent-div ${darkMode ? "bg-black-950" : "bg-white"} xs:w-full md:w-5/6 lg:w-3/6 rounded-lg border border-white flex flex-col`}
              >
                <div className="transition">
                  <NoteInputField
                    value={titleValue}
                    onChange={handleChangeTitle}
                    placeholder="Título"
                    darkMode={darkMode}
                  />
                </div>

                <div className="">
                  <NoteTextareaField
                    value={textValue}
                    onChange={handleChangeText}
                    placeholder="Criar uma nota..."
                    darkMode={darkMode}
                  />
                </div>
                <div className="border border-neon-200 w-full"></div>
                <div className="flex justify-around items-center gap-4">
                  <div
                    className={`w-full hover:bg-red-500 rounded-md transition hover:text-white p-4 ${darkMode ? "text-white" : "text-black-700"}`}
                  >
                    <button className="w-full" onClick={handleToggleNote}>
                      Cancelar
                    </button>
                  </div>

                  <div
                    className={`w-full transition hover:bg-neon-600 rounded-lg hover:text-white p-4 ${darkMode ? "text-white" : "text-black-700"}`}
                  >
                    <button className="w-full" onClick={handleSubmit}>
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={handleToggleNote}
                className={`
                  border-none 
                  focus:border-2 
                  border-gray-300 
                  rounded-md
                  text-left
                  hover:bg-neon-500
                  hover:text-white
                  ${darkMode ? "bg-neon-400" : "bg-neon-100"} 
                  ${darkMode ? "text-white" : "text-black-700"}
                  px-4 
                  py-2 
                  focus:outline-none
                  focus:border-neon-700
                  w-3/6
                  xs:w-full sm:full md:w-3/6
                  transition
                `}
              >
                Crie uma anotação...
              </button>
            </>
          )}
        </header>
      </div>
    </>
  );
}
