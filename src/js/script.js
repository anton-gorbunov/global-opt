import scrolling from './modules/scrolling';
import tinySlider from './modules/slider';
import humburger from './modules/hamburger';
import modal from './modules/modal';
import forms from './modules/forms';
import mask from './modules/mask';

document.addEventListener('DOMContentLoaded', () => {
  tinySlider();
  scrolling('.up-btn');
  humburger();
  modal();
  forms();
  mask('[name="phone"]');
});
