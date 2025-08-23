import { cn } from '@/lib/utils';

interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  filled: boolean;
}

const StarIcon = ({ className, filled }: StarIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? '#FFC107' : '#E0E0E0'}
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-5 w-5', className)}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default StarIcon;
