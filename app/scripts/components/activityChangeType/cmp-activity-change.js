
/**
 * Created by dkilty on 8/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityChange', [])
})();

(function () {
    'use strict';

    angular
        .module('activityChange')
        .component('cmpActivityChange', {
            templateUrl: 'app/scripts/components/activityChangeType/tpl-activity-change.html',
            controller: activityChangeCtrl,
            controllerAs: 'actChangeCtrl',

            bindings: {
                activityRecord: '<',
            }
        });
   // activityChangeCtrl.$inject = [];

    function  activityChangeCtrl() {
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