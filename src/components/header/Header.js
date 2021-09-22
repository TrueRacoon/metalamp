class Header {
  constructor(headerDom) {
    this.headerDom = headerDom;
  }

  init() {
    this.profileMenuButton = this.headerDom.querySelector('.js-header__profile-menu-button');
    this.navMenuButton = this.headerDom.querySelector('.js-header__nav-menu-button');
    this.headerMenu = this.headerDom.querySelector('.js-header__menu');
    this.profileMenu = this.headerDom.querySelector('.js-header__profile-menu');
    this.expandButtons = [...this.headerDom.getElementsByClassName('header__expand-button')];
    this._bindEventListeners();
    this._setFirstLinkCurrent();
  }

  _bindEventListeners() {
    this.navMenuButton.addEventListener('click', this._handleNavMenuButtonClick);
    this.profileMenuButton?.addEventListener('click', this._handleProfileMenuButtonClick);
    this.expandButtons.forEach((expandButton) => {
      expandButton.addEventListener('click', this._handleExpandButtonClick);
    });
  }

  _handleNavMenuButtonClick = () => {
    this.profileMenu?.classList.remove('header__profile-menu_expanded');
    this.headerMenu.classList.toggle('header__menu_expanded');
  }

  _handleProfileMenuButtonClick = () => {
    this.headerMenu.classList.remove('header__menu_expanded');
    this.profileMenu.classList.toggle('header__profile-menu_expanded');
  }

  _handleExpandButtonClick = (event) => {
    event.target.nextElementSibling.classList.toggle('header__dropdown-content_expanded');
    event.target.classList.toggle('header__expand-button_turned');
    this.expandButtons.forEach((expandButton) => {
      if (expandButton === event.target) {
        return;
      }
      expandButton.nextElementSibling.classList.remove('header__dropdown-content_expanded');
      expandButton.classList.remove('header__expand-button_turned');
    });
  }

  _setFirstLinkCurrent = () => {
    const firstLink = this.headerDom.querySelector('.js-header__link');
    firstLink.classList.add('header__link_current');
    firstLink.removeAttribute('href');
  }
}

export default Header;
