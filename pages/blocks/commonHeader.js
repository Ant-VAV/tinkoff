'use strict';

const Page = require('../base');
const Payments = require('../payments');

/*
Грубо вынесенный блок с общими ссылками в шапке.
 */
class CommonHeader extends Page {

    get paymentsPageLink() {
        return browser.element('.Tabs__item_y4Mo9 [href="/payments/"]');
    }

    goToPayments() {
        this.paymentsPageLink.click();
        Payments.searchInput.waitForExist();
    }
}

module.exports = new CommonHeader();