import reviews from './reviews.json' with { type: 'json' };
import fs from 'fs/promises';
const withUid = reviews.map(review => {
  let uid = review.uid.slice(0, 8);
  uid = 'review-2025:' + uid;
  review.uid = uid;

  return review;
});

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const withAvatarUrl = withUid.map(review => {
  const randomNumber = randomBetween(1, 99);
  let avatar = '';

  if (review.gender === 'male') {
    avatar = `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
  } else {
    avatar = `https://randomuser.me/api/portraits/female/${randomNumber}.jpg`;
  }
  review.avatar = avatar;
  return review
});


 
   const outputFile = './reviews-data.json';
   const newReviewData = JSON.stringify(withAvatarUrl, null, 2)
   await fs.writeFile(outputFile,  newReviewData, 'utf8');


 


