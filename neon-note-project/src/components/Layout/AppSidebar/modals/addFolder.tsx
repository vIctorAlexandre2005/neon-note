import {
  ButtonComponent,
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import { ModalContentComponent } from '@/components/common/modal';

interface Props {
  onCloseAddFolder: () => void;
  newFolderName: string;
  setNewFolderName: (value: string) => void;
  handleAddFolder: () => void;
  darkMode: boolean;
}

export function AddFolderModal({
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
        className={`w-full p-2 border border-neon-400 text-lg focus:border-2 outline-none rounded-lg ${darkMode ? 'text-white bg-black-900' : 'text-black-800 bg-white'} `}
        value={newFolderName}
        onChange={e => setNewFolderName(e.target.value)}
      />

      <div className='flex gap-2'>
        <NegativeButtonComponent onClick={onCloseAddFolder} text='Cancelar' />
        <PositiveButtonComponent
          onClick={() => {
            handleAddFolder();
            onCloseAddFolder();
          }}
          text='Criar'
        />
      </div>
    </div>
  );
}
