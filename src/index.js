/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
  // var prom = new Promise (function (resolve, reject){
  //     setTimeout(function () {
  //         resolve('Promise');
  //     }, 1000);
  // });
  //
  // return prom;

    return new Promise (function (resolve, reject) {
        setTimeout(resolve, seconds*1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise (function (resolve, reject) {
      
        var req = new XMLHttpRequest();

        req.open('get', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState != 4) return;
            if (req.status != 200) {
                alert( 'o_O');
            } else {

                var cityList = JSON.parse(req.responseText);

            }
            cityList.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {

                    return -1;
                }

                return 0;
            });
            resolve(cityList);
        }
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
