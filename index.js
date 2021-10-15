import _ from 'lodash';
// import parseFile from './parsers.js';

// const test1 = parseFile('./__fixtures__/testfile3.json');
// const test2 = parseFile('./__fixtures__/testfile4.json');

// const compare = (file1, file2) => {
//   const data1 = parseFile(file1);
//   const data2 = parseFile(file2);
//   const listOfKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
//   let output = '';
//   listOfKeys.forEach((key) => {
//     if (!data2.hasOwnProperty(key)) {
//       output += `
//         - ${key}: ${data1[key]}`;
//     }
//     if (!data1.hasOwnProperty(key)) {
//       output += `
//         + ${key}: ${data2[key]}`;
//     }
//     if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
//       output += `
//           ${key}: ${data1[key]}`;
//     }
//     if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
//       output += `
//         - ${key}: ${data1[key]}
//         + ${key}: ${data2[key]}`;
//     }
//   });
//   output = `{${output}\n}`;
//   console.log(output);
//   return output;
// };

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

export const stylish = (arr, replacer = '    ', spacesCount = 1) => {
  const iter = (data, depth) => {
    const currentIndent = replacer.repeat(depth * spacesCount);
    const bracketIndent = replacer.repeat((depth - 1) * spacesCount);

    const stringify = (value) => {
      const iter2 = (currentValue, stringifyDepth) => {
        const stringifyCurrentIndent = replacer.repeat((stringifyDepth + 1) * spacesCount);
        const stringifyBracketIndent = replacer.repeat(stringifyDepth * spacesCount);
        if (typeof currentValue !== 'object') {
          return currentValue.toString();
        }

        const lines = Object
          .entries(currentValue)
          .map(([key, val]) => `${stringifyCurrentIndent}${key}: ${iter2(val, stringifyDepth + 1)}`);

        return [
          '{',
          ...lines,
          `${stringifyBracketIndent}}`,
        ].join('\n');
      };

      return iter2(value, depth);
    };

    const lines = data
      .map((currentValue) => {
        if (currentValue.type === 'removed') {
          return `${currentIndent.slice(0, -2)}- ${currentValue.key}: ${stringify(currentValue.value)}`;
        }

        if (currentValue.type === 'added') {
          return `${currentIndent.slice(0, -2)}+ ${currentValue.key}: ${stringify(currentValue.value)}`;
        }

        if (currentValue.type === 'unchanged') {
          return `${currentIndent.slice(0, -2)}  ${currentValue.key}: ${stringify(currentValue.value)}`;
        }

        if (currentValue.type === 'changed') {
          return `${currentIndent.slice(0, -2)}- ${currentValue.key}: ${stringify(currentValue.oldValue)}\n${currentIndent.slice(0, -2)}+ ${currentValue.key}: ${currentValue.newValue}`;
        }

        if (currentValue.type === 'changedInside') {
          return `${currentIndent.slice(0, -2)}  ${currentValue.key}: ${iter(currentValue.children, depth + 1)}`;
        }
        return 0;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(arr, 1);
};

export const plain = (data, path = '') => {
  let previousPath;
  let result = '';
  data.map((item) => {
    if (item.type === 'removed') {
      result += `\n  Property '${path}${item.key}' was removed`;
    }
    if (item.type === 'added' && typeof item.value === 'object') {
      result += `\n  Property '${path}${item.key}' was added with value: [complex value]`;
    }
    if (item.type === 'added' && typeof item.value !== 'object' && typeof item.value !== 'string') {
      result += `\n  Property '${path}${item.key}' was added with value: ${item.value}`;
    }
    if (item.type === 'added' && typeof item.value !== 'object' && typeof item.value === 'string') {
      result += `\n  Property '${path}${item.key}' was added with value: '${item.value}'`;
    }
    if (item.type === 'changed' && typeof item.oldValue !== 'object' && typeof item.newValue === 'object' && item.newValue !== null) {
      result += `\n  Property '${path}${item.key}' was updated. From ${item.oldValue} to [complex value]`;
    }
    if (item.type === 'changed' && typeof item.oldValue !== 'object' && typeof item.newValue === 'object' && item.newValue === null) {
      result += `\n  Property '${path}${item.key}' was updated. From ${item.oldValue} to ${null}`;
    }
    if (item.type === 'changed' && typeof item.oldValue === 'object' && item.oldValue !== null && typeof item.newValue !== 'object') {
      result += `\n  Property '${path}${item.key}' was updated. From [complex value] to '${item.newValue}'`;
    }
    if (item.type === 'changed' && typeof item.oldValue === 'object' && item.oldValue === null && typeof item.newValue !== 'object') {
      result += `\n  Property '${path}${item.key}' was updated. From ${null} to '${item.newValue}'`;
    }
    if (item.type === 'changed' && typeof item.oldValue === 'object' && typeof item.newValue === 'object') {
      result += `\n  Property '${path}${item.key}' was updated. From [complex value] to [complex value]`;
    }
    if (item.type === 'changed' && typeof item.oldValue !== 'object' && typeof item.newValue !== 'object') {
      result += `\n  Property '${path}${item.key}' was updated. From '${item.oldValue}' to '${item.newValue}'`;
    }
    if (item.type === 'changedInside') {
      previousPath = path;
      path += `${item.key}.`;
      result += `${plain(item.children, path)}`;
      path = previousPath;
    }
    return 0;
  });
  return result;
};

export default { compare, stylish, plain };
// console.log(stylish(compare('./__fixtures__/testfile3.json', './__fixtures__/testfile4.json')));
// console.log(stylish(compare(parseFile('./__fixtures__/testfile3.json'),
// parseFile('./__fixtures__/testfile4.json'))));
// console.log(parseFile('./__fixtures__/testfile3.json'));
// console.log(parseFile('./__fixtures__/testfile4.json'));
// console.log(stylish(compare (parseFile('./__fixtures__/testfile3.json'),
// parseFile('./__fixtures__/testfile4.json'))));
// console.log(plain(compare(parseFile('./__fixtures
// __/testfile3.json'), parseFile('./__fixtures__/testfile4.json'))));
