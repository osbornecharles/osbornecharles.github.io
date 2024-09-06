import * as utils from './utils.js';

console.log('entry script, this JS runs on the client side');

const numBackgroundImages = 5;
const backgroundImages = [];
const backgroundElementID = 'background';

window.addEventListener("load", (event) => {
  for (let img = 1; img <= numBackgroundImages; img++) {
    const elem = document.getElementById(`${backgroundElementID}${img}`);
    const boundingBox = elem.getBoundingClientRect();
    const ystart = boundingBox.top + window.scrollY;
    const yend = boundingBox.bottom + window.scrollY; 
    backgroundImages[img] = { elem, ystart, yend };
  } 
  console.log(backgroundImages);
});

const onScroll = () => {
  const currentScroll = window.scrollY;
  let centerX = document.documentElement.clientWidth / 2;
  let centerY = document.documentElement.clientHeight / 2;
  console.log(`Current scroll: ${currentScroll}`);
  console.log(`centerx: ${centerX}`);
  console.log(`centery: ${centerY}`);
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
