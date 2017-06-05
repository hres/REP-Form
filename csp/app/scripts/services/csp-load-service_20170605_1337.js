/**
 * Created by dkilty on 12/04/2017.
 */
/**
 * Created by dkilty on 13/01/2017.
 */

(function () {
    'use strict';
    angular
        .module('cspLoadService', [
            'dataLists',
            'hpfbConstants',
            'filterLists',
            'cspDataModule'
        ])
})();

(function () {
    'use strict';
    angular
        .module('cspLoadService')
        .factory('customLoad', ['$http', '$q', '$filter', 'getCountryAndProvinces', 'CANADA', 'USA', 'RELATIVE_FOLDER_DATA', 'cspDataLists',
            function ($http, $q, $filter, getCountryAndProvinces, CANADA, USA, RELATIVE_FOLDER_DATA, cspDataLists) {

            return function (options) {
                var deferred = $q.defer();
                //var dataFolder = "data/"; //relative forlder to the data
                var countryUrl = RELATIVE_FOLDER_DATA + "countries.json";
                var euCountryUrl = RELATIVE_FOLDER_DATA + "csp_eucountries.json";
                var resultTranslateList = {};
                $http.get(countryUrl)
                    .then(function (response) {
                        //PROCESS country list data
                        var newList = _createSortedArrayNAFirst(response.data, options.key);

                        getCountryAndProvinces.createCountryList(newList);

                        return $http.get(euCountryUrl);


                    })
                    .then(function (response) {
                        var newList = _createSortedArray(response.data, options.key);
                        cspDataLists.loadEuCountries(newList);
                        return response.data;
                    })
                    .catch(function (error) {
                        // this catches errors from the $http calls as well as from the explicit throw
                        console.warn("An error occurred with CSP List Load: " + error);
                        deferred.reject(resultTranslateList);
                    })
                    .finally(function () {
                        deferred.resolve(resultTranslateList);
                    });
                return deferred.promise;
            };

            function _createSortedArrayNAFirst(jsonList, lang) {
                var result = [];
                var canadaRecord = null;
                var usaRecord = null;
                angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                    if (sortedObject.id === USA) {
                        usaRecord = sortedObject;
                    } else if (sortedObject.id === CANADA) {
                        canadaRecord = sortedObject;
                    }
                    else {
                        result.push(sortedObject);

                    }
                });
                if (usaRecord) result.unshift(usaRecord);
                if (canadaRecord) result.unshift(canadaRecord);
                return result;
            }
            function _createSortedArray(jsonList, lang) {
                    var result = [];
                    angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                            result.push(sortedObject);

                    });
                    return result;
                }

        }]);
})();

