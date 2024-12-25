import { useContextGlobal } from '@/Context';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';

export function DrawerComponent({
  isOpen,
  onClose,
  placement,
  onEsc,
  children,
}: DrawerProps) {
  const { darkMode } = useContextGlobal();

  return (
    <Drawer
      placement={placement}
      onEsc={onEsc}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent p={4} bg={darkMode ? '#0f172a' : 'white'}>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
