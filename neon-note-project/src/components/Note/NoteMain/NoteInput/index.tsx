import { useTheme } from "@/components/ThemeDark";
import { useRouter } from "next/router";
import { useState } from "react";

export function NoteInput({ handleSendNote } : any) {
    const { darkMode } : any = useTheme();
    const [handleNote, setHandleNote] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const [textValue, setTextValue] = useState('');

    function handleToggleNote() {
        setHandleNote(!handleNote)
    };

    function handleChangeTitle(event: any) {
        setTitleValue(event.target.value);
    }

    function handleChangeText(event: any) {
        setTextValue(event.target.value)
    };

    const handleSubmit = () => {
        if (textValue.trim() !== '' || titleValue.trim() !== '') {
            const newNote = [titleValue, textValue];
          handleSendNote(newNote);
          console.log([titleValue, textValue])
          setTextValue('');
          setTitleValue('');
          setHandleNote(!handleNote)
        } else {
          alert('Você não pode enviar um comentário vazio');
        }
    };

    return (
        <>
        <div className="xs:p-4 sm:p-2">
            <header className={`flex mt-10 justify-center items-center`}> {/* HEADER */}
          {handleNote ? (
            <>
            <div className={`parent-div ${darkMode ? 'bg-black-950' : 'bg-white'} xs:w-full md:w-5/6 lg:w-3/6 rounded-lg border border-white flex flex-col`}>
    <div className="transition"> {/* TITLE */}
        <input
            className={`
                border-none
                rounded-md 
                ${darkMode ? 'bg-black-950' : 'bg-white'} 
                ${darkMode ? 'text-white' : 'text-black-700'} 
                ${darkMode ? 'placeholder:text-neon-100' : 'placeholder:text-black'} 
                px-4 
                py-2 
                focus:outline-none
                placeholder:text-2xl
                text-2xl
                w-full
            `}
            placeholder="Título"
            value={titleValue}
            onChange={handleChangeTitle}
        />
    </div>

    <div className=""> {/* NOTE */}
        <textarea
            className={`
                border-none
                rounded-md 
                ${darkMode ? 'bg-black-950' : 'bg-white'} 
                ${darkMode ? 'text-white' : 'text-black-700'} 
                ${darkMode ? 'placeholder:text-neon-100' : 'placeholder:text-black'} 
                px-4 
                py-2 
                focus:outline-none
                w-full
                resize-none
                h-60
            `}
            value={textValue}
            onChange={handleChangeText}
            placeholder="Criar uma nota..."
        />
    </div>
    <div className="border border-neon-200 w-full"></div>
    <div className="flex justify-around items-center gap-4">
        <div className={`w-full hover:bg-red-500 rounded-md transition hover:text-white p-4 ${darkMode ? 'text-white' : 'text-black-700'}`}>
        <button className="w-full" onClick={handleToggleNote}>
            Cancelar
        </button>
        </div>

        <div className={`w-full transition hover:bg-neon-600 rounded-lg hover:text-white p-4 ${darkMode ? 'text-white' : 'text-black-700'}`}>
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
            ${darkMode ? 'bg-neon-400' : 'bg-neon-100'} 
            ${darkMode ? 'text-white' : 'text-black-700'}
            px-4 
            py-2 
            focus:outline-none
            focus:border-neon-700
            w-3/6
            xs:w-full sm:full md:w-3/6
            transition
            `}>
                Crie uma anotação...
          </button>
            </>
          )}
            </header> {/* HEADER */}
        </div>
        </>
    )
}