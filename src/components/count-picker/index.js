import CountPicker from './CountPicker';

const countPickers = document.querySelectorAll('.js-count-picker');

countPickers.forEach((countPickerDom) => {
  const countPicker = new CountPicker(countPickerDom);
  countPicker.init();
});
