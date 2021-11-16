import path from 'path';
// import { fileURLToPath } from 'url';
import fs from 'fs';
import parseFile from './parsers.js';
import compare from './compare.js';
import render from './formatters/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const makeFullPath = (filePath) => path.resolve(process.cwd(), filePath);

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
  const { format } = formatName;
  if (format === 'json') {
    return render(ast[0], format);
  }
  return render(ast, format);
};

export default genDiff;
