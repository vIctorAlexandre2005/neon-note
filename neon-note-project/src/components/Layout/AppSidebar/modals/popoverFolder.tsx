import { ButtonComponent } from '@/components/common/Button';
import { useTheme } from '@/components/ThemeDark';
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { TbDotsVertical } from 'react-icons/tb';

interface Props {
  isOpenPopover: boolean;
  onClosePopover: () => void;
  onOpenPopover: () => void;
}

export function PopoverFolderModal({
  isOpenPopover,
  onClosePopover,
  onOpenPopover,
}: Props) {

    const {darkMode} = useTheme();

  return (
    <Popover isOpen={isOpenPopover} onClose={onClosePopover}>
      <PopoverTrigger>
        <ButtonComponent
          onClick={onOpenPopover}
          icon={<TbDotsVertical size={18} />}
          className={`hover:bg-neon-400 hover:text-white ${darkMode ? 'text-black-200' : 'text-black-700'} rounded-full`}
        />
      </PopoverTrigger>

      {isOpenPopover && (
        <PopoverContent>
          <PopoverHeader> Options </PopoverHeader>
        </PopoverContent>
      )}
    </Popover>
  );
}
