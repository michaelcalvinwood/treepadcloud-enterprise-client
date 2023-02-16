fs = require('fs');

let fileNames = fs.readFileSync('svg-filenames.json', 'utf8');
fileNames = JSON.parse(fileNames);
let icons = fileNames.map(file => {
    let parts = file.split('/');
    return {
        t: parts[2],
        n: parts[3]
    }  
})

icons.sort((a, b) => {
    if (a.n > b.n) return 1;
    if (a.n < b.n) return -1;
    return 0;
});

fs.writeFileSync('icons.json', JSON.stringify(icons));

