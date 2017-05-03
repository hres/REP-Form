/**
 * Created by Abdessamad on 7/4/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressRole', [])
})();

(function () {
    'use strict';

    angular
        .module('addressRole')
        .component('cmpAddressRole', {
            templateUrl: 'app/scripts/components/addressRole/tpl-address-role.html',
            controller: addressRoleCtrl,
            controllerAs: 'ar',
            bindings: {
                //formName: '<',
                record: '<',
                onUpdate: '&',
                showErrors: '&',
                isContact: '<',
                alreadySelected: '&',
                isAmend: '<',
                legendText: '@',
                importerUpdated: '&',
                updateErrorSummary: '&'

            }
        });

    addressRoleCtrl.$inject = ['$scope'];
    function addressRoleCtrl($scope) {

        var vm = this;
        vm.isReq = true;
        vm.isSelected = ""; //checkbox causes issues. Store in text
        vm.isEditable = true;
        vm.roleModel = {
            manufacturer: false,
            mailing: false,
            billing: false,
            importer: false,
            repPrimary: false,
            repSecondary: false
        };
        vm.$onInit = function () {
            //after init

            if (vm.record) {
                //doesn't copy as this is a dumb component
                vm.roleModel = vm.record.addressRole;
                vm.oneSelected();
            }
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.roleModel = (changes.record.currentValue.addressRole);
                vm.oneSelected();
                checkAllControlsForDuplicates();

            }
            if (changes.isAmend) {
                vm.isEditable = changes.isAmend.currentValue;
            }
        };
        /**
         * Checks all the controls and updates the error state
         *
         */
        function checkAllControlsForDuplicates() {
            if (!vm.roleForm) return;
            vm.checkForDuplicates(vm.roleForm.mailing, 'mailing');
            vm.checkForDuplicates(vm.roleForm.billing, 'billing');
            vm.checkForDuplicates(vm.roleForm.importer, 'importer');
            vm.checkForDuplicates(vm.roleForm.repPrimary, 'repPrimary');
            vm.checkForDuplicates(vm.roleForm.repSecondary, 'repSecondary');
            vm.checkForDuplicates(vm.roleForm.manufacturer, 'manufacturer');
            vm.updateErrorSummary();
        }


        vm.updateImporterState = function (ctrl, toCheck) {
            vm.oneSelected(ctrl, toCheck);
            vm.importerUpdated({state: vm.roleModel.importer})
        };

        /**
         *
         * @param ctrl the form control
         * @param toCheck the json name of the property to check
         * @returns {boolean}
         */
        vm.oneSelected = function (ctrl, toCheck) {
            var obj = vm.roleModel;
            vm.checkForDuplicates(ctrl, toCheck);
            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrValue === true) {
                    vm.isSelected = true;
                    vm.updateErrorSummary();
                    return true;
                }
            }
            vm.isSelected = "";
            vm.updateErrorSummary();
            return false
        };

        vm.checkForDuplicates = function (ctrl, toCheck) {
            if (ctrl) {
                var isDup = isDuplicateSelected(toCheck);
                ctrl.$setValidity("duplicateRole", !isDup);
            }
        };

        function isDuplicateSelected(toCheck) {
            var obj = vm.roleModel;
            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrName == toCheck) {
                    if (!attrValue) return false;
                    return (vm.alreadySelected({roleName: attrName}));
                }
            }
            return false
        }

        vm.showError = function (ctrl) {
            if ((ctrl.$invalid) || (vm.showErrors() && ctrl.$invalid)) {
                return true
            }
            return false
        }

        /**
         * Specical show error function as relying on a hiddend field
         * @returns {boolean}
         */
        vm.showErrorMissing = function () {

            if ((vm.roleForm.$touched && !vm.isSelected) || (vm.showErrors() && !vm.isSelected)) {
                return true
            }
            return false
        };

    }//end controller



})();