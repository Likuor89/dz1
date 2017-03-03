/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return require('./index').loadAndSortTowns();
}

var globalCityList;

loadTowns()
    .then(function(cityList) {
        globalCityList = cityList;
    });

function renderCityList(cityList) {
    filterResult.innerHTML = '';
    cityList.forEach(function (item, i, arr) {

        var ndiv = document.createElement('div');

        ndiv.innerHTML = item.name;
        filterResult.appendChild(ndiv);
    });
};

filterInput.addEventListener('keyup', onFilterInputKeyUp);
function onFilterInputKeyUp(evt) {

    let value = evt.target.value.trim();

    let filteredCity = globalCityList.filter(function (item) {

        return isMatching(item.name, value);
    });
    if (value.length == 0) {
        filterResult.innerHTML = '';

        return;
    }
    renderCityList(filteredCity);
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    var lfull = full.toLowerCase();

    var lchunk = chunk.toLowerCase();

    return lfull.indexOf(lchunk) !== -1;
}

// let loadingBlock = homeworkContainer.querySelector('#loading-block');
// let filterBlock = homeworkContainer.querySelector('#filter-block');
// let filterInput = homeworkContainer.querySelector('#filter-input');
// let filterResult = homeworkContainer.querySelector('#filter-result');

// filterInput.addEventListener('keyup', function() {
//     let value = this.value.trim();
// });

export {
    loadTowns,
    isMatching
};
