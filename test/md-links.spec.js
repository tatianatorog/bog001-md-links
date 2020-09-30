// const mock = require('/Users/albalucia/Desktop/bog001-md-links/test/mock.js');
const path = require('path');
const arrayMock = require('./mock.js');
// const findLinksInMd = require('../src/functions/obtainLinks.js');
const utils = require('../src/functions/obtainLinks.js')

describe('getLinks', () => {

  it('Should be a function', () => {
    expect(typeof utils.getLinksInMd).toBe('function');
  });
});

it('Should be an array of objects', () => {
  const userPath = 'test/readmePrueba.md';
  return utils.getLinksInMd(userPath).then(links => {
      expect(links).toEqual(arrayMock)
  })
});

it('Fails when there are not links in file', () => {
  const userPath = 'test/readmeNoLinks.md';
  return utils.getLinksInMd(userPath).catch(e => {
      expect(e.message).toBe('No links found it')
  });
});

it('Fails when the path is not correct', () => {
  const userPath = 'course/readmeNoLinks.md';
  return utils.getLinksInMd(userPath).catch(e => {
      expect(e.message).toBe("No such a file")
  });
});










