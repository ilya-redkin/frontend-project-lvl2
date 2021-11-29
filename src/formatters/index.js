import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatters = {
  plain: makePlain,
  stylish: makeStylish,
  json: JSON.stringify,
};

const render = (ast, format) => formatters[format](ast);

export default render;
