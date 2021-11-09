import _ from 'lodash';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export const compare = (file1, file2) => {
  const iter = (key) => {
    if (!_.hasIn(file1, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (!_.hasIn(file2, key)) {
      return { type: 'removed', key, value: file1[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { type: 'unchanged', key, value: file1[key] };
    }
    if (_.hasIn(file1, key) && _.hasIn(file2, key) && !_.isEqual(file1[key], file2[key]) && (typeof file1[key] !== 'object' || typeof file2[key] !== 'object' || file1[key] === null || file2[key] === null)) {
      return {
        type: 'changed', key, oldValue: file1[key], newValue: file2[key],
      };
    }
    if (_.hasIn(file1, key) && _.hasIn(file2, key) && !_.isEqual(file1[key], file2[key]) && typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      return { type: 'changedInside', key, children: compare(file1[key], file2[key]) };
    }
    return 0;
  };

  const listOfKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = listOfKeys.map(iter);
  return result;
};

export const genDiff = (filepath1, filepath2, formatName) => {
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

export default { compare, genDiff };

// console.log(stylish(compare('./__fixtures__/testfile3.json', './__fixtures__/testfile4.json')));
// console.log(stylish(compare(parseFile('./__fixtures__/testfile3.json'),
// parseFile('./__fixtures__/testfile4.json'))));
// console.log(parseFile('./__fixtures__/testfile3.json'));
// console.log(parseFile('./__fixtures__/testfile4.json'));
// console.log(stylish(compare (parseFile('./__fixtures__/testfile3.json'),
// parseFile('./__fixtures__/testfile4.json'))));
// console.log(plain(compare(parseFile('./__fixtures__/testfile3.json'),
// parseFile('./__fixtures__/testfile4.json'))));
// console.log(genDiff('./__fixtures__/testfile3.json', './__
// fixtures__/testfile4.json', 'stylish'));
