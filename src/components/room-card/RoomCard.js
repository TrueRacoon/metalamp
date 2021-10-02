class RoomCard {
  constructor(roomCardDom) {
    this.roomCardDom = roomCardDom;
    this._init();
  }

  _init() {
    this.carousel = this.roomCardDom.querySelector('.js-room-card__carousel');
    this.updateCarouselHeight();
  }

  updateCarouselHeight = () => {
    this.carousel.style.height = `${(this.carousel.offsetWidth / 270) * 151.38}px`;
  }
}

export default RoomCard;
