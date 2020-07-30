/****
** A simple Node Script to Compare 2 package.json files.
**
*/
var myArgs = process.argv.slice(2);

const oldPackageLock = require(myArgs[0]);
const newPackageLock = require(myArgs[1]);

let count = 1;
let table = [];
let missing = [];
for(let key in oldPackageLock.dependencies){
    if(newPackageLock.dependencies[key] && newPackageLock.dependencies[key].version){
        if(oldPackageLock.dependencies[key].version !== newPackageLock.dependencies[key].version){
            table.push({"Package":key,"Old Version":oldPackageLock.dependencies[key].version, "New Version":newPackageLock.dependencies[key].version})
        }
    } else {
        missing.push({"Missing Packages:":key, 'Version:':oldPackageLock.dependencies[key].version,"File":myArgs[0]})
    }
    count++;
}
for(let key in newPackageLock.dependencies){
    if(!oldPackageLock.dependencies[key]){
        missing.push({"Missing Packages:":key, 'Version:':newPackageLock.dependencies[key].version,"File":myArgs[1]})
    }
}
console.table(missing);
console.table(table);
