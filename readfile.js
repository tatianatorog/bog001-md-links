const path = require('path');
const fs = require('fs');
const glob = require("glob")

// //joining path of directory
// const directoryPath = path.join(__dirname, 'Documents');
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

// const getDirectories = function (src, callback) {
  //   glob(src + '**/*.md', callback);
  // };
  // getDirectories('/Users/albalucia/Desktop/curso/', function (err, res) {
  //   if (err) {
  //     console.log('Error', err);
  //   } else {
  //     console.log(res);
  //   }
  // });


// const crawl = (dir) => {
//   console.log('[+]', dir);
//   let files = fs.readdirSync(dir);
//   for (let x in files) {
//     let next = path.join(dir, files[x]);

//     if (fs.lstatSync(next).isDirectory() == true) {
//       crawl(next);
//     }
//     else {
//       console.log(next);
//     }
//   }
// }

const  getAbsolutePath = (userPath) => path.resolve(userPath)
const pathsFilesMd = [];
const getFilesMd = (directory) =>{
const files = fs.readdirSync(directory);
  for (let filename of files) {
      const filePath = path.join(directory, filename);
      console.log(files)
      if (fs.statSync(filePath).isDirectory()) {
        getFilesMd(filePath);
      } else if (path.extname(filename) === '.md') {
        pathsFilesMd.push(filePath);
      }
  }
  return pathsFilesMd;
}

console.log(getFilesMd("/Users/albalucia/Desktop/curso/"))

// const isDirectory = (path) => {
//   if(fs.statSync(path).isDirectory()){
//   return "hola"
// }else{
//   return "no "
// }

// }


// const isFile = (path) => fs.statSync(path).isFile();

// const isDirectory = (path) =>
// fs.lstatSync(path).isDirectory();

//   console.log(isDirectory("/Users/albalucia/Desktop/curso/"))
