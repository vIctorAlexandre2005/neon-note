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
      <FadeIn>
        <div>
          <h1
            className={`${darkMode ? 'text-gray-100' : 'text-black-900'} mb-4 font-semibold text-xl`}
          >
            Criar tarefa
          </h1>
        </div>

        <div className='flex justify-center w-full mb-4'>
          <FormCreateTaskCard />
        </div>
      </FadeIn>

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
              levelPriorityTask,
            );
            onCloseModalCreateCard();
          }}
          text='Criar'
        />
      </footer>
    </div>
  );
}
