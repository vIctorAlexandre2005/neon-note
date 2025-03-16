import { useContextTaskData } from '../../Context/TaskContext/TaskContext';

export function useSubTask() {
  const {
    listDoneSubTasks,
    listPendingSubTasks,
    setListDoneSubTasks,
    setListPendingSubTasks,
    nameSubTask,
    setNameSubTask,
  } = useContextTaskData();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    setNameSubTask(value);
  };

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
