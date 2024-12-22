import { ClockLoader, HashLoader } from "react-spinners";
import { SidebarTasksComponent } from "../common/SidebarTask";
import { SidebarNote } from "../Notes/View/SidebarNote/SidebarNote";
import { SidebarTasks } from "./TasksSidebars/SidebarsTasks";
import { useSidebarNote } from "../Notes/ViewModel/useSidebarNote";
import { MdOutlineEditNote } from "react-icons/md";
import { BiCheck, BiCheckCircle } from "react-icons/bi";
import { useTheme } from "../ThemeDark";
import { useContextNoteData } from "@/Context/NoteContext";

export function TaskComponent() {

  const { noteList} = useSidebarNote();
  const { darkMode } = useTheme();

  const { selectedItem } = useContextNoteData();

  return (
    <div className='flex flex-col h-full gap-2 p-4'>
      <h1 className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-black-800'} font-bold`}> {selectedItem} </h1>
      <div className="flex gap-4 h-full">
      <SidebarTasksComponent
        arrayTasks={noteList}
        numberTasksStatus={noteList?.length}
        statusIcon={<HashLoader size={24} color="blue" />}
        statusTitle="A começar"
        statusIconColorBackground="blue"
        colorProgressStatusBar="blue"
        numberTasksStatusDone={0} />

      <SidebarTasksComponent
        arrayTasks={noteList}
        numberTasksStatus={noteList?.length}
        statusIcon={<ClockLoader size={20} color="orange" />} 
        statusTitle="Em progresso" 
        statusIconColorBackground="orange"
        colorProgressStatusBar="orange"
        numberTasksStatusDone={4} />

      <SidebarTasksComponent 
        arrayTasks={noteList} 
        numberTasksStatus={noteList?.length} 
        statusIcon={<BiCheckCircle size={24} color="#02ad41" />} 
        statusTitle="Concluído" 
        statusIconColorBackground="green"
        colorProgressStatusBar="green"
        numberTasksStatusDone={noteList?.length} />
      </div>
    </div>
  );
}
