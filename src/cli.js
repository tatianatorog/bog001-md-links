#!/usr/bin/env node
const inquirer = require('inquirer');
const functions = require('./index.js');
const statsValidate = require('./functions/obtainStats.js');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'chose the option you want',
      name: "options",
      choices: ["validate", "stats", "validate & stats"],
    },
    {
      type: "fuzzypath",
      name: "path",
      itemType: "any",
      message: "Select a target directory for your component:",
      suggestOnly: true,
      default: "README.md",
    },
  ])
  .then((answers) => {
    if (answers.path === "") {
      throw Error("You need to provide a path exp src/readme");
    } else if (answers.options === "validate") {
      return functions
        .mdLinks(answers.path, { validate: true })
        .then((links) => console.log(links))
        .catch((error) => console.error(error));
    } else if (answers.options === "stats") {
      return functions
        .mdLinks(answers.path, { validate: true })
        .then((links) => console.log(statsValidate(links)))
        .catch((error) => console.error(error));
    } else {
      return functions
        .mdLinks(answers.path, { validate: true })
        .then((links) => console.log(statsValidate(links, (isValidate = true))))
        .catch((error) => console.error(error));
    }
  })
  .catch((error) => {
    console.log(error);
  });
