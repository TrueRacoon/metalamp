class Input {
  constructor(inputDom) {
    this.inputDom = inputDom;
  }

  init() {
    this._setConsts();
    this.typeIsDate = this.inputDom.placeholder === this.consts.DATE_PLACEHOLDER;
    this._bindEventListeners();
  }

  isValidDate = () => {
    const dateRegex = /^\d{2}.\d{2}.\d{4}$/;
    if (!this.inputDom.value.match(dateRegex)) {
      return false;
    }
    const [parsedDate, parsedMonth, parsedYear] = this.inputDom.value.split(this.consts.DELIMITER);
    return (
      this.inputDom.value === new Date(parsedYear, parsedMonth - 1, parsedDate)
        .toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })
    );
  }

  _setConsts = () => {
    this.consts = {
      DATE_PLACEHOLDER: 'ДД.ММ.ГГГГ',
      DELIMITER: '.',
    };
  }

  _bindEventListeners() {
    if (this.typeIsDate) {
      this.inputDom.addEventListener('focus', this._handleDateInputOnFocus);
      this.inputDom.addEventListener('blur', this._handleDateInputOnBlur);
    }
  }

  _handleDateInputOnFocus = () => {
    this.inputDom.classList.remove('input_invalid');
  }

  _handleDateInputOnBlur = () => {
    if (!this.isValidDate(this.inputDom.value)) {
      this.inputDom.classList.add('input_invalid');
    }
  }
}

export default Input;
