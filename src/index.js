/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const dirOrFile = require('./functions/obtainFilesMd');
const resolveValidate = require('./functions/validateLinks.js');
const utils = require('./functions/obtainLinks.js');

/* ------------------------------------ */

const getAbsolutePath = (userPath) => path.resolve(userPath);

/* ------------------------------------ */

const mdLinks = (route, { validate }) => {
  const pathRoute = getAbsolutePath(route);
  if (fs.existsSync(pathRoute)) {
    const arrayFiles = dirOrFile(pathRoute);
    return Promise.all(utils.getLinksOfFiles(arrayFiles))
      .then((links) => links.flat())
      .then((res) => {
        if (validate) {
          return resolveValidate(res);
        }
        return res;
      })
      .catch(
        () => new Error(
          `${chalk.red('NOT found links')} ${chalk.yellow(pathRoute)}`,
        ),
      );
  }
  throw Error(
    chalk.red('Path: NOT FOUND (check the NAME of DIR \\ FILE or .md) )'),
  );
  // it stops the program.
};

module.exports = mdLinks;
