import {el, setChildren} from 'redom';
import { checkCardHolder, checkCardNumber, checkCVV } from './validate.js';
import $ from "jquery";
import mask from 'jquery-mask-plugin';

const renderCard = () => {
  const card = el('div', {className: 'card'});
  const secure = el('p', {className: 'secure'}, 'Secure Checkout');
  const creditCard = el('div', {className: 'credit-card'});
  const cardNumber = el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx');
  const cardPersonal = el('div', {className: 'card__personal'});
  const cardName = el('span', {className: 'card__name'}, 'John Doe');
  const cardDate = el('span', {className: 'card__date'}, '04/24');
  setChildren(cardPersonal, cardName, cardDate);
  setChildren(creditCard, cardNumber, cardPersonal);

  const form = el('form#form', {className: 'form'});
  const wrapHolder = el('div', {className: 'form__input-wrap form__input-wrap_holder'});
  const labelHolder = el('label', {className: 'form__label form__holder-label'}, 'Card Holder');
  const inputHolder = el("input", { type: "text", className: 'input input__holder'});
  setChildren(wrapHolder, labelHolder, inputHolder);
  const wrapNumber = el('div', {className: 'form__input-wrap form__input-wrap_number'});
  const labelNumber = el('label', {className: 'form__label form__number-label'}, 'Card Number');
  const inputNumber = el("input#cardNumber", { type: "text", className: 'input input__number'});
  setChildren(wrapNumber, labelNumber, inputNumber);
  const wrapDate = el('div', {className: 'form__input-wrap form__input-wrap_date'});
  const labelDate = el('label', {className: 'form__label form__date-label'}, 'Card Expiry');
  const inputDate = el("input", { type: "text", className: 'input input__date'});
  setChildren(wrapDate, labelDate, inputDate);
  const wrapCvv = el('div', {className: 'form__input-wrap form__input-wrap_cvv'});
  const labelCvv = el('label', {className: 'form__label form__cvv-label'}, 'CVV');
  const inputCvv = el("input", { type: "text", className: 'input input__cvv'});
  setChildren(wrapCvv, labelCvv, inputCvv);
  const formButton = el('button', {className: 'form__button'}, 'CHECK OUT');
  const h2Valid = el('h2', { className: 'formValidHide', id: 'isValid' }, '')
  setChildren(form, wrapHolder, wrapNumber, wrapDate, wrapCvv, formButton, h2Valid);

  setChildren(card, secure, creditCard, form);

  return el('div', {className: 'wrapper'}, card);
}
setChildren(document.body, renderCard());
$(document).ready(function(){
  const cardNumber = $('#cardNumber');
  const inputHolder = $('.input__holder');
  const inputDate = $('.input__date');
  cardNumber.mask('0000 0000 0000 0000');
  inputDate.mask('00/00');
  $('.input__cvv').mask('0000');
  cardNumber.on('input', function () {
    $('.card__number').text(cardNumber.val());
  });

  inputHolder.on('input', function () {
    $('.card__name').text(inputHolder.val());
  });

  inputDate.on('input', function () {
    $('.card__date').text(inputDate.val());
  });
});


const inValid = () => {
  const isValid = document.querySelector('#isValid');
  isValid.className = 'formInValid';
  isValid.textContent = 'не валидный';
  setTimeout(() => {
      isValid.className = 'formValidHide';
  }, 2000);
};

const valid = () => {
  const isValid = document.querySelector('#isValid');
  isValid.className = 'formValid';
  isValid.textContent = 'валидный';
  setTimeout(() => {
      isValid.className = 'formValidHide';
  }, 2000);
};

const formButton = document.querySelector('.form__button');
formButton.addEventListener('click', e => {
    e.preventDefault();
    const inputHolder = document.querySelector('.input__holder');
    const cardHolder = document.querySelector('.input__number');
    const input__cvv = document.querySelector('.input__cvv');

    const isValid = (checkCardHolder(inputHolder.value) && checkCardNumber(cardHolder.value) && checkCVV(input__cvv.value));

    if (isValid)
        valid();
    else inValid();
})