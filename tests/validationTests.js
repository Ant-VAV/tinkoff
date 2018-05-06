'use strict';

const { assert } = require('chai');
const ZhkuMoskva = require('../pages/zhkuMoskva');
const PaymentTab = require('../pages/blocks/paymentTab');

const payerRussianText = 'кода плательщика';
const periodRussianText = 'периода оплаты';
const sumRussianText = 'суммы оплаты';

/*
Отдельный модуль на проверку валидаций для обязательных полей (п.7).

Стабильность этих тестов под вопросом.
Периодически сервис сообщает "Превышено количество обращений к сервису(Код ошибки: t70694332718)".
И после этого валидации работают плохо.
*/
describe('Validation tests.', function () {
    beforeEach(function() {
        ZhkuMoskva.open();
        ZhkuMoskva.goToPaymentTab();
    });

    it('Empty fields', function() {
        PaymentTab.submitButton.click();

        const errorText = 'Поле обязательное';
        checkRequiredValidation(PaymentTab.payerCodeError, errorText, payerRussianText);
        checkRequiredValidation(PaymentTab.periodError, errorText, periodRussianText);
        checkRequiredValidation(PaymentTab.sumError, errorText, sumRussianText);
    });

    it('Wrong data', function() {
        PaymentTab.payerCode.setValue('1');
        PaymentTab.period.setValue('1');
        PaymentTab.sum.setValue('15001222222222222222');
        PaymentTab.submitButton.click();

        checkRequiredValidation(PaymentTab.payerCodeError, 'Поле неправильно заполнено', payerRussianText);
        checkRequiredValidation(PaymentTab.periodError, 'Поле заполнено некорректно', periodRussianText);
        checkRequiredValidation(PaymentTab.sumError, 'Поле заполнено неверно', sumRussianText);
    });

    it('Money calculating', function() {
        PaymentTab.sum.setValue('1/0');
        PaymentTab.submitButton.click();

        checkRequiredValidation(PaymentTab.sumError, 'Поле заполнено неверно', sumRussianText);
    });

    it('To low money', function() {
        PaymentTab.sum.setValue('1');
        PaymentTab.submitButton.click();

        checkRequiredValidation(PaymentTab.sumError, 'Минимум — 10 ₽', sumRussianText);
    });

    it('Lot of money', function() {
        PaymentTab.sum.setValue('150000');
        PaymentTab.submitButton.click();

        checkRequiredValidation(PaymentTab.sumError, 'Максимум — 15 000 ₽', sumRussianText);
    });

    const checkRequiredValidation = (field, expectedText, russianText) => {
        browser.waitUntil( () => field.isExisting() === true, 2000, `Не дождались текст валидации для ${russianText}`);
        assert.equal(expectedText, field.getText(), `Не совпал текст валидации для ${russianText}`);
    }
});