#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
program.version('0.0.1');
program
    .option('-f, --format <type>', 'output format');
program
    .description('Compares two configuration files and shows a difference.')
program.parse(process.argv);



const data1 = fs.readFileSync(`${__dirname}/file1.json`, 'utf8');
// const data2 = fs.readFileSync('file2.json', 'utf8');

console.log(data1);
// console.log(data2);
// console.log(__dirname);