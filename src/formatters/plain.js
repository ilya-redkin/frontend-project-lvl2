const plainFunc = (data, path = '') => {
  let previousPath;
  let result = '';
  const makeFormatPreview = (value) => {
    if (typeof value !== 'object' && typeof value !== 'string') {
      return value;
    } else if (typeof value === 'string') {
      return `'${value}'`;
    } else if (value === null) {
      return null;
    }
    return '[complex value]';
  };

  data.map((item) => {
    if (item.type === 'removed') {
      result += `\n  Property '${path}${item.key}' was removed`;
    }
    if (item.type === 'added') {
      result += `\n  Property '${path}${item.key}' was added with value: ${makeFormatPreview(item.value)}`;
    }

    if (item.type === 'changed') {
      result += `\n  Property '${path}${item.key}' was updated. From ${makeFormatPreview(item.oldValue)} to ${makeFormatPreview(item.newValue)}`;
    }
    if (item.type === 'changedInside') {
      previousPath = path;
      path += `${item.key}.`;
      result += `${plainFunc(item.children, path)}`;
      path = previousPath;
    }
    return 0;
  });
  return result;
};

export default plainFunc;
