class Header {
  constructor(headerDom) {
    this.headerDom = headerDom;
  }

  init() {
    this.profileMenuButton = this.headerDom.querySelector('.header__profile-menu-button');
    this.navMenuButton = this.headerDom.querySelector('.js-header__nav-menu-button');
    this.headerMenu = this.headerDom.querySelector('.js-header__menu');
    this.profileMenu = this.headerDom.querySelector('.js-header__profile-menu');
    this.expandButtons = [...this.headerDom.getElementsByClassName('header__expand-button')];
    this._bindEventListeners();
    this._setFirstLinkCurrent();
  }

  _safeAddEventListener = (element, eventName, listener) => {
    if (element) {
      element.addEventListener(eventName, listener);
    }
  }

  _bindEventListeners() {
    this.navMenuButton.addEventListener('click', this._handleNavMenuButtonClick);
    this._safeAddEventListener(this.profileMenuButton, 'click', this._handleProfileMenuButtonClick);
    this.expandButtons.forEach((expandButton) => {
      expandButton.addEventListener('click', this._handleExpandButtonClick);
    });
  }

  _safeRemoveClass = (element, className) => {
    if (element) {
      element.classList.remove(className);
    }
  }

  _handleNavMenuButtonClick = () => {
    this._safeRemoveClass(this.profileMenu, 'header__profile-menu_opened');
    this.headerMenu.classList.toggle('header__menu_opened');
  }

  _handleProfileMenuButtonClick = () => {
    this.headerMenu.classList.remove('header__menu_opened');
    this.profileMenu.classList.toggle('header__profile-menu_opened');
  }

  _handleExpandButtonClick = (event) => {
    event.target.nextElementSibling.classList.toggle('header__dropdown-content_opened');
    event.target.classList.toggle('header__expand-button_turned');
    this.expandButtons.forEach((expandButton) => {
      if (expandButton === event.target) {
        return;
      }
      expandButton.nextElementSibling.classList.remove('header__dropdown-content_opened');
      expandButton.classList.remove('header__expand-button_turned');
    });
  }

  _setFirstLinkCurrent = () => {
    const firstLink = this.headerDom.querySelector('.js_header__link');
    firstLink.classList.add('header__link_current');
    firstLink.removeAttribute('href');
  }
}

export default Header;
