// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs');
const axios = require('axios');

// //joining path of directory
// const directoryPath = path.join("/Users/albalucia/Desktop/curso/", 'modulos');
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file);
//     });
// });

const crawl = (dir) => {
  console.log('[+]', dir);
  let files = fs.readdirSync(dir);
  for (let x in files) {
    let next = path.join(dir, files[x]);
    //console.log(next);
    if (fs.lstatSync(next).isDirectory() == true) {
      crawl(next);
    }
    else {
      console.log(next);
    }
  }
}

console.log(crawl("/Users/albalucia/Desktop/curso/"))


// AXIOS Realizar peticiones HTTP desde Nodejs.
// Transforma automáticamente la información en formato JSON.


const findLinksInMd = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", function (err, data) {
      const regex = /\[([^\[]+)\](\(.*\))/gm;
      const array = data.match(regex);
      if (err) {
        console.log('No found')
        reject(err)
      }
      if (!array) {
        console.log("No links found it")
      } else {
        const links = array.map((item) => {
          const textHrefDivide = item.split("](")
          const text = textHrefDivide[0].replace("[", "");
          const href = textHrefDivide[1].replace(")", "");
          return ({ href, text, path });
        });
        resolve (links)
      }
    });
  });
};

console.log(findLinksInMd("/Users/albalucia/Desktop/bog001-md-links/readmePrueba.md"))

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
  links.forEach(({ href, text, path }) =>
    linksValidatePromises.push(linkValidate(href, text, path))
  );
  Promise.all(linksValidatePromises)
    .then((stats) => {
      // resolve(stats)
      console.log(stats)
        ;
    })
    .catch(() => reject(new Error(`NOT founds links to validate ${path}`)));
};

console.log(resolveValidate([
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    text: 'Leer un archivo',
    path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
  },
  {
    href: 'https://nodejs.org/404',
    text: 'Leer un directorio',
    path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
  },
  {
    href: 'https://nodejs.omedium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Path',
    path: '/Users/albalucia/Desktop/bog001-md-links/README.md'
  }]))


const linksStats = (links) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === 'FAIL');
  const broken = failedLinks.length
  console.log({ total, broken })
};
// The split methode divides a String into an ordered list of substrings into an ordered list of substrings and returns an array.

console.log(linksStats([
  {
    url: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
    statusText: 'OK'
  },
  {
    url: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
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


