export const checkCardHolder = (val) => {

  const splittedText = val.split(' ');

  let wordCount = 0;
  splittedText.forEach(spl => {
      if (spl.length > 1)
          wordCount++;
  });
  if (wordCount !== 2)
      return false;

  const regExp = /[а-я1-9]/iu;
  if (regExp.test(val))
      return false;

  return true;
};

export const checkCardNumber = (val) => {

  if (val.length !== 19)
      return false;

  const regExp = /[^\s\d]/iu;
  if (regExp.test(val))
      return false;

  let countSpace = 0;
  for (let i = 0; i < val.length; i++) {
      if (val[i] === " ")
          ++countSpace;
  }
  if (countSpace !== 3) {
      return false;
  }

  return true;
};

export const checkCVV = (val) => {

  const regExp = /[\D]/iu;
  if (regExp.test(val))
      return false;

  if (val > 99 && val < 1000)
      return true;
  else return false;
  
};