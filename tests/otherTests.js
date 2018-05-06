'use strict';

const { assert } = require('chai');
const Main = require('../pages/main');
const Payments = require('../pages/payments');
const CommunalPayments = require('../pages/communalPayments');
const CommonHeader = require('../pages/blocks/commonHeader');

const { Moscow, SaintPetersburg } = require('../constants/cities');

describe('Awesome Tinkoff testing.', function () {
    /*
    Тест на проверку перехода с главной страницы на страницу платежей.
    Сделан, чтобы в каждом тесте не проходить этот путь.
    */
    it('1: Open main and go to payments', function () {
        Main.open();
        CommonHeader.goToPayments();

        assert.equal(browser.getTitle(), 'Tinkoff.ru: платежи и переводы денег',
            'Заголовок страницы платежей не совпал с ожидаемым.')
    });

    /*
    Тест на проверку перехода со страницы платежей на страницу оплаты ЖКХ.
    Сделан, чтобы в каждом тесте не проходить этот путь.
    */
    it('2: Open payments page and go to communal payments', function () {
        Payments.open();
        Payments.goToCommunalPayments();

        assert.equal(browser.getTitle(), 'ЖКХ', 'Заголовок страницы ЖКХ не совпал с ожидаемым.')
    });

    /*
    Тест проверяет танцы вокруг названия "ЖКУ-Москва" на странице оплаты ЖКХ и в саджесте на странице платежей.
    Это для Москвы. Санкт-Петербург и "ЖКУ-Москва" в следующем тесте.
     */
    it('3: Big awful test about Моscow organisation', function () {
        CommunalPayments.open();
        CommunalPayments.selectCity(Moscow);
        const organisationName = CommunalPayments.getOrganisationElementByIndex(0).organisationLink.getText();
        assert.equal(organisationName, 'ЖКУ-Москва', 'Наименование первой оргинзации на странице оплаты ЖКХ не совпало ' +
            'с ожидаемым');

        CommunalPayments.getOrganisationElementByIndex(0).goToOrganisation();
        const savedUrl = browser.getUrl(); // без чёткого определения "та же страница", проверяю только УРЛ.

        CommonHeader.goToPayments();
        Payments.searchInput.setValue(organisationName);
        const firstSuggestedOrganisation = Payments.getSuggestedOrganisationByIndex(0).organisationName.getText();
        assert.equal(firstSuggestedOrganisation, 'ЖКУ-Москва', 'Наименование первой оргинзации в саджесте не совпало ' +
            'с ожидаемым');

        Payments.getSuggestedOrganisationByIndex(0).goToOrganisation();
        assert.equal(browser.getUrl(), savedUrl, 'Страница ЖКУ-Москва при переходе с общих платежей не совпадает ' +
            'со страницей ЖКУ-Москва при переходе со страницы ЖКХ платежей');
    });

    /*
    Проверяем отсутствие "ЖКУ-Москва" в Санкт-Петербурге.
     */
    it('4: Check Saint-Petersburg and Moscow organisation', function() {
        CommunalPayments.open();
        CommunalPayments.selectCity(SaintPetersburg);
        assert.isFalse(CommunalPayments.isOrganisationOnThePage('ЖКУ-Москва'), 'У Питера появилась ЖКУ-Москва');

    })
});