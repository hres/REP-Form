/**
 * Created by dkilty on 6/4/2016.
 */

/**
 * @ngdoc module declaration for datalists
 */
(function () {
    'use strict';

    angular
        .module('dataLists', []);

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
    function getService() {
        this.countryList = [];
        var service = {
            getCountries: getCountryValuesArray,
            getProvinces: getProvinceValuesArray,
            getUSStates: getUSStatesValueArray,
            createCountryList: _createCountryArray
        };
        return service;

        ////////////////


        function _createCountryArray(translateJson) {
            var result = [];
            var keys = Object.keys(translateJson);
            for (var i = 0; i < keys.length; i++) {
                //var val = translateJson[keys[i]];
                result.push(keys[i])
            }
            this.countryList = result;
            //return extraList;
        }

        function getCanada() {
            return 'CAN';
        }

        function getUSA() {
            return 'USA';
        }

        //todo why is this listed twice?
        function getCountryValuesArray() {
            return this.countryList;
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
                    'MO',
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
        .factory('getCountriesISO3166', getCountries);

    // getCountries.$inject = ['dependency'];

    /* @ngInject */
    function getCountries() {
        var service = {
            getCountryList3Letter: getCountryList3Letter
        };
        return service;

        ////////////////

        function getCountryList3Letter() {
            return (
                [
                    'CAN',
                    'USA',
                    'AFG',
                    'ALA',
                    'ALB',
                    'DZA',
                    'ASM',
                    'AND',
                    'AGO',
                    'AIA',
                    'ATA',
                    'ATG',
                    'ARG',
                    'ARM',
                    'ABW',
                    'AUS',
                    'AUT',
                    'AZE',
                    'BHS',
                    'BHR',
                    'BGD',
                    'BRB',
                    'BLR',
                    'BEL',
                    'BLZ',
                    'BEN',
                    'BMU',
                    'BTN',
                    'BOL',
                    'BIH',
                    'BWA',
                    'BVT',
                    'BRA',
                    'IOT',
                    'BRN',
                    'BGR',
                    'BFA',
                    'BDI',
                    'KHM',
                    'CMR',
                    'CPV',
                    'CYM',
                    'CAF',
                    'TCD',
                    'CHL',
                    'CHN',
                    'CXR',
                    'CCK',
                    'COL',
                    'COM',
                    'COG',
                    'COD',
                    'COK',
                    'CRI',
                    'CIV',
                    'HRV',
                    'CUB',
                    'CYP',
                    'CZE',
                    'DNK',
                    'DJI',
                    'DMA',
                    'DOM',
                    'TLS',
                    'ECU',
                    'EGY',
                    'SLV',
                    'GNQ',
                    'ERI',
                    'EST',
                    'ETH',
                    'FLK',
                    'FRO',
                    'FJI',
                    'FIN',
                    'FRA',
                    'GUF',
                    'PYF',
                    'ATF',
                    'GAB',
                    'GMB',
                    'GEO',
                    'DEU',
                    'GHA',
                    'GIB',
                    'GRC',
                    'GRL',
                    'GRD',
                    'GLP',
                    'GUM',
                    'GTM',
                    'GIN',
                    'GNB',
                    'GUY',
                    'HTI',
                    'HMD',
                    'VAT',
                    'HND',
                    'HKG',
                    'HUN',
                    'ISL',
                    'IND',
                    'IDN',
                    'IRN',
                    'IRQ',
                    'IRL',
                    'ISR',
                    'ITA',
                    'JAM',
                    'JPN',
                    'JOR',
                    'KAZ',
                    'KEN',
                    'KIR',
                    'PRK',
                    'KOR',
                    'KWT',
                    'KGZ',
                    'LAO',
                    'LVA',
                    'LBN',
                    'LSO',
                    'LBR',
                    'LIE',
                    'LTU',
                    'LUX',
                    'MAC',
                    'MKD',
                    'MDG',
                    'MWI',
                    'MYS',
                    'MDV',
                    'MLI',
                    'MLT',
                    'MHL',
                    'MTQ',
                    'MRT',
                    'MUS',
                    'MYT',
                    'MEX',
                    'FSM',
                    'MDA',
                    'MCO',
                    'MNG',
                    'MSR',
                    'MAR',
                    'MOZ',
                    'MMR',
                    'NAM',
                    'NRU',
                    'NPL',
                    'NLD',
                    'NCL',
                    'NZL',
                    'NIC',
                    'NER',
                    'NGA',
                    'NIU',
                    'NFK',
                    'MNP',
                    'NOR',
                    'OMN',
                    'PAK',
                    'PLW',
                    'PAN',
                    'PNG',
                    'PRY',
                    'PER',
                    'PHL',
                    'PCN',
                    'POL',
                    'PRT',
                    'PRI',
                    'QAT',
                    'REU',
                    'ROU',
                    'RUS',
                    'RWA',
                    'KNA',
                    'LCA',
                    'VCT',
                    'WSM',
                    'SMR',
                    'STP',
                    'SAU',
                    'SEN',
                    'SYC',
                    'SLE',
                    'SGP',
                    'SVK',
                    'SVN',
                    'SLB',
                    'SOM',
                    'ZAF',
                    'SGS',
                    'ESP',
                    'LKA',
                    'SHN',
                    'SPM',
                    'SDN',
                    'SUR',
                    'SJM',
                    'SWZ',
                    'SWE',
                    'CHE',
                    'SYR',
                    'TWN',
                    'TJK',
                    'TZA',
                    'THA',
                    'TGO',
                    'TKL',
                    'TON',
                    'TTO',
                    'TUN',
                    'TUR',
                    'TKM',
                    'TCA',
                    'TUV',
                    'UGA',
                    'UKR',
                    'ARE',
                    'GBR',
                    'UMI',
                    'URY',
                    'UZB',
                    'VUT',
                    'VEN',
                    'VNM',
                    'VGB',
                    'VIR',
                    'WLF',
                    'ESH',
                    'YEM',
                    'ZMB',
                    'ZWE'
                ]
            )
        }
    }

})();

/**
 * Contact List Service -salutation and language
 */

(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getContactLists', getSalService);

    /* @ngInject */
    function getSalService() {
        var service = {
            getSalutationList: getSalValuesArray,
            getLanguages: getLanguagesValuesArray
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
                    'en',
                    'fr'
                ]);
        }
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
        var _biologic = 'BIOLOGIC';
        var _pharma = 'PHARMACEUTICAL';
        /*'DRUG_MASTER_FILE',
         'MEDICAL_DEVICE'*/
        var service = {
            getContactRoles: getRoleValuesArray,
            getFormTypes: _getFormTypes,
            getBiologicType: _getBiologic,
            getPharmaType: _getPharmaceutical
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

        function _getFormTypes() {
            return (
                [
                    _biologic,
                    _pharma
                ]);
        }

        function _getBiologic() {
            return _biologic;
        }

        function _getPharmaceutical() {

            return _pharma;
        }

    }

})();