/**
 * Created by dkilty on 07/06/2016.
 * Last updated Sept 15 v1.0
 */

(function () {
    'use strict';
    angular
        .module('filterLists', ['hpfbConstants']);
})();

(function () {
    'use strict';

    angular
        .module('filterLists')
        .filter('orderByTranslatedCountry', orderByTranslatedCountry)
        .filter('orderByTranslated', orderByTranslated)
        .filter('orderByTranslatedOtherFirst', orderByTranslatedOtherFirst)
        .filter('orderByCountryAndLabel', orderByTranslatedCountryAndLabel)
        .filter('findCountryObject', findCountryObj)
        .filter('sequenceOrderDescending', sequenceOrderBy);

    orderByTranslatedCountry.$inject = ['$translate', '$filter', 'CANADA', 'USA'];
    orderByTranslated.$inject = ['$translate', '$filter'];
    orderByTranslatedOtherFirst.$inject = ['$translate', '$filter', 'OTHER'];

    function orderByTranslatedCountry($translate, $filter, CANADA, USA) {
        return function (array, objKey) {
            var result = [];
            var translated = [];
            angular.forEach(array, function (value) {
                translated.push({
                    key: value,
                    label: $translate.instant(value)
                });
            });
            result.push(CANADA);
            result.push(USA);
            angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                if (sortedObject.key !== CANADA && sortedObject.key !== USA) {
                    result.push(sortedObject.key);
                }
            });
            return result;
        };
    }

    /**
     * Orders country list by translated value and creates a list of saved and displayed value
     * @param $translate
     * @param $filter
     * @param CANADA
     * @param USA
     */
    function orderByTranslatedCountryAndLabel($translate, $filter, CANADA, USA) {
        return function (array, objKey) {
            var result = [];
            var translated = [];
            angular.forEach(array, function (value) {
                translated.push({
                    key: value,
                    label: $translate.instant(value)
                });
            });

            //top of the list
            result.push({key: CANADA, label: $translate.instant(CANADA)});
            result.push({key: USA, label: $translate.instant(USA)});
            angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                if (sortedObject.key !== CANADA && sortedObject.key !== USA) {
                    result.push(sortedObject);
                }
            });
            return result;
        };
    }

    function findCountryObj() {
        return function (array, targetKey) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].key === targetKey) {
                    return (array[i]);
                }
            }
            return null; //not found
        };
    }


    function orderByTranslated($translate, $filter) {
        return function (array, objKey) {
            var result = [];
            var translated = [];
            angular.forEach(array, function (value) {
                translated.push({
                    key: value,
                    label: $translate.instant(value)
                });
            });
            angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                result.push(sortedObject.key);
            });
            return result;
        };
    }

    function sequenceOrderBy($filter) {
        return function (array, objKey) {
            var result = [];
            angular.forEach($filter('orderBy')(array, 'sequence', true), function (sortedObject) {
                result.push(sortedObject);

            });
            return result;
        };
    }

    /*
     Orders values
     */
    function orderByTranslatedOtherFirst($translate, $filter, OTHER) {
        return function (array, objKey) {
            var result = [];
            var translated = [];
            angular.forEach(array, function (value) {
                translated.push({
                    key: value,
                    label: $translate.instant(value)
                });
            });
            result.push(OTHER);
            angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                if (sortedObject.key !== OTHER) {
                    result.push(sortedObject.key);
                }
            });
            return result;
        };
    }

})();