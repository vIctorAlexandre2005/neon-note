import { SubTasks } from '@/utils/mockFolders';
import { useContextTaskData } from '../../Context/TaskContext/TaskContext';
import { errorToast, successToast } from '@/utils/toasts/toasts';
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

  function validCreateSubTask(subTaskName: string) {
    if (!subTaskName) {
      errorToast('Digite o nome da Sub-Tarefa');
      return null;
    };
    const isSubTaskNameValid = subTaskName?.trim().length > 0 && subTaskName?.trim().length <= 100
    if (!isSubTaskNameValid) {
      errorToast('O nome da Sub-Tarefa deve ter entre 1 e 100 caracteres');
      return null;
    };
  }
  function handleCreateSubTask(subTaskName: string) {

    const responseValid = validCreateSubTask(subTaskName);
    if (responseValid === null) return;

    try {
      const newSubTask: SubTasks = {
        id: uuidv4(),
        title: subTaskName,
      };

      setListPendingSubTasks([...listPendingSubTasks, newSubTask]);
      setNameSubTask('');
      successToast('Sub-Tarefa criada!');
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
    handleCreateSubTask
  };
}
