import { useContextNoteData } from "@/components/Context/NoteContext";
import { InputComponent } from "@/components/InputComponent";
import { useTheme } from "@/components/ThemeDark";
import { debounce } from "@/utils/debounce";
import { BiCheck, BiTrash } from "react-icons/bi";
import { auth, db } from "@/services/firebase";
import { useEffect, useState } from "react";
import FadeIn from "@/components/Effects/FadeIn";
import { doc, updateDoc } from "firebase/firestore";
import { useContextGlobal } from "@/components/Context";

export function NoteInput() {
  const { darkMode } = useTheme();
  const { setTitleNote, setTextNote, noteList, activeNote, updateNote, deleteNote, titleNote, textNote } = useContextNoteData();

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
              value={titleNote} // Use titleNote aqui
              onChange={handleTitleChange} // Atualiza o título
            />
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Criar nota..."
            value={textNote} // Use textNote aqui
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
