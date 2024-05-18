import { Logout } from "@/components/Logout";
import { useTheme } from "@/components/ThemeDark"
import { auth } from "@/services/firebase";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FiToggleLeft } from "react-icons/fi";
import { IoToggleSharp } from "react-icons/io5";


export function NoteHeader() {
  const { darkMode, toggleDarkMode } : any = useTheme(); // Remova ': any' para evitar o uso de tipo any
  const [user] = useAuthState(auth as any);

  return (
    <>
      <header
        className={`
        ${darkMode ? 'bg-black-950' : 'bg-neon-400'} 
        flex 
        justify-between
        items-center
        p-6
        `}
      >
        <div className="flex items-center gap-4">
          <div className=" bg-neon-500 border-2 border-neon-500 rounded-full">
          {user && user.photoURL && (
          <img onClick={() => Logout()} src={user.photoURL} className="rounded-full" height={50} width={50} />)}
          </div> {/* LOGO */}
          
          <h1 className="text-xl text-white xs:text-sm sm:text-xl">Seja bem vindo, {user && user.displayName} :)</h1>
        </div>

       {/*  <div className="max-w-auto">
          <input
            className={`
            border-none 
            focus:border-2 
            border-gray-300 
            rounded-md 
            ${darkMode ? 'bg-neon-500' : 'bg-white'} 
            ${darkMode ? 'text-white' : 'text-black-700'} 
            ${darkMode ? 'placeholder:text-neon-100' : 'placeholder:text-black'} 
            px-4 
            py-2 
            focus:outline-none
            focus:border-neon-700 w-80
            `}
            placeholder="Pesquise suas anotações aqui"
          />
        </div> */}

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
                <FiToggleLeft className="text-neon-100" size={30} />
                <BsSunFill className="text-neon-100" size={30} />
              </>
            )}
          </button>
        </div>
      </header>
    </>
  )
}