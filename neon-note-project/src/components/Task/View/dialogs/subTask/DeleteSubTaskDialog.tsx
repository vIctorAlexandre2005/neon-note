import {
  NegativeButtonComponent,
  PositiveButtonComponent,
} from '@/components/common/Button';
import { InputComponent } from '@/components/common/InputField';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { useContextGlobal } from '@/Context';

export function DeleteSubTaskDialog() {
  const { darkMode } = useContextGlobal();
  return (
    <DialogContent bg={darkMode ? '#0f172a' : 'white'} p={0}>
      <DialogHeader
        color={darkMode ? 'gray.100' : 'blackAlpha.800'}
        fontWeight={'semibold'}
        fontSize={'xl'}
      >
        Criar Sub-Tarefa
      </DialogHeader>
      <DialogBody>
        
      </DialogBody>

      <DialogFooter>
        <NegativeButtonComponent text='Cancelar' />
        <PositiveButtonComponent text='Criar' />
      </DialogFooter>
    </DialogContent>
  );
}
