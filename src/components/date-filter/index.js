import DateFilter from './DateFilter';
import Calendar from '../calendar/Calendar';

const dateFilters = document.querySelectorAll('.js-date-filter');

dateFilters.forEach((dateFilterDom) => {
  const calendarDom = dateFilterDom.querySelector('.js-calendar');
  const calendar = new Calendar(calendarDom);
  calendar.init();
  const dateFilter = new DateFilter(dateFilterDom, calendar);
  dateFilter.init();
});
