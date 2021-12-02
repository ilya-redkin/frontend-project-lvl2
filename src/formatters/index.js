import makePlain from './plain.js';
import makeStylish from './stylish.js';

// const formatters = {
//   plain: makePlain,
//   stylish: makeStylish,
//   json: JSON.stringify,
// };

const render = (ast, format) => {
  if (format === 'plain') {
    return makePlain(ast);
  }
  if (format === 'stylish') {
    return makeStylish(ast);
  }
  return JSON.stringify(ast);
};

export default render;
