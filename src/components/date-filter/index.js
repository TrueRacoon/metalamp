import DateFilter from './DateFilter';

const dateFilters = document.querySelectorAll('.js-date-filter');

dateFilters.forEach((dateFilterDom) => {
  const dateFilter = new DateFilter(dateFilterDom);
  dateFilter.init();
});
