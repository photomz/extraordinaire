/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const klaw = require('klaw');
const pdf = require('pdf-parse');

const filter = item => {
  const basename = path.basename(item);
  return (basename === '.' || basename[0] !== '.') && basename;
};

const rootDir = path.join(__dirname, '../assets/pdf');
klaw(rootDir, { filter })
  // eslint-disable-next-line no-shadow
  .on('data', ({ path }) => {
    const subfolderNames = path
      .split(rootDir)
      .slice(1)
      .join('')
      .split('/')
      .slice(1);
    // console.log(subfolderNames);
    if (
      subfolderNames.length === 4 &&
      subfolderNames[subfolderNames.length - 1].includes('.pdf')
    ) {
      const textWritePath = `${path
        .split('.pdf')
        .slice(0)
        .join('')}.txt`;
      new Promise((resolve, reject) =>
        fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
      )
        .then(dataBuffer => pdf(dataBuffer))
        .then(({ text }) => {
          // console.log(text.slice(0, 1000));
          fs.writeFile(textWritePath, text, err => {
            if (err) console.error(err);
          });
          return null;
        })
        .catch(err => {
          console.log(subfolderNames);
          console.error(err);
        });
    }
  })
  // eslint-disable-next-line no-shadow
  .on('error', (err, { path }) => console.error(`At ${path}: ${err}`));
// .on('end', () => console.log('done'));
