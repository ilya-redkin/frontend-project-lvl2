import _ from 'lodash';

const compare = (file1, file2) => {
  const iter = (key) => {
    if (!_.hasIn(file1, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (!_.hasIn(file2, key)) {
      return { type: 'removed', key, value: file1[key] };
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { type: 'unchanged', key, value: file1[key] };
    }
    if (_.hasIn(file1, key) && _.hasIn(file2, key) && !_.isEqual(file1[key], file2[key]) && (typeof file1[key] !== 'object' || typeof file2[key] !== 'object' || file1[key] === null || file2[key] === null)) {
      return {
        type: 'changed', key, oldValue: file1[key], newValue: file2[key],
      };
    }
    if (_.hasIn(file1, key) && _.hasIn(file2, key) && !_.isEqual(file1[key], file2[key]) && typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      return { type: 'changedInside', key, children: compare(file1[key], file2[key]) };
    }
    return 0;
  };
  const listOfKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = listOfKeys.map(iter);
  return result;
};

export default compare;
