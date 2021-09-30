class RangeSlider {
  constructor(rangeSliderDom) {
    this.rangeSliderDom = rangeSliderDom;
    this._init();
  }

  _init() {
    this.lowerInput = this.rangeSliderDom.querySelector('.js-range-slider__input_lower');
    this.upperInput = this.rangeSliderDom.querySelector('.js-range-slider__input_upper');
    this.sliderRange = this.rangeSliderDom.querySelector('.js-range-slider__range-label');
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    this.step = parseInt(this.lowerInput.step, 10);
    this._updateRangeLabel();
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.lowerInput.addEventListener('input', this._handleLowerInputInput);
    this.upperInput.addEventListener('input', this._handleUpperInputInput);
  }

  _handleLowerInputInput = () => {
    console.log(`Before(LI): ${this.lowerInput.value} - ${this.upperInput.value}`);
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    if (this.lowerValue > this.upperValue - this.step) {
      this.upperInput.value = this.lowerValue + this.step;
    }
    this._updateRangeLabel();
    console.log(`After(LI): ${this.lowerInput.value} - ${this.upperInput.value}`);
  }

  _handleUpperInputInput = () => {
    console.log(`Before(AI): ${this.lowerInput.value} - ${this.upperInput.value}`);
    this.lowerValue = parseInt(this.lowerInput.value, 10);
    this.upperValue = parseInt(this.upperInput.value, 10);
    if (this.upperValue < this.lowerValue + this.step) {
      console.log(this.upperValue)
      console.log(this.lowerValue + this.step)
      console.log('*')
      this.lowerInput.value = this.upperValue - this.step;
    }
    this._updateRangeLabel();
    console.log(`After(AI): ${this.lowerInput.value} - ${this.upperInput.value}`);
  }

  _updateRangeLabel = () => {
    this.sliderRange.innerText = `${this._formatSum(this.lowerValue)} - ${this._formatSum(this.upperValue)}`;
  }

  _formatSum = (sum) => (
    sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').concat('₽')
  );
}

export default RangeSlider;
