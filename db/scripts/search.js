/* eslint-disable no-console */
const db = require('../db.json');

// Returns key stack trace of location in db, last index is index in string
const recurseSearch = (dbSection, keyword, keys, searchPaths) => {
  let keyArr = JSON.parse(JSON.stringify(keys));
  if (Array.isArray(dbSection)) {
    for (let i = 0; i < dbSection.length; i += 1) {
      if (typeof dbSection[i] === 'string') {
        const searchIndex = dbSection[i].toLowerCase().search(keyword);
        if (searchIndex !== -1) {
          keyArr.push(i);
          keyArr.push(searchIndex);
          searchPaths.push(JSON.parse(JSON.stringify(keyArr)));
          keyArr = JSON.parse(JSON.stringify(keys));
        }
      } else if (
        Array.isArray(dbSection) ||
        (typeof dbSection === 'object' && dbSection !== null)
      ) {
        const newKeyArr = JSON.parse(JSON.stringify(keyArr));
        newKeyArr.push(i);
        recurseSearch(dbSection[i], keyword, newKeyArr, searchPaths);
        // if (searchResult !== null) searchPaths.push(searchResult);
      }
    }
    return searchPaths;
  }
  Object.entries(dbSection).forEach(([key, val]) => {
    // console.log(`${key}: ${val}`);
    if (typeof val === 'string') {
      const searchIndex = val.search(keyword);
      if (searchIndex !== -1) {
        keyArr.push(key);
        keyArr.push(searchIndex);
        searchPaths.push(JSON.parse(JSON.stringify(keyArr)));
        keyArr = JSON.parse(JSON.stringify(keys));
      }
    } else if (
      Array.isArray(val) ||
      (typeof val === 'object' && val !== null)
    ) {
      const newKeyArr = JSON.parse(JSON.stringify(keyArr));
      newKeyArr.push(key);
      recurseSearch(val, keyword, newKeyArr, searchPaths);
      //  if (searchResult !== null) return searchResult;
    }
  });
  return searchPaths;
};

const recurseAccess = (subdb, keys) => {
  if (keys.length === 1) return subdb;
  if (subdb[keys[0]] === undefined) return new Error('Access invalid');
  return recurseAccess(subdb[keys[0]], keys.slice(1));
};

const start = Date.now();
const res = recurseSearch(db, 'Hitler', [], []);
const end = Date.now();
console.log(res);
console.log(`Running time ${end - start}ms`);
console.log(`Result length ${res.length}`);
res.forEach(path => {
  console.log(path);
  console.log(recurseAccess(db, path));
});
