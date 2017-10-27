/**
 * Created by dkilty on 20/04/2017.
 */


(function () {
    'use strict';

    angular
        .module('errorMessageModule', [])
})();

(function () {
    'use strict';

    angular
        .module('errorMessageModule')
        .component('cmpErrorMessage', {
            templateUrl: 'app/scripts/components/error-message/tpl-error-message.html',
            controller: errorMessageController,
            controllerAs: 'errMessageCtrl',

            bindings: {
                fieldName: '<', //theName of the field
                formRef: '<',
                showError: '&',
                errorTypes: '<'
            }
        });
    // errorMessageController.$inject = [];

    function errorMessageController() {
        var vm = this;
        vm.field_name = "";
        vm.form_ref = null;

        vm.fieldRecords = [];

        vm.$onChanges = function (changes) {

            if (changes.fieldName) {
                vm.field_name = changes.fieldName.currentValue;
            }
            if (changes.formRef) {

                vm.form_ref = changes.formRef.currentValue;
            }
            if (changes.errorTypes) {
                vm.fieldRecords = changes.errorTypes.currentValue;
            }
        };

        /**
         * Controls the visiblity of the error message section
         * @returns {*}
         */
        vm.showErrorMessage = function () {
            if (!vm.form_ref) return false;
            //dev error messsaging
            if (angular.isUndefined(vm.fieldName)){
                console.warn("No field name for: " + vm.form_ref.$name);
                return false;
            }
            if (angular.isUndefined(vm.form_ref[vm.fieldName]))
            {
                console.warn("lookup undefined " + vm.form_ref.$name + "." + vm.fieldName);
                return false;
            } 
            return ((vm.showError() && vm.form_ref[vm.fieldName].$invalid) || (vm.form_ref[vm.fieldName].$touched && vm.form_ref[vm.fieldName].$invalid));
        }
        //errMessageCtrl.field_ref[errMessageCtrl.fieldName]
    }
})();