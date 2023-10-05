(function () {
    'use strict';
    var myModule = angular
        .module('commonUtilsServiceModule', ['hpfbConstants']);

    myModule.factory('utils', ['$filter', '$translate', 'FRENCH', function ($filter, $translate, FRENCH) {
        var factoryObj = {};

        factoryObj.getCurrentLang = function (){
            return $translate.proposedLanguage() || $translate.use();
        };

        factoryObj.isFrench = function (lang) {
            return (lang === FRENCH);
        };

        /**
         * @ngdoc this is a mapper to map the app codeDescription model object to the file json object
         * @param modelObj {id, en, fr}
         * @param lang
         * @returns jsonObj {_id, _label_en, _label_fr, __text}
         */
        factoryObj.covertCodeDescriptionFromModelToJson = function (modelObj, lang) {
            var jsonObj = {};
            jsonObj._id = modelObj.id;
            jsonObj._label_en = modelObj.en;
            jsonObj._label_fr = modelObj.fr;
            if (factoryObj.isFrench(lang)) {
                jsonObj.__text = jsonObj._label_fr;
            } else {
                jsonObj.__text = jsonObj._label_en;
            }
            return jsonObj;
        }

        /**
         * @ngdoc to filter out an object from an object array by json object's id
         * @param dataArray [{id, ...}, {id, ...}...]
         * @param jsonObj {_id, _label_en, _label_fr, __text}
         * @returns obj {id, ...}
         */
        factoryObj.filterByJsonId = function (dataArray, jsonObj) {
            var obj = '';
            if (jsonObj) {
                var filteredJsonObj = $filter('filter')(dataArray, {id: jsonObj._id});
                // to fix the bug - filter might return multiple values and the first one is NOT the right one
                if (filteredJsonObj) {
                    if (filteredJsonObj.length > 1) {
                        angular.forEach(filteredJsonObj, function (d) {
                            if (d.id === jsonObj._id) {
                                obj = d;
                            }
                        });
                    } else {
                        obj = filteredJsonObj[0];
                    }
                }
            }
            return obj;
        }

        return factoryObj;
    }]);

})();