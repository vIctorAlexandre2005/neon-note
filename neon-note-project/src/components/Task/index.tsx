import { SidebarNote } from "../Notes/View/SidebarNote/SidebarNote";
import { SidebarTasks } from "./TasksSidebars/SidebarsTasks";

export function TaskComponent() {
  return (
    <div className='flex h-full gap-4 p-2'>
      <SidebarTasks />
      <SidebarTasks />
      <SidebarTasks />
    </div>
  );
}
