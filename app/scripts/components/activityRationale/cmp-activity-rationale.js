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
                isRequired: '<',
                showErrors: "&"
            }
        });
    function activityRationaleCtrl() {
        var vm = this;
        vm.record = {}
        vm.requiredState = false;
        vm.rationaleSelected = ""; //sets error handling
        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.activityRecord) {
                vm.record = changes.activityRecord.currentValue;
                vm.updateErrorState();
            }
            if (changes.isRequired) {
                vm.requiredState = changes.isRequired.currentValue;
                vm.updateErrorState();
            }
        };
        vm.showError = function (isTouched, isInvalid) {
            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )) {
                return true
            }
            return false
        }
        vm.updateErrorState = function () {
            if (vm.record.newRoa || vm.record.newClaims
                || vm.record.changeFormulation
                || vm.record.changeDrugSubstance
                || vm.record.replaceSterility
                || vm.record.confirmitoryStudies
                || vm.record.otherRationaleDetails
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

            if ((!vm.activityTypeForm.$pristine && vm.activityTypeForm.$invalid) || ( vm.showErrors() && vm.activityTypeForm.$invalid)
                || (vm.activityTypeForm.$touched && vm.activityTypeForm.$invalid)) {
                return true;
            }
        }


    }
})();