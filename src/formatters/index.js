import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  plain,
  stylish,
  json: JSON.stringify,
};

export default formatters;
