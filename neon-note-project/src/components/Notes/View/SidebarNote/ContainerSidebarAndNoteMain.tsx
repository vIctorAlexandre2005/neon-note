import { NoteMain } from "../InputsNote/NoteMain";
import { SidebarNote } from "./SidebarNote";

export function ContainerSidebarAndNoteMain({activeNote, darkMode}: any) {
    return (
        <div className='flex h-full xs:pl-0 xs:pt-0 md:pl-4 md:pt-2 gap-4'>
        <div className='md:flex-none xs:w-full md:w-80 max-h-full'>
          <SidebarNote />
        </div>

        <div className='xs:hidden w-full h-full md:block md:flex-1'>
          {activeNote ? (
            <NoteMain />
          ) : (
            <div className='flex mt-20 flex-col justify-end items-center animate-flute'>
              <img
                src='/empty.svg'
                alt='empty'
                className='object-cover'
                height={300}
                width={300}
              />
              <h3
                className={`${darkMode ? 'text-gray-300' : 'text-black-700'} text-xl mt-5`}
              >
                Lembre-se das coisas mais importantes
              </h3>
            </div>
          )}
        </div>
      </div>
    )
}