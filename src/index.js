import * as utils from './utils.js';
import page_views from './page_views.js';

const numBackgroundImages = 9;
const backgroundImages = [];
const backgroundElementID = 'background';
const autoscrollSwitchID = 'scroll-control-switch-label';
const autoscrollCheckboxID = 'scroll-control-switch-checkbox';
const pageVisitsDisplayID = 'page-visits-number';
let autoscrollOn = true;
let cancelAutoscrollFn;

const autoscrollSwitchClick = (event) => {
  autoscrollOn = !autoscrollOn;
  if (!autoscrollOn) {
    cancelAutoscrollFn(); 
  } else {
    startAutoscroll();
  }
};

const autoscrollReachBottom = () => {
  document.getElementById(autoscrollCheckboxID).checked = false;
  autoscrollSwitchClick();
}

const getEnvironment = () => {
  return document.querySelector('meta[name="environment"]').content;
}

const startingPoint = () => {
  const env = getEnvironment();
  getBackgroundImageData();
  document.getElementById(autoscrollSwitchID).addEventListener('click', autoscrollSwitchClick);
  if (env === 'production') {
    page_views.incrementPageViews().then((pageViewData) => {
      document.getElementById(pageVisitsDisplayID).textContent = pageViewData.Count;
    });
  } else {
    page_views.getPageViews().then((pageViewData) => {
      document.getElementById(pageVisitsDisplayID).textContent = pageViewData.Count;
    });
  }
  startAutoscroll();
};

const autoscroll = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
    autoscrollReachBottom();
  } else {
    window.scrollBy({top: 12, left: 0, behavior: 'smooth'});
  }
};

const startAutoscroll = (event) => {
  cancelAutoscrollFn = utils.smoothAnimate(autoscroll);
};

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
    img.elem.style.opacity = opacity; 
  });
}

window.visualViewport.addEventListener("resize", getBackgroundImageData);
window.visualViewport.addEventListener("resize", onScroll);
document.addEventListener('scroll', utils.debounce(onScroll, 90), { passive: true });

startingPoint();
