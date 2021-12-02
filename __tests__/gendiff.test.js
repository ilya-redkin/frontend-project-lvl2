import { fs } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToFixtures = `${__dirname}/../__fixtures__/`;
const readFile = (file) => fs.readFileSync(`${pathToFixtures}${file}`, 'utf8');

test('compare_deep_json_stylish', async () => {
  const stylishResult = readFile('stylishResult.txt');
  expect(genDiff(`${pathToFixtures}file1.json`, `${pathToFixtures}file2.json`, { format: 'stylish' })).toEqual(stylishResult);
});

test('compare_deep_json_plain', async () => {
  const plainResult = readFile('plainResult.txt');
  expect(genDiff(`${pathToFixtures}file1.json`, `${pathToFixtures}file2.json`, { format: 'plain' })).toEqual(plainResult);
});

test('compare_deep_json_json', async () => {
  const jsonResult = readFile('jsonResult.json');
  expect(genDiff(`${pathToFixtures}file1.json`, `${pathToFixtures}file2.json`, { format: 'json' })).toEqual(jsonResult);
});
