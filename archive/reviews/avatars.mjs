async function getRandomPortrait() {
  const response = await fetch('https://source.unsplash.com/random/400x400/?man,portrait', { redirect: 'follow' });
  console.log(response.url); // This is the actual image URL
}

getRandomPortrait();