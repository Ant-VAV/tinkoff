'use strict';

const Page = require('../base');

/*
Блок для работы с выбором региона.
 */
class RegionSelection extends Page {

    get title() { return browser.element('[data-qa-file="UIRegions"] h3'); };

    selectRegion(regionIndex = 0) {
        const selector = `.UiRegions__uiRegions__item_3ZlOB:nth-of-type(${regionIndex + 1}) .Link__link_3805p`;
        browser.element(selector).click();
    }
}

module.exports = new RegionSelection();