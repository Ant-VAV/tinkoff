'use strict';

const Page = require('../base');
const ZhkuMoskva = require('../zhkuMoskva');

/*
Блок для выбора конкретной организации в саджесте.
 */
class SuggestedOrganisation extends Page {
    constructor(index = 0) {
        super();
        this.selector = `.SearchSuggest__block_2y2k5:nth-of-type(1) .Grid__column_3qcJA:nth-of-type(${index + 1})`
    }

    get organisationName() { return browser.element(`${this.selector} .Text__text_size_17_3d9gC`); }

    goToOrganisation() {
        this.organisationName.click();
        ZhkuMoskva.paymentTab.waitForExist();
    }

}

module.exports = SuggestedOrganisation;