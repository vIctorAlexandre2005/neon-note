import { useContextGlobal } from '@/Context';
import { DialogBackdrop, DialogCloseTrigger, DialogContent, DialogRoot, DialogTrigger } from '../ui/dialog';

interface ModalRootComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full" | undefined;
  placement?: "center" | "top" | "bottom" | undefined;
};

interface ModalContentComponentProps {
  content: React.ReactNode;
};

export function ModalRootComponent({
  children,
  onClose,
  isOpen,
  size,
}: ModalRootComponentProps) {
  return (
    <DialogRoot open={isOpen} size={size} onOpenChange={onClose} placement={'center'}>
      <DialogTrigger asChild>{children}</DialogTrigger>
    </DialogRoot>
  );
}

export function ModalContentComponent({
  content,
}: ModalContentComponentProps) {

const { darkMode } = useContextGlobal();
  return (
    <DialogContent boxShadow={"sm"} bg={darkMode ? '#0f172a' : '#fff'}>
      {content}
    </DialogContent>
  );
}