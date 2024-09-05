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

const utils = {
  debounce
};

export default utils;
