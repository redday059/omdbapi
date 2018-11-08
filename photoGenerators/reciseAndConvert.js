// run 'yarn images' to get images in jpg and webP formats with width declared in './constants'

const fs = require('fs');
const sharp = require('sharp');

const folderToConvert = './src/images/to_convert';
const converted = './src/images/converted';
const constants = require('./constants');


fs.readdirSync(folderToConvert).forEach(file => {
  // file name without extension to fulfill input requirement of sharp API
  const imgName = file.split('.')[0];
  Promise
    .all(constants.DESIRED_PHOTO_WIDTHS.map(size => {
        const img = sharp(`${folderToConvert}/${imgName}.jpg`);
        img
          .resize(size)
          .toFile(`${converted}/${imgName}-${size}.jpg`);
        console.log(`Created:${imgName}-${size}.jpg`);
        img
          .resize(size)
          .webp({
            lossless: true,
            quality: 85
          })
          .toFile(`${converted}/${imgName}-${size}.webp`);
        console.log(`Created: ${imgName}-${size}.webp \n`);
      })
    )
    .then(() => {
      console.log(`Conversion completed: ${imgName}`);
    });
});
