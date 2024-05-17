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
        setTextValue(event.target.value);
    };

    const handleSubmit = () => {
        if (textValue.trim() !== '' && titleValue.trim() !== '') {
          handleSendNote([titleValue, textValue]);
          setTextValue('');
          setTitleValue('');
          setHandleNote(!handleNote)
        } else {
          alert('Você não pode enviar um comentário vazio');
        }
    };

    return (
        <>
        <div>
            <header className={`flex mt-10 justify-center items-center`}> {/* HEADER */}
          {handleNote ? (
            <>
            <div className={`parent-div ${darkMode ? 'bg-black-950' : 'bg-white'} w-3/6	 rounded-lg border border-white flex flex-col h-100 max-h-100`}>
    <div className=""> {/* TITLE */}
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
        <div className="hover:bg-red-500 w-full p-4 text-white">
        <button className="w-full" onClick={handleToggleNote}>
            Cancelar
        </button>
        </div>

        <div className="w-full hover:bg-neon-500 p-4 text-white">
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
            w-2/6
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