import { Menubar, MenubarMenu, MenubarTrigger } from 'components/ui/menubar';
import { cn } from '@/lib/utils';
interface MenuBarProps {
  className?: string;
}

export function MenuBar({ className }: MenuBarProps) {
  return (
    <Menubar className={cn('rounded-none py-1 px-3 flex items-center justify-between', className)}>
      <MenubarMenu>
        <MenubarTrigger></MenubarTrigger>
        <MenubarTrigger>Heading</MenubarTrigger>
        <MenubarTrigger>Menu</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default MenuBar;
