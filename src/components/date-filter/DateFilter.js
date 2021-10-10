class DateFilter {
  constructor(dateFilterDom, calendar, arrivalDateInput, departureDateInput) {
    this.dateFilterDom = dateFilterDom;
    this.calendar = calendar;
    this.arrivalDateInput = arrivalDateInput;
    this.departureDateInput = departureDateInput;
    this._init();
  }

  _init() {
    this.calendar.setFirstSelectedDate(this.arrivalDateInput.getDate());
    this.calendar.setSecondSelectedDate(this.departureDateInput.getDate());
    this.calendar.updateSelectedDatesView();
    this.arrivalExpandButton = this.dateFilterDom.querySelector(
      '.js-date-filter__arrival .js-input__button_type_dropdown',
    );
    this.departureExpandButton = this.dateFilterDom.querySelector(
      '.js-date-filter__departure .js-input__button_type_dropdown',
    );
    this.calendarContainer = this.dateFilterDom.querySelector(
      '.js-date-filter__calendar-container',
    );
    this.calendarApplyButton = this.dateFilterDom.querySelector('.js-calendar__apply-button');
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.arrivalExpandButton.addEventListener('click', this._handleArrivalExpandButtonClick);
    this.departureExpandButton.addEventListener('click', this._handleDepartureExpandButtonClick);
    this.calendarApplyButton.addEventListener('click', this._handleCalendarApplyButtonClick);
    this.arrivalDateInput.inputDom.addEventListener('blur', this._handleArrivalDateInputBlur);
    this.departureDateInput.inputDom.addEventListener('blur', this._handleDepartureDateInputBlur);
  }

  _handleArrivalExpandButtonClick = () => {
    if (this.arrivalDateInput.isValidDate()) {
      this.calendar.setCalendarReferenceData(this.arrivalDateInput.getDate());
      this.calendar.formCalendar();
      this.calendar.updateSelectedDatesView();
    }
    this.calendarContainer.classList.toggle('date-filter__calendar-container_visible');
  }

  _handleDepartureExpandButtonClick = () => {
    if (this.departureDateInput.isValidDate()) {
      this.calendar.setCalendarReferenceData(this.departureDateInput.getDate());
      this.calendar.formCalendar();
      this.calendar.updateSelectedDatesView();
    }
    this.calendarContainer.classList.toggle('date-filter__calendar-container_visible');
  }

  _handleCalendarApplyButtonClick = () => {
    if (this.calendar.getFirstSelectedDate()) {
      this.arrivalDateInput.setValue(
        this.calendar.getFirstSelectedDate()
          .toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      );
      this.arrivalDateInput.removeInvalidClass();
    }
    if (this.calendar.getSecondSelectedDate()) {
      this.departureDateInput.setValue(
        this.calendar.getSecondSelectedDate()
          .toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      );
      this.departureDateInput.removeInvalidClass();
    }
    this.calendarContainer.classList.toggle('date-filter__calendar-container_visible');
  }

  _handleArrivalDateInputBlur = () => {
    if (this.arrivalDateInput.isValidDate()) {
      this.calendar.setFirstSelectedDate(this.arrivalDateInput.getDate());
    } else {
      this.calendar.setFirstSelectedDate(null);
    }
    this.calendar.updateSelectedDatesView();
  }

  _handleDepartureDateInputBlur = () => {
    if (this.departureDateInput.isValidDate()) {
      this.calendar.setSecondSelectedDate(this.departureDateInput.getDate());
    } else {
      this.calendar.setSecondSelectedDate(null);
    }
    this.calendar.updateSelectedDatesView();
  }
}

export default DateFilter;
