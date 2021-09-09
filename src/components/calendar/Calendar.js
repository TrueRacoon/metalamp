class Calendar {
  constructor(calendarDom) {
    this.calendarDom = calendarDom;
  }

  init() {
    this._setCalendarReferenceData();
    this.prevMonthButton = this.calendarDom.querySelector('.js_calendar__month-nav-button_prev');
    this.nextMonthButton = this.calendarDom.querySelector('.js_calendar__month-nav-button_next');
    this.topText = this.calendarDom.querySelector('.js_calendar__top-text');
    this.tableBody = this.calendarDom.querySelector('.js_calendar__table-body');
    this._setCalendarLabelText();
    this._formCalendarTableBody();
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this.prevMonthButton.addEventListener('click', this._handlePrevMonthButtonClick);
    this.nextMonthButton.addEventListener('click', this._handleNextMonthButtonClick);
  }

  _setCalendarReferenceData = (date = new Date()) => {
    this.calendarReferenceDate = date;
    this.calendarMonth = this.calendarReferenceDate.getMonth();
    this.calendarYear = this.calendarReferenceDate.getFullYear();
  }

  _handlePrevMonthButtonClick = () => {
    this._setCalendarReferenceData(new Date(
      this.calendarReferenceDate.getFullYear(),
      this.calendarReferenceDate.getMonth() - 1,
    ));
    this._setCalendarLabelText();
    this._formCalendarTableBody();
  }

  _handleNextMonthButtonClick = () => {
    this._setCalendarReferenceData(new Date(
      this.calendarReferenceDate.getFullYear(),
      this.calendarReferenceDate.getMonth() + 1,
    ));
    this._setCalendarLabelText();
    this._formCalendarTableBody();
  }

  _getCalendarMonthName = () => {
    const date = new Date(1970, this.calendarMonth);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  _setCalendarLabelText = () => {
    this.topText.innerHTML = `${this._getCalendarMonthName()} ${this.calendarYear}`;
  };

  _getLocalDayOfWeek = (date) => {
    const day = date.getDay();
    return day === 0 ? 7 : day;
  };

  _getLastDayOfMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  _getCalendarDays = (year, month) => {
    const days = [];
    const firstDayOfWeek = this._getLocalDayOfWeek(new Date(year, month, 1));
    const prevMonthDay = this._getLastDayOfMonth(year, month - 1);
    for (let i = firstDayOfWeek - 1; i > 0; i -= 1) {
      days.push({
        day: prevMonthDay - i + 1,
        isThisMonth: false,
      });
    }
    const lastDayOfMonth = this._getLastDayOfMonth(year, month);
    for (let i = 1; i <= lastDayOfMonth; i += 1) {
      days.push({
        day: i,
        isThisMonth: true,
      });
    }
    const nDaysToAdd = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= nDaysToAdd; i += 1) {
      days.push({
        day: i,
        isThisMonth: false,
      });
    }
    return days;
  };

  _formCalendarTableBody = () => {
    this.calendarDays = this._getCalendarDays(this.calendarYear, this.calendarMonth);
    const tableBodyFragment = document.createDocumentFragment();
    let currentTableRowElement;
    let currentTableDataElement;
    this.calendarDays.forEach((calendarDay, index) => {
      if (index % 7 === 0) {
        currentTableRowElement = document.createElement('tr');
        currentTableRowElement.classList.add('calendar__table-row');
        tableBodyFragment.append(currentTableRowElement);
      }
      currentTableDataElement = document.createElement('td');
      currentTableDataElement.classList.add('calendar__table-data');
      if (calendarDay.isThisMonth) {
        currentTableDataElement.classList.add('calendar__table-data_thisMonth');
      }
      currentTableDataElement.append(calendarDay.day);
      currentTableRowElement.append(currentTableDataElement);
    });
    this.tableBody.innerHTML = '';
    this.tableBody.append(tableBodyFragment);
  };
}

export default Calendar;
