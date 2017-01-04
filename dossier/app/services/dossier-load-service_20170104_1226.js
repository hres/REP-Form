/**
 * Created by dkilty on 8/25/2016.
 */


(function () {
    'use strict';
    angular
        .module('dossierLoadModule', ['dataLists', 'dossierDataLists'])
})();

(function () {
    'use strict';
    angular
        .module('dossierLoadModule')
        .factory('customLoad', ['$http', '$q', 'getCountryAndProvinces', 'DossierLists', function ($http, $q, getCountryAndProvinces, DossierLists) {
            var result = {};
            return function (options) {
                var deferred = $q.defer();
                var roaUrl = "data/roa-" + options.key + ".json";
                var countryUrl = "data/countries-" + options.key + ".json";
                var nanoUrl = "data/nanomaterial-" + options.key + ".json";
                var dosageFormUrl = "data/dosageForm-" + options.key + ".json";
                $http.get(roaUrl)
                    .then(function (response) {
                        var newList = _createNewKeyArray(response.data, DossierLists.getRoaPrefix());
                        DossierLists.createRoaList(newList);
                        angular.extend(result, newList);
                        return $http.get(countryUrl); //country list load
                    })
                    .then(function (response) {
                        angular.extend(result, response.data);
                        getCountryAndProvinces.createCountryList(response.data);
                        return $http.get(nanoUrl); //nanomaterial load
                    }).then(function (response) {
                    angular.extend(result, response.data);
                    DossierLists.createNanomaterialList(response.data);
                        return $http.get(dosageFormUrl); //dosage form list Load
                    })
                    .then(function (response) {

                        var newList = _createNewKeyArray(response.data, DossierLists.getDosageFormPrefix());
                        DossierLists.createDosageFormList(newList);
                        angular.extend(result, newList);
                        return $http.get("data/activeIngred.json"); //active ingredient list load
                    }).then(function (response) {
                        DossierLists.setActiveList(response.data);
                        return response.data;
                    })
                    .catch(function (error) {
                        // this catches errors from the $http calls as well as from the explicit throw
                        console.warn("An error occurred with Dossier List Load: " + error);
                        deferred.reject(result);
                    })
                    .finally(function () {
                        deferred.resolve(result);
                    });
                return deferred.promise;
            };

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
        }]);
})();



