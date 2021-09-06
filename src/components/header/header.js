document.querySelector('.header__nav-menu-button')
  .addEventListener('click', () => {
    document.querySelector('.header__profile-menu')
      .classList.remove('header__profile-menu_opened');
    document.querySelector('.header__menu')
      .classList.toggle('header__menu_opened');
  });

document.querySelector('.header__profile-menu-button')
  .addEventListener('click', () => {
    document.querySelector('.header__menu')
      .classList.remove('header__menu_opened');
    document.querySelector('.header__profile-menu')
      .classList.toggle('header__profile-menu_opened');
  });

const expandButtons = Array.from(
  document.getElementsByClassName('header__expand-button'),
);

expandButtons.forEach((e1) => {
  e1.addEventListener('click', () => {
    e1.nextElementSibling
      .classList.toggle('header__dropdown-content_opened');
    e1
      .classList.toggle('header__expand-button_turned');
    expandButtons.forEach((e2) => {
      if (e1 !== e2) {
        e2.nextElementSibling
          .classList.remove('header__dropdown-content_opened');
        e2
          .classList.remove('header__expand-button_turned');
      }
    });
  });
});

Array.from(document.getElementsByClassName('header')).forEach((e) => {
  e.querySelector('.header__link').classList.add('header__link_current');
  e.querySelector('.header__link').removeAttribute('href');
});
