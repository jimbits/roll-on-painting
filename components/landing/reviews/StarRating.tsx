import { cn } from '@/lib/utils';
import StarIcon from './StarIcon';
interface StarRatingProps {
  rating: number;
  className?: string;
  starStyles?: string;
}

const StarRating = ({ rating, className = '', starStyles = '' }: StarRatingProps) => {
  // Ensure rating is between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex items-center')}>
        {[1, 2, 3, 4, 5].map(starNumber => (
          <StarIcon key={starNumber} filled={starNumber <= clampedRating} className={starStyles} />
        ))}
      </div>
      <span>{rating}/5</span>
    </div>
  );
};

export default StarRating;
