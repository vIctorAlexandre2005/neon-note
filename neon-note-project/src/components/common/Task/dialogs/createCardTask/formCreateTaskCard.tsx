import { Box, Separator, SimpleGrid, Stack } from '@chakra-ui/react';
import {
  InputsCreateTaskCard,
  SelectPriority,
  TextAreaCreateTaskCard,
} from './inputs';
import { useContextGlobal } from '@/Context';

export function FormCreateTaskCard() {
  const { darkMode } = useContextGlobal();
  return (
    <div className='flex flex-col justify-center w-full'>
      <SimpleGrid columns={2} gap={4} w={'full'}>
        <InputsCreateTaskCard type='text' placeholder='Tarefa resumida' />
        <InputsCreateTaskCard type='date' placeholder='' label='Prazo:' />
        <TextAreaCreateTaskCard placeholder='Descreva com mais detalhes a sua tarefa...' />
        <SelectPriority />
      </SimpleGrid>

      {/* <Separator className='border mt-4' /> */}
      {/* <div className='mt-2'>
        <div className='flex items-center gap-1'>
          <h1
            className={`${darkMode ? 'text-gray-100' : 'text-black-800'} font-semibold text-xl`}
          >
            Sub-tarefas
          </h1>
          <PiPlus size={20} />
        </div>
      </div> */}
    </div>
  );
}
