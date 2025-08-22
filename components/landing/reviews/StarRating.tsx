// StarRating.tsx
import { cn } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/20/solid'

interface StarRatingProps {
  rating: number
  average: number
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, average, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-5', 
    lg: 'size-6'
  }

  return (
    <span className={cn(
      // Base classes
      'shrink-0 transition-colors duration-200',
      // Conditional color
      average > rating ? 'text-yellow-400' : 'text-gray-300',
      // Dynamic size
      sizeClasses[size]
    )}>
      ⭐
    </span>
  )
}