import _ from 'lodash';
import parseFile from './parsers.js';

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

  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  const iter = (key) => {
    if (!_.hasIn(data1, key)) {
      return { "type": 'added', "key": key, "value": data2[key] };
    }
    if (!_.hasIn(data2, key)) {
      return { "type": 'removed', "key": key, "value": data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { "type": 'unchanged', "key": key, "value": data1[key] };
    }
    if (_.hasIn(data1, key) && _.hasIn(data2, key) && !_.isEqual(data1[key], data2[key]) && (typeof data1[key] !== 'object' || typeof data2[key] !== 'object' || data1[key] === null || data2[key] === null)) {
      return { "type": 'changed', "key": key, "oldValue": data1[key], "newValue": data2[key] };
    }
    if (_.hasIn(data1, key) && _.hasIn(data2, key) && !_.isEqual(data1[key], data2[key]) && typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return { "type": 'changedInside', "key": key, "children": compare(data1[key], data2[key]) };
    }

  };

  const listOfKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  let result = listOfKeys.map(iter);
  return result;
};

export const stylish = (data, replacer = '    ', spacesCount = 1) => {

  const iter = (data, depth) => {

    const currentIndent = replacer.repeat(depth * spacesCount);
    const bracketIndent = replacer.repeat((depth - 1) * spacesCount);

    const stringify = (value) => {
      const iter2 = (currentValue, depth) => {

        const currentIndent = replacer.repeat((depth + 1) * spacesCount);
        const bracketIndent = replacer.repeat(depth * spacesCount);
        if (typeof currentValue !== 'object') {
          return currentValue.toString();
        }

        const lines = Object
          .entries(currentValue)
          .map(([key, val]) => `${currentIndent}${key}: ${iter2(val, depth + 1)}`);

        return [
          '{',
          ...lines,
          `${bracketIndent}}`,
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

      })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`
    ].join('\n');

  };

  return iter(data, 1);

};

console.log(stylish(compare('./__fixtures__/testfile3.json', './__fixtures__/testfile4.json')));



export default {compare, stylish};