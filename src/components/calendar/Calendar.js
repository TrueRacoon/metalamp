class Calendar {
  constructor(calendarDom) {
    this.calendarDom = calendarDom;
    this._init();
  }

  _init() {
    this.setCalendarReferenceData();
    this.prevMonthButton = this.calendarDom.querySelector('.js-calendar__month-nav-button_prev');
    this.nextMonthButton = this.calendarDom.querySelector('.js-calendar__month-nav-button_next');
    this.topText = this.calendarDom.querySelector('.js-calendar__top-text .js-text');
    this.tableBody = this.calendarDom.querySelector('.js-calendar__table-body');
    this.clearButton = this.calendarDom.querySelector('.js-calendar__clear-button');
    this.today = new Date();
    this.formCalendar();
    this._bindEventListeners();
  }

  getFirstSelectedDate = () => this.firstSelectedDate;

  // eslint-disable-next-line no-return-assign
  setFirstSelectedDate = (date) => this.firstSelectedDate = date;

  getSecondSelectedDate = () => this.secondSelectedDate;

  // eslint-disable-next-line no-return-assign
  setSecondSelectedDate = (date) => this.secondSelectedDate = date;

  setCalendarReferenceData = (date = new Date()) => {
    this.calendarReferenceDate = date;
    this.calendarMonth = this.calendarReferenceDate.getMonth();
    this.calendarYear = this.calendarReferenceDate.getFullYear();
  }

  formCalendar = () => {
    this._setCalendarLabelText();
    const tableBodyFragment = document.createDocumentFragment();
    let currentTableRowElement;
    let currentTableDataElement;
    this.calendarDateButtons = [];
    this.calendarDates = this._getCalendarDates(this.calendarYear, this.calendarMonth);
    this.calendarDates.forEach((calendarDate, index) => {
      if (index % 7 === 0) {
        currentTableRowElement = document.createElement('tr');
        currentTableRowElement.classList.add('calendar__table-row');
        tableBodyFragment.append(currentTableRowElement);
      }
      currentTableDataElement = document.createElement('td');
      currentTableDataElement.setAttribute('data-date', calendarDate.date);
      currentTableDataElement.classList.add('calendar__table-data', 'js-calendar__table-data');
      if (calendarDate.date.getMonth() === this.calendarMonth) {
        currentTableDataElement.classList.add('calendar__table-data_thisMonth');
      }
      if (this._isToday(calendarDate.date)) {
        currentTableDataElement.classList.add('calendar__table-data_today');
      }
      currentTableDataElement.append(calendarDate.date.getDate());
      // eslint-disable-next-line no-param-reassign
      calendarDate.calendarCell = currentTableDataElement;
      currentTableDataElement.addEventListener('click', this._handleCalendarDateButtonClick);
      this.calendarDateButtons.push(currentTableDataElement);
      currentTableRowElement.append(currentTableDataElement);
    });
    this.tableBody.innerHTML = '';
    this.tableBody.append(tableBodyFragment);
  };

  areBothDatesSelected = () => !!(this.firstSelectedDate && this.secondSelectedDate);

  updateSelectedDatesView = () => {
    this._removeAllSelectedClasses();
    this.calendarDates.forEach((calendarDate) => {
      const isCurrentDateSelectedFirst = this._areDatesEquals(calendarDate.date, this.firstSelectedDate);
      const isCurrentDateSelectedSecond = this._areDatesEquals(calendarDate.date, this.secondSelectedDate);
      const needAddSelectedClass = isCurrentDateSelectedFirst || isCurrentDateSelectedSecond;
      const needAddFirstSelectedClass = isCurrentDateSelectedFirst && this.areBothDatesSelected();
      const needAddSecondSelectedClass = isCurrentDateSelectedSecond && this.areBothDatesSelected();
      const needAddBetweenSelectedClass = (
        this.areBothDatesSelected()
        && calendarDate.date > this.firstSelectedDate
        && calendarDate.date < this.secondSelectedDate
      );
      if (needAddSelectedClass) {
        calendarDate.calendarCell.classList.add('calendar__table-data_selected');
      }
      if (needAddFirstSelectedClass) {
        calendarDate.calendarCell.classList.add('calendar__table-data_first-selected');
      }
      if (needAddBetweenSelectedClass) {
        calendarDate.calendarCell.classList.add('calendar__table-data_between-selected');
      }
      if (needAddSecondSelectedClass) {
        calendarDate.calendarCell.classList.add('calendar__table-data_second-selected');
      }
    });
  };

  _isToday = (date) => (
    date.getDate() === this.today.getDate()
    && date.getMonth() === this.today.getMonth()
    && date.getFullYear() === this.today.getFullYear()
  )

  _areDatesEquals = (firstDate, secondDate) => firstDate.toString() === secondDate?.toString();

  _removeAllSelectedClasses = () => {
    this.calendarDateButtons.forEach((dateButton) => {
      dateButton.classList.remove('calendar__table-data_selected');
      dateButton.classList.remove('calendar__table-data_first-selected');
      dateButton.classList.remove('calendar__table-data_between-selected');
      dateButton.classList.remove('calendar__table-data_second-selected');
    });
  }

  _bindEventListeners() {
    this.prevMonthButton.addEventListener('click', this._handlePrevMonthButtonClick);
    this.nextMonthButton.addEventListener('click', this._handleNextMonthButtonClick);
    this.clearButton.addEventListener('click', this._handleClearButtonClick);
  }

  _handlePrevMonthButtonClick = () => {
    this.setCalendarReferenceData(new Date(
      this.calendarReferenceDate.getFullYear(),
      this.calendarReferenceDate.getMonth() - 1,
    ));
    this._setCalendarLabelText();
    this.formCalendar();
    this.updateSelectedDatesView();
  }

  _handleNextMonthButtonClick = () => {
    this.setCalendarReferenceData(new Date(
      this.calendarReferenceDate.getFullYear(),
      this.calendarReferenceDate.getMonth() + 1,
    ));
    this._setCalendarLabelText();
    this.formCalendar();
    this.updateSelectedDatesView();
  }

  _handleCalendarDateButtonClick = (event) => {
    const date = new Date(event.target.dataset.date);
    if (date < this.today) {
      return;
    }
    if (!this.firstSelectedDate) {
      this.firstSelectedDate = date;
      this.updateSelectedDatesView();
      return;
    }
    if (this.areBothDatesSelected()) {
      this.secondSelectedDate = undefined;
      this.firstSelectedDate = date;
      this.updateSelectedDatesView();
      return;
    }
    if (date < this.firstSelectedDate) {
      this.secondSelectedDate = this.firstSelectedDate;
      this.firstSelectedDate = date;
    } else {
      this.secondSelectedDate = date;
    }
    this.updateSelectedDatesView();
  }

  _handleClearButtonClick = () => {
    this.firstSelectedDate = undefined;
    this.secondSelectedDate = undefined;
    this._removeAllSelectedClasses();
  }

  _getCalendarMonthName = () => {
    const date = new Date(1970, this.calendarMonth);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  _setCalendarLabelText = () => {
    this.topText.innerText = `${this._getCalendarMonthName()} ${this.calendarYear}`;
  };

  _getLocalDayOfWeek = (date) => {
    const day = date.getDay();
    return day === 0 ? 7 : day;
  };

  _getLastDayOfMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  _getCalendarDates = (year, month) => {
    const days = [];
    const firstDayOfWeek = this._getLocalDayOfWeek(new Date(year, month, 1));
    const prevMonthDay = this._getLastDayOfMonth(year, month - 1);
    for (let i = firstDayOfWeek - 1; i > 0; i -= 1) {
      days.push({ date: new Date(year, month - 1, prevMonthDay - i + 1) });
    }
    const lastDayOfMonth = this._getLastDayOfMonth(year, month);
    for (let i = 1; i <= lastDayOfMonth; i += 1) {
      days.push({ date: new Date(year, month, i) });
    }
    const nDaysOfNextMonth = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= nDaysOfNextMonth; i += 1) {
      days.push({ date: new Date(year, month + 1, i) });
    }
    return days;
  };
}

export default Calendar;
