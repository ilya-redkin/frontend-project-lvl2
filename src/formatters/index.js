import plainFunc from './plain.js';
import stylishFunc from './stylish.js';

const formatters = {
  plain: plainFunc,
  stylish: stylishFunc,
  json: JSON.stringify,
};

const render = (ast, format) => formatters[format](ast);

export default render;
