
const fsPromises = require('fs').promises;

fsPromises.readFile('./http.md', { encoding: 'utf8' })
  .then(data => console.log(data))
  .catch(err => console.error(err));

fsPromises.writeFile('./http-copy.md', 'this is the promise')
  .then(() => console.log('DONE'))
  .catch(err => console.error(err));

fsPromises.readFile('test.txt')
  .then((data) => fsPromises.writeFile('test3.txt', data))
  .catch(err => console.error(err));

const readPromise = src => new Promise((resolve, reject) => {
  fsPromises.readFile(src, { encoding: 'utf8' }, (err, data) => {
    if(err) return reject(err);
    resolve(data);
  });
});

readPromise('./http.md')
  .then(data => console.log(data));
