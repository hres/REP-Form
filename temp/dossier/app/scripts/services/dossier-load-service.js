/**
 * Created by dkilty on 8/25/2016.
 */


(function () {
    'use strict';
    angular
        .module('dossierLoadModule', ['dataLists', 'dossierDataLists', 'hpfbConstants'])
})();

(function () {
    'use strict';
    angular
        .module('dossierLoadModule')
        .factory('customLoad', ['$http', '$q', '$filter', 'getCountryAndProvinces', 'DossierLists', 'OTHER', function ($http, $q, $filter, getCountryAndProvinces, DossierLists, OTHER) {

            return function (options) {
                var deferred = $q.defer();
                var dataFolder = "data/"; //relative forlder to the data
                var roaUrl = dataFolder + "roa.json";
                var countryUrl = dataFolder + "countries.json";
                var nanoUrl = "data/nanomaterials.json";
                var unitsUrl = dataFolder + "units.json";
                var dosageFormUrl = dataFolder + "dosageForm.json";
                var resultTranslateList = {};

              //  roaUrl = "https://api.hres.ca/cv/active-ingredient.json";
                makeCorsRequest();

                $http.get(unitsUrl)
                    .then(function (response) {
                        //PROCESS units list. Not creating translate list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getUnitsPrefix(), options.key);
                        DossierLists.createUnitsList(newList);
                        //not adding units to translation
                        return $http.get(countryUrl); //country list load
                    })
                    .then(function (response) {
                        //PROCESS country list data
                        var newList = _createSortedArray(response.data, options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        getCountryAndProvinces.createCountryList(newList);
                        angular.extend(resultTranslateList, translateList);
                        return $http.get(nanoUrl); //nanomaterial load

                    }).then(function (response) {
                    var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getNanoPrefix(), options.key);
                    var translateList = _createTranslateList(newList, options.key);
                    DossierLists.createNanomaterialList(newList);
                    angular.extend(resultTranslateList, translateList);
                    return $http.get(dosageFormUrl); //dosage form list Load contains both languages
                })
                    .then(function (response) {
                        //PROCESSING: DOSAGE FORM list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getDosageFormPrefix(), options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        DossierLists.createDosageFormList(newList); //for display
                        angular.extend(resultTranslateList, translateList);
                        return $http.get("data/activeIngred.json"); //active ingredient list load
                    }).then(function (response) {
                    DossierLists.setActiveList(response.data);
                    return $http.get(roaUrl); //roa load
                }).then(function (response) {
                    var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getRoaPrefix(), options.key);
                    var translateList = _createTranslateList(newList, options.key);
                    DossierLists.createRoaList(newList); //for display
                    angular.extend(resultTranslateList, translateList);
                    return response.data;
                })
                    .catch(function (error) {
                        // this catches errors from the $http calls as well as from the explicit throw
                        console.warn("An error occurred with Dossier List Load: " + error);
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

            /**
             * Creates new keys based on a specific json syntax
             * @param jsonList
             * @param prefix
             * @param lang
             * @returns {Array}
             * @private
             */
            function _createNewSortedArrayWithOther(jsonList, prefix, lang) {

                var newList = _createNewPrefixList(jsonList, prefix);
                //got the new list, sort it by the current language
                if (!lang) lang = 'en'; //TODO magic number
                var result = _createSortedArray(newList, lang);
                //add Other to the beginning of the array
                result.unshift({"id": OTHER, "en": "Other", "fr": "Autre"});
                return result;
            }

            /**
             * Creates sorted array, will exclude any other values
             * @param jsonList
             * @param lang
             * @returns {Array}
             * @private
             */
            function _createSortedArray(jsonList, lang) {
                var result = [];
                angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                    if (sortedObject.key !== OTHER) {
                        result.push(sortedObject);
                    }
                });
                return result;
            }


            /**
             * Injects a prefix to make the keys unique for the form. Works around nonunique user lists
             * @param jsonList
             * @param prefix
             * @returns {Array}
             * @private
             */
            function _createNewPrefixList(jsonList, prefix) {
                var newList = [];
                for (var i = 0; i < jsonList.length; i++) {
                    var newRec = angular.copy(jsonList[i]);
                    newRec.id = prefix + newRec.id;
                    newList.push(newRec);
                }
                return newList;
            }

            ///cors

            // Create the XHR object.
            function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
                //xhr.crossDomain=true;
                if ("withCredentials" in xhr) {
                    // XHR for Chrome/Firefox/Opera/Safari.
                    xhr.open(method, url, true);
                } else if (typeof XDomainRequest != "undefined") {
                    // XDomainRequest for IE.
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                } else {
                    // CORS not supported.
                    xhr = null;
                }
                return xhr;
            }

            // Helper method to parse the title tag from the response.
            function getTitle(text) {
                return text.match('<title>(.*)?</title>')[1];
            }

            // Make the actual CORS request.
            function makeCorsRequest() {
                // This is a sample server that supports CORS.
               // var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
                var url='https://api.hres.ca/cv/active-ingredient.json';
                var xhr = createCORSRequest('GET', url);
                console.log(xhr);
                if (!xhr) {
                    alert('CORS not supported');
                    return;
                }

                // Response handlers.
                xhr.onload = function () {
                    var text = xhr.responseText;
                    var title = getTitle(text);
                    ('Response from CORS request to ' + url + ': ' + title);
                };

                xhr.onerror = function () {
                    alert('Woops, there was an error making the request.');
                };

                xhr.send();
            }



        }]);
})();



