
const utils = require('./obtainLinks');

const path = require('path');
const fs = require('fs');


const pathsFilesMd = [];
// const filesPromises = [];
// const  linksFiles = [];


const  getAbsolutePath = (userPath) => path.resolve(userPath)
const isDirectory = (absolutePath) => fs.statSync(absolutePath).isDirectory();
const isFile= (absolutePath) =>fs.statSync(absolutePath).isFile();
const checkMdExt =(absolutePath) =>  path.extname(absolutePath) === '.md'

const getFilesMd = (directory) =>{
  const files = fs.readdirSync(directory);
    for (let filename of files) {
        const filePath = path.join(directory, filename);
        if (isDirectory(filePath)) {
          getFilesMd(filePath);
        } else if (checkMdExt(filename)) {
          pathsFilesMd.push(filePath);
        }
    }
    return pathsFilesMd;
  }



  const dirOrFile = ( route) => {
    if (isFile(route) && checkMdExt(route)){
      return [route]
      }
    else if(isDirectory(route)) {
      return getFilesMd(route)

    }else {
      return []
    }


  };

  module.exports = dirOrFile

