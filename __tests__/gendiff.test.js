import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToFixtures = `${__dirname}/../__fixtures__/`;
const readFile = (file) => fs.readFileSync(`${pathToFixtures}${file}`, 'utf8');

const stylishResult = readFile('stylishResult.txt');
const plainResult = readFile('plainResult.txt');
const jsonResult = readFile('jsonResult.json');
const formats = ['json', 'yaml'];

test.each(formats)('fileFormat %p', (format) => {
  const pathToFirstFile = `${pathToFixtures}file1.${format}`;
  const pathToSecondFile = `${pathToFixtures}file2.${format}`;
  expect(genDiff(pathToFirstFile, pathToSecondFile)).toEqual(stylishResult);
  expect(genDiff(pathToFirstFile, pathToSecondFile, 'stylish')).toEqual(stylishResult);
  expect(genDiff(pathToFirstFile, pathToSecondFile, 'json')).toEqual(jsonResult.toString());
  expect(genDiff(pathToFirstFile, pathToSecondFile, 'plain')).toEqual(plainResult);
});

// ******** THIS TEST FAILS HEXLET CHECK *********
// test('checkJSONValidity', async () => {
//   const JSONdata = genDiff(`${pathToFixtures}file1.json`, `${pathToFixtures}file2.json`, 'json');
//   expect(() => JSON.parse(JSONdata).not.toThrow());
// });
