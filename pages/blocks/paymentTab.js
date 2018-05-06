'use strict';

const Page = require('../base');

const errorMessageSelector = (field) => `.ui-form__row_${field} .ui-form-field-error-message`;

/*
Блок отвечает за второй таб ("Оплатить ЖКУ в Москве") на экране оплаты для ЖКУ-Москва.
 */
class PaymentTab extends Page {

    get payerCode() { return browser.element('#payerCode'); }
    get payerCodeError() { return browser.element(errorMessageSelector('text')); }

    get period() { return browser.element('#period'); }
    get periodError() { return browser.element(errorMessageSelector('date')); }

    get sum() { return browser.element('.ui-form__row_combination input'); }
    get sumError() { return browser.element(errorMessageSelector('combination')); }

    get submitButton() { return browser.element('.ui-form__row_button-submit'); }
}

module.exports = new PaymentTab();