import { StarIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

interface AverageReviewsProps {
  className?: string;
}
const reviews = {
  average: 4,
  totalCount: 49,
  counts: [
    { rating: 5, count: 49 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ],
};

export default function AverageReviews({ className }: AverageReviewsProps) {
  return (
    <div className={cn('bg-white', className)}>
      <h2 className="text-lg font-bold tracking-tight text-gray-900">Home Star Reviews</h2>
      <div className="flex items-center">
        <div>
          {/* Builds the stars based on the */}
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map(rating => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={cn(
                  reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                  'size-5 shrink-0'
                )}
              />
            ))}
          </div>
          <p className="sr-only">{reviews.average} out of 5 stars</p>
        </div>
        <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Review data</h3>
        {/* Reviews Render */}
        <dl className="space-y-3">
          {reviews.counts.map(count => (
            <div key={count.rating} className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-gray-900">
                  {count.rating}
                  <span className="sr-only"> star reviews</span>
                </p>
                <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                  <StarIcon
                    aria-hidden="true"
                    className={cn(
                      count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                      'size-5 shrink-0'
                    )}
                  />

                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    {count.count > 0 ? (
                      <div
                        style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right text-sm text-gray-900 tabular-nums">
                {Math.round((count.count / reviews.totalCount) * 100)}%
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
