import parseFile from './src/parsers.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import { compare } from './src/compare.js';

export const genDiff = (filepath1, filepath2, formatName) => {
  if (formatName.format === 'stylish') {
    return stylish(compare(parseFile(filepath1), parseFile(filepath2)));
  } else if (formatName.format === 'plain') {
    return plain(compare(parseFile(filepath1), parseFile(filepath2)));
  } else if (formatName.format === 'json') {
    return compare(parseFile(filepath1), parseFile(filepath2));
  } else {
    return 'Incorrect format name';
  }
};

export default genDiff;
