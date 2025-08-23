// testData/reviewData.ts

interface ReviewData {
  reviewer: {
    fullName: string;
    location: string;
    date: string;
  };
  rating: string;
  job: string;
  review: string;
}

// Export the test data array with proper typing
export const reviewData: ReviewData[] = [
  {
    reviewer: {
      fullName: 'Bruce Penny',
      location: 'Edmonton',
      date: '22 Aug 2025',
    },
    rating: '5',
    job: 'Exterior painting: Detached house',
    review:
      'Niall did a great job. Quote was very reasonable, he showed up on time and finished the job in good time. Painting was very well done, he kept a tidy job site and cleaned up everything at the end of the job.',
  },
  {
    reviewer: {
      fullName: 'Dawn Ritz',
      location: 'Calgary',
      date: '8 Aug 2021',
    },
    rating: '5',
    job: 'Condo Painting',
    review:
      'I hired Niall, of NCS Painting & Design, to paint my condo. Niall did a beautiful job despite challenges he encountered, and left the place all cleaned up. The job came in precisely on budget. I’m very pleased.',
  },
  {
    reviewer: {
      fullName: 'Home Owner',
      location: 'Edmonton',
      date: '17 June 2022',
    },
    rating: '5',
    job: 'Paint a Backyard Deck',
    review:
      'We received quotes from 3 companies and met with 2 of them. Niall was super easy to work with (no big sales talk, no stress at all). He just looked at the deck to assess what was needed, gave a brief accounting of the work he would do (sanding, preparation, matching paint colour and 2 coats of paint), gave dates when he could schedule the work (perfectly within our requested time frame), said he could finish in 1-1/2 to 2 days, and gave a very reasonable quote. All within about 10-15 minutes. Then, he came and did the job perfectly and exactly as he said he would, with absolutely complete clean-up after. So excellent, it looks great! We could not be happier! It was such a pleasure to work with Niall. We would certainly work with him again and recommend him for any paint job.',
  },
  {
    reviewer: {
      fullName: 'Gail Knutson',
      location: 'Edmonton',
      date: '22 July 2021',
    },
    rating: '5',
    job: 'Beautiful interior paint job',
    review:
      'Decent work but took longer than expected. The final result was good but there were some delays in the schedule that caused inconvenience.',
  },

  {
    reviewer: {
      fullName: 'Home Owner',
      location: 'Edmonton',
      date: '8 July 2019',
    },
    rating: '5',
    job: 'Interior House Painting',
    review:
      'I had most of my main floor painted. Niall did prep work, and painted ceiling, walls, and trim. He was punctual, thorough, and asked questions. When it turned out the paint I had purchased was not good (it had the coverage of chocolate milk), he showed up early the next day so we could come up with a game plan. I ended up getting another paint, which he picked up from the store. I really appreciated him coming to me with his concern and that this roadblock did not cause me to take time or energy out of my own work. The painting he did was good, but a few spots needed touchups. I brought up the couple missed spots, and he was happy to come back to make the touchups. Niall has great work ethic and made sure that I got the paint job I was looking for.',
  },
];

// Export individual review for single component testing
export const singleReviewData: ReviewData = reviewData[0];

// Export the interface for other files to import
export type { ReviewData };
