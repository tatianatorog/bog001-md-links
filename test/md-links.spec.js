const path = require('path');
const functions = require('../src/index.js');
const arrayMock = require('./mock.js');



describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof functions.mdLinks).toBe('function');
  });
});

it('It should read a Markdown file and extract the links from it', () => {
  const route = path.resolve('test/readmePrueba.md');
  return functions.mdLinks(route, { validate: false }).then((links) => {
    expect(links.length).toBe(4);
    expect(links).toEqual(arrayMock);
  });
});

it('Fails when there are not links in file', () => {
  const userPath = 'test/readmeNoLinks.md';
  return functions.mdLinks(userPath, { validate: false }).catch((e) => {
    expect(e.message).toBe('No links found it');
  });
});

test('should throw an error if the path is not correct', () => {
  expect(() => {
    const userPath = 'course/readmeNoLinks.md';
    functions.mdLinks(userPath, { validate: false });
  }).toThrow("Path: NOT FOUND (check the NAME of DIR \\ FILE or .md) )");
});

