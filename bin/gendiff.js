#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program.version('0.0.1')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<file1>', 'first file to compare')
  .argument('<file2>', 'second file to compare')
  .action((file1, file2, type) => console.log(genDiff(file1, file2, type)));

program.parse(process.argv);
