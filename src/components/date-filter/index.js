import DateFilter from './DateFilter';
import Calendar from '../calendar/Calendar';
import Input from '../input/Input';

const dateFilters = document.querySelectorAll(
  '.js-elements .js-date-filter,'
  + '.js-room-search .js-date-filter',
);

const createAndInitDateFilter = (dateFilterDom) => {
  const calendarDom = dateFilterDom.querySelector('.js-calendar');
  const calendar = new Calendar(calendarDom);
  calendar.init();
  const dateInputs = [...dateFilterDom.getElementsByClassName('js-input')];
  const arrivalDateInputDom = dateInputs.find((dateInput) => dateInput.name === 'arrival-date');
  const departureDateInputDom = dateInputs.find((dateInput) => (
    dateInput.name === 'departure-date'
  ));
  const arrivalDateInput = new Input(arrivalDateInputDom);
  arrivalDateInput.init();
  const departureDateInput = new Input(departureDateInputDom);
  departureDateInput.init();
  const dateFilter = new DateFilter(dateFilterDom, calendar, arrivalDateInput, departureDateInput);
  dateFilter.init();
  return dateFilter;
};

dateFilters.forEach((dateFilterDom) => createAndInitDateFilter(dateFilterDom));

export default createAndInitDateFilter;
