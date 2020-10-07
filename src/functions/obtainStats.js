const chalk = require('chalk');

const statsValidate = (links, isValidate) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === 'FAIL');
  const unique = [...new Set(links.map((item) => item.url))].length;
  const broken = failedLinks.length;
  const stats = chalk.blueBright(`✔ Total : ${total}\n✔ Unique : ${unique}`);
  if (isValidate) {
    return `${stats}\n${chalk.red(`✖ Broken : ${broken}`)}`;
  }
  return stats;
};

/* The split method divides a String into an ordered list of substrings
into an ordered list of substrings and returns an array. */

module.exports = statsValidate;
