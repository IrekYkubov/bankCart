import { checkCardHolder, checkCardNumber, checkCVV } from './validate.js';

describe('валидация полей', () => {

  it('Валидация Card Holder', () => {

    expect(checkCardHolder('Ivan Ivanov')).toBe(true);
    expect(checkCardHolder('Ivan')).toBe(false);
    expect(checkCardHolder('Иван Иванов')).toBe(false);
    expect(checkCardHolder('Ivan Ivanov1')).toBe(false);

  });

  it('Валидация Card Number', () => {
    expect(checkCardNumber('Ivan Ivanov')).toBe(false);
    expect(checkCardNumber('Иван Иванов')).toBe(false);
    expect(checkCardNumber('!@#$%^&*()_+_)(*&^%')).toBe(false);

    expect(checkCardNumber('1234 4321 9876 7567')).toBe(true);
    expect(checkCardNumber('1234 4321 9876  567')).toBe(false);
    expect(checkCardNumber('1234943212987622567')).toBe(false);

  });

  it('Валидация CVV/CVC', () => {
    expect(checkCVV('Iva')).toBe(false);
    expect(checkCVV('Ива')).toBe(false);
    expect(checkCVV('!@#')).toBe(false);
    expect(checkCVV('1534')).toBe(false);
    expect(checkCVV('15')).toBe(false);
    expect(checkCVV('152')).toBe(true);

  });

});