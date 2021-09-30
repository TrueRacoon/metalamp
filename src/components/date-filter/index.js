import DateFilter from './DateFilter';
import Calendar from '../calendar/Calendar';
import Input from '../input/Input';
import DropdownBlock from '../dropdown-block/DropdownBlock';
import SingleDateInputDateFilter from './SingleDateInputDateFilter';

const dateFilters = document.querySelectorAll(
  '.js-elements .js-date-filter,'
  + '.js-room-search .js-date-filter,'
  + '.js-search-room .js-date-filter',
);

const createAndInitDateFilter = (dateFilterDom) => {
  const calendarDom = dateFilterDom.querySelector('.js-calendar');
  const calendar = new Calendar(calendarDom);
  const dateInputs = [...dateFilterDom.getElementsByClassName('js-input')];
  const singleDateInput = dateInputs.length === 0;
  if (singleDateInput) {
    const dateDropdownDom = dateFilterDom.querySelector('.js-dropdown-block');
    const dateDropdown = new DropdownBlock(dateDropdownDom);
    return new SingleDateInputDateFilter(
      dateFilterDom,
      calendar,
      dateDropdown,
    );
  }
  const arrivalDateInputDom = dateInputs.find((dateInput) => dateInput.name === 'arrival-date');
  const departureDateInputDom = dateInputs.find((dateInput) => (
    dateInput.name === 'departure-date'
  ));
  const arrivalDateInput = new Input(arrivalDateInputDom);
  const departureDateInput = new Input(departureDateInputDom);
  return new DateFilter(
    dateFilterDom,
    calendar,
    arrivalDateInput,
    departureDateInput,
  );
};

dateFilters.forEach((dateFilterDom) => createAndInitDateFilter(dateFilterDom));

export default createAndInitDateFilter;
