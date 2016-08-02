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
                countryChange: '&'
            }
        });

    //countrySelect.$inject = ['$parse'];

    /* @ngInject */
    function countrySelectCtrl() {
        var vm = this;

        vm.$onInit = function(){
          //  console.log("cmpCountrySelect selectedCountry Value: " + vm.selectedCountry);
        }

         vm.countryChanged = function(value){
             console.log("cmpCountrySelect countryChanged Value: " + value);
            vm.countryChange({$event : {country : value}});
        }


    }

})();


