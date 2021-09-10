import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compare = (file1, file2) => {
  const data1 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file1)}`, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file2)}`, 'utf8'));
  const listOfKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  let output = '';
  for (const key of listOfKeys) {
    if (!data2.hasOwnProperty(key)) {
      output += `
        - ${key}: ${data1[key]}`
    }
    if (!data1.hasOwnProperty(key)) {
        output += `
        + ${key}: ${data2[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
        output += `
          ${key}: ${data1[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
        output += `
        - ${key}: ${data1[key]}
        + ${key}: ${data2[key]}`
    }
}
  output = `{${output}\n}`;
  console.log(output);
  return output;
};

export default compare;

//module.exports = compare;