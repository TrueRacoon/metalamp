const thumbWidth = 16;

class RangeSlider {
  constructor(rangeSliderDom) {
    this.rangeSliderDom = rangeSliderDom;
    this._init();
  }

  _init() {
    this.lowerInput = this.rangeSliderDom.querySelector('.js-range-slider__input_lower');
    this.upperInput = this.rangeSliderDom.querySelector('.js-range-slider__input_upper');
    this.sliderRange = this.rangeSliderDom.querySelector('.js-range-slider__range-label');
    this.step = parseInt(this.lowerInput.step, 10);
    this.stepMultiplierForNoCrossing = Math.ceil(this.rangeSliderDom.getBoundingClientRect().width / (thumbWidth * 2));
    this.offset = this.step * (this.stepMultiplierForNoCrossing / 2);
    this._setInputsInitialValues();
    this._bindEventListeners();
  }

  _setInputsInitialValues = () => {
    this.lowerInput.min = parseInt(this.sliderRange.dataset.minValue, 10) - this.offset;
    this.upperInput.min = parseInt(this.sliderRange.dataset.minValue, 10) - this.offset;
    this.lowerInput.max = parseInt(this.sliderRange.dataset.maxValue, 10) + this.offset;
    this.upperInput.max = parseInt(this.sliderRange.dataset.maxValue, 10) + this.offset;
    this.lowerInput.value = parseInt(this.sliderRange.dataset.initialLowerValue, 10) - this.offset;
    this.upperInput.value = parseInt(this.sliderRange.dataset.initialUpperValue, 10) + this.offset;
    this.sliderRange.innerText = (
      `${this._formatSum(parseInt(this.sliderRange.dataset.initialLowerValue, 10))}`
      + ` - ${this._formatSum(parseInt(this.sliderRange.dataset.initialUpperValue, 10))}`
    );
  }

  _bindEventListeners() {
    this.lowerInput.addEventListener('input', this._handleLowerInputInput);
    this.upperInput.addEventListener('input', this._handleUpperInputInput);
  }

  _handleLowerInputInput = () => {
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    this.upperMax = parseInt(this.upperInput.max, 10);
    const needOffsetUpperValue = this.lowerValue >= this.upperValue - this.step * this.stepMultiplierForNoCrossing;
    const needOffsetLowerValue = (
      needOffsetUpperValue
      && this.upperValue >= this.upperMax - this.step * this.stepMultiplierForNoCrossing
    );
    if (needOffsetUpperValue) {
      this.upperInput.value = this.lowerValue + this.step * this.stepMultiplierForNoCrossing;
    }
    if (needOffsetLowerValue) {
      this.lowerInput.value = this.upperValue - this.step * this.stepMultiplierForNoCrossing;
    }
    this._updateRangeLabel();
  }

  _handleUpperInputInput = () => {
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    this.lowerMin = parseInt(this.lowerInput.min, 10);
    const needOffsetLowerValue = this.upperValue <= this.lowerValue + this.step * this.stepMultiplierForNoCrossing;
    if (needOffsetLowerValue) {
      this.lowerInput.value = this.upperValue - this.step * this.stepMultiplierForNoCrossing;
    }
    const needOffsetUpperValue = (
      this.upperValue <= this.lowerValue + this.step * this.stepMultiplierForNoCrossing
      && this.lowerValue <= this.lowerMin + this.step * this.stepMultiplierForNoCrossing
    );
    if (needOffsetUpperValue) {
      this.upperInput.value = this.lowerValue + this.step * this.stepMultiplierForNoCrossing;
    }
    this._updateRangeLabel();
  }

  _updateRangeLabel = () => {
    this.sliderRange.innerText = (
      `${this._formatSum(parseInt(this.lowerInput.value, 10) + this.offset)}`
      + ` - ${this._formatSum(parseInt(this.upperInput.value, 10) - this.offset)}`
    );
  }

  _formatSum = (sum) => (
    sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').concat('₽')
  );
}

export default RangeSlider;
