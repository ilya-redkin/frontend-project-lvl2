const plain = (data, path = '') => {
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

export default plain;
