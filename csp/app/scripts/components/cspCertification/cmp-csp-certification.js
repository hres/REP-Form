/**
 * Created by dkilty on 06/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspCertification', []);

})();

(function () {
    'use strict';

    angular
        .module('cspCertification')
        .component('cmpCspCertification', {
            templateUrl: 'app/scripts/components/cspCertification/tpl-csp-certification.html',
            controller: cspCertificationController,
            controllerAs: 'cspCertCtrl',
            bindings: {
                record: '<',
                showErrors: '&'
            }
        });

    cspCertificationController.$inject = [];
    function cspCertificationController() {

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

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }

        };


        vm.showError = function (ctrl) {

            if (!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }
        }

    }
})();