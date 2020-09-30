const mock = require('/Users/albalucia/Desktop/bog001-md-links/test/mock.js');
const path = require('path');
const findLinksInMd = require('/Users/albalucia/Desktop/bog001-md-links/src/readFile.js');



test('Retorna los personajes de Rick & Morty', () => {
  return expect(findLinksInMd("readmePrueba.md")).resolves.toHaveProperty('href');
});

// test.only('Falla cuando la url está mal escrita', () => {
//   const myerror = new Error('Network Error');
//   return expect(getCharacters('holi')).rejects.toEqual(myerror);
// });









