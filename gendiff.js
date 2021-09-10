#!/usr/bin/env node

// const program = require('commander');
// const compare = require('./index.js');
import program from 'commander';
import compare from './index.js';

// compare('./file1.json', './file2.json');

program.version('0.0.1');
program
  .option('-f, --format <type>', 'output format');
program
  .description('Compares two configuration files and shows a difference.');
program
  .argument('<file1>', 'first file to compare')
  .argument('<file2>', 'second file to compare')
  .description('compares two configuration files and shows a difference')
  .action((file1, file2) => compare(file1, file2));
program.parse(process.argv);
