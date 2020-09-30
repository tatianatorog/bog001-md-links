// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const dirOrFile = require("./functions/obtainFilesMd")
const getLinksOfFiles = require('./functions/obtainLinks');
const utils = require('./functions/obtainLinks')

/* ------------------------------------ */

const getAbsolutePath = (userPath) => path.resolve(userPath)
const linksValidatePromises = [];


/* ------------------------------------ */


// console.log(getLinksOfFiles( 'README.md' ))


// "/Users/albalucia/Desktop/bog001-md-links/README.md"
// console.log(getLinksOfFiles(dirOrFile("/Users/albalucia/Desktop/curso/")))


// AXIOS Realizar peticiones HTTP desde Nodejs.
// Transforma automáticamente la información en formato JSON.
/* ------------------------------------ */
const linkValidate = (url, text, path) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ url: url, text: text, file: path, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ url: url, text: text, file: path, status: 404, statusText: 'FAIL' }))
  );


const resolveValidate = (links) => {
  links.forEach(({ href, text, path }) => {
    if (!/^https?:\/\//i.test(href)) {
      href = 'http://' + href;
    };
    linksValidatePromises.push(linkValidate(href, text, path))
  });
  return Promise.all(linksValidatePromises)
    .catch(() => (new Error("No internet connection")));
};

/* ------------------------------------ */




/* ------------------------------------ */
// const arrayOfPaths = ['./readmePrueba.md', "/Users/albalucia/Desktop/bog001-md-links/readmePrueba.md"]



// console.log(getLinksOfFiles(arrayOfPaths))




/* ------------------------------------ */


const mdLinks = (route, { validate }) => {
  const pathRoute = getAbsolutePath(route);
  if (fs.existsSync(pathRoute)) {
    const arrayFiles = dirOrFile(pathRoute);
    return Promise.all(utils.getLinksOfFiles(arrayFiles))
      .then((links) => (links.flat()))
      .then((res) => {
        if (validate) {
          return resolveValidate(res)
        } else {
          console.log("links w/o options ", res)
          return res

        }
      })
  } else {
    throw Error("No such a file o directory")
  }
}


//!!oObject // non inverted boolean so true boolean representation




mdLinks("/Users/albalucia/Desktop/bog001-md-links/test/readmePrueba.md", { validate: true })
  .then((links) => console.log(links))

