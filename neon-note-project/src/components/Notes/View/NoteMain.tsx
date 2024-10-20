import { useEffect, useState } from 'react';
import { NoteInput } from './NoteInput';
import { useTheme } from '@/components/ThemeDark';
import { toast } from 'react-toastify';
import ScaleIn from '@/components/Effects/ScaleIn';

export function NoteMain() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`${darkMode ? 'bg-slate-900' : 'bg-neon-50 border shadow-lg'} w-full rounded-xl h-full flex flex-col p-2`}
    >
      <NoteInput />
    </div>
  );
}
