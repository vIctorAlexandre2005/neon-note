import { useContextNoteData } from "@/components/Context/NoteContext";
import { InputComponent } from "@/components/InputComponent";
import { useTheme } from "@/components/ThemeDark";
import { debounce } from "@/utils/debounce";
import { BiCheck, BiTrash } from "react-icons/bi";
import { db } from "@/services/firebase";
import { useState } from "react";
import FadeIn from "@/components/Effects/FadeIn";

export function NoteInput() {
  const { darkMode } = useTheme();
  const { setTitleNote, setTextNote, noteList, activeNote, updateNote, deleteNote } = useContextNoteData();

  const activeNoteId = noteList.find((note) => note.id === activeNote); // Encontra a nota ativa
  const [saving, setSaving] = useState(false); // Inicia como falso
  const [saved, setSaved] = useState(false);

  const debouncedUpdateNote = debounce((id: number, updatedFields: any) => {
    setSaving(true); // Define saving como verdadeiro antes de tentar atualizar
    const noteRef = db.collection("notes").doc(id.toString()); // Supondo que 'id' seja a chave do documento
    noteRef.update(updatedFields)
      .then(() => {
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // Limpa a mensagem "Salvo!" após 2 segundos
      })
      .catch((error) => {
        console.error("Erro ao atualizar a nota:", error);
        setSaving(false); // Se houver erro, não esqueça de parar o estado de salvando
      });
  }, 500);  // Debounce com 500ms de atraso

  // Funções de handle para capturar as mudanças nos inputs
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleNote(e.target.value);
    updateNote(activeNote, { title: e.target.value }); // Atualiza no estado local
    debouncedUpdateNote(activeNote, { title: e.target.value }); // Atualiza no Firebase
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextNote(e.target.value);
    updateNote(activeNote, { text: e.target.value }); // Atualiza no estado local
    debouncedUpdateNote(activeNote, { text: e.target.value }); // Atualiza no Firebase
  };

  return (
    <>
      {activeNoteId && (
        <div className="flex flex-col h-full gap-4">
          <div className="flex justify-between items-center">
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
                onClick={() => deleteNote(activeNoteId.id)}
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
              value={activeNoteId.title}
              onChange={handleTitleChange} // Atualiza o título
            />
          </div>

          {/* Textarea */}
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
