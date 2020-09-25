// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const pathToCheck = "/Users/albalucia/Desktop/curso/modulos/prueba.md"


// AXIOS Realizar peticiones HTTP desde Nodejs.
// Transforma automáticamente la información en formato JSON.


const findLinksInMd = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", function (err, data) {
      const regex = /\[([^\[]+)\](\(.*\))/gm;
      const arrayOfLinks = data.match(regex);
      if (err) {
        console.log('No found')
        reject(err)
      }
      if (!arrayOfLinks) {
        console.log("No links found it")
        reject(err)
      } else {
        const links = arrayOfLinks.map((item) => {
          const textHrefDivide = item.split("](")
          const text = textHrefDivide[0].replace("[", "");
          const href = textHrefDivide[1].replace(")", "");
          return ({ href, text, path });
        });
        resolve(links)
      }
    });
  });
};






// AXIOS Realizar peticiones HTTP desde Nodejs.
// Transforma automáticamente la información en formato JSON.
const linkValidate = (url, text, path) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ url: url, text: text, file: path, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ url: url, text: text, file: path, status: 404, statusText: 'FAIL' }))
  );

const linksValidatePromises = [];

const resolveValidate = (links) => {
  links.map(({ href, text, path }) =>
    linksValidatePromises.push(linkValidate(href, text, path))
  );
  Promise.all(linksValidatePromises)
    .then((stats) => {
      // return (stats)
      console.log(stats)
        ;
    })
    .catch(() => reject(new Error(`No links to validate were found on the ${path}`)));
};



// console.log(resolveValidate([
//   {
//     href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
//     text: 'Leer un archivo',
//     path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
//   },
//   {
//     href: 'https://nodejs.org/404',
//     text: 'Leer un directorio',
//     path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
//   },
//   {
//     href: 'https://nodejs.omedium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
//     text: 'Path',
//     path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
//   }]))


const linksStats = (links) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === 'FAIL');
  const broken = failedLinks.length
  console.log({ total, broken })
};
// The split method divides a String into an ordered list of substrings into an ordered list of substrings and returns an array.

console.log(linksStats([
  {
    url: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 404,
    statusText: 'OK'
  },
  {
    url: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 404,
    statusText: 'OK'
  },
  {
    url: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
    statusText: 'OK'
  }
]))



const arrayOfPaths = ['/Users/albalucia/Desktop/bog001-md-links/readmePrueba copy.md', "/Users/albalucia/Desktop/bog001-md-links/readmePrueba.md"]
const filesPromises = [];

const getLinksOfFiles = (pathsMdFiles) => {
pathsMdFiles
  .reverse()
  .forEach((file) => filesPromises.push(findLinksInMd(file)));
};
// console.log(getLinksOfFiles(arrayOfPaths))
// console.log(getLinksOfFiles(arrayOfPaths))

// })
findLinksInMd(pathToCheck)
.then((links)=> {
  return resolveValidate(links)
})
.then((stats)=> {
  // console.log(stats)
  return resolveValidate(stats)})


  // .then((links)=> {return resolveValidate(links) })
// .catch(error => console.error(error));
