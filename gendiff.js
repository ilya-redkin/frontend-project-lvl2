#!/usr/bin/env node

import program from 'commander';
import { compare, stylish } from './index.js';

import parseFile from './parsers.js';

program.version('0.0.1');
program
  .option('-f, --format <type>', 'output format', 'stylish');
program
  .description('Compares two configuration files and shows the difference.');
program
  .argument('<file1>', 'first file to compare')
  .argument('<file2>', 'second file to compare')
  .description('compares two configuration files and shows a difference')

  .action((file1, file2) => console.log(stylish(compare(parseFile(file1), parseFile(file2)))));

program.parse(process.argv);
