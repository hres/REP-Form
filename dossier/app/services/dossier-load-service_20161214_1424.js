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
                        angular.extend(result, response.data);
                        DossierLists.createRoaList(response.data);
                        return $http.get(countryUrl);
                    })
                    .then(function (response) {
                        angular.extend(result, response.data);
                        getCountryAndProvinces.createCountryList(response.data);
                        return $http.get(nanoUrl);
                    }).then(function (response) {
                    angular.extend(result, response.data);
                    DossierLists.createNanomaterialList(response.data);
                    return $http.get(dosageFormUrl);
                }).then(function (response) {
                        angular.extend(result, response.data);
                        DossierLists.createDosageFormList(response.data);
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
        }]);

})();



