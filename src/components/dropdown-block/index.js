import DropdownBlock from './DropdownBlock';

const dropdownBlocks = document.querySelectorAll('.js-dropdown-block');

dropdownBlocks.forEach((dropdownBlockDom) => {
  const dropdownBlock = new DropdownBlock(dropdownBlockDom);
  dropdownBlock.init();
});
