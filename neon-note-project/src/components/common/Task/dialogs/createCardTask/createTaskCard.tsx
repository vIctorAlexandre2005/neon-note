import { useContextGlobal } from '@/Context';
import {
  ButtonComponent,
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '../../../Button';
import { FormCreateTaskCard } from './formCreateTaskCard';
import FadeIn from '@/components/common/Effects/FadeIn';
import { Dispatch, SetStateAction } from 'react';
import { useCardTasks } from '@/components/Task/ViewModel/useTasks';
import {
  Box,
  Flex,
  SegmentGroup,
  SegmentGroupItem,
  Separator,
  Tabs,
} from '@chakra-ui/react';
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu';
import { BiTask } from 'react-icons/bi';
import { GrTasks } from 'react-icons/gr';
import { FaTasks } from 'react-icons/fa';
import { IoCreate } from 'react-icons/io5';
import { SubTasksTab } from './subTasks';

interface CreateModalTaskCardProps {
  onCloseModalCreateCard: () => void;
}
export function CreateModalTaskCard({
  onCloseModalCreateCard,
}: CreateModalTaskCardProps) {
  const {
    createCardTask,
    levelPriorityTask,
    nameCreatedTask,
    descriptionCreatedTask,
    limitDateToFinishTask,
  } = useCardTasks();
  const { darkMode } = useContextGlobal();

  const items = [
    {
      title: 'Tarefa',
    },
    {
      title: 'Sub-Tarefas',
    },
  ];
  return (
    <div className='flex justify-start flex-col'>
      <h1
        className={`
          ${darkMode ? 'text-gray-100' : 'text-black-900'} 
          mb-2 font-semibold text-2xl
          `}
      >
        Criar
      </h1>

      <Flex minH='sm'>
        <Tabs.Root variant={'outline'} defaultValue='Tarefa' width='full'>
          <Tabs.List
            fontWeight={'bold'}
            fontSize={'lg'}
            color={darkMode ? 'whiteAlpha.900' : 'blackAlpha.700'}
            gap={4}
          >
            {items.map((item, index) => (
              <Tabs.Trigger
                p={4}
                _selected={{
                  bg: darkMode ? 'blue.900' : 'blue.100',
                  borderBottom: '3px solid',
                  borderBottomColor: darkMode ? 'blue.600' : 'blue.400',
                }}
                key={index}
                value={item.title}
              >
                {item.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box pos='relative' minH='200px' width='full'>
            {items.map((item, index) => (
              <Tabs.Content
                key={index}
                value={item.title}
                position='absolute'
                inset='0'
                _open={{
                  animationName: 'fade-in, scale-in',
                  animationDuration: '300ms',
                }}
                _closed={{
                  animationName: 'fade-out, scale-out',
                  animationDuration: '120ms',
                }}
              >
                {item.title === 'Tarefa' ? (
                  <FormCreateTaskCard />
                ) : (
                  <SubTasksTab />
                )}
              </Tabs.Content>
            ))}
          </Box>
        </Tabs.Root>
      </Flex>
      <footer className='flex w-full gap-4 items-center'>
        <NegativeButtonComponent
          onClick={onCloseModalCreateCard}
          text='Cancelar'
        />
        <PositiveButtonComponent
          onClick={() => {
            createCardTask(
              'toStart',
              nameCreatedTask,
              descriptionCreatedTask,
              limitDateToFinishTask,
              levelPriorityTask
            );
            onCloseModalCreateCard();
          }}
          text='Criar'
        />
      </footer>
    </div>
  );
}
