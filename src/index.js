import * as utils from './utils.js';

console.log('entry script, this JS runs on the client side');

const backgroundPrefix = 'background';
const localhostURL = 'localhost:3000';
const domain = localhostURL;
const numBackgroundImages = 5;
const backgroundImages = [];
const backgroundElementID = 'background';
let currentImage = 1;

const onScroll = () => {
  const imageHeight = 1000;
  const maxHeight = numBackgroundImages * imageHeight;
  const currentScroll = window.scrollY;
  let displayImage;
  if (currentScroll >= maxHeight) {
    displayImage = numBackgroundImages;
  }
  else {
    displayImage = Math.floor(currentScroll / imageHeight) + 1;
  }
  if (displayImage !== currentImage) {
    const backgroundURL = `./${backgroundPrefix}${displayImage}.jpg`
    document.getElementById(backgroundElementID).style.backgroundImage = `url(${backgroundURL})`;
    currentImage = displayImage;
  }
}

document.addEventListener('scroll', utils.debounce(onScroll), { passive: true });

/**
function handleBackgrounds (response) {
  console.log(response);
  background Images = 
}

for (let img = 1; img < numBackgroundImages; img++) {
  const backgroundsRequest = new XMLHttpRequest();
  backgroundsRequest.addEventListener('load', handleBackgrounds);
  const backgroundURL = `${domain}/background${img}.jpg`;
  backgroundsRequest.open('GET', backgroundURL);
  backgroundsRequest.send();
}
*/
