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

// async/await fn, cleaner looking but===promises
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join(`\n`));
    console.log(`Random dog image saved to file!`);
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: ready!!!';
};

(async () => {
  try {
    console.log(`1: Will get dog pics!`);
    const x = await getDogPic();
    console.log(x);
    console.log(`3: Got the dog pics!`);
  } catch (err) {
    console.log(`ERROR!`);
  }
})();
