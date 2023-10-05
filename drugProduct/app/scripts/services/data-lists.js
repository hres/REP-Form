/**
 * Created by dkilty on 6/4/2016.
 */

/**
 * @ngdoc module declaration for datalists
 */
(function () {
    'use strict';

    angular
        .module('dataLists', ['hpfbConstants']);

})();

/**
 * getCountryAndProvinces services
 * Returns Canada or US condes, canada provinces, us states
 */
(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getCountryAndProvinces', getService);

    /* @ngInject */
    getService.inject = ['UNKNOWN'];
    function getService(UNKNOWN) {
        var vm = this;
        vm.env = '';
        vm.countryList = [];
        var service = {
            getEnv: _getEnvString,
            setEnv: _setEnvString,
            getCountries: getCountryValuesArray,
            getProvinces: getProvinceValuesArray,
            getUSStates: getUSStatesValueArray,
            createCountryList: _createCountryArray,
            getUnknownCountryRecord: _getUnknownCountryRec
        };
        return service;

        ////////////////

        function _getEnvString() {
            if (vm.env) {
                return vm.env;
            } else {
                return '@@envValue';
            }
        }

        function _setEnvString(value) {
            vm.env = value.env;
        }

        function _createCountryArray(translateJson) {
            vm.countryList = translateJson;
        }

        function _getUnknownCountryRec() {

            return (
            {
                "id": UNKNOWN,
                "en": "Unknown",
                "fr": "Inconnu"
            }
            )
        }

        //todo why is this listed twice?
        function getCountryValuesArray() {
            return vm.countryList;
        }


        function getProvinceValuesArray() {
            return (
                [
                    'AB',
                    'BC',
                    'MB',
                    'NB',
                    'NL',
                    'NT',
                    'NS',
                    'NU',
                    'ON',
                    'PE',
                    'QC',
                    'SK',
                    'YT'
                ]
            );
        }

        function getUSStatesValueArray() {
            return (
                [
                    'AL',
                    'AK',
                    'AZ',
                    'AR',
                    'CA',
                    'CO',
                    'CT',
                    'DE',
                    'DC',
                    'FL',
                    'GA',
                    'HI',
                    'ID',
                    'IL',
                    'IN',
                    'IA',
                    'KS',
                    'KY',
                    'LA',
                    'ME',
                    'MD',
                    'MA',
                    'MI',
                    'MN',
                    'MS',
                    'MOS',
                    'MT',
                    'NE',
                    'NV',
                    'NH',
                    'NJ',
                    'NM',
                    'NY',
                    'NC',
                    'ND',
                    'OH',
                    'OK',
                    'OR',
                    'PA',
                    'RI',
                    'SC',
                    'SD',
                    'TN',
                    'TX',
                    'UT',
                    'VT',
                    'VA',
                    'WA',
                    'WV',
                    'WI',
                    'WY'
                ]);

        }

    }

})();

