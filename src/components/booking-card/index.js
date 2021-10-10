import BookingCard from './BookingCard';
import createAndInitDateFilter from '../date-filter';
import CountPicker from '../count-picker/CountPicker';
import '../count-picker';
import DropdownBlock from '../dropdown-block/DropdownBlock';

const bookingCards = document.querySelectorAll('.js-booking-card');

bookingCards.forEach((bookingCardDom) => {
  const dateFilterDom = bookingCardDom.querySelector('.js-date-filter');
  const dateFilter = createAndInitDateFilter(dateFilterDom);
  const guestPickerDom = bookingCardDom.querySelector('.js-count-picker');
  const dropdownBlockDom = guestPickerDom.querySelector('.js-dropdown-block');
  const dropdownBlock = new DropdownBlock(dropdownBlockDom);
  const guestPicker = new CountPicker(guestPickerDom, dropdownBlock);
  return new BookingCard(bookingCardDom, dateFilter, guestPicker);
});
