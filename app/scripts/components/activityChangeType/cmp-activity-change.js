
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
                isRequired: '<',
                showErrors: "&"
            }
        });
   // activityChangeCtrl.$inject = [];

    function  activityChangeCtrl() {
        var vm = this;
        vm.record={}
        vm.rationaleSelected = ""
        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.activityRecord) {
                vm.record = changes.activityRecord.currentValue
                vm.updateErrorState();
            }
            if (changes.isRequired) {
                vm.requiredState = changes.isRequired.currentValue;
                vm.updateErrorState();
            }
        };
        vm.showError=function(isTouched,isInvalid){
            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )) {
                return true
            }
            return false
        }

        vm.updateErrorState = function () {

            if (vm.record.textLabelChange || vm.record.drugSubstanceChange
                || vm.record.formulationChange
                || vm.record.specificationChange
                || vm.record.expiryStorageChange
                || vm.record.manufactMethodChange
                || vm.record.containerSizeChange
                || vm.record.packagingSpecChange
                || vm.record.packagingMaterialsChange
                || vm.record.otherChangeDetails
            ) {
                vm.rationaleSelected = "value"
            } else {
                vm.rationaleSelected = ""
            }
        }

        vm.showErrorMissing = function () {
            //TODO service
            if (!vm.requiredState) {
                return false;
            }
            if (vm.rationaleSelected) {
                return false;
            }

            if ((!vm.notifChangeForm.$pristine && vm.notifChangeForm.$invalid) || ( vm.showErrors() && vm.notifChangeForm.$invalid)
                || (vm.notifChangeForm.$touched && vm.notifChangeForm.$invalid))
            /* if( vm.notifChangeForm.$invalid)*/
            {
                return true;
            }
        }

    }
})();