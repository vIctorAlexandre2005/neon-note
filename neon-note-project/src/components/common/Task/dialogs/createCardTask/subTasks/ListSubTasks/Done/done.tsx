import { useContextGlobal } from '@/Context';
import { BiCheckCircle } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';

export function DoneSubTasks() {
  const { darkMode } = useContextGlobal();
  return (
    <div
      className={
        `
        flex gap-2 cursor-pointer justify-between rounded-md p-2 items-center 
        ${darkMode ? 'bg-slate-800' : 'bg-gray-200 bg-opacity-50'}
        `
      }
    >
      <h1
        className={
            `
            flex font-semibold items-center gap-2 text-lg 
            ${darkMode ? 'text-gray-100' : 'text-black-800'}
            `
        }
      >
        Concluído (17)
        <BiCheckCircle color='green' size={24} />
      </h1>
      <IoIosArrowBack size={24} />
    </div>
  );
}
