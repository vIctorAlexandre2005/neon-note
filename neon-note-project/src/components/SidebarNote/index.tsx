import { BiPlus } from "react-icons/bi";
import { useTheme } from "../ThemeDark";
import FadeIn from "../Effects/FadeIn";
import { useContextNoteData } from "../Context/NoteContext";
import { Fragment } from "react";
import { truncateText } from "@/utils/truncate";

export function SidebarNote() {
  const { darkMode } = useTheme();
  const { addNote, noteList, setTitleNote, setTextNote, activeNote, setActiveNote } = useContextNoteData();

  const handleSelectNote = (note: any) => {
    setTitleNote(note.title);  // Carrega o título no campo de input
    setTextNote(note.text);    // Carrega o texto no campo de textarea
    setActiveNote(note.id);  // Define a nota clicada como ativa
  };

  return (
    <div className={`${darkMode ? "bg-slate-900" : "bg-neon-100"} max-h-96 overflow-auto w-full rounded-xl min-h-full p-2`}>
      <h1 className={`text-2xl mt-2 ${darkMode ? "text-white text-opacity-80" : "text-black-900"}`}>Todas as anotações</h1>
      <div className="flex flex-col mt-3">
        <div className="flex gap-1 items-center">
          <input
            type="search"
            placeholder="Pesquisar anotações"
            className={`w-full rounded-full ${darkMode ? "placeholder:text-white" : "placeholder:text-black-900"} text-white text-opacity-80 placeholder:opacity-30 p-2 focus:outline-none ${darkMode ? 'bg-opacity-5' : 'bg-opacity-70'} bg-white`}
          />
          <div>
            <button
              onClick={() => {
                addNote({ title: "", text: "", id: Math.random() }); // Adiciona uma nova nota vazia
              }}
              className="bg-neon-500 hover:bg-neon-600 transition duration-200 p-2 h-10 w-10 flex justify-center items-center rounded-full"
            >
              <BiPlus color="white" size={24} />
            </button>

          </div>
        </div>
        <p className={`mt-3 text-sm ${darkMode ? "text-white" : "text-black-900"} opacity-60`}>Total de anotações: {noteList.length}</p>
      </div>
      <div className="flex flex-col mt-3 gap-4">
        {noteList.map((note: any, index) => (
          <FadeIn key={note.id}>
            <Fragment>
            <div
        onClick={() => {
          handleSelectNote(note);
        }}
        className={`
          ${activeNote === note.id ? "border-2 border-neon-500 border-opacity-40" : ""}  // Estilo condicional para o card ativo
          ${darkMode ? "bg-neon-950" : "bg-neon-400"}
          w-full rounded-xl p-2 cursor-pointer
        `}
      >
        {note.title ? (
          <h2 className={`text-white text-2xl mb-2 font-bold ${darkMode ? 'opacity-96' : ''}`}>
          {truncateText(note.title, 16)}
        </h2>
        ) : (
          <h2 className={`text-white text-2xl mb-2 font-bold ${darkMode ? 'opacity-30' : ''}`}>
          Sem título
        </h2>
        )}
        
        {note.text ? (
          <p
            className={`text-white text-opacity-80 ${darkMode ? 'opacity-96' : ''}`}
          >
            {truncateText(note.text, 60)}
          </p>
        ) : (
          <p
            className={`text-white text-opacity-80 ${darkMode ? 'opacity-30' : ''}`}
          >
            Sem texto
          </p>
        )}
      </div>
            </Fragment>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
