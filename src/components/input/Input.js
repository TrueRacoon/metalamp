class Input {
  constructor(inputDom) {
    this.inputDom = inputDom;
    this._init();
  }

  _init() {
    this.typeIsDate = this.inputDom?.placeholder === Input.consts.DATE_PLACEHOLDER;
    this._bindEventListeners();
  }

  static consts = {
    DATE_PLACEHOLDER: 'ДД.ММ.ГГГГ',
    DATE_DELIMITER: '.',
  };

  getDate = () => {
    const [parsedDate, parsedMonth, parsedYear] = (
      this.inputDom.value.split(Input.consts.DATE_DELIMITER)
    );
    return new Date(parsedYear, parsedMonth - 1, parsedDate);
  };

  setValue = (value) => {
    this.inputDom.value = value;
  }

  removeInvalidClass = () => {
    this.inputDom.classList.remove('input_invalid');
  }

  isValidDate = () => {
    const dateRegex = /^\d{2}.\d{2}.\d{4}$/;
    if (!this.inputDom.value.match(dateRegex)) {
      return false;
    }
    const [parsedDate, parsedMonth, parsedYear] = (
      this.inputDom.value.split(Input.consts.DATE_DELIMITER)
    );
    return (
      this.inputDom.value === new Date(parsedYear, parsedMonth - 1, parsedDate)
        .toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })
    );
  }

  _bindEventListeners() {
    if (this.typeIsDate) {
      this.inputDom.addEventListener('focus', this._handleDateInputFocus);
      this.inputDom.addEventListener('blur', this._handleDateInputBlur);
    }
  }

  _handleDateInputFocus = () => {
    this.inputDom.classList.remove('input_invalid');
  }

  _handleDateInputBlur = () => {
    if (!this.isValidDate(this.inputDom.value)) {
      this.inputDom.classList.add('input_invalid');
    }
  }
}

export default Input;
