import { ThereIsNoFolder } from '@/components/common/ThereIsNoFolder';
import { TaskComponent } from '@/components/Task/View';
import { useSecondarySidebarTask } from '@/components/Task/ViewModel/useSecondarySidebarTask';

export default function Tasks() {

  const { selectedTaskFolder } = useSecondarySidebarTask();

  if (selectedTaskFolder) {
    return <TaskComponent />
  };

  if (!selectedTaskFolder) {
    return (
      <div className='top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed'>
        <ThereIsNoFolder />
      </div>
    );
  };
};
