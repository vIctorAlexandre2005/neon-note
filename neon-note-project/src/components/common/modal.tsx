import { useContextGlobal } from '@/Context';
import { DialogCloseTrigger, DialogContent, DialogRoot, DialogTrigger } from '../ui/dialog';

interface ModalRootComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full" | undefined;
  placement?: "center" | "top" | "bottom" | undefined;
};

interface ModalContentComponentProps {
  children: React.ReactNode;
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
  children,
}: ModalContentComponentProps) {

const { darkMode } = useContextGlobal();
  return (
    <DialogContent p={4} bg={darkMode ? '#0f172a' : 'white'}>
      {children}
    </DialogContent>
  );
}

{/* <DialogRoot>
<DialogTrigger asChild>
  <Button variant="outline" size="sm">
    Open Dialog
  </Button>
</DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
  </DialogHeader>
  <DialogBody>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </DialogBody>
  <DialogFooter>
    <DialogActionTrigger asChild>
      <Button variant="outline">Cancel</Button>
    </DialogActionTrigger>
    <Button>Save</Button>
  </DialogFooter>
  <DialogCloseTrigger />
</DialogContent>
</DialogRoot> */}