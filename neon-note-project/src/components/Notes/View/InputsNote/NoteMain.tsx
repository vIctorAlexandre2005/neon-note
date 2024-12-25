import { useEffect, useState } from 'react';
import { NoteInput } from './NoteInput';
import { toast } from 'react-toastify';
import ScaleIn from '@/components/common/Effects/ScaleIn';
import { useContextGlobal } from '@/Context';

export function NoteMain() {
const { darkMode } = useContextGlobal();
  return (
    <div
      className={`${darkMode ? 'bg-slate-900' : 'bg-white border-2 border-slate-200'} w-full rounded-xl h-full flex flex-col p-2`}
    >
      <NoteInput />
    </div>
  );
}
