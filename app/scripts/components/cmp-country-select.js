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
            templateUrl: 'app/views/tpl-country.html',
            controller: countrySelectCtrl,
           controllerAs: 'ctr',
            bindings: {
                formName: '<',
                selectedCountry: '<',
                countries: '<',
                countryChange: '&',
                isDisabled: '<'
            }
        });

    //countrySelect.$inject = ['$parse'];

    /* @ngInject */
    function countrySelectCtrl() {
        var vm = this;

        vm.$onInit = function(){
        }

         vm.countryChanged = function(value){
            vm.countryChange({$event : {country : value}});
        }


    }

})();


