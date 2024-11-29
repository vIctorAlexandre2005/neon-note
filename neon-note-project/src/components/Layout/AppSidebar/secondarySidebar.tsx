import { ButtonComponent } from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import FadeIn from '@/components/Effects/FadeIn';
import { ModalComponent } from '@/components/Modals/modal';
import { navigateListSidebar } from '@/utils/navigateListSidebar';
import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiFolderPlus, BiPlus } from 'react-icons/bi';
import { FaFolder, FaFolderPlus } from 'react-icons/fa';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowDropright,
  IoIosArrowForward,
} from 'react-icons/io';
import { AddFolderModal } from './modals/addFolter';
import { AddFolderItemModal } from './modals/addItemFolder';
import { useSecondarySidebar } from '@/hooks/useSecondarySidebar';
import { useContextGlobal } from '@/Context';
import { HiDocumentText, HiOutlineDocumentText } from 'react-icons/hi2';
import { BsTrash, BsTrash2 } from 'react-icons/bs';
import { DeleteFolderModal } from './modals/deleteFolder';
import { SidebarHome } from './sidebarHome/sidebarHome';
import { SidebarTasks } from './sidebarTasks/sidebarTasks';

interface SidebarProps {
  darkMode: boolean;
}

export function SecondarySidebar({ darkMode }: SidebarProps) {
  const router = useRouter();

  if (router.pathname === '/') {
    return <SidebarHome />;
  };

  if (router.pathname === '/tasks') {
    return <SidebarTasks />;
  };
}
