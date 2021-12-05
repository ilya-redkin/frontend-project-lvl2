const makeFormatPreview = (value) => {
  if (typeof value !== 'object' && typeof value !== 'string') {
    return value;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  return '[complex value]';
};

const makePlain = (data, path = '') => {
  const result = [];
  data.map((item) => {
    if (item.type === 'removed') {
      result.push(`Property '${path}${item.key}' was removed`);
    }
    if (item.type === 'added') {
      result.push(`Property '${path}${item.key}' was added with value: ${makeFormatPreview(item.value)}`);
    }

    if (item.type === 'changed') {
      result.push(`Property '${path}${item.key}' was updated. From ${makeFormatPreview(item.oldValue)} to ${makeFormatPreview(item.newValue)}`);
    }
    if (item.type === 'changedInside') {
      const newPath = `${path}${item.key}.`;
      result.push(`${makePlain(item.children, newPath)}`);
    }
    return 0;
  });
  return result.join('\n');
};

export default makePlain;
