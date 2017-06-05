/**
 * Created by dkilty on 2017-05-12.
 */

/**
 * @ngdoc module declaration
 */
(function () {
    'use strict';

    angular
        .module('cspDataModule',[]);

})();




(function () {
    'use strict';

    angular
        .module('cspDataModule')
        .factory('cspDataLists', cspDataLists);

    cspDataLists.$inject = [];

    /* @ngInject */
    function cspDataLists() {
        var vm=this;
        vm.euCountryList=[];
        var service = {
            getMarketingCountries: _getEuCountries,
            loadEuCountries:_setEuCountries
        };
        return service;

        ////////////////

        function _getEuCountries() {
           return vm.euCountryList;
        }


        function _setEuCountries(jsonList) {
            if(jsonList) {
                vm.euCountryList=jsonList;
            }
        }

    }

})();

