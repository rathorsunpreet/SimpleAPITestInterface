const fs = require('fs');
const path = require('path');
const figlet = require('figlet');
const colors = require('ansi-colors');
const runner = require('./helpers/runner');

if (process.argv.length === 2) {
  console.log('No arguments provided!');
  console.log(`Provide "${colors.yellow.bold('help')}" as an argument to get more details!`);
  process.exit(1);
}
// Remove node.exe
process.argv.shift();
// Remove npm run command
process.argv.shift();

// List of valid commands and descriptions
const commList = [
  ['report', 'Execute the specified test suites and generate a HTML Report'],
  ['list', 'List all available test suites'],
  ['help', 'Show this help message'],
];
// commOnly stores the commands from commList without descriptions
const commOnly = [];
commList.forEach((commArr) => {
  commOnly.push(commArr[0]);
});
// Location of all suites
const suitePath = './test/suites/';
// Location of libs.js file
const libPath = path.join(suitePath, '../helpers/libs.js');

// Uncomment below line to see available Fonts on the system
// console.log(figlet.fontsSync());

// Method returns the full named suite list and only the names of the suites
// Example: users.js and users
// fullArray stores users.js while fileArr stores users
function getSuiteList() {
  const fullArray = fs.readdirSync(suitePath)
    .filter((item) => path.extname(item).localeCompare('.js') === 0);
  const fileArr = [];
  fullArray.forEach((file) => {
    fileArr.push(path.parse(file).name);
  });
  return { fullArray, fileArr };
}

// Method to get suite names from process.argv, also returns invalid suite names
function getSuites() {
  const valid = [];
  const invalid = [];
  const files = getSuiteList();
  if (process.argv.includes('all')) {
    valid.push('all');
    process.argv.splice(process.argv.indexOf('all'), 1);
    process.argv = process.argv.filter((file) => !files.fileArr.includes(file));
  }
  process.argv.forEach((file) => {
    if (files.fileArr.includes(file)) {
      valid.push(file);
    } else {
      invalid.push(file);
    }
  });
  return { valid, invalid };
}

// Method to check for commands present by sifting through getSuite()'s invalid list
function checkComm() {
  const valid = [];
  const invalid = [];
  const suites = getSuites();
  suites.invalid.forEach((item) => {
    if (commOnly.includes(item)) {
      valid.push(item);
    } else {
      invalid.push(item);
    }
  });
  return { valid, invalid };
}

const validSuites = getSuites().valid;
const commPrep = checkComm();
const commUsed = commPrep.valid;
const invalidArgs = commPrep.invalid;

if (invalidArgs.length !== 0) {
  console.log('Invalid Commands / Suite Name(s): ');
  console.log(invalidArgs);
}

// Go through commUsed in reverse order
// help -> list -> report
// Help section
if (commUsed.includes(commOnly[2])) {
  console.log(figlet.textSync('Simple API Test Interface', {
    font: 'Cybermedium',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 180,
    whitespaceBreak: true,
  }));
  console.log('This is an API Test Interface in it\'s simplest form.');
  console.log('');
  console.log(`${colors.yellow.bold('Usage')}: `);
  console.log(`${colors.red.bold('npm run test command/suite name(s)')}`);
  console.log('This executes the mentioned command or suite(s) provided they are valid.');
  console.log(`Use the word "${colors.red.bold('all')}" to execute all test suites.`);
  console.log('');
  console.log(`Test suites/cases need to be put into "${colors.red.bold(suitePath)}" for the system to detect them.`);
  console.log(`If site needs to be updated, then change it in "${colors.red.bold(libPath)}".`);
  console.log('Only javascript files are detected.');
  console.log('');
  console.log('The following commands are available: ');
  commList.forEach((commArr) => {
    const [com, des] = commArr;
    console.log(`${colors.bold.yellow(com)} \t\t\t ${colors.yellow.italic(des)}`);
  });
  // List section
} else if (commUsed.includes(commOnly[1])) {
  // List all available suites
  console.log('The available suites are: ');
  console.log(getSuiteList().fileArr);
  // Report Section
} else if (commUsed.includes(commOnly[0])) {
  if (validSuites.length === 1 && validSuites[0].localeCompare('all') === 0) {
    runner.addFileToReporter(true, getSuiteList().fileArr, suitePath);
  } else if (validSuites.length === 0) {
    console.log('No valid suites found!');
    process.exit(1);
  } else {
    runner.addFileToReporter(true, validSuites, suitePath);
  }
  runner.executeFiles(true);
  // Execution of suites after all commands have been processed
  // or no commands were present
} else {
  if (validSuites.length === 1 && validSuites[0].localeCompare('all') === 0) {
    runner.addFileToReporter(false, getSuiteList().fileArr, suitePath);
  } else if (validSuites.length === 0) {
    console.log('No valid suites found!');
    process.exit(1);
  } else {
    runner.addFileToReporter(false, validSuites, suitePath);
  }
  runner.executeFiles(false);
}
