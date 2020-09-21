const fs = require('fs');
const path = require('path');

  const file = path.join(__dirname, 'testeparaleitura.md')

  const mdLinks = (file) => {
    return new Promise((resolve, reject) => {
   fs.readFile(file,'utf8', (err, data) => {
      if (err) {
        reject ('No encontrado');
      }else{
      const regEx = /\[([^\[\]]+)\]\((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])\)/igm
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

  console.log(mdLinks("/Users/albalucia/Desktop/bog001-md-links/README.md"))

  // /\[(?<text>.+)\]\((?<url>[^ ]+)(?: "(?<title>.+)")?\)/gm

  const linkValidate = (id, url) =>
  new Promise((resolve) =>
    axios(url)
      .then((res) =>
        resolve({ id, status: res.status, statusText: res.statusText })
      )
      .catch(() => resolve({ id, status: 404, statusText: 'FAIL' }))
  );

  const resolveValidate = (links, resolve, reject, route) => {
    links.forEach(({ id, href }) =>
      linksValidatePromises.push(linkValidate(id, href))
    );
    Promise.all(linksValidatePromises)
      .then((stats) => {
        resolve(
          links.map((link) => ({
            ...link,
            ...stats.find(({ id }) => id === link.id),
          }))
        );
      })
      .catch(() => reject(new Error(`NOT founds links to validate ${route}`)));
  };
