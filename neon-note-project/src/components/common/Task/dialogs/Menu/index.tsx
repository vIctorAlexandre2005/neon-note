import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { useContextGlobal } from '@/Context';

interface MenuRootComponentProps {
  children: React.ReactNode;
}

interface SubMenuContentProps {
  text: string;
  value: string;
}
interface MenuContentComponentProps {
  arrayMenuItems: SubMenuContentProps[];
  handleFunction: () => void;
}

export function MenuRootComponent({ children }: MenuRootComponentProps) {
  return (
    <MenuRoot>
      <MenuTrigger>{children}</MenuTrigger>
    </MenuRoot>
  );
}

export function MenuContentComponent({
  arrayMenuItems,
  handleFunction,
}: MenuContentComponentProps) {
  const { darkMode } = useContextGlobal();
  return (
    <MenuContent bg={darkMode ? '#020617' : 'white'}>
      {arrayMenuItems.map(item => (
        <MenuItem
          value={item.value}
          color={darkMode ? 'white' : 'black'}
          opacity={0.8}
          onClick={handleFunction}
        >
          {item.text}
        </MenuItem>
      ))}
    </MenuContent>
  );
}
