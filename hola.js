const fs = require('fs');
const axios = require('axios');


// const expectMDLink = (/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, '$1')
const filesMDLinks = [];
const expectMDLink  = /\[([^\[]+)\](\(.*\))/gm
const linkify = require('linkify-it')();
// const expectMDLink = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm


/* ------------------------------------ */
const getLinksInFileMd = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, fileData) => {
      if(err){
        console.log('erro')
        reject(err)
      }
      else{

      console.log(linkify.match(fileData))
      }

    });
  });

  console.log(getLinksInFileMd("/Users/albalucia/Desktop/bog001-md-links/README.md"))
  // console.log(filesMDLinks)


  const searchFiles = (filepath) => {
    return new Promise ((resolve, reject) => {
    fs.readFile(filepath, "utf-8", function(err, data){
      if(err){
        console.log('erro')
        reject(err)
      }
      else{

        const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
        const array = data.match(regex);
        console.log(array)


      }
    });
    });
  };

  console.log(searchFiles("/Users/albalucia/Desktop/bog001-md-links/README.md"))


  const mdLinks = (file) => {
    return new Promise((resolve, reject) => {
   fs.readFile(file,'utf8', (err, data) => {
      if (err) {
        reject ('No encontrado');
      }else{
      const regEx = /\[([^\[\]]+)\]\/igm
      const matchRegex = data.match(regEx);
      const arrayRegex = [];
      matchRegex.forEach((element) =>{
      const infos = {
        text: `${element.match(/\[[^\[]+]/)}`,
        href: `${element.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i)}`,
        file: file
      };
      arrayRegex.push(infos)
    })
    // return resolve (arrayRegex)
    console.log(arrayRegex)
    }
    })
    })
  };
