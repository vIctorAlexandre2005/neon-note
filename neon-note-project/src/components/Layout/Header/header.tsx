import { useContextGlobal } from "@/components/Context";
import { Logout } from "@/components/Logout";
import { useTheme } from "@/components/ThemeDark";
import { handleSignin } from "@/utils/login";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FiToggleLeft } from "react-icons/fi";
import { IoToggleSharp } from "react-icons/io5";

export function NoteHeader() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useContextGlobal();

  return (
    <>
      <header
        className={`
        ${darkMode ? "bg-slate-950" : "bg-neon-50"} 
        flex 
        justify-between
        items-center
        border-b-2
        border-neon-400
        p-4
        `}
      >
        <div className="flex items-center gap-4">
          {user ? (
            <div className=" bg-neon-500 border-2 border-neon-500 rounded-full">
              {user && user?.photoURL && (
                <img
                  onClick={() => Logout()}
                  src={user?.photoURL}
                  className="rounded-full object-cover"
                  height={50}
                  width={50}
                />
              )}
            </div>
          ) : (
            <button
              onClick={handleSignin}
              className="bg-neon-500 flex items-center gap-2 text-white p-2 hover:bg-neon-600 hover:transition duration-200 rounded-full"
            >
              Faça login com <img src="/google.png" height={25} width={25} />
            </button>
          )}

          <h1 className="text-xl font-bold text-white xs:text-sm sm:text-xl">
            {user?.displayName}
          </h1>
        </div>

        <div>
          <button
            data-testid="dark-mode-toggle"
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
  );
}
