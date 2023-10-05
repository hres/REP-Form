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
        .factory('customLoad', ['$http', '$q', '$filter', 'getCountryAndProvinces', 'DossierLists', 'OTHER', 'RELATIVE_FOLDER_DATA', 'CANADA', 'USA', function ($http, $q, $filter, getCountryAndProvinces, DossierLists, OTHER, RELATIVE_FOLDER_DATA, CANADA, USA) {

            return function (options) {
                var deferred = $q.defer();
                //var dataFolder = "data/"; //relative forlder to the data
                var versionsUrl = RELATIVE_FOLDER_DATA + "versions.json";
                var envUrl = RELATIVE_FOLDER_DATA + "env.json";
                var roaUrl = RELATIVE_FOLDER_DATA + "roa.json";
                var countryUrl = RELATIVE_FOLDER_DATA + "countries.json";
                var nanoUrl = RELATIVE_FOLDER_DATA+"nanomaterials.json";
                var unitsUrl = RELATIVE_FOLDER_DATA + "units.json";
                var presentationUnitsUrl = RELATIVE_FOLDER_DATA + "presentationUnits.json";
                var measureUnitsUrl = RELATIVE_FOLDER_DATA + "measureUnits.json";
                var dosageFormUrl = RELATIVE_FOLDER_DATA + "dosageForm.json";
                var activeUrl= RELATIVE_FOLDER_DATA +"activeIngred.json";
                var speciesUrl = RELATIVE_FOLDER_DATA + "species.json";
                var subtypesUrl= RELATIVE_FOLDER_DATA +"subTypes.json";
                var resultTranslateList = {};
                $http.get(versionsUrl)
                	.then(function (response) {
                    DossierLists.setVer(response.data);
                });
                $http.get(envUrl)
                    .then(function (response) {
                        //PROCESS env data
                        DossierLists.setEnv(response.data);
                    });
                $http.get(unitsUrl)
                    .then(function (response) {
                        //PROCESS units list. Not creating translate list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getUnitsPrefix(), options.key);
                        DossierLists.createUnitsList(newList);
                        //not adding units to translation
                       // return $http.get(presentationUnitsUrl); //presentation Units list load
                    });
                $http.get(presentationUnitsUrl).then(function (response) {
                        //PROCESS units list. Not creating translate list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getUnitsPrefix(), options.key);
                        DossierLists.createUnitsPresentationList(newList);
                        //not adding units to translation
                        //return $http.get(measureUnitsUrl); //measure Units list load
                    });
                $http.get(measureUnitsUrl).then(function (response) {
                        //PROCESS units list. Not creating translate list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getUnitsPrefix(), options.key);
                        DossierLists.createUnitsMeasureList(newList);
                        //not adding units to translation
                     //   return $http.get(countryUrl); //country list load
                    });
                $http.get(countryUrl).then(function (response) {
                        //PROCESS country list data
                        var newList = _createSortedArrayNAFirst(response.data, options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        getCountryAndProvinces.createCountryList(newList);
                        angular.extend(resultTranslateList, translateList);
                        //return $http.get(nanoUrl); //nanomaterial load

                    });
                $http.get(nanoUrl).then(function (response) {
                    var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getNanoPrefix(), options.key);
                    var translateList = _createTranslateList(newList, options.key);
                    DossierLists.createNanomaterialList(newList);
                    angular.extend(resultTranslateList, translateList);
                    //return $http.get(dosageFormUrl); //dosage form list Load contains both languages
                });
                $http.get(dosageFormUrl).then(function (response) {
                        //PROCESSING: DOSAGE FORM list
                        var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getDosageFormPrefix(), options.key);
                        var translateList = _createTranslateList(newList, options.key);
                        DossierLists.createDosageFormList(newList); //for display
                        angular.extend(resultTranslateList, translateList);//PROCESSING: DOSAGE FORM list
                        var newList2 = _createNewSortedArrayWithOther(response.data, "", options.key);
                        var translateList2 = _createTranslateList(newList2, options.key);
                        angular.extend(resultTranslateList, translateList2);
                       // return $http.get(activeUrl); //active ingredient list load
                    });
                $http.get(activeUrl).then(function (response) {
                    DossierLists.setActiveList(response.data);
                   // return $http.get(roaUrl); //roa load
                });
                $http.get(speciesUrl).then(function (response) {
                    DossierLists.setSpeciesList(response.data);
                    // return $http.get(roaUrl); //roa load
                });
                $http.get(subtypesUrl).then(function (response) {
                    DossierLists.setSubTypesList(response.data);
                    // return $http.get(roaUrl); //roa load
                });
                $http.get(roaUrl).then(function (response) {
                    var newList = _createNewSortedArrayWithOther(response.data, DossierLists.getRoaPrefix(), options.key);
                    var translateList = _createTranslateList(newList, options.key);
                    DossierLists.createRoaList(newList); //for display
                    angular.extend(resultTranslateList, translateList);
                   // return response.data;
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

            function _createSortedArrayNAFirst(jsonList,lang){
                var result = [];
                var canadaRecord = null;
                var usaRecord = null;
                angular.forEach($filter('orderByLocale')(jsonList,lang), function (sortedObject) {
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



