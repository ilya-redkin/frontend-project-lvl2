#!/usr/bin/env node


const program = require('commander');
const fs = require('fs');
const _ = require('lodash');
const path = require ('path');
program.version('0.0.1');
program
    .option('-f, --format <type>', 'output format');
program
    .description('Compares two configuration files and shows a difference.');
program
    .argument('<file1>', 'first file to compare')
    .argument('<file2>', 'second file to compare')
    .description('compares two configuration files and shows a difference')
    .action((file1, file2) => {
        const data1 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file1)}`, 'utf8'));
    const data2 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file2)}`, 'utf8'));
    
    const listOfKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();
    let output = '';
    
    for (const key of listOfKeys) {
    if (!data2.hasOwnProperty(key)) {
        output = output + `
        - ${key}: ${data1[key]}`
    }
    if (!data1.hasOwnProperty(key)) {
        output = output + `
        + ${key}: ${data2[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
        output = output + `
          ${key}: ${data1[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
        output = output + `
        - ${key}: ${data1[key]}
        + ${key}: ${data2[key]}`
    }
    }
    output = `{${output}
    }`;
    console.log(output);
    });
    
program.parse(process.argv);






