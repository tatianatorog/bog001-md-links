const fs = require('fs');

const getLinksInMd = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    const regex = /\[([^[]+)\](\(.*\))/gm;
    // if (err) {
    //   reject(new Error('No such a file'));
   if (data.match(regex)) {
      const arrayOfLinks = data.match(regex);
      const links = arrayOfLinks.map((item) => {
        const textHrefDivide = item.split('](');
        const text = textHrefDivide[0].replace('[', '');
        const href = textHrefDivide[1].replace(')', '');
        return ({ href, text, file });
      });
      const blacklist = '#';
      const getLinksWithUrl = links.filter((object) => !object.href.startsWith(blacklist));
      resolve(getLinksWithUrl);
    } else {
      reject(new Error('No links found it'));
    }
  });
});
const filesPromises = [];
const getLinksOfFiles = (pathsMdFiles) => {
  pathsMdFiles.forEach((fileMd) => filesPromises.push(getLinksInMd(fileMd)));
  return filesPromises;
};

// console.log(getLinksOfFiles([
//   'test/directory/concepts/fundamentals/async/testing.md',
//   'test/directory/concepts/fundamentals/introduction.md',
//   'test/directory/readmeA.md',
// ]));

// console.log(filesPromises)

const utils = {};
utils.getLinksOfFiles = getLinksOfFiles;
utils.getLinksInMd = getLinksInMd;

module.exports = utils;
