/**
 * Created by hcuser on 20/05/2016.
 */


(function () {
    'use strict';

    angular
        .module('countrySelect', []);

})();


(function () {
    'use strict';

    angular
        .module('countrySelect')
        .component('cmpCountrySelect', {
            templateUrl: 'app/scripts/components/countrySelect/tpl-country.html',
            controller: countrySelectCtrl,
           controllerAs: 'ctr',
            bindings: {
                formName: '<',
                selectedCountry: '<',
                countries: '<',
                countryChange: '&',
                isDisabled: '<',
                showErrors: '&'
            }
        });

    //countrySelect.$inject = ['$parse'];

    /* @ngInject */
    function countrySelectCtrl() {
        var vm = this;

        vm.$onInit = function(){
            //if anything needed
        }

         vm.countryChanged = function(value){
            vm.countryChange({$event : {country : value}});
        }

        vm.showError = function () {
            return (
                (vm.countryForm.country.$invalid && vm.countryForm.country.$touched) || (vm.countryForm.country.$invalid && vm.showErrors())
                || (vm.countryForm.country.$invalid && vm.countryForm.$dirty)
            )
        };
    }

})();


