const inquirer = require("inquirer");
const functions = require("./index.js")
// inquirer.prompt([
//       {
//         type: 'fuzzypath',
//         name: 'path',
//         itemType: 'any',
//         message: 'Select a target directory for your component:',
//         suggestOnly: false,
//       }
//     ])
//     .then((answers ) => {
//       console.log(answers);
//     })

inquirer
  .prompt([
    {
      type: "list",
      message: "chose the option you want",
      name: "options",
      choices: ["validate", "stats", "validate & stats"],
    },
    {
      type: "fuzzypath",
      name: "path",
      itemType: "any",
      message: "Select a target directory for your component:",
      suggestOnly: true,
      default: "README.md"
    },
  ])
  .then((answers) => {
   if (answers.path === ""){
    throw Error ("You need to provide a path exp src/readme")
   }
   if (answers.options === 'validate'){
    return functions.mdLinks(answers.path, {validate: true} )
    .then((links) => console.log(links))
    .catch((error) => console.error(error))
    // if (answers.options === 'stats'){
   }
   })

  .catch((error) => {
    console.log(error)
    // if (error.isTtyError) {
    //   // Prompt couldn't be rendered in the current environment
    // } else {
    //   // Something else when wrong
    // }
  });

// inquirer.prompt([
//     {
//       type: 'fuzzypath',
//       name: 'path',
//       itemType: 'any',
//       message: 'Select a target directory for your component:',
//       suggestOnly: false,
//     }
//   ])
//   .then((answers ) => {
//     console.log(answers);
//   })
if (validate && stats) {
  return mdLinks(route, { validate })
    .then((links) => console.log(statsValidate(links)))
    .catch(() => new Error('Doesn\'t exist links'));
}
if (validate) {
  return mdLinks(route, { validate })
    .then((links) => console.log(showValidateLink(links)))
    .catch(() => new Error('Doesn\'t exist links'));
}
if (stats) {
  return mdLinks(route, { validate })
    .then((links) => console.log(statsInfo(links)))
    .catch(() => new Error('Doesn\'t exist links'));
}
return mdLinks(route, { validate })
  .then((links) => console.log(showExtractLink(links)))
  .catch(() => new Error('Doesn\'t exist links'));
};
