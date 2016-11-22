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
        .filter('sequenceOrderDescending', sequenceOrderBy);

    orderByTranslatedCountry.$inject = ['$translate', '$filter', 'CANADA', 'USA'];
    orderByTranslated.$inject = ['$translate', '$filter'];

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
                console.log(sortedObject)
                result.push(sortedObject);

            });
            console.log(result)
            return result;
        };
    }


})();