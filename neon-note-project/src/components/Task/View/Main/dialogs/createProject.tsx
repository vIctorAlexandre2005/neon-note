import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useContextGlobal } from '@/Context';
import { FcOrganization, FcOrgUnit } from 'react-icons/fc';

interface ModalNameProjectProps {
    onClose: () => void;
}

export function ModalNameProject({onClose}: ModalNameProjectProps) {
  const { darkMode } = useContextGlobal();
  return (
    <div className='p-4 gap-4 flex flex-col w-full justify-center'>
      <header className='text-left flex items-center gap-2'>
        <h1
          className={`text-2xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Insira o nome do seu projeto
        </h1>
        <FcOrgUnit size={28} />
      </header>
      <div className=''>
        <InputComponent
          className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} w-full bg-transparent p-2 rounded-lg border-2 text-xl border-gray-400 focus:border-neon-300 outline-none transition duration-300`}
          placeholder='Projeto [nome do projeto...]'
        />
      </div>
      <footer className='flex gap-4 justify-center items-center w-full'>
        <ButtonComponent
          onClick={onClose}
          text='Cancelar'
          className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} hover:bg-red-500 transition duration-300 w-full text-xl hover:text-white`}
        />
        <ButtonComponent
          text='Criar'
          className='w-full bg-neon-400 hover:bg-neon-500 transition duration-300 text-xl text-white'
        />
      </footer>
    </div>
  );
};
