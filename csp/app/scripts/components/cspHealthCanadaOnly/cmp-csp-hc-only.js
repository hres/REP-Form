/**
 * Created by dkilty on 04/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspHCOnly', []);

})();

(function () {
    'use strict';

    angular
        .module('cspHCOnly')
        .component('cmpCspHcOnly', {
            templateUrl: 'app/scripts/components/cspHealthCanadaOnly/tpl-csp-hc-only.html',
            controller: hcOnlyController,
            controllerAs: 'hcOnlyCtrl',
            bindings: {
                record: '<',
                showErrors:'&'

            }
        });

   // hcOnlyController.$inject = [];
    function hcOnlyController() {

        var vm = this;
        vm.model = null;

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {

        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){
                vm.model=changes.record.currentValue;
            }
        };
        vm.showError=function(ctrl){

            if(!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }

        }
    }
})();