#!/usr/bin/env node
const program = require('commander');
program.version('0.0.1');
program
    .option('-f, --format <type>', 'output format');
program
    .description('Compares two configuration files and shows a difference.')
program.parse(process.argv);