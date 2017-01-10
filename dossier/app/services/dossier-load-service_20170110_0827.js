/**
 * Created by dkilty on 8/25/2016.
 */


(function () {
    'use strict';
    angular
        .module('dossierLoadModule', ['dataLists', 'dossierDataLists','hpfbConstants'])
})();

(function () {
    'use strict';
    angular
        .module('dossierLoadModule')
        .factory('customLoad', ['$http', '$q','$filter', 'getCountryAndProvinces', 'DossierLists','OTHER', function ($http, $q,$filter, getCountryAndProvinces, DossierLists,OTHER) {

            return function (options) {
                var result = {};
                var deferred = $q.defer();
                var roaUrl = "data/roa-" + options.key + ".json";
                var countryUrl = "data/countries-" + options.key + ".json";
                var nanoUrl = "data/nanomaterial-" + options.key + ".json";
                var dosageFormUrl = "data/dosageForm.json";
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
                        return $http.get(dosageFormUrl); //dosage form list Load contains both languages
                    })
                    .then(function (response) {
                        //PROCESSING: dosage form list
                        var newList =_createNewSortedArrayWithOther(response.data, DossierLists.getDosageFormPrefix(),options.key);
                        var translateList=_createTranslateList(newList,options.key);
                        DossierLists.createDosageFormList(newList); //for display
                        //DossierLists.createFullTranslate(response.data);
                        angular.extend(result, translateList);
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

            /**
             * Creates the list of key value pairs for the translate service. Converts the complex json
             * Of the format {id:xxx,en:xxx,fr:xxxx}. (Can contain other keys)
             * @param jsonList
             * @param lang
             * @returns {{}}
             * @private
             */
            function _createTranslateList(jsonList,lang){
               // var langIndex=1;
                if(!lang) lang='en';
                var resultList={};
                for(var i=0;i<jsonList.length;i++){
                    resultList[jsonList[i].id]=jsonList[i][lang];
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
             * @param keyID
             * @returns {Array}
             * @private
             */
            function _createNewSortedArrayWithOther(jsonList,prefix,lang){

                var result = [];
                var translated = [];
                if(!lang) lang="en";
                var newList=_createNewPrefixList(jsonList,prefix);
                //got the new list, sort it by the current language
            result.push({"id":OTHER,"en":"Other","fr":"Autre"});
                //orderBy
                angular.forEach($filter('orderByLocale')(newList, lang), function (sortedObject) {
                    if (sortedObject.key !== OTHER) {
                        result.push(sortedObject);
                    }
                });
                return result;

               //return newList;
            }

            /**
             * Injects a prefix to make the keys unique for the form. Works around nonunique user lists
             * @param jsonList
             * @param prefix
             * @returns {Array}
             * @private
             */
            function _createNewPrefixList(jsonList,prefix){
                var newList=[];
                for(var i=0;i<jsonList.length;i++){
                    var newRec=angular.copy(jsonList[i]);
                    newRec.id=prefix+ newRec.id;
                    newList.push(newRec);
                }
                return newList;
            }


        }]);
})();



