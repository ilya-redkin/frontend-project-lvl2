// import fs from 'fs';
import compare from "../index.js";
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
// import path from "path";
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const some = await fs.readFileSync(`${__dirname}/../__fixtures__/testfile1.json`, 'utf8');
// console.log(typeof some);


// test('compare', () => {
//     expect (compare('file1.json', 'file2.json')).toEqual(`{
//         - follow: false
//           host: hexlet.io
//         - proxy: 123.234.53.22
//         - timeout: 50
//         + timeout: 20
//         + verbose: true
// }`);
// });


test('compare', async () => {
    const file1 = `${__dirname}/../__fixtures__/testfile1.json`;
    const file2 = `${__dirname}/../__fixtures__/testfile2.json`;
    expect (compare(file1, file2)).toEqual(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
}`);
    expect (compare(file1, file1)).toEqual(`{
          follow: false
          host: hexlet.io
          proxy: 123.234.53.22
          timeout: 50
}`);
});

// const result = compare('file1.json', 'file2.json');
// console.log(result);
