import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useContextGlobal } from '@/Context';

type PopoverRootComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xs' | undefined;
};

type PopoverContentComponentProps = {
  children: React.ReactNode;
};

export function PopoverRootComponent({
  children,
  isOpen,
  onClose,
  size,
}: PopoverRootComponentProps) {
  return (
    <PopoverRoot open={isOpen} onOpenChange={onClose} size={size}>
      <PopoverTrigger>{children}</PopoverTrigger>
    </PopoverRoot>
  );
}

export function PopoverContentComponent({
  children,
}: PopoverContentComponentProps) {
  const { darkMode } = useContextGlobal();
  return (
    <PopoverContent bg={darkMode ? '#0f172a' : 'white'}>
      <PopoverArrow />
      {children}
    </PopoverContent>
  );
}
