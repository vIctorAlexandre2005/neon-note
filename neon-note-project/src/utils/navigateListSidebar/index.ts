import React, { ReactNode } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { FaTable, FaTasks } from 'react-icons/fa';

type NavigateListSidebarProps = {
  name: string;
  link: string;
  icon: IconType;
};

export const navigateListSidebar: NavigateListSidebarProps[] = [
  {
    name: 'Notas',
    link: '/',
    icon: HiOutlinePencilSquare,
  },
  // {
  //   name: 'Tarefas',
  //   link: '/tasks',
  //   icon: FaTasks,
  // },
];
