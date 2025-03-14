import {
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useContextGlobal } from '@/Context';
import { Textarea } from '@chakra-ui/react';

export function ContentCreateSubTaskDialog() {
  const { darkMode } = useContextGlobal();
  return (
    <DialogContent bg={darkMode ? '#0f172a' : 'white'} p={0}>
      <DialogHeader
        color={darkMode ? 'gray.100' : 'blackAlpha.800'}
        fontWeight={'semibold'}
        fontSize={'xl'}
      >
        Criar Sub-Tarefa
      </DialogHeader>
      <DialogBody>
        <InputComponent
          placeholder='Nome da sub-tarefa'
          className={`
                    w-full bg-transparent border p-2 text-lg rounded-lg outline-none mb-4
                    focus:border-neon-400 duration-300 transition ease-out hover:border-neon-300
                    ${darkMode ? 'border-gray-600 text-gray-100' : 'border-gray-400 text-black-800'}
                `}
        />
        <Textarea
          placeholder='Descrição da sub-tarefa'
          resize={'none'}
          minH={'sm'}
          border={'2px solid'}
          borderColor={darkMode ? 'gray.600' : 'gray.400'}
          outline={'none'}
          p={2}
          color={darkMode ? 'gray.100' : 'blackAlpha.800'}
          rounded={'lg'}
          _hover={{
            border: '2px solid',
            borderColor: 'blue.400',
            transition: '0.3s',
          }}
          _focus={{
            border: '2px solid',
            borderColor: 'blue.500',
          }}
          transition={'all'}
          fontSize={'lg'}
        />
      </DialogBody>

      <DialogFooter>
        <NegativeButtonComponent text='Cancelar' />
        <PositiveButtonComponent text='Criar' />
      </DialogFooter>
    </DialogContent>
  );
}
