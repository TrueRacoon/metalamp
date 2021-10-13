import getWordDeclension from '../../utils/getWordDeclension';

class CountPicker {
  constructor(countPickerDom, dropdownBlock) {
    this.countPickerDom = countPickerDom;
    this.dropdownBlock = dropdownBlock;
    this._init();
  }

  _init() {
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
    this.dropdownBlockDom = this.countPickerDom.querySelector('.js-dropdown-block');
    this.clearButton = this.countPickerDom.querySelector('.js-count-picker__clear-button');
    this.applyButton = this.countPickerDom.querySelector('.js-count-picker__apply-button');
    if (this.getCountersSum() === 0) {
      this?.clearButton.classList.add('count-picker__control-button_hidden');
    }
    this._setDropdownBlockText();
    this._bindEventListeners();
  }

  _bindEventListeners() {
    Object.entries(this.itemsDoms).forEach(([itemLabel, itemDom]) => {
      itemDom.minusButton.addEventListener('click', (event) => this._handleMinusButtonClick(event, itemLabel));
      itemDom.plusButton.addEventListener('click', () => this._handlePlusButtonClick(itemLabel, itemDom.minusButton));
    });
    this.dropdownBlockDom.addEventListener('click', this._handleDropdownBlockClick);
    this.clearButton?.addEventListener('click', this._handleClearButtonClick);
    this.applyButton?.addEventListener('click', this._handleApplyButtonClick);
  }

  getCountersSum = () => Object.values(this.itemsModel).reduce((a, b) => a + b);

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
    if (this.getCountersSum() === 0) {
      this.clearButton?.classList.add('count-picker__control-button_hidden');
    }
    if (!this.applyButton) {
      this._setDropdownBlockText();
    }
    console.log(this.itemsModel);
  }

  _handlePlusButtonClick = (itemLabel, minusButton) => {
    this.itemsModel[itemLabel] += 1;
    this.itemsDoms[itemLabel].itemValue.innerText = this.itemsModel[itemLabel];
    // eslint-disable-next-line no-param-reassign
    minusButton.disabled = false;
    this.clearButton?.classList.remove('count-picker__control-button_hidden');
    if (!this.applyButton) {
      this._setDropdownBlockText();
    }
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

  _handleApplyButtonClick = () => {
    this._setDropdownBlockText();
    this.dropdownBlock.toggleExpanded();
    this.countPickerDom.classList.toggle('count-picker_expanded');
  }

  _setDropdownBlockText = () => {
    if (this.countPickerDom.dataset.type === 'guests') {
      this._setGuestPickerText();
    }
    if (this.countPickerDom.dataset.type === 'facilities') {
      this._setFacilitiesPickerText();
    }
  }

  _setGuestPickerText = () => {
    const counterSum = this.getCountersSum();
    if (counterSum === 0) {
      this.dropdownBlock.setText('Сколько гостей');
      return;
    }
    let text = `${counterSum} ${getWordDeclension(counterSum, ['гость', 'гостя', 'гостей'])}`;
    if (this.itemsModel['Младенцы'] > 0) {
      text += `, ${this.itemsModel['Младенцы']} ${getWordDeclension(this.itemsModel['Младенцы'], ['младенец', 'младенца', 'младенцев'])}`;
    }
    this.dropdownBlock.setText(text);
  }

  _setFacilitiesPickerText = () => {
    const counterSum = this.getCountersSum();
    if (counterSum === 0) {
      this.dropdownBlock.setText('Выбор удобств');
      return;
    }
    let text = '';
    if (this.itemsModel['Спальни'] > 0) {
      text += `${this.itemsModel['Спальни']} ${getWordDeclension(this.itemsModel['Спальни'], ['спальня', 'спальни', 'спален'])}`;
    }
    const needComma = this.itemsModel['Спальни'] > 0 && this.itemsModel['Кровати'] > 0;
    if (this.itemsModel['Кровати'] > 0) {
      text += `${needComma ? ', ' : ''}${this.itemsModel['Кровати']} ${getWordDeclension(this.itemsModel['Кровати'], ['кровать', 'кровати', 'кроватей'])}`;
    }
    text += '...';
    this.dropdownBlock.setText(text);
  }
}

export default CountPicker;
