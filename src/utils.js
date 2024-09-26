/**
 * debounces a function so that it is fired only once per ms interval
 * fn function to debounce
 * ms interval over which function should only be fired once
 * @return (...params) => {} debounce-ready version of the function
 */
export function debounce(fn, ms) {
  let waiting = false;
  return (...params) => {
    if (waiting === true) {
      return; 
    }
    waiting = true;
    setTimeout(() => {
      fn(...params);
      waiting = false;
    }, ms);
  }
};

export function smoothAnimate(fn, ...params) {
  const animateData = {};
  smoothAnimatePrivate(fn, animateData, ...params);
  const cancelFn = () => {
    requestAnimationFrame(() => {
      cancelAnimationFrame(animateData.frame);
    });
  } 
  return cancelFn;
}

function smoothAnimatePrivate(fn, animateData, ...params) {
  animateData.frame = requestAnimationFrame(() => {
    fn(...params);
    smoothAnimatePrivate(fn, animateData, ...params);
  });
};

const utils = {
  debounce,
  smoothAnimate
};

export default utils;
