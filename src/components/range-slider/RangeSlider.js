const thumbWidth = 16;

class RangeSlider {
  constructor(rangeSliderDom) {
    this.rangeSliderDom = rangeSliderDom;
    this._init();
  }

  _init() {
    this.width = this.rangeSliderDom.getBoundingClientRect().width;
    this.lowerInput = this.rangeSliderDom.querySelector('.js-range-slider__input_lower');
    this.upperInput = this.rangeSliderDom.querySelector('.js-range-slider__input_upper');
    this.sliderRangeLabel = this.rangeSliderDom.querySelector('.js-range-slider__range-label');
    this.step = parseInt(this.lowerInput.step, 10);
    this.stepMultiplierForNoCrossing = Math.ceil(this.width / (thumbWidth * 2));
    this.offset = this.step * this.stepMultiplierForNoCrossing;
    this.halfOffset = this.offset / 2;
    this._setInputsInitialValues();
    this.inputMin = parseInt(this.lowerInput.min, 10);
    this.inputMax = parseInt(this.upperInput.max, 10);
    this._updateSliderFill();
    this._bindEventListeners();
  }

  _setInputsInitialValues = () => {
    this.lowerInput.min = parseInt(this.sliderRangeLabel.dataset.minValue, 10) - this.halfOffset;
    this.upperInput.min = parseInt(this.sliderRangeLabel.dataset.minValue, 10) - this.halfOffset;
    this.lowerInput.max = parseInt(this.sliderRangeLabel.dataset.maxValue, 10) + this.halfOffset;
    this.upperInput.max = parseInt(this.sliderRangeLabel.dataset.maxValue, 10) + this.halfOffset;
    this.lowerInput.value = parseInt(this.sliderRangeLabel.dataset.initialLowerValue, 10) - this.halfOffset;
    this.upperInput.value = parseInt(this.sliderRangeLabel.dataset.initialUpperValue, 10) + this.halfOffset;
    this.sliderRangeLabel.innerText = (
      `${this._formatSum(parseInt(this.sliderRangeLabel.dataset.initialLowerValue, 10))}`
      + ` - ${this._formatSum(parseInt(this.sliderRangeLabel.dataset.initialUpperValue, 10))}`
    );
  }

  _bindEventListeners() {
    this.lowerInput.addEventListener('input', this._handleLowerInputInput);
    this.upperInput.addEventListener('input', this._handleUpperInputInput);
  }

  _handleLowerInputInput = () => {
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    const needOffsetUpperValue = this.lowerValue >= this.upperValue - this.offset;
    const needOffsetLowerValue = (
      needOffsetUpperValue
      && this.upperValue >= this.inputMax - this.offset
    );
    if (needOffsetUpperValue) {
      this.upperInput.value = this.lowerValue + this.offset;
    }
    if (needOffsetLowerValue) {
      this.lowerInput.value = this.upperValue - this.offset;
    }
    this._updateRangeLabel();
    this._updateSliderFill();
  }

  _handleUpperInputInput = () => {
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    const needOffsetLowerValue = this.upperValue <= this.lowerValue + this.offset;
    const needOffsetUpperValue = (
      needOffsetLowerValue
      && this.lowerValue <= this.inputMin + this.offset
    );
    if (needOffsetLowerValue) {
      this.lowerInput.value = this.upperValue - this.offset;
    }
    if (needOffsetUpperValue) {
      this.upperInput.value = this.lowerValue + this.offset;
    }
    this._updateRangeLabel();
    this._updateSliderFill();
  }

  _updateRangeLabel = () => {
    this.sliderRangeLabel.innerText = (
      `${this._formatSum(parseInt(this.lowerInput.value, 10) + this.halfOffset)}`
      + ` - ${this._formatSum(parseInt(this.upperInput.value, 10) - this.halfOffset)}`
    );
  }

  _updateSliderFill = () => {
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    this.leftPoint = ((this.lowerValue - this.inputMin) / (this.inputMax - this.inputMin)) * this.width;
    this.rightPoint = ((this.inputMax - this.upperValue) / (this.inputMax - this.inputMin)) * this.width;
    this.sliderFill = this.rangeSliderDom.querySelector('.js-range-slider__fill');
    this.sliderFill.style.left = `${this.leftPoint + (thumbWidth / 2) * (this.leftPoint > this.width / 2 ? -1 : 1)}px`;
    this.sliderFill.style.right = `${this.rightPoint + (thumbWidth / 2) * (this.rightPoint > this.width / 2 ? -1 : 1)}px`;
  }

  _formatSum = (sum) => (
    sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').concat('₽')
  );
}

export default RangeSlider;
