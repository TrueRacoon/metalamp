import RangeSlider from './RangeSlider';

const sliders = document.querySelectorAll('.range-slider');

sliders.forEach((slidersDom) => new RangeSlider(slidersDom));
