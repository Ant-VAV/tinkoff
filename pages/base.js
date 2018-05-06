'use strict';

/*
Основной класс.
Идеологически для размещения методов, работающих на всех страницах.
 */
class Page {
    constructor() {
    }

    open(path) {
        browser.url(path);
    }
}

module.exports = Page;