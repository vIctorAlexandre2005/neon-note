import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useContextGlobal } from '@/Context';
import { BiCheckCircle, BiSolidCheckCircle, BiSolidPlusCircle } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { ListSubTasks } from './ListSubTasks';

export function SubTasksTab() {

  const dataDoneSubTasks = [
    {
      title: 'Criar CRUD',
    },
    {
      title: 'Apagar a luz',
    },
    {
      title: 'Pagar telefone',
    },
    {
      title: 'Ficar maluco!',
    },
    {
      title: 'Só rindo de vocês mesmo',
    },
  ];

  const dataPendingSubTasks = [
    {
      title: 'Finalizar algo',
    },
    {
      title: 'Beber agua',
    },
    {
      title: 'Tomar açai',
    },
    {
      title: 'Ficar maluco!',
    },
    {
      title: 'Ficar de papin gostoso',
    },
    {
      title: 'Ficar de rolo gostoso',
    },
  ];

  const { darkMode } = useContextGlobal();
  return (
    <div className={`flex flex-col overflow-auto h-80 p-2 w-full`}>
      <div className='justify-center flex gap-2 mb-8 items-center'>
        <InputComponent
          placeholder='Nome da Sub Tarefa'
          className={
            `
            w-full bg-transparent border p-2 text-base outline-none rounded-md
            focus:border-neon-400 hover:border-neon-300 transition duration-300
            ${darkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-black-800'}
            `
          } 
        />
        <ButtonComponent
          className='bg-neon-400 text-base gap-2 rounded-lg hover:bg-neon-500'
          text='Criar'
          icon={<BiSolidPlusCircle size={18} />} 
        />
      </div>
      <div className='w-full flex flex-col gap-4'>
        <ListSubTasks 
          titleStatusSubTasks='Concluídos' 
          iconStatus={<BiSolidCheckCircle color='green' size={24} />}
          listSubTasks={dataDoneSubTasks as any}
          check={true}
        />
        <ListSubTasks 
          titleStatusSubTasks='Pendentes' 
          iconStatus={<FaClock color='orange' size={20} />}
          listSubTasks={dataPendingSubTasks as any}
        />
      </div>
    </div>
  );
}
