import { useContextGlobal } from '@/Context';
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from '../ui/drawer';

type DrawerRootComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  placement: 'top' | 'bottom' | 'start' | 'end';
  children: React.ReactNode;
};

type DrawerContentComponentProps = {
  children: React.ReactNode;
};

export function DrawerRootComponent({
  isOpen,
  onClose,
  placement,
  children,
}: DrawerRootComponentProps) {
  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} placement={placement}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>{children}</DrawerTrigger>
    </DrawerRoot>
  );
};

export function DrawerContentComponent({
  children,
}: DrawerContentComponentProps) {
  const { darkMode } = useContextGlobal();

  return (
    <DrawerContent p={4} bg={darkMode ? '#0f172a' : 'white'}>
      {children}
    </DrawerContent>
  );
};