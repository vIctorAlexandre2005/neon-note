import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useContextGlobal } from '@/Context';
import { FcOrganization, FcOrgUnit } from 'react-icons/fc';

interface ModalNameProjectProps {
  onClose: () => void;
}

export function ModalDeleteProject({ onClose }: ModalNameProjectProps) {
  const { darkMode } = useContextGlobal();
  return (
    <div className='p-4 gap-4 flex flex-col w-full justify-center'>
      <header className='text-left flex items-center gap-2'>
        <h1
          className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Tem certeza que deseja excluir esse projeto permanentemente?
        </h1>
        <FcOrgUnit size={28} />
      </header>
      <footer className='flex gap-4 justify-center items-center w-full'>
        <ButtonComponent
          onClick={onClose}
          text='Sim'
          className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} hover:bg-red-500 transition duration-300 w-full text-xl hover:text-white`}
        />
        <ButtonComponent
          text='Cancelar'
          className='w-full bg-neon-400 hover:bg-neon-500 transition duration-300 text-xl text-white'
        />
      </footer>
    </div>
  );
}
