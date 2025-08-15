import { Menubar, MenubarMenu, MenubarTrigger } from 'components/ui/menubar';

interface MenuBarProps {
  //Add your props here
}

export function MenuBar({}: MenuBarProps) {
  return (
    <Menubar className='rounded-none py-1 px-3 flex items-center justify-between'>
      <MenubarMenu>
        <MenubarTrigger></MenubarTrigger>
        <MenubarTrigger>Heading</MenubarTrigger>
        <MenubarTrigger>Menu</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export default MenuBar;
