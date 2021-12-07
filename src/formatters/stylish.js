import _ from 'lodash';

const replacer = '    ';
const replacerCount = 1;

const handleCurrentValue = (currentValue, depth) => {
  const currentIndent = replacer.repeat((depth + 1) * replacerCount);
  const bracketIndent = replacer.toString().repeat(depth * replacerCount);
  if (currentValue === null) {
    return null;
  }
  if (!_.isObject(currentValue)) {
    return currentValue.toString();
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${handleCurrentValue(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const iterateThroughValues = (data, depth) => {
  const currentIndent = replacer.toString().repeat(depth * replacerCount);
  const bracketIndent = replacer.toString().repeat((depth - 1) * replacerCount);

  const lines = data
    .map((currentValue) => {
      if (currentValue.type === 'removed') {
        return `${currentIndent.slice(0, -2)}- ${currentValue.key}: ${handleCurrentValue(currentValue.value, depth)}`;
      }

      if (currentValue.type === 'added') {
        return `${currentIndent.slice(0, -2)}+ ${currentValue.key}: ${handleCurrentValue(currentValue.value, depth)}`;
      }

      if (currentValue.type === 'unchanged') {
        return `${currentIndent.slice(0, -2)}  ${currentValue.key}: ${handleCurrentValue(currentValue.value, depth)}`;
      }

      if (currentValue.type === 'changed') {
        return `${currentIndent.slice(0, -2)}- ${currentValue.key}: ${handleCurrentValue(currentValue.oldValue, depth)}\n${currentIndent
          .slice(0, -2)}+ ${currentValue.key}: ${handleCurrentValue(currentValue.newValue, depth)}`;
      }
      return `${currentIndent.slice(0, -2)}  ${currentValue.key}: ${iterateThroughValues(currentValue.children, depth + 1)}`;
    });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const makeStylish = (arr) => iterateThroughValues(arr, 1);

export default makeStylish;
