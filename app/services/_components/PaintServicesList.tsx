import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PaintServiceListProps {
  children?: ReactNode;
  className?: string;
}

function PaintServiceList({ className }: PaintServiceListProps) {
  return <ul className={cn('text-inherit', className)}>{null}</ul>;
}

export default PaintServiceList;
