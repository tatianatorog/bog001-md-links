const chalk = require("chalk");

const statsValidate = (links, isValidate) => {
  const total = links.length;
  const failedLinks = links.filter(({ statusText }) => statusText === "FAIL");
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

/* const getUnique = (array) => {
  const output = [];
  const flags = {};
  for (let i = 0; i < array.length; i++) {
    if (flags[array[i].url]) continue;
    flags[array[i].url] = true;
    output.push(array[i].url);
  }
  return output.length;
}; */

module.exports = statsValidate;
