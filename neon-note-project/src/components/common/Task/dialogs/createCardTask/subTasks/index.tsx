import {
  ButtonComponent,
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useContextGlobal } from '@/Context';
import { Textarea } from '@chakra-ui/react';
import { BiSolidPlusCircle } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { ContentCreateSubTaskDialog } from './dialogs/ContentCreateSubTaskDialog';

const items = [
  {
    id: 1,
    nameSubTask: 'Terminar isso logo',
    descriptionSubTask: 'ta complicado isso',
    subTaskCreatedDate: new Date(),
  },
  {
    id: 2,
    nameSubTask: 'Tirar o lixo',
    descriptionSubTask: 'Fazer isso quando a tarefa 3 for liberada',
    subTaskCreatedDate: new Date(),
  },
  {
    id: 3,
    nameSubTask: 'Lavar a louça amanhã',
    descriptionSubTask: 'Lembrar de lavar as panelas',
    subTaskCreatedDate: new Date(),
  },
];

export function SubTasksTab() {
  const { darkMode } = useContextGlobal();
  return (
    <div className={`flex flex-col w-full`}>
      <div className='justify-start flex items-center'>
        <DialogRoot placement={'center'}>
          <DialogTrigger>
            <ButtonComponent
              className='font-semibold text-lg gap-2 bg-neon-400 rounded-md hover:bg-neon-500 mb-2'
              text='Adicionar'
              icon={<BiSolidPlusCircle size={20} />}
            />
          </DialogTrigger>
          <ContentCreateSubTaskDialog />
        </DialogRoot>
      </div>
    </div>
  );
}
