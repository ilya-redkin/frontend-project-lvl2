import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import compare from './compare.js';

const genDiff = (filepath1, filepath2, formatName) => {
  // console.log(formatName);
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
