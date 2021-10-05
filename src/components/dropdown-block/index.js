import DropdownBlock from './DropdownBlock';

const dropdownBlocks = document.querySelectorAll('.js-count-picker .js-dropdown-block');

dropdownBlocks.forEach((dropdownBlockDom) => new DropdownBlock(dropdownBlockDom));
