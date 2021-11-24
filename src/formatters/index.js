import plainFunc from './plain.js';
import stylishFunc from './stylish.js';
import jsonFunc from './json.js';

const formatters = {
  plain: plainFunc,
  stylish: stylishFunc,
  json: jsonFunc,
};

const render = (ast, format) => formatters[format](ast);

export default render;
