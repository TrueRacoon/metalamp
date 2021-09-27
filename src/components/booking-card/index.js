import BookingCard from './BookingCard';
import createAndInitDateFilter from '../date-filter';
import CountPicker from '../count-picker/CountPicker';

const bookingCards = document.querySelectorAll('.js-booking-card');

bookingCards.forEach((bookingCardDom) => {
  const dateFilterDom = bookingCardDom.querySelector('.js-date-filter');
  const dateFilter = createAndInitDateFilter(dateFilterDom);
  const guestPickerDom = bookingCardDom.querySelector('.js-count-picker');
  const guestPicker = new CountPicker(guestPickerDom);
  guestPicker.init();
  const bookingCard = new BookingCard(bookingCardDom, dateFilter, guestPicker);
  bookingCard.init();
});
