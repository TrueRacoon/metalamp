class DropdownBlock {
  constructor(dropdownBlockDom) {
    this.dropdownBlockDom = dropdownBlockDom;
  }

  init() {
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.dropdownBlockDom.addEventListener('click', this._handleClick);
  }

  _handleClick = () => {
    this.dropdownBlockDom.classList.toggle('dropdown-block_expanded');
  }
}

export default DropdownBlock;
