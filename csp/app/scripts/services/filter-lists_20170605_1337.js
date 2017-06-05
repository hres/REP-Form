/**
 * Created by dkilty on 07/06/2016.
 *
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
        .filter('orderByLocale',_orderByLocale)
        .filter('findCountryObject', findCountryObj)
        .filter('findListItemById', _findById)
        .filter('sequenceOrderDescending', sequenceOrderBy);

    orderByTranslatedCountry.$inject = ['$translate', '$filter', 'CANADA', 'USA'];
    orderByTranslated.$inject = ['$translate', '$filter'];
    orderByTranslatedOtherFirst.$inject = ['$translate', '$filter', 'OTHER'];
    _findById.$inject = ['$filter'];

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
        return function (array) {
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
        return function (array) {
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
        return function (array) {
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
        return function (array) {
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

    /**
     * Sorts by locale specified by angular translate
     * @param $translate
     * @returns {Function}
     * @private
     */
    function _orderByLocale() {
        return function (items,lang) {

            items.sort(function (a, b) {
                return a[lang].localeCompare(b[lang],lang);
            });
            return items;
        };
    }

    /**
     * Finds an exact match by id. Using filter for the initial search as searchJson can
     * contain multiple search criteria!, then for multiple matches, looking for exact id
     * @param $filter
     * @returns {Function}
     * @private
     */
    function _findById($filter) {
        return function (array, searchJson) {
            var initialResult = $filter('filter')(array, searchJson);
            if (!initialResult) return null; //should never happen
            if (initialResult.length === 1) {
                return initialResult[0];
            } else {
                for (var i = 0; i < initialResult.length; i++) {
                    if (initialResult[i].id === searchJson.id) {
                        return initialResult[i];
                    }
                }
            }
            return null;
        };
    }

    })();