(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getContactLists', getSalService); //todo rename service

    /* @ngInject */
    getSalService.$inject = ['$filter', '$q', '$http', '$translate', 'OTHER', 'FRENCH','RELATIVE_FOLDER_DATA'];
    function getSalService($filter, $q, $http,$translate, OTHER, FRENCH,RELATIVE_FOLDER_DATA) {
        var vm = this;
        vm.internalContacts = [];
        vm.adminSubTypeArray = [];
        var service = {
            getSalutationList: getSalValuesArray,
            getLanguages: getLanguagesValuesArray, //TODO make constants
            // createInternalContacts: _createInternalContacts,
            // getInternalContacts: _getInternalContacts,
            // getInternalContactsWithoutOther: _getInternalContactsWithoutOther,
            // getAdminSubType: _getAdminSubType        // 2022/01/14 moved to dataListLoader factory
        };
        return service;

        ////////////////

        function getSalValuesArray() {
            return (
                [
                    'SALUT_DR',
                    'SALUT_MR',
                    'SALUT_MRS',
                    'SALUT_MS'
                ]);
        }

        function getLanguagesValuesArray() {
            return (
                [
                    "en",
                    "fr"
                ]);
        }

        /**
         * @private
         * Loads Internal contacts from a datafile
         */
        // function _createInternalContacts() {
        //     var deferred = $q.defer();
        //     var contactsUrl = RELATIVE_FOLDER_DATA+"internalContacts.json";
        //     if (!vm.internalContacts || vm.internalContacts.length === 0) {
        //         $http.get(contactsUrl)
        //             .success(function (data, status, headers, config) {
        //                 var newList = _createSortedArray(data, 'en');
        //                 var lang = $translate.proposedLanguage() || $translate.use();
        //                 //this is a bit of a hack, but saves unecessary space
        //                 var otherRec = {"id": OTHER, "en": "Other"};
        //                 if (lang === FRENCH) {
        //                     otherRec.en = "Autre";
        //                 }
        //                 newList.unshift(otherRec);
        //                 vm.internalContacts = newList;
        //                 deferred.resolve(newList);
        //             })
        //             .error(function (data, status, headers, config) {
        //                 deferred.reject(status);
        //             });
        //     }else{
        //         deferred.resolve(vm.internalContacts);
        //     }
        //     return deferred.promise;
        // }
        //
        // function _getInternalContacts() {
        //         return _createInternalContacts();
        // }

        // function _getInternalContactsWithoutOther() {
        //     var deferred = $q.defer();
        //     var contactsUrl = RELATIVE_FOLDER_DATA+"internalContacts.json";
        //     if (!vm.internalContacts || vm.internalContacts.length === 0) {
        //         $http.get(contactsUrl)
        //             .success(function (data, status, headers, config) {
        //                 var newList = _createSortedArray(data, 'en');
        //                 vm.internalContacts = newList;
        //                 deferred.resolve(newList);
        //             })
        //             .error(function (data, status, headers, config) {
        //                 deferred.reject(status);
        //             });
        //     }else{
        //         deferred.resolve(vm.internalContacts);
        //     }
        //     return deferred.promise;
        // }

        // function _createSortedArray(jsonList, lang) {
        //     var result = [];
        //     angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
        //         result.push(sortedObject);
        //     });
        //     return result;
        // }
        //
        // function _getAdminSubType() {
        //
        //     if (!vm.adminSubTypeArray || vm.adminSubTypeArray.length === 0) {
        //         return _loadAdminType()
        //     } else {
        //         return (vm.adminSubTypeArray);
        //     }
        // }
        //
        // function _loadAdminType() {
        //     var deferred = $q.defer();
        //     var url = RELATIVE_FOLDER_DATA+"adminSubType.json";
        //     $http.get(url).success(function (data, status, headers, config) {
        //         var lang = $translate.proposedLanguage() || $translate.use();
        //         var newList = _createSortedArray(data, lang);
        //         vm.adminSubTypeArray = newList;
        //         deferred.resolve(newList);
        //     }).error(function (data, status, headers, config) {
        //         deferred.reject(status);
        //     });
        //     return deferred.promise;
        // }

    }


})();


/**
 * Contact role list service
 */
(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getRoleLists', getRolesService);

    /* @ngInject */
    function getRolesService() {
        var _biologic = 'D21'; // 'BIOLOGIC';
        var _pharma = 'D22';  //'PHARMACEUTICAL';
        var _veterinary = 'D24';
        var _clinical = 'D26';

        var service = {
            getContactRoles: getRoleValuesArray,
            getFormTypes: _getFormTypes,
            getBiologicType: _getBiologic,
            getPharmaType: _getPharmaceutical,
            getVeterinary: _getVeterinary,
            getClinicalTrial: _getClinicalTrial
        };
        return service;

        ////////////////

        function getRoleValuesArray() {
            return (
                [
                    '',
                    'ROLE_PRIMARY',
                    'ROLE_SECONDARY'
                ]);
        }

        function _getFormTypes( env ) {
            return env ?
                (
                    [
                        _biologic,
                        _pharma,
                        _veterinary
                    ]) :
                ([
                    _biologic,
                    _pharma,
                    _clinical,
                    _veterinary
                ]);
        }

        function _getBiologic() {
            return _biologic;
        }

        function _getPharmaceutical() {

            return _pharma;
        }

        function _getVeterinary() {

            return _veterinary;
        }

        function _getClinicalTrial() {

            return _clinical;
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('dataListLoader', getService);

    /* @ngInject */
    getService.$inject = [ '$filter', '$q', '$http', '$translate', 'OTHER', 'FRENCH','RELATIVE_FOLDER_DATA'];
    function getService($filter, $q, $http,$translate, OTHER, FRENCH,RELATIVE_FOLDER_DATA) {
        var vm = this;
        vm.adminSubTypeArray = [];
        var service = {
            getAdminSubType: _getAdminSubType
        };
        return service;

        function _createSortedArray(jsonList, lang) {
            var result = [];
            angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                result.push(sortedObject);
            });
            return result;
        }

        function _getAdminSubType() {

            if (!vm.adminSubTypeArray || vm.adminSubTypeArray.length === 0) {
                return _loadAdminType();
            } else {
                return vm.adminSubTypeArray;
            }
        }

        function _loadAdminType() {
            var deferred = $q.defer();
            var url = RELATIVE_FOLDER_DATA+"adminSubType.json";
            $http.get(url).success(function (data, status, headers, config) {
                var lang = $translate.proposedLanguage() || $translate.use();
                var newList = _createSortedArray(data, lang);
                vm.adminSubTypeArray = newList;
                deferred.resolve(newList);
            }).error(function (data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

    }
})();

