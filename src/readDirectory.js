

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

  module.export = getFilesMd
