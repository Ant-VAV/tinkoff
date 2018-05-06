'use strict';

const Page = require('./base');
const Payments = require('./payments');

/*
Класс для главной страницы.
Но т.к. на ней ничего не делаем, то и класс пуст.
*/
class MainPage extends Page {
    open() {
        super.open('');
    }
}

module.exports = new MainPage();