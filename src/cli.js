#!/usr/bin/env node
const chalk = require('chalk');
const inquirer = require('inquirer');
const CFonts = require('cfonts');
const mdLinks = require('./index.js');
const statsValidate = require('./functions/obtainStats.js');

CFonts.say('Md-links', {
  font: 'block',
  align: 'left',
  colors: ['cyan', 'white'],
  env: 'node',
});

const isValidate = true;

inquirer
  .prompt([
    {
      type: 'fuzzypath',
      name: 'path',
      itemType: 'any',
      message:
        'Copy the path of the file or directory that you want to analize',
      suggestOnly: true,
      default: 'README.md',
    },
    {
      type: 'list',
      message: 'Select the option you want to run ',
      name: 'options',
      choices: ['Validate', 'Stats', 'Validate & Stats'],
    },
  ])
  .then((answers) => {
    if (answers.path === '') {
      throw Error('You need to provide a path exp src/readme');
    } else if (answers.options === 'Validate') {
      return mdLinks(answers.path, { validate: true }).then((links) => links.forEach(({
        file, href, status, statusText, text,
      }) => {
        console.log(
          `\n${chalk.yellow('FILE:', file)}\n ${chalk.cyan('URL:', href)}\n ${
            status < 400
              ? chalk.green('STATUS:', status)
              : chalk.red('STATUS:', status)
          } ${
            statusText === 'OK'
              ? chalk.greenBright(statusText)
              : chalk.red(statusText)
          }\n ${chalk.white('TEXT:', text)}`,
        );
      }));
    } else if (answers.options === 'Stats') {
      return mdLinks(answers.path, { validate: true })
        .then((links) => console.log(statsValidate(links)))
        .catch((error) => console.error(error));
    } else {
      return mdLinks(answers.path, { validate: true })
        .then((links) => console.log(statsValidate(links, isValidate)))
        .catch((error) => console.error(error));
    }
  })
  .catch((error) => {
    console.log(error);
  });
