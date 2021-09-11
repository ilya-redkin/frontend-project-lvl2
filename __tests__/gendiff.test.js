import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import compare from '../index.js';

// import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare', async () => {
  const file1 = `${__dirname}/../__fixtures__/testfile1.json`;
  const file2 = `${__dirname}/../__fixtures__/testfile2.json`;
  expect(compare(file1, file2)).toEqual(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
}`);
  expect(compare(file1, file1)).toEqual(`{
          follow: false
          host: hexlet.io
          proxy: 123.234.53.22
          timeout: 50
}`);
});

test('compare', async () => {
  const file1 = `${__dirname}/../__fixtures__/testfile1.yaml`;
  const file2 = `${__dirname}/../__fixtures__/testfile2.yml`;
  expect(compare(file1, file2)).toEqual(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
}`);
  expect(compare(file1, file1)).toEqual(`{
          follow: false
          host: hexlet.io
          proxy: 123.234.53.22
          timeout: 50
}`);
});
