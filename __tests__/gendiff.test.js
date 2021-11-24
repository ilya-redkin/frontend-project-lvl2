import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import compare from '../src/compare.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';
import jsonFunc from '../src/formatters/json.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

test('compare_deep_json_stylish', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile1.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile2.json`);
  const stylishResult = readFile(`${__dirname}/../__fixtures__/stylishResult.txt`);

  expect(stylish(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(stylishResult);
});

test('compare_deep_json_plain', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile1.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile2.json`);
  const plainResult = readFile(`${__dirname}/../__fixtures__/plainResult.txt`);

  expect(plain(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(plainResult);
});

test('compare_deep_json_json', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile1.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile2.json`);
  const jsonResult = readFile(`${__dirname}/../__fixtures__/jsonResult.txt`);

  expect(jsonFunc(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(jsonResult);
});
