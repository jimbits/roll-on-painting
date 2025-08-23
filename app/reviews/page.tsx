import { ReviewCard } from '@/components/sections/reviews/ReviewCard';
import { reviewData } from '@/components/sections/reviews/reviewData';
import ReadMore from '@/components/sections/reviews/ReadMore';
import AverageReviews from '@/components/sections/reviews/AverageReviews';
import { cn } from '@/lib/utils';

export default function ReviewsPage() {
  return (
    <section className="max-w-8xl container mx-auto sm:p-0">
      <div>
        <header className="mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-4xl">
            Customer Reviews
          </h2>
          <h3 className="text-2xl font-bold tracking-tight text-pretty text-gray-700 md:text-4xl lg:text-4xl">
            Edmonton Interior & Exterior House Painting
          </h3>
        </header>
      </div>

      <div className="md:flex md:items-center md:justify-between md:gap-12">
        <p className={cn('order-2 mb-6 text-base leading-snug text-gray-500')}>
          Roll On Painting went through a rebrand this summer 2025. We were formaly called NCS
          Painting. The following reviews are from our HomeStars profile. HomeStars rate NCS
          Painting as one of there top House Painting services in Edmonton.
        </p>
        <AverageReviews className="order-1 mb-12 max-w-[560px] sm:mx-auto md:mx-0 md:bg-gray-50 md:px-3 md:py-7 md:shadow-md" />
      </div>

      <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 md:mb-10 lg:text-3xl">
        House Painting Reviews
      </h2>
      <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        {reviewData.map(review => (
          <ReviewCard key={review.job} review={review} className="max-w-lg" />
        ))}
      </div>
    </section>
  );
}
