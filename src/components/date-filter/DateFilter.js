class DateFilter {
  constructor(dateFilterDom, calendar) {
    this.dateFilterDom = dateFilterDom;
    this.calendar = calendar;
  }

  init() {
    this.arrivalExpandButton = this.dateFilterDom.querySelector(
      '.js-date-filter__arrival .js-input__button_type_dropdown',
    );
    this.departureExpandButton = this.dateFilterDom.querySelector(
      '.js-date-filter__departure .js-input__button_type_dropdown',
    );
    this.calendarContainer = this.dateFilterDom.querySelector(
      '.js-date-filter__calendar-container',
    );
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.arrivalExpandButton.addEventListener('click', this._handleArrivalExpandButtonClick);
    this.departureExpandButton.addEventListener('click', this._handleDepartureExpandButtonClick);
  }

  _handleArrivalExpandButtonClick = () => {
    this.calendarContainer.classList.toggle('date-filter__calendar-container_opened');
    this.arrivalExpandButton.classList.toggle('input__button_type_dropdown_turned');
    this.departureExpandButton.classList.remove('input__button_type_dropdown_turned');
  }

  _handleDepartureExpandButtonClick = () => {
    this.calendarContainer.classList.toggle('date-filter__calendar-container_opened');
    this.departureExpandButton.classList.toggle('input__button_type_dropdown_turned');
    this.arrivalExpandButton.classList.remove('input__button_type_dropdown_turned');
  }
}

export default DateFilter;
