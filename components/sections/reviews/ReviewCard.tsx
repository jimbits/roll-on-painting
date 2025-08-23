import StarRating from './StarRating';
import { type ReviewData } from './reviewData';
import { cn } from '@/lib/utils';
import ReadMore from './ReadMore';
interface ReviewCardProps {
  review: ReviewData;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <aside className={cn('max-w-screen', className)}>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <StarRating className="w-[100px]" rating={Number(review.rating)} />
      </div>
      <div className="flex items-center">
        <h3 className="border-r pr-2 text-lg font-bold text-gray-900">
          {review.reviewer.fullName}
        </h3>
        <p className="pl-2 font-medium text-gray-600">{review.reviewer.location}</p>
      </div>
      <h2 className="pt-1.5 leading-snug font-bold">Job: {review.job}</h2>
      <ReadMore text={review.review} maxWords={25} className="" />
    </aside>
  );
}
