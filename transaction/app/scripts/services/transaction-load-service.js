/**
 * Created by dkilty on 16/01/2017.
 */

(function () {
    'use strict';
    angular
        .module('transactionLoadService', ['dataLists', 'hpfbConstants','services'])
})();

(function () {
    'use strict';
    angular
        .module('transactionLoadService')
        .factory('customLoad', ['$http', '$q', '$filter', 'getCountryAndProvinces', 'CANADA', 'USA','OTHER', 'getContactLists','TransactionLists', function ($http, $q, $filter, getCountryAndProvinces, CANADA, USA, OTHER ,getContactLists,TransactionLists) {

            return function (options) {
                var deferred = $q.defer();
                var dataFolder = "data/"; //relative forlder to the data
                var countryUrl = dataFolder + "countries.json";
                var raTypeUrl=dataFolder + "raType.json";
                var resultTranslateList = {};
                $http.get(countryUrl)
                    .then(function (response) {
                        //PROCESS country list data
                        var newList = _createSortedArrayNAFirst(response.data, options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        getCountryAndProvinces.createCountryList(newList);
                        angular.extend(resultTranslateList, translateList);
                        return $http.get(raTypeUrl);
                        //return $http.get(contactsUrl);

                    })
                  .then(function (response) {
                        //PROCESS raType list data
                        var newList = _createSortedArray(response.data, options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        TransactionLists.createRaTypes(newList);
                        angular.extend(resultTranslateList, translateList);
                        //return response.data;
                        return response.data;
                    })
                    .catch(function (error) {
                        // this catches errors from the $http calls as well as from the explicit throw
                        console.warn("An error occurred with transaction List Load: " + error.status);
                        deferred.reject(resultTranslateList);
                    })
                    .finally(function () {
                        deferred.resolve(resultTranslateList);
                    });
                return deferred.promise;
            };

            /**
             * Creates the list of key value pairs for the translate service. Converts the complex json
             * Of the format {id:xxx,en:xxx,fr:xxxx}. (Can contain other keys)
             * @param jsonList
             * @param lang
             * @returns {{}}
             * @private
             */
            function _createTranslateList(jsonList, lang) {
                // var langIndex=1;
                if (!lang) lang = 'en';
                var resultList = {};
                for (var i = 0; i < jsonList.length; i++) {
                    resultList[jsonList[i].id] = jsonList[i][lang];
                }
                return resultList;
            }

            /**
             * Replaces the original key with one that is prefixed with the passed in string
             * @param oldList
             * @param prefix
             * @returns {{}}
             * @private
             */
            function _createNewKeyArray(oldList, prefix) {
                var keys = Object.keys(oldList);
                var newList = {};
                for (var i = 0; i < keys.length; i++) {
                    var newKey = "";
                    if (DossierLists.getOtherValue() === keys[i]) {
                        newKey = keys[i];
                    } else {
                        newKey = prefix + keys[i];
                    }
                    var newObj = {};
                    newList[newKey] = oldList[keys[i]];
                }
                return newList;
            }

            function _createSortedArrayNAFirst(jsonList, lang) {
                var result = [];
                result.push({"id": "CAN", "en": "Canada", "fr": "Canada"});
                result.push({"id": "USA", "en": "United States", "fr": "États-Unis"});
                angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                    if (sortedObject.key !== CANADA && sortedObject.key !== USA) {
                        result.push(sortedObject);
                    }
                });
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

