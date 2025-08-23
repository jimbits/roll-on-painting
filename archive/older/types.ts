// components/MobileMenu/MobileMenu.types.ts
import { ReactNode } from 'react';

export interface MobileMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface MobileMenuProps {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface MobileMenuPanelProps {
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface MobileMenuOverlayProps {
  className?: string;
}
