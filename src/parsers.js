import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parseFile = (file, extention) => parsers[extention.slice(1)](file);

export default parseFile;
