module.exports= {
  get:jest.fn(() => Promise.resolve({ data: {} }))
};


// To get around making an actual HTTP request we  mock the axios library by using Jest's mock functionality.
// Default value to return which is a promise that resolves to an object.
// This will be override later in our tests with something more specific.

