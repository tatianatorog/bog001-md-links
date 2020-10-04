const path = require('path');
const functions = require('../src/index.js');
const arrayMock = require('./mock.js');

it('It should read files it', () => {
  const route = path.resolve('/Users/albalucia/Desktop/bog001-md-links/test/directory');
  return functions.mdLinks(route, { validate: false }).then((links) => {
    expect(links.length).toBe(6);
  });
});
