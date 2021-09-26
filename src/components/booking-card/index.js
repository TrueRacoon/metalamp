import BookingCard from './BookingCard';

const bookingCards = document.querySelectorAll('.js-booking-card');

bookingCards.forEach((bookingCardDom) => {
  const bookingCard = new BookingCard(bookingCardDom);
  bookingCard.init();
});
