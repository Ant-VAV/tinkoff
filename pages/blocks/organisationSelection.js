'use strict';

const Page = require('../base');
const ZhkuMoskva = require('../zhkuMoskva');

/*
Блок для выбора организации со страницы оплаты ЖКХ.
 */
class OrganisationSelection extends Page {
    constructor(index = 0) {
        super();
        this.selector = `.ui-menu__item:nth-of-type(${index + 1}) .ui-menu__link`
    }

    get organisationLink() { return browser.element(this.selector); }

    goToOrganisation() {
        this.organisationLink.click();
        ZhkuMoskva.paymentTab.waitForExist();
    }

}

module.exports = OrganisationSelection;