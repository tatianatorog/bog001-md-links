/* eslint-disable no-console */
// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const dirOrFile = require('./functionsobtainFilesMd');
const utils = require('./functions/obtainLinks');

/* ------------------------------------ */

const getAbsolutePath = (userPath) => path.resolve(userPath);
const linksValidatePromises = [];

/* ------------------------------------ */

/* AXIOS Realizar peticiones HTTP desde Nodejs.
Transforma automáticamente la información en formato JSON. */
/* ------------------------------------ */
const linkValidate = (url, text, file) => new Promise((resolve) => axios.get(url)
  .then((res) => resolve({
    url, text, file, status: res.status, statusText: res.statusText,
  }))
  .catch(() => resolve({
    url, text, file, status: 404, statusText: 'FAIL',
  })));

const resolveValidate = (links) => {
  links.forEach(({ href, text, file }) => {
    let url = href;
    if (!/^https?:\/\//i.test(href)) {
      url = `http://${href}`;
    }
    linksValidatePromises.push(linkValidate(url, text, file));
  });
  return Promise.all(linksValidatePromises)
    .catch(() => (new Error('No internet connection')));
};

/* ------------------------------------ */

/* ------------------------------------ */

// console.log(getLinksOfFiles(arrayOfPaths))

/* ------------------------------------ */

const mdLinks = (route, { validate }) => {
  const pathRoute = getAbsolutePath(route);
  if (fs.existsSync(pathRoute)) {
    const arrayFiles = dirOrFile(pathRoute);
    return Promise.all(utils.getLinksOfFiles(arrayFiles))
      .then((links) => links.flat())
      .then((res) => {
        if (validate) {
          return resolveValidate(res);
        }
        // console.log('links w/o options ', res);
        return res;
      });
  }
  throw Error('No such a file o directory');
};

//! !oObject // non inverted boolean so true boolean representation
// mdLinks('/Users/albalucia/Desktop/curso', { validate: true })
//   .then((links) => console.log(links));

const functions = {};
functions.linkValidate = linkValidate;
functions.mdLinks = mdLinks;
module.exports = functions;
