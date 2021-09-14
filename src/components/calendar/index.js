import Calendar from './Calendar';

const calendars = document.querySelectorAll('.cards__card > .js-calendar');

calendars.forEach((calendarDom) => {
  const calendar = new Calendar(calendarDom);
  calendar.init();
});
