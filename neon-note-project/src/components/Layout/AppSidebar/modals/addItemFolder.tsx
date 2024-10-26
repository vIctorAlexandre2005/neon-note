import { ButtonComponent } from "@/components/common/Button";
import { InputComponent } from "@/components/common/InputField";
import { ModalComponent } from "@/components/Modals/modal";

interface Props {
    darkMode: boolean;
    newItemName: string;
    setNewItemName: (value: string) => void;
    handleAddItem: () => void;
    isOpenAddItem: boolean;
    onCloseAddItem: () => void;
}

export function AddFolderItemModal({
    darkMode,
    newItemName,
    setNewItemName,
    handleAddItem,
    isOpenAddItem,
    onCloseAddItem,
}: Props) {
    return (
        <ModalComponent onClose={onCloseAddItem} isOpen={isOpenAddItem}>
          <div className='flex flex-col p-4 gap-4'>
            <h1
              className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black-800'}`}
            >
              Insira o nome do item
            </h1>
            <InputComponent
              placeholder='Nome do item onde ficará as anotações'
              className={`w-full p-2 border border-neon-400 focus:border-2 outline-none rounded-lg ${darkMode ? 'text-white bg-black-900' : 'text-black-800 bg-white'} `}
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />

            <div className='flex gap-4'>
              <ButtonComponent
                onClick={() => {
                  handleAddItem();
                  onCloseAddItem();
                }}
                text='Adicionar'
                className='bg-neon-400 text-white text-center w-full rounded-lg'
              />
              <ButtonComponent
                onClick={onCloseAddItem}
                text='Cancelar'
                className='bg-red-500 w-full text-white text-center rounded-lg'
              />
            </div>
          </div>
        </ModalComponent>
    );
}