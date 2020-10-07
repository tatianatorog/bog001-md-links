const path = require('path');
const mdLinks = require('../src/index.js');
const arrayMock = require('./mock.js');

describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
});

it('It should return empty', () => {
  const userRoute = path.resolve('src/functions/obtainStats.js');
  return mdLinks(userRoute, { validate: false }).then((links) => {
    expect(links).toEqual([]);
  });
});

it('Should read a Markdown file and extract the links from it', () => {
  const route = path.resolve('test/readmePrueba.md');
  return mdLinks(route, { validate: false }).then((links) => {
    expect(links).toHaveLength(4);
    expect(links).toEqual(arrayMock);
  });
});

it('Fails when there are not links in file', () => {
  const userPath = 'test/readmeNoLinks.md';
  return mdLinks(userPath, { validate: false }).catch((e) => {
    expect(e.message).toBe('No links found it');
  });
});

it('It should read files it', () => {
  const route = path.resolve(
    '/Users/albalucia/Desktop/bog001-md-links/test/directory',
  );
  return mdLinks(route, { validate: false }).then((links) => {
    expect(links).toHaveLength(14);
  });
});

it('should throw an error if the path is not correct', () => {
  expect(() => {
    const userPath = 'course/readmeNoLinks.md';
    mdLinks(userPath, { validate: false });
  }).toThrow('Path: NOT FOUND (check the NAME of DIR \\ FILE or .md) )');
});
