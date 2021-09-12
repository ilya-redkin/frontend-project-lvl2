import _ from 'lodash';
import parseFile from './parsers.js';

const compare = (file1, file2) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const listOfKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  let output = '';
  listOfKeys.forEach((key) => {
    if (!data2.hasOwnProperty(key)) {
      output += `
        - ${key}: ${data1[key]}`;
    }
    if (!data1.hasOwnProperty(key)) {
      output += `
        + ${key}: ${data2[key]}`;
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
      output += `
          ${key}: ${data1[key]}`;
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
      output += `
        - ${key}: ${data1[key]}
        + ${key}: ${data2[key]}`;
    }
  });
  output = `{${output}\n}`;
  console.log(output);
  return output;
};

export default compare;
