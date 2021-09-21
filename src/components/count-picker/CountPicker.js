class CountPicker {
  constructor(countPickerDom) {
    this.countPickerDom = countPickerDom;
  }

  init() {
    this.itemsModel = {};
    this.itemsDoms = {};
    const items = [...this.countPickerDom.getElementsByClassName('js-count-picker__item')];
    items.forEach((item) => {
      const label = item.querySelector('.js-count-picker__item-label').innerText;
      this.itemsModel[label] = 0;
      this.itemsDoms[label] = {
        minusButton: item.querySelector('.js-count-picker__button_type_minus'),
        itemValue: item.querySelector('.js-count-picker__item-value'),
        plusButton: item.querySelector('.js-count-picker__button_type_plus'),
      };
      this.itemsDoms[label].minusButton.disabled = true;
    });
    this.dropdownInput = this.countPickerDom.querySelector('.js-dropdown-input');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    const itemsDomsEntries = Object.entries(this.itemsDoms);
    itemsDomsEntries.forEach(([itemLabel, itemDom]) => {
      itemDom.minusButton.addEventListener('click', (event) => this._handleMinusButtonClick(event, itemLabel));
      itemDom.plusButton.addEventListener('click', () => this._handlePlusButtonClick(itemLabel, itemDom.minusButton));
    });
    this.dropdownInput.addEventListener('click', this._handleDropdownInputClick);
  }

  _handleDropdownInputClick = () => {
    this.countPickerDom.classList.toggle('count-picker_opened');
  }

  _handleMinusButtonClick = (event, itemLabel) => {
    if (this.itemsModel[itemLabel] === 0) {
      return;
    }
    this.itemsModel[itemLabel] -= 1;
    this.itemsDoms[itemLabel].itemValue.innerText = this.itemsModel[itemLabel];
    if (this.itemsModel[itemLabel] === 0) {
      // eslint-disable-next-line no-param-reassign
      event.target.disabled = true;
    }
    console.log(this.itemsModel);
  }

  _handlePlusButtonClick = (itemLabel, minusButton) => {
    this.itemsModel[itemLabel] += 1;
    this.itemsDoms[itemLabel].itemValue.innerText = this.itemsModel[itemLabel];
    // eslint-disable-next-line no-param-reassign
    minusButton.disabled = false;
    console.log(this.itemsModel);
  }
}

export default CountPicker;
