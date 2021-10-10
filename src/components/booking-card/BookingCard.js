class BookingCard {
  constructor(bookingCardDom, dateFilter, guestPicker) {
    this.bookingCardDom = bookingCardDom;
    this.dateFilter = dateFilter;
    this.guestPicker = guestPicker;
    this._init();
  }

  _init() {
    this.priceValue = this.bookingCardDom.querySelector('.js-booking-card__price-value');
    this.costDetailsList = this.bookingCardDom.querySelector('.js-booking-card__cost-details-list');
    this.baseCostDetails = this.bookingCardDom.querySelector('.js-booking-card__base-cost-details');
    this.submitButton = this.bookingCardDom.querySelector('.js-booking-card__submit-button');
    this.totalBaseCost = this.bookingCardDom.querySelector('.js-booking-card__total-base-cost');
    this.additionalServicesFees = this.bookingCardDom.querySelector('.js-booking-card__additional-services-fees');
    this.discount = this.bookingCardDom.querySelector('.js-booking-card__discount');
    this.totalCostBlock = this.bookingCardDom.querySelector('.js-booking-card__total-cost-block');
    this.totalCost = this.bookingCardDom.querySelector('.js-booking-card__total-cost');
    this._handleState();
  }

  _handleState = () => {
    const guestCounter = this.guestPicker.getCountersSum();
    const needHideCostAndSubmitButton = (
      guestCounter === 0
      || !this.dateFilter.calendar.areBothDatesSelected()
    );
    if (needHideCostAndSubmitButton) {
      this.costDetailsList.classList.add('booking-card__cost-details-list_hidden');
      this.totalCostBlock.classList.add('booking-card__total-cost-block_hidden');
      this.submitButton.classList.add('booking-card__submit-button_hidden');
      return;
    }
    const priceValue = parseInt(this.priceValue.innerText.split('\xa0').join(''), 10);
    const discount = parseInt(this.discount.innerText.slice(22).split('\xa0').join(''), 10);
    const hostelStay = this._getHotelStay();
    const baseCost = priceValue * hostelStay;
    const additionalServicesFees = guestCounter * 100;
    const totalCost = baseCost - discount + additionalServicesFees;
    this.baseCostDetails.innerText = `${this.priceValue.innerText} x ${hostelStay}`;
    this.totalBaseCost.innerText = this._formatNumber(baseCost);
    this.additionalServicesFees.innerText = this._formatNumber(additionalServicesFees);
    this.totalCost.innerText = this._formatNumber(totalCost);
  }

  _formatNumber = (sum) => sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\xa0').concat('₽');

  _getHotelStay = () => (
    (
      this.dateFilter.calendar.getSecondSelectedDate().getTime()
      - this.dateFilter.calendar.getFirstSelectedDate().getTime()
    ) / 86400000
  );
}

export default BookingCard;
