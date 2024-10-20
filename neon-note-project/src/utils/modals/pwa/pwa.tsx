import {
  Box,
  Button,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { ModalPWA } from '.';

export function ModalInstallPWA({
  isOpenModal,
  onClose,
  handleInstall,
}: ModalPWA) {
  return (
    <Modal isCentered isOpen={isOpenModal} onClose={onClose}>
      <ModalOverlay
        onClick={onClose}
        width={'100%'}
        height={'100%'}
        background={'#00000090'}
      />
      <ModalContent transition={'0.2s'} background={'white'} width={'24rem'}>
        <ModalHeader
          marginBottom={'2rem'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            gap={'12px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Text fontWeight={'600'} color={'#004aff'} fontSize={'1.1rem'}>
              Tenha o Neon Note em seu dispositivo!
            </Text>
          </Box>
        </ModalHeader>
        <ModalBody display={'flex'} justifyContent={'center'}>
          <Img src='/login.svg' height={180} width={180} />
        </ModalBody>
        <ModalFooter width={'100%'} marginTop={'1rem'}>
          <Button
            width={'100%'}
            padding={'0.5rem'}
            border={'none'}
            borderRadius={'6px'}
            background={'#004aff'}
            color={'white'}
            fontWeight={'bold'}
            onClick={handleInstall}
            _hover={{ background: '#0229a6', transition: '0.3s' }}
            gap={2}
          >
            Baixar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
