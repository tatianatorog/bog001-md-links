#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const CFonts = require('cfonts');
const packageJson = require('./package.json');
const mdLinks = require('./src/index.js');
const statsValidate = require('./src/functions/obtainStats.js');

const isValidate = true;

CFonts.say('Md-links', {
  font: 'block',
  align: 'left',
  colors: ['cyan', 'white'],
  env: 'node',
});

const program = new commander.Command(packageJson.name)
  .version(chalk.magenta.bold(packageJson.version))
  .arguments('<path>')
  .usage(`${chalk.green('<path>')} [options]`)
  .option('-v, --validate')
  .option('-s, --stats')
  .on('--help', () => {
    console.log(`\n Only ${chalk.green('<path>')} is required.\n`);
    console.log(`An option ${chalk.cyan('--validate')} is for:`);
    console.log(
      ` ${chalk.magenta('- Check and validate all links in your md files')}`,
    );
    console.log(
      ` ${chalk.magenta(
        '- Will return all information like this: path, link, name, status code, and status text',
      )}\n`,
    );

    console.log(`An option ${chalk.cyan('--stats')} is for:`);
    console.log(
      ` ${chalk.magenta(
        '- Check and get information about which links are unique and the total of links you have',
      )}\n`,
    );
    console.log(`Both options ${chalk.cyan('--validate --stats')} are for:`);
    console.log(
      ` ${chalk.magenta(
        '- Check and get information about which links are unique, broken and the total of links you have',
      )}\n`,
    );
  });

program.parse(process.argv);

if (!program.validate && !program.stats) {
  mdLinks(process.argv[2], { validate: false }).then((links) => links.forEach(({ file, href, text }) => {
    console.log(
      `\n${chalk.yellow('FILE:', file)}\n ${chalk.cyan(
        'URL:',
        href,
      )}\n${chalk.white('TEXT:', text)}`,
    );
  }));
}
if (!!program.validate && !program.stats) {
  mdLinks(process.argv[2], { validate: true }).then((links) => links.forEach(({
    file, href, status, statusText, text,
  }) => {
    console.log(
      `\n${chalk.yellow('FILE:', file)}\n${chalk.cyan('URL:', href)}\n${
        status < 400
          ? chalk.green('STATUS:', status)
          : chalk.red('STATUS:', status)
      } ${
        statusText === 'OK'
          ? chalk.greenBright(statusText)
          : chalk.red(statusText)
      }\n${chalk.white('TEXT:', text)}`,
    );
  }));
}
if (!program.validate && !!program.stats) {
  mdLinks(process.argv[2], { validate: true })
    .then((links) => console.log(statsValidate(links)))
    .catch((error) => console.error(error));
}
if (!program.validate && !!program.stats) {
  mdLinks(process.argv[2], { validate: true })
    .then((links) => console.log(statsValidate(links)))
    .catch((error) => console.error(error));
}
if (!!program.validate && !!program.stats) {
  mdLinks(process.argv[2], { validate: true })
    .then((links) => console.log(statsValidate(links, isValidate)))
    .catch((error) => console.error(error));
}
