class ExpandableCheckboxList {
  constructor(listDom) {
    this.listDom = listDom;
    this._init();
  }

  _init() {
    this.dropdownButton = this.listDom.querySelector('.js-expandable-checkbox-list__dropdown-button');
    this.dropdownContent = this.listDom.querySelector('.js-expandable-checkbox-list__dropdown-content');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.dropdownButton.addEventListener('click', this._handleDropdownButtonClick);
  }

  _handleDropdownButtonClick = () => {
    this.dropdownButton.classList.toggle('expandable-checkbox-list__dropdown-button_turned');
    this.dropdownContent.classList.toggle('expandable-checkbox-list__dropdown-content_expanded');
  }
}

export default ExpandableCheckboxList;
