import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parseFile = (file) => {
  const pathName = `${path.resolve(__dirname, file)}`;
  if (path.extname(pathName) === '.json') {
    return JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file)}`, 'utf8'));
  }
  if (path.extname(pathName) === '.yaml' || path.extname(pathName) === '.yml') {
    return yaml.load(fs.readFileSync(`${path.resolve(__dirname, file)}`, 'utf8'));
  }
  return 'The file is neither .json nor .yaml';
};

export default parseFile;
