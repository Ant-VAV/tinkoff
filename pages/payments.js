'use strict';

const Page = require('./base');
const SuggestedOrganisation = require('./blocks/suggestedOrganisation');
const CommunalPayments = require('./communalPayments');

/*
Страница всех платежей.
Включает в себя и элементы поиска (инпут и получение данных саджеста).
 */
class Payments extends Page {

    get searchInput()  { return browser.element('[data-qa-file="SearchInput"]'); }
    get housingAndUtilitiesLink()  { return browser.element('.ui-menu__link [title="ЖКХ"]'); }

    get suggestContainer() { return browser.element('.SearchSuggested__suggestContainer_Z6mjO'); }

    goToCommunalPayments() {
        this.housingAndUtilitiesLink.click();
        CommunalPayments.allOrganisationBlock.waitForExist();
    }

    getSuggestedOrganisationByIndex(index) {
        this.suggestContainer.waitForVisible();
        return new SuggestedOrganisation(index);
    }

    open() {
        super.open('/payments/');
    }
}

module.exports = new Payments();