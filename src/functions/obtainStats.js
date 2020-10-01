const linksStats = (links) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === 'FAIL');
  const broken = failedLinks.length;
  // eslint-disable-next-line no-console
  console.log({ total, broken });
};

// The split method divides a String into an ordered list of substrings
// into an ordered list of substrings and returns an array.

const array = [[
  {
    url: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 404,
    statusText: 'OK',
  },
  {
    url: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 404,
    statusText: 'OK',
  },
  {
    url: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 404,
    statusText: 'OK',
  },
  {
    url: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
    statusText: 'OK',
  },
  {
    url: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
    statusText: 'OK',
  },

]];

const getUnique = (array) => {
  const output = [];
  const flags = {};
  for (let i = 0; i < array.length; i++) {
    if (flags[array[i].url]) continue;
    flags[array[i].url] = true;
    output.push(array[i].url);
  }
  return output.length;
};

console.log(getUnique(array));
