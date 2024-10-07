import { auth, provider } from "@/services/firebase";
import { BsMoonStars, BsMoonStarsFill, BsSun, BsSunFill } from "react-icons/bs";
import { IoToggle, IoToggleSharp } from "react-icons/io5";
import { FiToggleLeft } from "react-icons/fi";
import { useTheme } from "../ThemeDark";
import { handleSignin } from "@/utils/login";

export function LoginComponent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <div
        className={`
      min-h-screen 
      flex 
      justify-center 
      items-center 
      ${darkMode ? "bg-slate-900" : "bg-neon-50"}
      `}
      >
        <div className="container p-1">
          <div className="flex justify-center items-center">
            <div
              className={`
          formcontainer
          flex flex-col
          rounded-xl xs:w-full md:w-3/6
          ${darkMode ? "bg-slate-800" : "bg-neon-100"}
          shadow-lg
          `}
            >
              <header className="text-center p-4 justify-between flex gap-8">
                <h2 className="text-neon-500 text-2xl font-bold">
                  Faça o login
                </h2>
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
              </header>
              <div className="p-8 flex-col flex items-center justiy-center">
                <img className="object-fit-cover" src="/login.svg" height={180} width={180} />
                <div className="flex items-center mt-6 justify-center w-full">
                  <button
                    onClick={handleSignin}
                    className="
              flex
              items-center
              justify-center
              bg-black-900 
              hover:bg-neon-600 
              w-full
              text-white 
              font-bold 
              py-2 
              px-4 
              focus:outline-none 
              focus:shadow-outline
              gap-2
              text-md
              transition
              duration-300
              "
                  >
                    Continue com
                    <div className="">
                      <img src="/google.png" height={20} width={20} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
