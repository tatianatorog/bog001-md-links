const path = require('path');
const fs = require('fs');

const isDirectory = (absolutePath) => fs.statSync(absolutePath).isDirectory();
const isFile = (absolutePath) => fs.statSync(absolutePath).isFile();
const checkMdExt = (absolutePath) => path.extname(absolutePath) === '.md';

let pathsFilesMd = [];
const getFilesMd = (directory) => {
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
};

const dirOrFile = (route) => {
  if (isFile(route) && checkMdExt(route)) {
    return [route];
  }
  if (isDirectory(route)) {
    return getFilesMd(route);
  }
  // eslint-disable-next-line no-console
  // console.error(chalk.red(('The library only analyze md files'))
  return [];
};

module.exports = dirOrFile;


