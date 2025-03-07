import { PositiveButtonComponent } from "../common/Button";
import { DrawerContent, DrawerHeader, DrawerRoot, DrawerTrigger } from "../ui/drawer";

export function TestComponent() {
  return (
    <DrawerRoot>
      <DrawerTrigger>
        <PositiveButtonComponent text="Teste" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>Teste</DrawerHeader>
      </DrawerContent>
    </DrawerRoot>
  );  
}
