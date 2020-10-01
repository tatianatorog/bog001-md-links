const functions = require('/Users/albalucia/Desktop/bog001-md-links/src/index.js');
const axios = require('axios'); // mock of axios

it('Validates a valid link', () => {
  // setup
  axios.get.mockImplementation(() =>
    //
    Promise.resolve({ data: {}, status: 200, statusText: 'OK' }));

  // work
  functions.linkValidate('https://google.com').then((result) => {
    // expect
    expect(result).toEqual({ status: 200, statusText: 'OK' });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://google.com');
    done(); // function that means the code is done
  });
});

it('validates an invalid link', (done) => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {}, status: 404, statusText: 'FAIL' })
  );
  functions.linkValidate('123', 'http://localhost:3000').then((result) => {
    expect(result).toEqual({ id: '123', status: 404, statusText: 'FAIL' });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith('http://localhost:3000');
    done();
  });
});
