import CountPicker from './CountPicker';
import '../dropdown-block';

const countPickers = document.querySelectorAll(
  '.js-elements .js-count-picker,'
  + '.js-room-search .js-count-picker,'
  + '.js-search-room .js-count-picker',
);

countPickers.forEach((countPickerDom) => {
  const countPicker = new CountPicker(countPickerDom);
  countPicker.init();
});
