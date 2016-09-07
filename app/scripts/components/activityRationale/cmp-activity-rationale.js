
/**
 * Created by dkilty on 8/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityForm', [])
})();

(function () {
    'use strict';

    angular
        .module('activityForm')
        .component('cmpActivityRationale', {
            templateUrl: 'app/scripts/components/activityRationale/tpl-activity-rationale.html',
            controller: activityRationaleCtrl,
            controllerAs: 'actRatCtrl',

            bindings: {
                activityRecord: '<',
            }
        });

    function  activityRationaleCtrl() {
        var vm = this;
        vm.record={}

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.activityRecord) {
                vm.record = changes.activityRecord.currentValue
            }
        };
        vm.showError=function(isTouched,isInvalid){
            if ((isInvalid && isTouched) ) {
                //|| (vm.showErrors() && isInvalid )
                return true
            }
            return false
        }

    }
})();