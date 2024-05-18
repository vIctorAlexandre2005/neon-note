import { useTheme } from "@/components/ThemeDark";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react"

export function ModalDeleteNote( { open, onClose, handleDeleteNote, item, item2 } : any ) {

    const cancelButtonRef = useRef(null);
    const { darkMode } = useTheme();

  return (
    
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className={`${darkMode ? 'bg-black-800' : 'bg-neon-500'} px-4 pb-4 pt-5 sm:p-6 sm:pb-4`}>
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      
                    </div> */}
                    <div className="mt-3 text-center overflow-y-scroll max-w-full h-100 max-h-80 sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-xl text-gray-100">
                        Deseja realmente excluir esta anotação?
                      </Dialog.Title>
                      <div className="mt-2 max-w-full">
                        <p className="text-sm text-white break-words text-xl">
                          Título: {item}
                        </p>
                        <p className="text-sm text-white break-words text-lg">
                          Nota: {item2} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${darkMode ? 'bg-black-800' : 'bg-neon-500'} max-w-full px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6`}>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteNote}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}