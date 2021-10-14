import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import {compare, stylish} from '../index.js';

import parseFile from '../parsers.js';


// import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare', async () => {
  const file1 = `${__dirname}/../__fixtures__/testfile1.json`;
  const file2 = `${__dirname}/../__fixtures__/testfile2.json`;

  expect(stylish(compare(parseFile(file1), parseFile(file2)))).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

  expect(stylish(compare(parseFile(file1), parseFile(file1)))).toEqual(`{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`);
});

test('compare', async () => {
  const file1 = `${__dirname}/../__fixtures__/testfile1.yaml`;
  const file2 = `${__dirname}/../__fixtures__/testfile2.yml`;

  expect(stylish(compare(parseFile(file1), parseFile(file2)))).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

  expect(stylish(compare(parseFile(file1), parseFile(file1)))).toEqual(`{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`);
});

test('compare', async () => {
  const file1 = `${__dirname}/../__fixtures__/testfile3.json`;
  const file2 = `${__dirname}/../__fixtures__/testfile4.json`;

  expect(stylish(compare(parseFile(file1), parseFile(file2)))).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
  
});