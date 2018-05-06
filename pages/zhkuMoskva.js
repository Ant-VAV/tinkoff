'use strict';

const Page = require('./base');
const Payments = require('./blocks/paymentTab');

/*
Один класс под каждого поставщика услуг - не самая лучшая идея.
Но этот способ быстрый и позволяет решить тестовое задание за несколько дней.
Без необхоимости продумывать и отлаживать способы обобщения.

Так же осознанно решил не оформлять отдельными объектами вкладки.
 */
class ZhkuMoskva extends Page {

    get paymentTab()  { return browser.element('.TabContainer__container_2H4Mq [href="/zhku-moskva/oplata/"]'); }

    goToPaymentTab() {
        this.paymentTab.click();
        Payments.submitButton.waitForVisible();
    }

    open() {
        super.open('/zhku-moskva/');
    }
}

module.exports = new ZhkuMoskva();