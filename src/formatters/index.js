import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  stylish,
  json: JSON.stringify,
};

const render = (ast, formatName) => formatters[formatName](ast);

export default render;
