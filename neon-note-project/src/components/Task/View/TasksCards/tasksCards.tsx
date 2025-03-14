import FadeIn from '@/components/common/Effects/FadeIn';
import { DialogRoot, DialogTrigger } from '@/components/ui/dialog';
import {
  ProjectTasksPropsStatus,
  StatusTasksFromProjectProps,
} from '@/utils/mockFolders';
import { truncateText } from '@/utils/truncate';
import { Fragment } from 'react';
import { BsListTask } from 'react-icons/bs';
import {
  PiChartLineDown,
  PiDotsThree,
  PiDotsThreeBold,
  PiSealWarningFill,
  PiSirenBold,
} from 'react-icons/pi';
import { RxHalf2 } from 'react-icons/rx';
import { useCardTasks } from '../../hook/useTasks/useTasks';
import { ButtonComponent } from '@/components/common/Button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { ModalViewCardTask } from '../dialogs/tasks/ViewCard/modalViewCard';

interface Props {
  darkMode?: boolean;
  title: string;
  task: StatusTasksFromProjectProps;
  colorProgressStatusBar: string;
  numberTasksStatusDone: number;
  numberTasksStatus: number;
  status: string;
  note?: any;
  index?: number;
  priority: string;
  description?: string;
  date?: string;
  fromStatus: keyof ProjectTasksPropsStatus;
  toStatus: keyof ProjectTasksPropsStatus;
  moveCard: (
    taskId: string,
    fromStatus: keyof ProjectTasksPropsStatus,
    toStatus: keyof ProjectTasksPropsStatus
  ) => void;
}
export function CardTasks({
  darkMode,
  title,
  task,
  note,
  index,
  colorProgressStatusBar,
  numberTasksStatusDone,
  numberTasksStatus,
  priority,
  description,
  status,
  date,
  fromStatus,
  moveCard,
  toStatus,
}: Props) {
  const {
    isOpenModalViewCardTask,
    onCloseModalViewCardTask,
    onOpenModalViewCardTask,
  } = useCardTasks();
  return (
    <>
      <FadeIn>
        <Fragment key={task.id}>
          <DialogRoot open={isOpenModalViewCardTask} size={'xl'}>
            <div
              className={`
                  ${darkMode ? 'bg-neon-900 hover:bg-neon-800 bg-opacity-25 border border-gray-800' : 'bg-white hover:bg-black-50 border border-gray-200 shadow-md shadow-black-200'} 
                  rounded-xl p-2 cursor-pointer transition duration-200 hover:bg-opacity-40
                `}
            >
              <div className='flex items-center gap-2 justify-between'>
                <h1
                  className={`
                        ${
                          priority === 'URGENTE'
                            ? ` w-24 ${darkMode ? 'bg-red-500 bg-opacity-15' : 'bg-red-100'} text-red-500`
                            : priority === 'IMPORTANTE'
                              ? `${darkMode ? 'bg-orange-500 bg-opacity-25' : 'bg-orange-100'} text-orange-500 text-center w-32`
                              : priority === 'MÉDIO'
                                ? `${darkMode ? 'bg-purple-500 bg-opacity-25' : 'bg-purple-100'} text-purple-500 w-20`
                                : darkMode
                                  ? `bg-green-500 bg-opacity-25 text-green-500 ${darkMode ? 'bg-green-500 bg-opacity-25' : 'bg-green-100'} w-24`
                                  : 'bg-green-100 text-green-500 w-20'
                        }
                              flex items-center gap-2 font-bold text-xs p-2 rounded-full
                      `}
                >
                  {priority}
                  {priority === 'URGENTE' && <PiSirenBold size={20} />}
                  {priority === 'IMPORTANTE' && <PiSealWarningFill size={20} />}
                  {priority === 'MÉDIO' && <RxHalf2 size={20} />}
                  {priority === 'BAIXO' && <PiChartLineDown size={20} />}
                </h1>

                <MenuRoot>
                  <MenuTrigger>
                    <ButtonComponent className={`${darkMode ? 'text-black-50 hover:bg-black-50' : 'text-black-800 hover:bg-black-800'} hover:bg-opacity-15`} icon={<PiDotsThreeBold size={20} />} />
                  </MenuTrigger>

                  <MenuContent shadow={'sm'} bg={darkMode ? 'blackAlpha.800' : 'white'}>
                    <MenuItem 
                      onClick={() => moveCard(task.id, fromStatus, toStatus)} 
                      _hover={{bg: darkMode ? '' : 'blackAlpha.100'}}
                      value='updateTaskStatus'
                    >
                      <p 
                        className={`
                        ${darkMode ? 'text-black-50' : 'text-black-800'} 
                        text-center font-semibold text-base
                        `}
                      >
                        Mover tarefa
                      </p>
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </div>
              <DialogTrigger w={'full'} display={'flex'}>
                <div onClick={onOpenModalViewCardTask} className='w-full mt-2'>
                  <h2
                    className={`text-xl text-left break-words mb-2 font-bold ${darkMode ? 'opacity-96 text-white' : 'text-black-700'}`}
                  >
                    {truncateText(title, 25)}
                  </h2>
                  {/* <div className='flex w-full justify-between items-center'>
                    <p className='flex items-center text-black-400 gap-2'>
                      <BsListTask size={20} />
                      Progresso
                    </p>

                    <p className='flex items-center text-black-200 gap-2'>
                      {numberTasksStatusDone}/{numberTasksStatus}
                    </p>
                  </div>
                  <progress
                    className={`
                    w-full h-1 rounded-full bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 p-1 
                    ${priority === 'URGENTE' && '[&::-webkit-progress-value]:bg-red-500 [&::-moz-progress-bar]:bg-red-500'}
                    ${priority === 'IMPORTANTE' && '[&::-webkit-progress-value]:bg-orange-500 [&::-moz-progress-bar]:bg-orange-500'}
                    ${priority === 'MÉDIO' && '[&::-webkit-progress-value]:bg-purple-500 [&::-moz-progress-bar]:bg-purple-500'}
                    ${priority === 'BAIXO' && '[&::-webkit-progress-value]:bg-green-500 [&::-moz-progress-bar]:bg-green-500'}
                    `}
                    value={numberTasksStatusDone}
                    max={numberTasksStatus}
                  /> */}

                  <div className='flex w-full'>
                    <p className='flex text-left text-black-400'>
                      {truncateText(task.description || '', 40)}
                    </p>
                  </div>

                  <div className='flex mt-2 justify-start'>
                    <p
                      className={`${darkMode ? 'text-gray-400 bg-opacity-10' : 'text-black-500 bg-opacity-30'} bg-black-100 p-2 rounded-full font-semibold text-xs`}
                    >
                      {date}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
            </div>
            <ModalViewCardTask
              onCloseModalViewCardTask={onCloseModalViewCardTask}
              taskId={task.id}
              status={status}
              title={title}
              description={description || ''}
              priority={priority}
              fromStatus={fromStatus}
              toStatus={toStatus}
            />
          </DialogRoot>
        </Fragment>
      </FadeIn>
    </>
  );
}
