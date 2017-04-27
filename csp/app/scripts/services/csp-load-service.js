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
            'filterLists'
        ])
})();

(function () {
    'use strict';
    angular
        .module('cspLoadService')
        .factory('customLoad', ['$http', '$q', '$filter', 'getCountryAndProvinces', 'CANADA', 'USA', 'RELATIVE_FOLDER_DATA', function ($http, $q, $filter, getCountryAndProvinces, CANADA, USA, RELATIVE_FOLDER_DATA) {

            return function (options) {
                var deferred = $q.defer();
                //var dataFolder = "data/"; //relative forlder to the data
                var countryUrl = RELATIVE_FOLDER_DATA + "countries.json";
                var resultTranslateList = {};
                $http.get(countryUrl)
                    .then(function (response) {
                        //PROCESS country list data
                        var newList = _createSortedArrayNAFirst(response.data, options.key);
                        // var translateList = _createTranslateList(newList, options.key);
                        getCountryAndProvinces.createCountryList(newList);
                        //angular.extend(resultTranslateList, translateList);
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
        }]);
})();

