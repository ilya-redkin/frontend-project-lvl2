const jsonFunc = (arr) => {
  let result = '';
  arr.map((item) => {
    const stringifiedItem = JSON.stringify(item).slice(1, -1);
    result += `${stringifiedItem},\n`;
    return result;
  });
  result = result.slice(0, -2);
  return `{${result}}`;
};
export default jsonFunc;
