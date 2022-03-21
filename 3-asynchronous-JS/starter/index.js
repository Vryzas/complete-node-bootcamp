const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('Could not find that file!');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('Could not write the file');
      }
      resolve('Sucessfully wrote the file');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`) // promise
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // returns another promise
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message); // returns another promise
  })
  .then(() => {
    console.log(`Random dog image saved to file!`);
  })
  .catch((err) => {
    console.log(err);
  });
