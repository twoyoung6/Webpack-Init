// Greeter.js
require('!style-loader!css-loader!./Greeter.css')
import JSON from '../json/const.json'
export const greet = function () {
  let greet = document.createElement('div')
  greet.textContent = JSON.greetText
  return greet
}
