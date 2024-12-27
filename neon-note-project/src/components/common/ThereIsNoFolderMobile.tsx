import { RiFolderCloseFill } from 'react-icons/ri';
import { HashLoader } from 'react-spinners';
import { useContextNoteData } from '@/components/Notes/Context/NoteContext';
import { ButtonComponent } from './Button';
import { useContextGlobal } from '@/Context';
import { DrawerSidebarNote } from '../Notes/View/SidebarNote/drawerFolders/drawerSidebarNote';
import { useSecondarySidebarNote } from '../Notes/ViewModel/useSecondarySidebarNote';

export function ThereIsNoFolderMobile() {
  const {
    onOpenModal,
    isOpenModal,
    onCloseModal,
    selectedItem,
    handleItemClick,
  } = useContextNoteData();

  const {
    folders,
    selectedFolderId,
    setSelectedFolderId,
    newFolderName,
    handleAddFolder,
    setNewFolderName,
  } = useSecondarySidebarNote();

  const { darkMode } = useContextGlobal();
  
  return (
    <div
      className={`flex flex-col gap-1 items-center justify-center ${darkMode ? 'text-neon-800 opacity-80' : 'text-black-600'}`}
    >
      <RiFolderCloseFill size={50} />
      <div className='flex gap-1 items-center'>
        <h1
          className={`text-md font-semibold ${darkMode ? 'text-black-300' : 'text-black-600'}`}
        >
          Nenhuma pasta encontrada
        </h1>
        <HashLoader size={24} color={darkMode ? '#042488' : '#0949ee'} />
      </div>

      <ButtonComponent
        text='Selecione ou crie uma pasta'
        onClick={onOpenModal}
        className={`mt-4 ${darkMode ? 'bg-neon-700' : 'bg-neon-400'} text-white rounded-md`}
      />

      {isOpenModal && (
        <DrawerSidebarNote
          folders={folders}
          onCloseModal={onCloseModal}
          selectedFolderId={selectedFolderId}
          selectedItem={selectedItem}
          setSelectedFolderId={setSelectedFolderId}
          handleItemClick={handleItemClick}
          isOpenModal={isOpenModal}
          handleAddFolder={handleAddFolder}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
        />
      )}
    </div>
  );
}
