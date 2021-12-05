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
  const result = data.filter((item) => item.type !== 'unchanged')
    .map((item) => {
      if (item.type === 'removed') {
        return `Property '${path}${item.key}' was removed`;
      }
      if (item.type === 'added') {
        return `Property '${path}${item.key}' was added with value: ${makeFormatPreview(item.value)}`;
      }

      if (item.type === 'changed') {
        return `Property '${path}${item.key}' was updated. From ${makeFormatPreview(item.oldValue)} to ${makeFormatPreview(item.newValue)}`;
      }
      const newPath = `${path}${item.key}.`;
      return `${makePlain(item.children, newPath)}`;
    });
  return result.join('\n');
};

export default makePlain;
