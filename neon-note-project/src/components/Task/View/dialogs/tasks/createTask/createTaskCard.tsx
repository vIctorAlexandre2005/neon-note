import { useContextGlobal } from '@/Context';
import { FormCreateTaskCard } from './formCreateTaskCard';
import FadeIn from '@/components/common/Effects/FadeIn';
import { Dispatch, SetStateAction } from 'react';
import { useCardTasks } from '@/components/Task/hook/useTasks/useTasks';
import {
  Box,
  Flex,
  SegmentGroup,
  SegmentGroupItem,
  Separator,
  Tabs,
} from '@chakra-ui/react';
import { NegativeButtonComponent, PositiveButtonComponent } from '@/components/common/Button';
import { SubTasksTab } from '../../../TasksCards/subTasks';

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
    nameSubTask,
  } = useCardTasks();
  const { darkMode } = useContextGlobal();

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
      <FormCreateTaskCard />
      <footer className='flex mt-6 w-full gap-4 items-center'>
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
              levelPriorityTask,
              nameSubTask,
            );
            onCloseModalCreateCard();
          }}
          text='Criar'
        />
      </footer>
    </div>
  );
}
