const path = require('path');
const fs = require('fs');

const findLinksInMd = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", function (err, data) {
      const regex = /\[([^\[]+)\](\(.*\))/gm;
      const arrayOfLinks= data.match(regex)
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
        const blacklist = ["#"]
        const getLinksWithUrl =links.filter((object) => !object.href.startsWith(blacklist));
      resolve(getLinksWithUrl)
      }
    });
  });
};



module.export = findLinksInMd

