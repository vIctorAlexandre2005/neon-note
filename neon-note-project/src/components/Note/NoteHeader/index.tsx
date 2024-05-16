import { Logout } from "@/components/Logout";
import { useTheme } from "@/components/ThemeDark"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FiToggleLeft } from "react-icons/fi";
import { IoToggleSharp } from "react-icons/io5";

export function NoteHeader() {
    const {darkMode, toggleDarkMode} = useTheme();

    return (
        <>
        <header 
        className={`
        ${darkMode ? 'bg-black-950' : 'bg-neon-300' } 
        flex 
        justify-between
        items-center
        p-6
        `}
        >
            <div className="bg-white rounded-full p-2"> {/* LOGO */}
            <img onClick={() => Logout()} src="/google.png" height={50} width={50} />
            </div>

            <div className="max-w-auto">
                <input
                className="border-none focus:border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-neon-700 w-80"
                placeholder="Pesquise suas anotações aqui"
                />
            </div>

            <div>
            <button
                  onClick={() => toggleDarkMode()}
                  className="cursor-pointer flex gap-2"
                >
                  {darkMode ? (
                    <>
                      <IoToggleSharp size={30} className="text-neon-500" />
                      <BsMoonStarsFill size={30} className="text-neon-500" />
                    </>
                  ) : (
                    <>
                      <FiToggleLeft size={30} />
                      <BsSunFill size={30} />
                    </>
                  )}
                  </button>
            </div>
        </header>
        </>
    )
}