const fs = require('fs');
// import findLinksInMd from "index.js"
const arrayOfPaths = ['/Users/albalucia/Desktop/curso/conceptos/hola.md', "README.md"]


const filesPromises = [];


const getLinksOfFiles = (pathsMdFiles) => {
pathsMdFiles
  .reverse()
  .forEach((file) => filesPromises.push(resolv(file)));
};

console.log(getLinksOfFiles(arrayOfPaths))



