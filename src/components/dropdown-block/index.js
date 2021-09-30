import DropdownBlock from './DropdownBlock';

const dropdownBlocks = document.querySelectorAll('.js-dropdown-block');

dropdownBlocks.forEach((dropdownBlockDom) => new DropdownBlock(dropdownBlockDom));
