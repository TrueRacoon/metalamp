import Input from './Input';

const inputs = document.querySelectorAll('.js-input');

inputs.forEach((inputDom) => {
  const input = new Input(inputDom);
  input.init();
});
