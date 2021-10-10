import CountPicker from './CountPicker';
import DropdownBlock from '../dropdown-block/DropdownBlock';

const countPickers = document.querySelectorAll(
  '.js-elements .js-count-picker,'
  + '.js-room-search .js-count-picker,'
  + '.js-search-room .js-count-picker',
);

countPickers.forEach((countPickerDom) => {
  const dropdownBlockDom = countPickerDom.querySelector('.js-dropdown-block');
  const dropdownBlock = new DropdownBlock(dropdownBlockDom);
  return new CountPicker(countPickerDom, dropdownBlock);
});
