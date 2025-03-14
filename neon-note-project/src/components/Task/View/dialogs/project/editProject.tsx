import { ButtonComponent, NegativeButtonComponent, PositiveButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { useTaskProjects } from '@/components/Task/hook/useTaskProjects/useTaskProjects';
import { useContextGlobal } from '@/Context';

interface Props {
  title: string;
  onClick?: () => void;
  onClose: () => void;
} 

export function EditProjectModalTask({ title, onClick, onClose, }: Props) {
  const { darkMode } = useContextGlobal();
  const { editedNameProject, setEditedNameProject } = useTaskProjects();

  return (
    <div className=''>
      <p
        className={`text-xl mb-2 ${darkMode ? 'text-white' : 'text-black-800'} font-bold`}
      >
        {title}
      </p>

      <InputComponent
        className={`
           ${darkMode ? 'text-black-50' : 'text-black-800'} 
           placeholder:text-black-500 w-full mb-2 p-1 focus:border-gray-400 
           outline-none transition duration-200 bg-transparent border rounded-md text-lg
        `}
        placeholder='Novo nome do projeto'
        value={editedNameProject}
        onChange={e => setEditedNameProject(e.target.value)}
      />

      <footer className='flex mt-2 gap-4 justify-center items-center w-full'>
        <NegativeButtonComponent onClick={onClose} text='Cancelar' />
        <PositiveButtonComponent onClick={onClick} text='Atualizar' />
      </footer>
    </div>
  );
}
