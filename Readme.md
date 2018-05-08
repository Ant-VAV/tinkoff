# Тестовое задание Tinkoff на автоматизатора

## Установка
1) Установить [Java](https://java.com/ru/download/). Необходим для Selenuim-standalone.
2) `npm install`
3) `npm run seleniun:install`

## Запуск
1) В отдельном окне терминала `npm run selenium:start` - запуск Selenium сервера локально.
2) `npm run test`

При необходимости запустить отдельный файл с тестами: `npm run test -- --spec %path/to/file.js%`

## Пояснения и комментарии

### Про селекторы
Для поиска элементов использовал простые CSS-селекторы. 
Но т.к. на фронте мало уникальных идентификаторов, то некоторые из элементов ищются по порядку расположения. Я осознаю, что это ненадёжный способ, но не везде смог сделать лучше.

### Про тесты
Ввиду того, что сценарий содержит несколько кейсов для проверки, но нет однозначаного деления, то я их поделил как посчитал нужным. 
С целью сократить бесполезные действия в части тестов сделал прямой переход на страницу платежей ЖКХ. Так же вынес в отдельную сюиту тесты на валидации.

### Праллельность
Параметр `capabilities.maxInstances` в `wdio.conf.js` отвечает за количество параллельно открытых окон браузера.

### Про webdriverio
Можно почитать тут: http://webdriver.io/guide.html

### Что не сделано
* "Легкий запуск". Т.е. без вручную запущенного Selenium сервера, установки Java и всяких headless.
* Кроссбраузерность. Всё тестировалось под Хром.
* Кроссплатформеность. Всё писалось на виртуалке под Убунтой 17.
 
