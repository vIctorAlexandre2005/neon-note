import { RiFolderCloseFill } from "react-icons/ri";
import { HashLoader } from "react-spinners";
import { useContextGlobal } from "@/Context";

export function ThereIsNoFolder() {

const { darkMode } = useContextGlobal();
  return (
    <div
      className={`flex flex-col gap-1 items-center p-2 ${darkMode ? 'text-neon-800 opacity-80' : 'text-black-600'}`}
    >
      <RiFolderCloseFill size={50} />
      <div className='flex gap-2 items-center'>
        <h1
          className={`text-md font-semibold ${darkMode ? 'text-black-300' : 'text-black-600'}`}
        >
          Nenhuma pasta encontrada
        </h1>
        <HashLoader size={24} color={darkMode ? '#042488' : '#0949ee'} />
      </div>
    </div>
  );
}
