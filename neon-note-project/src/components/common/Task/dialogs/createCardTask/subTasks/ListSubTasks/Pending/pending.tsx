import { useContextGlobal } from '@/Context';
import { FaClock } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

export function PendingSubTasks() {
  const { darkMode } = useContextGlobal();
  return (
    <div
      className={`flex gap-2 cursor-pointer justify-between rounded-md p-2 items-center 
            ${darkMode ? 'bg-slate-800' : 'bg-gray-200 bg-opacity-50'}
        `}
    >
      <h1
        className={`
              flex font-semibold items-center gap-2 text-lg 
              ${darkMode ? 'text-gray-100' : 'text-black-800'}
            `}
      >
        Pendente (11)
        <FaClock color='orange' size={20} />
      </h1>
      <IoIosArrowBack size={24} />
    </div>
  );
}
