import yaml from 'js-yaml';

const parseFile = (file, extention) => {
  if (extention === '.json') {
    return JSON.parse(file);
  }
  if (extention === '.yaml' || extention === '.yml') {
    return yaml.load(file);
  }
  return 'The file is neither .json nor .yaml';
};

export default parseFile;
