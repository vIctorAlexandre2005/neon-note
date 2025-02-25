import { useContextGlobal } from '@/Context';
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from '../ui/dialog';
import React from 'react';
import { NegativeButtonComponent, PositiveButtonComponent } from './Button';

interface ModalRootComponentProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'cover' | 'full' | undefined;
  placement?: 'center' | 'top' | 'bottom' | undefined;
}

interface ModalContentComponentProps {
  content: React.ReactNode;
}

export function ModalRootComponent({
  children,
  onClose,
  isOpen,
  size,
}: ModalRootComponentProps) {
  return (
    <DialogRoot
      open={isOpen}
      size={size}
      onOpenChange={onClose}
      placement={'center'}
    >
      <DialogBackdrop bg={'transparent'} />
      <DialogTrigger asChild>{children}</DialogTrigger>
    </DialogRoot>
  );
}

export function ModalContentComponent({ content }: ModalContentComponentProps) {
  const { darkMode } = useContextGlobal();
  return (
    <DialogContent p={4} borderRadius={'2xl'} boxShadow={'sm'} bg={darkMode ? '#0f172a' : '#fff'}>
      {content}
    </DialogContent>
  );
}

interface ModalHeaderProps {
  titleHeader: string;
  iconHeader?: React.JSX.Element;
  positiveOnClick: () => void;
  negativeOnClick: () => void;
  textToNegativeButton: string;
  textToPositiveButton: string;
}
export function ConfirmationModal({ titleHeader, iconHeader, positiveOnClick, negativeOnClick, textToNegativeButton, textToPositiveButton }: ModalHeaderProps) {
  const { darkMode } = useContextGlobal();
  return (
    <div className={`flex flex-col`}>
      <div className='flex items-center justify-center mb-2 gap-2'>
        <h1
          className={`${darkMode ? 'text-gray-100' : 'text-black-900'} font-semibold text-xl`}
        >
          {titleHeader}
        </h1>
        {iconHeader}
      </div>

      <div className='w-full flex gap-2 p-2'>
        <NegativeButtonComponent onClick={negativeOnClick} text={textToNegativeButton} />
        <PositiveButtonComponent onClick={positiveOnClick} text={textToPositiveButton} />
      </div>
    </div>
  );
}
