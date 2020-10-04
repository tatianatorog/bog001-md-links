const path = require('path');
const axios = require('axios');
const functions = require('../src/index.js');
// const arrayMock = require('./mock.js');


// afterEach(() => {
//   jest.clearAllMocks();
// });


jest.mock('axios');

// it('It should return a 200 status when the link is OK', () => {
//   jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
//     status: 200,
//     statusText: 'OK',
//   }));
//   const route = 'test/readmePrueba.md';
//   return functions.mdLinks(route, { validate: true }).then((links) => {
//     expect(links.length).toBe(4);
//     expect(links[0]).toEqual({
//       url: 'https://nodejs.org/',
//       text: 'Node.js',
//       file: '/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md',
//       status: 200,
//       statusText: 'OK',
//     });
//     expect(axios.get).toHaveBeenCalledTimes(4);
//     expect(axios.get).toHaveBeenCalledWith('https://nodejs.org/');
//   });
// });



it('validates an invalid link', (done) => {
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
      status: 404,
      statusText: 'FAIL' })
  );
  const route = 'test/readmePrueba.md';
  return functions.mdLinks(route, { validate: true }).then((links) => {
    expect(links[3]).toEqual({
      file: "/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md",
      status: 404,
      statusText: 'FAIL',
      text: "md-links",
      url: "http://servername/fcm.web/api/consolidation/history/jobs"
    })
    expect(axios.get).toHaveBeenCalledWith('http://servername/fcm.web/api/consolidation/history/jobs');
    done();
  })
});



// test('Falla cuando la url está mal escrita', () => {
//   //expect.assertions(1);
//   return functions.mdLinks('test/readmePrueba.md',{ validate: true }).catch((links) => {
//       //console.log(e.message); //Network Error
//       expect(links[3]).toEqual({
//         file: "/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md",
//         status: 404,
//         statusText: 'FAIL',
//         text: "md-links",
//         url: "http://servername/fcm.web/api/consolidation/history/jobs"
//       });
//   });
// });
// })
