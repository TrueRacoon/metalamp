export default function getWordDeclension(number, wordForms) {
  const hundredthPart = number % 100;
  const tenthPart = number % 10;
  const isThirdForm = hundredthPart > 10 && hundredthPart < 20;
  const isSecondForm = tenthPart > 1 && tenthPart < 5;
  const isFirstForm = tenthPart === 1;
  if (isThirdForm) {
    return wordForms[2];
  }
  if (isSecondForm) {
    return wordForms[1];
  }
  if (isFirstForm) {
    return wordForms[0];
  }
  return wordForms[2];
}
