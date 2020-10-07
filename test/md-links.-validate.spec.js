const axios = require('axios');
const mdLinks = require('../src/index.js');

jest.mock('axios');

it('It should return a 200 status when the link is OK', (done) => {
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
    status: 200,
    statusText: 'OK',
  }));
  const route = 'test/readmePrueba.md';
  return mdLinks(route, { validate: true }).then((links) => {
    expect(links).toHaveLength(4);
    expect(links[0]).toEqual({
      url: 'https://nodejs.org/',
      text: 'Node.js',
      file: '/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md',
      status: 200,
      statusText: 'OK',
    });
    expect(axios.get).toHaveBeenCalledTimes(4);
    expect(axios.get).toHaveBeenCalledWith('https://nodejs.org/');
    done();
  });
});
