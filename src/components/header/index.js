import Header from './Header';

const headers = document.querySelectorAll('.js-header');

headers.forEach((headerDom) => {
  const header = new Header(headerDom);
  header.init();
});
