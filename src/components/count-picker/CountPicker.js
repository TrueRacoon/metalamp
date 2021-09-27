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
      this.itemsModel[label] = parseInt(item.querySelector('.js-count-picker__item-value').innerText, 10);
      this.itemsDoms[label] = {
        minusButton: item.querySelector('.js-count-picker__button_type_minus'),
        itemValue: item.querySelector('.js-count-picker__item-value'),
        plusButton: item.querySelector('.js-count-picker__button_type_plus'),
      };
      if (this.itemsModel[label] === 0) {
        this.itemsDoms[label].minusButton.disabled = true;
      }
    });
    this.dropdownBlock = this.countPickerDom.querySelector('.js-dropdown-block');
    this.clearButton = this.countPickerDom.querySelector('.js-count-picker__clear-button');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    Object.entries(this.itemsDoms).forEach(([itemLabel, itemDom]) => {
      itemDom.minusButton.addEventListener('click', (event) => this._handleMinusButtonClick(event, itemLabel));
      itemDom.plusButton.addEventListener('click', () => this._handlePlusButtonClick(itemLabel, itemDom.minusButton));
    });
    this.dropdownBlock.addEventListener('click', this._handleDropdownBlockClick);
    this.clearButton?.addEventListener('click', this._handleClearButtonClick);
  }

  _handleDropdownBlockClick = () => {
    this.countPickerDom.classList.toggle('count-picker_expanded');
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
    if (this._isThereOnlyZeroCounters()) {
      this?.clearButton.classList.add('count-picker__control-button_hidden');
    }
    console.log(this.itemsModel);
  }

  _handlePlusButtonClick = (itemLabel, minusButton) => {
    this.itemsModel[itemLabel] += 1;
    this.itemsDoms[itemLabel].itemValue.innerText = this.itemsModel[itemLabel];
    // eslint-disable-next-line no-param-reassign
    minusButton.disabled = false;
    this.clearButton?.classList.remove('count-picker__control-button_hidden');
    console.log(this.itemsModel);
  }

  _handleClearButtonClick = () => {
    Object.entries(this.itemsDoms).forEach(([itemLabel, itemDom]) => {
      // eslint-disable-next-line no-param-reassign
      itemDom.itemValue.innerText = '0';
      // eslint-disable-next-line no-param-reassign
      itemDom.minusButton.disabled = true;
      this.itemsModel[itemLabel] = 0;
    });
    this.clearButton.classList.add('count-picker__control-button_hidden');
  }

  _isThereOnlyZeroCounters = () => (Object.values(this.itemsModel).every((v) => v === 0));
}

export default CountPicker;
