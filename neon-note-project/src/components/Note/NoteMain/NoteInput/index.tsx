import { useContextNoteData } from "@/components/Context/NoteContext";
import { InputComponent } from "@/components/InputComponent";
import { useTheme } from "@/components/ThemeDark";

export function NoteInput() {
  const { darkMode } = useTheme();
  const { setTitleNote, setTextNote, noteList, activeNote, updateNote } = useContextNoteData();

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
    <>
      {activeNoteId && (
        <div className="xs:p-4 sm:p-0 h-full flex gap-4 flex-col">
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
          value={activeNoteId.title}
          onChange={handleTitleChange} // Atualiza o título
        />
        <textarea
          placeholder="Criar nota..."
          value={activeNoteId.text}
          onChange={handleTextChange} // Atualiza o conteúdo da nota
          className={`
            border-none
            resize-none
            bg-transparent
            w-full
            h-full
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
    </>
  );
}
