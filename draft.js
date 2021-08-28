const compare = (file1, file2) => {

    const data1 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file1)}`, 'utf8'));
    const data2 = JSON.parse(fs.readFileSync(`${path.resolve(__dirname, file2)}`, 'utf8'));
    // console.log(data1);
    // console.log(data2);
    
    const listOfKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();
    
    let output = '';
    
    for (const key of listOfKeys) {
    if (!data2.hasOwnProperty(key)) {
        output = output + `
        - ${key}: ${data1[key]}`
    }
    if (!data1.hasOwnProperty(key)) {
        output = output + `
        + ${key}: ${data2[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
        output = output + `
          ${key}: ${data1[key]}`
    }
    if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
        output = output + `
        - ${key}: ${data1[key]}
        + ${key}: ${data2[key]}`
    }
    }
    output = `{${output}
    }`;
    console.log(output);
};

compare('./file1.json', '/home/ilya/hexlet/frontend-project-lvl2/frontend-project-lvl2/file2.json');









// console.log(listOfKeys);
// console.log(data2);

// const ordered1 = Object.keys(data1).sort().reduce(
//     (obj, key) => { 
//       obj[key] = data1[key]; 
//       return obj;
//     }, 
//     {}
//   );

//   const ordered2 = Object.keys(data2).sort().reduce(
//     (obj, key) => { 
//       obj[key] = data2[key]; 
//       return obj;
//     }, 
//     {}
//   );


// const ordered1 = Object.entries(data1).sort();
// const ordered2 = Object.entries(data2).sort();

// const ordered = Object.entries(data1).sort();


