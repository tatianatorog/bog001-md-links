const path = require('path');
const functions = require('../src/index.js');
const arrayMock = require('./mock.js');

it('It should return empty', () => {
  const userRoute = path.resolve('src/functions/obtainStats.js');
  return functions.mdLinks(userRoute, { validate: false }).then((links) => {
    expect(links).toEqual([]);
  });
});
