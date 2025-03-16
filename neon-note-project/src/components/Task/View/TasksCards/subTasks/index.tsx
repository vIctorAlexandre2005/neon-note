import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useContextGlobal } from '@/Context';
import {
  BiCheckCircle,
  BiSolidCheckCircle,
  BiSolidPlusCircle,
} from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { ListSubTasks } from './ListSubTasks';
import Image from 'next/image';
import { useSubTask } from '@/components/Task/hook/useSubTask/useSubTask';

export function SubTasksTab() {
  const { listDoneSubTasks, listPendingSubTasks, nameSubTask, handleOnChange } = useSubTask();

  const { darkMode } = useContextGlobal();
  return (
    <div className={`flex flex-col overflow-auto h-80 p-2 w-full`}>
      <div className='justify-center flex gap-2 mb-8 items-center'>
        <InputComponent
          value={nameSubTask}
          onChange={handleOnChange}
          placeholder='Nome da Sub Tarefa'
          className={`
            w-full bg-transparent border p-2 text-base outline-none rounded-md
            focus:border-neon-400 hover:border-neon-300 transition duration-300
            ${darkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-black-800'}
            `}
        />
        <ButtonComponent
          className='bg-neon-400 text-base gap-2 rounded-lg hover:bg-neon-500'
          text='Criar'
          icon={<BiSolidPlusCircle size={18} />}
        />
      </div>
      <div className='w-full flex flex-col gap-4'>
        {listDoneSubTasks?.length === 0 && listPendingSubTasks?.length === 0 ? (
          <div className='flex flex-col justify-center animate-flute items-center'>
            <Image
              src={'/tasks/noSubTask.svg'}
              width={150}
              height={150}
              alt={'Sem Sub Tarefas'}
            />
            <h1 className={`text-base ${darkMode ? 'text-black-200' : 'text-black-800'}`}>
              Não há sub tarefas no momento!
            </h1>
          </div>
        ) : (
          <>
            <ListSubTasks
              titleStatusSubTasks='Concluídos'
              iconStatus={<BiSolidCheckCircle color='green' size={24} />}
              listSubTasks={listDoneSubTasks as any}
              check={true}
            />
            <ListSubTasks
              titleStatusSubTasks='Pendentes'
              iconStatus={<FaClock color='orange' size={20} />}
              listSubTasks={listPendingSubTasks as any}
            />
          </>
        )}
      </div>
    </div>
  );
}
