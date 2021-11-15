const stylish = (arr, replacer = '    ', spacesCount = 1) => {
  if (!Array.isArray(arr)) { return 'The file is neither .json nor .yaml'; }
  const iter = (data, depth) => {
    const currentIndent = replacer.toString().repeat(depth * spacesCount);
    const bracketIndent = replacer.toString().repeat((depth - 1) * spacesCount);

    const stringify = (value) => {
      const iter2 = (currentValue, stringifyDepth) => {
        const stringifyCurrentIndent = replacer
          .repeat((stringifyDepth + 1) * spacesCount);
        const stringifyBracketIndent = replacer.toString().repeat(stringifyDepth * spacesCount);
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

export default stylish;
