const path = require('path');
const axios = require('axios');
const functions = require('../src/index.js');
const arrayMock = require('./mock.js');
 jest.mock('axios');


describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof functions.mdLinks).toBe('function');
  });

  it('It should read a Markdown file and extract the links from it', () => {
    const route = path.resolve('test/readmePrueba.md');
    return functions.mdLinks(route, { validate: false }).then((links) => {
      expect(links.length).toBe(4);
      expect(links).toEqual(arrayMock);
    });
  });

  // it('Fails when there are not links in file', () => {
  //   const userPath = 'test/readmeNoLinks.md';
  //   return functions.mdLinks(userPath, { validate: false }).catch((e) => {
  //     expect(e.message).toBe('No links found it');
  //   });
  // });

  test('should throw an error if the path is not correct', () => {
    expect(() => {
      const userPath = 'course/readmeNoLinks.md';
      functions.mdLinks(userPath, { validate: false });
    }).toThrow('No such a file o directory');
  });

  it('It should return a 200 status when the link is OK', () => { //deberia retornar 200 cuando el link esta bien
  jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
      status: 200,
      statusText: 'OK',
    }));
    const route = 'test/readmePrueba.md';
    return functions.mdLinks(route, { validate: true }).then(links => {
      console.log(links)
      expect(axios).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://nodejs.org/');
      expect(links.length).toBe(8);
      expect(links[4]).toEqual({
        url: 'https://nodejs.org/',
        text: 'Node.js',
        file: '/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md',
        status: 200,
        statusText: 'OK',
      });
    });
  });
});
