const fs = require('fs');

const getLinksInMd = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", function (err, data) {
      const regex = /\[([^\[]+)\](\(.*\))/gm;
      if (err) {
        reject(new Error("No such a file"))
      } else if(data.match(regex)){
        const arrayOfLinks= data.match(regex)
        const links = arrayOfLinks.map((item) => {
          const textHrefDivide = item.split("](")
          const text = textHrefDivide[0].replace("[", "");
          const href = textHrefDivide[1].replace(")", "");
        return ({ href, text, path });
        });
        const blacklist = "#"
        const getLinksWithUrl =links.filter((object) => !object.href.startsWith(blacklist));
          resolve(getLinksWithUrl)
      }else{
        reject(new Error("No links found it"))
      }
    });
  });
};

const getLinksOfFiles = (pathsMdFiles) => {
  const filesPromises = [];
  pathsMdFiles.forEach((file) => filesPromises.push(getLinksInMd(file)));
  return filesPromises
  };

const utils = {}
utils.getLinksOfFiles = getLinksOfFiles
utils.getLinksInMd= getLinksInMd

module.exports = utils;



// module.exports = filesPromises
