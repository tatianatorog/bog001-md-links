// module.exports = () => {
//   // ...
// };

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const pathToCheck = "README.md"

/* ------------------------------------ */
const  getAbsolutePath = (userPath) => path.resolve(userPath)
const isDirectory = (absolutePath) => fs.statSync(absolutePath).isDirectory();
const isFile= (absolutePath) =>fs.statSync(absolutePath).isFile();
const checkMdExt =(absolutePath) =>  path.extname(absolutePath) === '.md'

/* ------------------------------------ */
const pathsFilesMd = [];
const filesPromises = [];
const  linksFiles = [];

/* ------------------------------------ */


/* ------------------------------------ */

const getLinksOfFiles = (pathsMdFiles) => {
  pathsMdFiles.forEach((file) => filesPromises.push(findLinksInMd(file)));
  Promise.all(filesPromises)
          .then((res) => console.log(res.flat()))
  };



const dirOrFile = ( route) => {
  if (isFile(route) && checkMdExt(route)){
    getLinksOfFiles([route])
    // findLinksInMd(route)
    // .then((links)=> {
    // console.log(links)
}
  if(isDirectory(route)) {
  getLinksOfFiles(getFilesMd(route))

  //  Promise.all(linksValidatePromises)
  //   .then((stats) => {
  //      console.log(stats)

  //   })

  }
};

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

const linksValidatePromises = [];

const resolveValidate = (links) => {
  links.forEach(({ href, text, path }) =>{
  if (!/^https?:\/\//i.test(href)) {
    href = 'http://' + href;
    };
    linksValidatePromises.push(linkValidate(href, text, path))
});
  Promise.all(linksValidatePromises)
    .then((stats) => {
       console.log(stats)

    })
    .catch(() => reject(new Error(`No links to validate were found on the ${path}`)));
};

/* ------------------------------------ */
const getLinksInFiles = (linksInFile) => {
  linksInFile.forEach((file) => linksFiles.push(resolveValidate(file)));
  Promise.all(filesPromises)
          .then((res) => console.log(res))
  };



/* ------------------------------------ */
// const arrayOfPaths = ['./readmePrueba.md', "/Users/albalucia/Desktop/bog001-md-links/readmePrueba.md"]



// console.log(getLinksOfFiles(arrayOfPaths))


// console.log(getLinksInFiles([

//   {
//     href: 'wikipedia.org/wiki/Markdown',
//     text: 'Markdown',
//     path: '/Users/albalucia/Desktop/curso/modulos/hola/ok.md'
//   },
//   {
//     href: 'https://nodejs.org/',
//     text: 'Node.js',
//     path: '/Users/albalucia/Desktop/curso/modulos/hola/ok.md'
//   },
//   {
//     href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
//     text: 'md-links',
//     path: '/Users/albalucia/Desktop/curso/modulos/hola/ok.md'
//   }


// ]]))

/* ------------------------------------ */
const linksStats = (links) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === 'FAIL');
  const broken = failedLinks.length
  console.log({ total, broken })
}




// The split method divides a String into an ordered list of substrings into an ordered list of substrings and returns an array.

const array= [[
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
  },
  {
    url: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '/Users/albalucia/Desktop/bog001-md-links/README.md',
    status: 200,
    statusText: 'OK'
  },

]]

// var flags = [], output = [], l = array.length, i;
// for( i=0; i<l; i++) {
//     if( flags[array[i].age]) continue;
//     flags[array[i].age] = true;
//     output.push(array[i].age);
// }


const getUnique = (array)  => {
let output = [];
let flags = {};
for( i=0; i<array.length; i++) {
    if( flags[array[i].url]) continue;
    flags[array[i].url] = true;
    output.push(array[i].url);
}
 return output.length
}

console.log(getUnique(array))
// console.log(l)

// const unique = [...new Set(data.map(item => item.group))];



// findLinksInMd ()
// .then((links)=> {
//   return resolveValidate(links)
// })
// .then((stats)=> {
//   console.log(stats)
//   //  return resolveValidate(stats)
// })
// .catch((error)=>
// console.log(error))

  // .then((links)=> {return resolveValidate(links) })
// .catch(error => console.error(error));


const mdLinks = (route, options) => {
      const pathRoute = getAbsolutePath(route);
      if (fs.existsSync(pathRoute)) {
        dirOrFile(pathRoute)
        // if (!!options && options.validate){
          // getLinksInFiles( dirOrFile(pathRoute))
          // dirOrFile(pathRoute)
          // .then((links)=> {
          //     return resolveValidate(links)
          //   })

        // }
      }
    }

    // "./some/example.md", { validate: true }
    //!!oObject // non inverted boolean so true boolean representation




  console.log(mdLinks("/Users/albalucia/Desktop/bog001-md-links/readmePrueba.md",{ validate: true } ))

