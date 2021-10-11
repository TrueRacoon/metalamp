class SingleDateInputDateFilter {
  constructor(dateFilterDom, calendar, dateDropdown) {
    this.dateFilterDom = dateFilterDom;
    this.calendar = calendar;
    this.dateDropdown = dateDropdown;
    this._init();
  }

  _init() {
    this.dateDropdownDom = this.dateFilterDom.querySelector('.js-dropdown-block');
    this.calendar.setFirstSelectedDate(this._getDateFromString(this.dateDropdownDom.dataset.arrivalDate));
    this.calendar.setSecondSelectedDate(this._getDateFromString(this.dateDropdownDom.dataset.departureDate));
    this.calendar.setCalendarReferenceData(this._getDateFromString(this.dateDropdownDom.dataset.departureDate));
    this.calendar.formCalendar();
    this.calendar.updateSelectedDatesView();
    this._setSelectedDatesAsInputText();
    this.calendarContainer = this.dateFilterDom.querySelector('.js-date-filter__calendar-container');
    this.calendarApplyButton = this.dateFilterDom.querySelector('.js-calendar__apply-button');
    this._bindEventListeners();
  }

  _getDateFromString = (string) => {
    const [parsedDate, parsedMonth, parsedYear] = (
      string.split('.')
    );
    return new Date(parsedYear, parsedMonth - 1, parsedDate);
  };

  _bindEventListeners() {
    this.dateDropdownDom.addEventListener('click', this._handleDropdownBlockClick);
    this.calendarApplyButton.addEventListener('click', this._handleCalendarApplyButtonClick);
  }

  _handleDropdownBlockClick = () => {
    this.calendarContainer.classList.toggle('date-filter__calendar-container_visible');
  }

  _setSelectedDatesAsInputText = () => {
    const firstSelectedDay = this.calendar.getFirstSelectedDate().getDate().toString();
    const firstSelectedMonth = this.calendar.getFirstSelectedDate().toLocaleString('default', { month: 'long' }).substring(0, 3);
    const secondSelectedDay = this.calendar.getSecondSelectedDate().getDate().toString();
    const secondSelectedMonth = this.calendar.getSecondSelectedDate().toLocaleString('default', { month: 'long' }).substring(0, 3);
    this.dateDropdown.setText(`${firstSelectedDay} ${firstSelectedMonth} - ${secondSelectedDay} ${secondSelectedMonth}`);
  }

  _handleCalendarApplyButtonClick = () => {
    this._setSelectedDatesAsInputText();
    this.calendarContainer.classList.toggle('date-filter__calendar-container_visible');
  }
}

export default SingleDateInputDateFilter;
