export function debounce(fn) {
  let frame;
  return (...params) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    })
  }
};

export function smoothAnimate(fn, ...params) {
  let frame;
  frame = requestAnimationFrame(() => {
    fn(...params);
    smoothAnimate(fn, ...params);
  });
  const cancelFn = () => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
  } 
  return cancelFn;
};

const utils = {
  debounce,
  smoothAnimate
};

export default utils;
