import { cn } from 'lib/utils';
import { ReactNode } from 'react';

interface NavBarProps {
  children?: ReactNode;
  className?: string;
}

function NavBar({ className }: NavBarProps) {
  return (
    <nav className={cn('text-inherit', className)}>
      <ul className='flex items-center justify-between'>
        <li>branding</li>
        <li>
          <h2>Heading Inside of NavBar Component</h2>
        </li>
        <li>button</li>
      </ul>
    </nav>
  );
}

export default NavBar;
