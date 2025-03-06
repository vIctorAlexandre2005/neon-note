import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useContextGlobal } from '@/Context';
import { FcOrganization, FcOrgUnit } from 'react-icons/fc';

interface ModalNameProjectProps {
  onClose: () => void;
  onClick?: () => void;
}

export function ModalDeleteProject({ onClose, onClick }: ModalNameProjectProps) {
  const { darkMode } = useContextGlobal();
  return (
    <div className='gap-4 flex flex-col w-full justify-center'>
      <header className='text-left flex justify-center items-center gap-2'>
        <h1
          className={`text-2xl font-bold mb-2 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Deseja excluir o projeto permanentemente?
        </h1>
      </header>
      <footer className='flex gap-4 justify-center items-center w-full'>
        <ButtonComponent
          onClick={onClose}
          text='Cancelar'
          className='w-full bg-neon-400 hover:bg-neon-500 transition duration-300 text-xl text-white'
        />
        <ButtonComponent
          onClick={onClick}
          text='Sim'
          className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} hover:bg-red-500 transition duration-300 w-full text-xl hover:text-white`}
        />
      </footer>
    </div>
  );
}
