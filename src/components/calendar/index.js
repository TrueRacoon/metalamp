import Calendar from './Calendar';

const calendars = document.querySelectorAll('.cards__card > .js-calendar');

calendars.forEach((calendarDom) => new Calendar(calendarDom));
