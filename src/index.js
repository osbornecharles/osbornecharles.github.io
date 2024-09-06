import * as utils from './utils.js';

console.log('entry script, this JS runs on the client side');

const numBackgroundImages = 5;
const backgroundImages = [];
const backgroundElementID = 'background';

const getBackgroundImageData = (event) => {
  for (let img = 1; img <= numBackgroundImages; img++) {
    const elem = document.getElementById(`${backgroundElementID}${img}`);
    const boundingBox = elem.getBoundingClientRect();
    const ystart = boundingBox.top + window.scrollY;
    const yend = boundingBox.bottom + window.scrollY; 
    backgroundImages[img] = { elem, ystart, yend };
  } 
}

const onScroll = () => {
  const viewportHeight = document.documentElement.clientHeight;  
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + viewportHeight;
  let currentlyDisplayedBackgrounds = backgroundImages.filter((img) => {
    return !((img.ystart < viewportTop && img.yend < viewportTop) || (img.ystart > viewportBottom));
  });
  currentlyDisplayedBackgrounds.forEach((img) => {
    let containedPixels = 0;
    const imgHeight = img.yend - img.ystart;
    if (img.ystart < viewportTop && img.yend < viewportBottom) {
      containedPixels = img.yend - viewportTop; 
    } else if (img.yend > viewportBottom && img.ystart > viewportTop) {
      containedPixels = viewportBottom - img.ystart;
    } else {
      containedPixels = viewportHeight;
    } 
    let opacity;
    (imgHeight < viewportHeight) ? opacity = containedPixels / imgHeight : opacity = containedPixels / viewportHeight;
    opacity = (opacity < .2) ? .2 : opacity;
    opacity = (opacity > 1) ? 1 : opacity;
    console.log(opacity);
    img.elem.style.opacity = opacity; 
  });
}

window.visualViewport.addEventListener("resize", getBackgroundImageData);
window.visualViewport.addEventListener("resize", onScroll);
window.addEventListener("load", getBackgroundImageData);
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
