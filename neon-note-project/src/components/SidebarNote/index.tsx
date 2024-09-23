import { BiPlus } from "react-icons/bi";
import { useTheme } from "../ThemeDark";
import FadeIn from "../Effects/FadeIn";

export function SidebarNote() {
    
    const { darkMode }  = useTheme();
    
    return (
        <div className={`${darkMode ? "bg-slate-900" : "bg-neon-100"} w-full rounded-xl min-h-full p-2`}>
            <h1 className={`text-2xl mt-2 ${darkMode ? "text-white" : "text-black-900"}`}>Todas as anotações</h1>
            <div className="flex flex-col mt-3">
                <div className="flex gap-1 items-center">
                    <input
                        type="search"
                        placeholder="Busque anotações"
                        className="w-full rounded-full p-2 focus:outline-none"
                    />
                    <div>
                        <button
                            className="bg-neon-500 hover:bg-neon-600 transition duration-200 p-2 h-10 w-10 flex justify-center items-center rounded-full">
                            <BiPlus color="white" size={24} />
                        </button>
                    </div>
                </div>
                <p className={`mt-3 text-sm ${darkMode ? "text-white" : "text-black-900"}`}>Total de anotações: 10</p>
            </div>
            <FadeIn>
                ''
            </FadeIn>
        </div>
    )
}