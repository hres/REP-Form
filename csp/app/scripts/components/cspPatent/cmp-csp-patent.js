/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspPatent', [
            'numberFormat'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspPatent')
        .component('cmpCspPatent', {
            templateUrl: 'app/scripts/components/cspPatent/tpl-csp-patent.html',
            controller: cspPatentController,
            controllerAs: 'cspPatentCtrl',
            bindings: {
                record: '<',
                showErrors: '&'
            }
        });

   // cspPatentController.$inject = [];
    function cspPatentController() {

        var vm = this;
        vm.model="";


        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){

        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){

                vm.model=changes.record.currentValue;
            }
        };


        /**
         * used to control when to show an individual error
         * @param ctrl - control to show an error on
         * @returns {*}
         */
        vm.showError = function (ctrl) {
            if (!ctrl) {
                console.warn("cmpCspPatent::showError: no control");
                return false;
            }
            return (ctrl.$invalid && ctrl.$touched || (vm.showErrors() && ctrl.$invalid));
        };

    }
})();