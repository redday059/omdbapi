// this script serves for generating base64 images
// in order to get Base64 encoded image:
// - pass the path to file with image
// - run script in the terminal
// - copy the resulting string from the console

const image2base64 = require('image-to-base64');

const toBase64 = (pathToFile) => {
  image2base64(pathToFile)
    .then(
      (response) => {
        console.log(response);
        return response;
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
};

toBase64('../src/img/converted/books2-60.jpg');
