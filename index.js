import alert from "./test.js";

console.log('entry script, this JS runs on the client side');

document.querySelector("#siteButton").addEventListener('click', () => {
  alert();
});
