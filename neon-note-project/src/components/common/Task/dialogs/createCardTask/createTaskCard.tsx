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
  return (
    <div className='flex justify-start flex-col z-0'>
      <div>
        <h1
          className={`${darkMode ? 'text-gray-100' : 'text-black-900'} mb-2 font-semibold text-2xl`}
        >
          Criar
        </h1>
      </div>

      <Tabs.Root defaultValue='generalTaskArea'>
        <Tabs.List gap={6}>
          <Tabs.Trigger
            p={2}
            rounded={'md'}
            _selected={{ bg: 'blue.500' }}
            fontSize={'md'}
            value='generalTaskArea'
          >
            <IoCreate size={24} />
            Tarefa no geral
          </Tabs.Trigger>

          <Tabs.Trigger
            p={2}
            rounded={'md'}
            _selected={{ bg: 'blue.500' }}
            fontSize={'md'}
            value='subTasks'
          >
            <FaTasks size={20} />
            Sub-tarefas
          </Tabs.Trigger>
        </Tabs.List>
        <Separator color={'blue.500'} opacity={0.5} border={'1px solid'} />
        <FadeIn>
          <Tabs.Content value='generalTaskArea'>
            <div className='flex justify-center w-full mb-4'>
              <FormCreateTaskCard />
            </div>

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
          </Tabs.Content>
        </FadeIn>
        <Tabs.Content value='subTasks'>Manage your projects</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
