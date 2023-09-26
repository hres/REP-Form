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
        vm.medodOfPaymentList=[];
        var service = {
            getMarketingCountries: _getEuCountries,
            loadEuCountries:_setEuCountries,
            getMethodOfPaymentList: _getMethodsOfPayment,
            setMethodOfPaymentList: _setMethodsOfPayment,
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

        function _getMethodsOfPayment(){
            return vm.medodOfPaymentList;
        }

        function _setMethodsOfPayment(jsonList) {
            if(jsonList) {
                vm.medodOfPaymentList=jsonList;
                // console.log(vm.medodOfPaymentList);
            }
        }

    }

})();

