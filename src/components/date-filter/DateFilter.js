class DateFilter {
  constructor(dateFilterDom) {
    this.dateFilterDom = dateFilterDom;
  }

  init() {
    console.log(this.dateFilterDom);
    this.arrivalExpandButton = this.dateFilterDom.querySelector(
      '.js_date-filter__arrival .js_input__button_type_dropdown',
    );
    this.calendarContainer = this.dateFilterDom.querySelector(
      '.js-date-filter__calendar-container',
    );
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.arrivalExpandButton.addEventListener('click', this._handleArrivalExpandButtonClick);
  }

  _handleArrivalExpandButtonClick = () => {
    console.log(this.calendarContainer);
    this.calendarContainer.classList.toggle('date-filter__calendar-container_opened');
  }
}

export default DateFilter;