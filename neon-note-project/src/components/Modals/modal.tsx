import { useContextGlobal } from '@/Context';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ChakraProps,
} from '@chakra-ui/react';

interface ModalProps extends ChakraProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: string;
  isCentered?: boolean;
}

export function ModalComponent({
  children,
  onClose,
  isOpen,
  size,
  isCentered,
  ...rest
}: ModalProps) {

const { darkMode } = useContextGlobal();
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent bg={darkMode ? '#1a1a1a' : 'white'} {...rest}>{children}</ModalContent>
    </Modal>
  );
}
