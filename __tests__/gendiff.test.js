import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import compare from '../src/compare.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

test('compare_flat_json_stylish', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile1.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile2.json`);
  console.log(stylish(compare(parseFile(file1, '.json'), parseFile(file2, '.json'))), '5555555');
  expect(stylish(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

  expect(stylish(compare(parseFile(file1, '.json'), parseFile(file1, '.json')))).toEqual(`{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`);
});

test('compare_flat_yaml_stylish', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile1.yaml`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile2.yml`);

  expect(stylish(compare(parseFile(file1, '.yaml'), parseFile(file2, '.yml')))).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);

  expect(stylish(compare(parseFile(file1, '.yaml'), parseFile(file1, '.yaml')))).toEqual(`{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`);
});

test('compare_deep_json_stylish', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile3.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile4.json`);

  expect(stylish(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(`{
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

test('compare_deep_json_plain', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile3.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile4.json`);

  expect(plain(compare(parseFile(file1, '.json'), parseFile(file2, '.json')))).toEqual(`
  Property 'common.follow' was added with value: false
  Property 'common.setting2' was removed
  Property 'common.setting3' was updated. From true to null
  Property 'common.setting4' was added with value: 'blah blah'
  Property 'common.setting5' was added with value: [complex value]
  Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
  Property 'common.setting6.ops' was added with value: 'vops'
  Property 'group1.baz' was updated. From 'bas' to 'bars'
  Property 'group1.nest' was updated. From [complex value] to 'str'
  Property 'group2' was removed
  Property 'group3' was added with value: [complex value]`);
});

test('compare_deep_json_json', async () => {
  const file1 = readFile(`${__dirname}/../__fixtures__/testfile3.json`);
  const file2 = readFile(`${__dirname}/../__fixtures__/testfile4.json`);

  expect(JSON.stringify(compare(parseFile(file1, '.json'), parseFile(file2, '.json'))[0])).toEqual('{"type":"changedInside","key":"common","children":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"changed","key":"setting3","oldValue":true,"newValue":null},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"changedInside","key":"setting6","children":[{"type":"changedInside","key":"doge","children":[{"type":"changed","key":"wow","oldValue":"","newValue":"so much"}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]}');
});
