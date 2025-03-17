import { SubTasks } from '@/utils/mockFolders';
import { useContextTaskData } from '../../Context/TaskContext/TaskContext';
import { errorToast } from '@/utils/toasts/toasts';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

export function useSubTask() {
  const {
    foldersTask,
    listDoneSubTasks,
    listPendingSubTasks,
    setListDoneSubTasks,
    setListPendingSubTasks,
    nameSubTask,
    setNameSubTask,
  } = useContextTaskData();

  const router = useRouter();

  const { id, projectId } = router.query;

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    setNameSubTask(value);
  }

  function validCreateSubTask() {}
  function handleCreateSubTask(subTaskName: string) {
    try {
      const newSubTask: SubTasks = {
        id: uuidv4(),
        title: subTaskName,
      };
    } catch (error) {
      errorToast('Erro ao criar Sub-Tarefa');
      console.error('Erro ao criar Sub-Tarefa:', error);
    }
  }

  return {
    listDoneSubTasks,
    listPendingSubTasks,
    setListDoneSubTasks,
    setListPendingSubTasks,
    nameSubTask,
    setNameSubTask,
    handleOnChange,
  };
}
