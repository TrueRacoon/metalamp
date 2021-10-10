class DropdownBlock {
  constructor(dropdownBlockDom) {
    this.dropdownBlockDom = dropdownBlockDom;
    this._init();
  }

  _init() {
    this.dropdownBlockTextDom = this.dropdownBlockDom.querySelector('.js-dropdown-block__text');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.dropdownBlockDom.addEventListener('click', this._handleClick);
  }

  _handleClick = () => {
    this.toggleExpanded();
  }

  toggleExpanded = () => {
    this.dropdownBlockDom.classList.toggle('dropdown-block_expanded');
  }

  setText = (text) => {
    this.dropdownBlockTextDom.innerText = text;
  }
}

export default DropdownBlock;
