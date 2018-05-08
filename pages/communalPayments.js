'use strict';

const Page = require('./base');
const RegionSelection = require('./blocks/regionSelection');
const OrganisationSelection = require('./blocks/organisationSelection');

/*
Класс страницы опалаты ЖКХ.
 */
class CommunalPayments extends Page {

    get searchInput()  { return browser.element('[data-qa-file="SearchInput"]'); }
    get regionSelection()  { return browser.element('.PaymentsCatalogHeader__regionSelect_3MRVi'); }
    get allOrganisationBlock()  { return browser.element('.UIPayments__categoryProviders_3Fsrs'); }

    get allLoadedOrganisationsLinks() { return browser.elements('.ui-menu__item .ui-menu__link'); }

    /*
    С одной стороны, ветвления в тестах - не очень хорошая практика.
    С другой - не придумал как работать с проверкой и выбором города, без ветвления.
     */
    selectCity(cityConstant) {
        const region = this.regionSelection.getText();
        if (region.includes(cityConstant.invariantPartRussianName)) {
            return;
        }
        this.regionSelection.click();
        RegionSelection.title.waitForVisible();
        RegionSelection.selectRegion(cityConstant.indexInRegionSelection);
        this.allOrganisationBlock.waitForVisible();
    }

    getOrganisationElementByIndex(index) {
        return new OrganisationSelection(index);
    }

    /*
    Пользуемся знанием, что browser.elements возврщает объект, где по ключу value получим массив найденных элементов.
     */
    isOrganisationOnThePage(organisationName = '') {
        const allOrganisationsArray = this.allLoadedOrganisationsLinks.value.map((element, index) =>
            this.getOrganisationElementByIndex(index).organisationLink.getText());
        return !!allOrganisationsArray.find((element) => element === organisationName);
    }

    open() {
        super.open('/payments/categories/kommunalnie-platezhi/');
    }
}

module.exports = new CommunalPayments();