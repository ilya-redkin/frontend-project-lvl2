import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const iterateThroughKeys = (key) => {
    if (!_.hasIn(file1, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (!_.hasIn(file2, key)) {
      return { type: 'removed', key, value: file1[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { type: 'unchanged', key, value: file1[key] };
    }
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      return { type: 'changedInside', key, children: buildDiff(file1[key], file2[key]) };
    }
    return {
      type: 'changed', key, oldValue: file1[key], newValue: file2[key],
    };
  };
  const listOfKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = listOfKeys.map(iterateThroughKeys);
  return result;
};

export default buildDiff;
