import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import compare from './compare.js';
import render from './formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makeFullPath = (filePath) => path.join(__dirname, '..', filePath);

const getFileExtention = (filePath) => path.extname(filePath);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const genDiff = (filepath1, filepath2, formatName) => {
  const path1 = makeFullPath(filepath1);
  const path2 = makeFullPath(filepath2);
  const extention1 = getFileExtention(path1);
  const extention2 = getFileExtention(path2);
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const ast = compare(parseFile(file1, extention1), parseFile(file2, extention2));

  return render(ast, formatName);
  // if (formatName.format === 'stylish') {
  //   return stylish(compare(parseFile(file1, extention1), parseFile(file2, extention2)));
  // } else if (formatName.format === 'plain') {
  //   return plain(compare(parseFile(file1, extention1), parseFile(file2, extention2)));
  // } else if (formatName.format === 'json') {
  //   return JSON.stringify(compare(parseFile(file1, extention1), 
  // parseFile(file2, extention2))[0]);
  // } else {
  //   return 'Incorrect format name';
  // }
};

export default genDiff;
