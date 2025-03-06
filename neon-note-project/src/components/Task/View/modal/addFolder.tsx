import { ButtonComponent, NegativeButtonComponent, PositiveButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { ModalContentComponent } from '@/components/common/modal';

interface Props {
  isOpenAddFolder: boolean;
  onCloseAddFolder: () => void;
  newFolderName: string;
  setNewFolderName: (value: string) => void;
  handleAddFolder: () => void;
  darkMode: boolean;
}

export function AddFolderModalTask({
  isOpenAddFolder,
  onCloseAddFolder,
  newFolderName,
  setNewFolderName,
  handleAddFolder,
  darkMode,
}: Props) {

  return (
      <div className='flex flex-col gap-4'>
        <h1
          className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black-800'}`}
        >
          Nome da pasta
        </h1>
        <InputComponent
          placeholder='Inserir nome da pasta'
          className={`w-full text-lg p-2 border-opacity-10 border duration-300 hover:border hover:border-neon-400 focus:border-2 focus:border-neon-400 outline-none rounded-lg ${darkMode ? 'text-white' : 'text-black-800'} bg-transparent`}
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
        />

        <div className='flex gap-4'>
          <NegativeButtonComponent
            onClick={onCloseAddFolder}
            text='Cancelar'
          />
          <PositiveButtonComponent
            onClick={() => {
              handleAddFolder();
            }}
            text='Criar'
          />
        </div>
      </div>
  );
}
