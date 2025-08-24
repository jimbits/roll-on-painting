import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface DynamicSvgProps {
  children?: ReactNode;
  className?: string;
}

function DynamicSvg({ className }: DynamicSvgProps) {
  return <div className={cn('text-inherit', className)}></div>;
}

export default DynamicSvg;
