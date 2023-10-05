/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('otherTissuesModule', ['errorMessageModule', 'drugProductService'])
})();


(function () {
    'use strict';

    angular
        .module('otherTissuesModule')
        .component('cmpOtherTissuesSystem', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-other-tissue.html',
            controllerAs: 'sysCtrl',
            controller: otherTissueSystemController,
            bindings: {
                record: '<',
                isFileLoaded: '<',
                updateRecord: '<',
                otherUpdate: '&',
                concatUpdate: '&',
                showErrors:'&',
                addBtn: '<'
            }

        });
    otherTissueSystemController.$inject=['$scope', 'DrugProductService']
    function otherTissueSystemController($scope, DrugProductService) {
        var vm = this;
        vm.model = {};
        vm.showError = false;
        vm.isSelected = "";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.$onInit = function () {
            vm.drugProductService = new DrugProductService();
            vm.isSelected = vm.isFileLoaded == true && vm.drugProductService.checkSelectedValues(vm.model, 'Fluids') ? "selected" : "";
            _setIdNames();
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = (changes.record.currentValue);
                vm.updateErrorState();
            }
            if (changes.addBtn && changes.addBtn.currentValue > 1){
                vm.isSelected = 'selected';
            }
            if(changes.updateRecord){
                if (changes.updateRecord.currentValue > 0) {
                    vm.showError = true;
                }
                vm.updateErrorState();
            }
        };

        vm.detailsChanged = function (alias, value) {

            vm.concatUpdate({'alias': alias, 'value': value});
            if(value) {
                vm.showError = false;
            }
            vm.updateErrorState();
        };


        vm.updateErrorState = function () {
            var keys = Object.keys(vm.model);
            for (var i = 0; i < keys.length; i++) {
                var val = vm.model[keys[i]];
                if (val) {
                        vm.isSelected = "selected";
                        return;
                    }
             }
            vm.isSelected = "";
        };

        vm.showErrorMessage = function(isInvalid){
        	if (isInvalid && vm.showError) {
                return true;
            }
            return false;
        };

        vm.otherChanged = function () {
            var state = false;
            if (vm.model.otherFluids) {
                state = true;
            } else {
                state = false;
                vm.model.otherDetails = "";
            }
            vm.otherUpdate();
            // vm.updateErrorState();
            return state;
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.roleMissingId = "roleMissing" + scopeId;
            vm.systemRoleId = "other_legend" + scopeId;
            vm.otherDetailsId = "othertiss_details" + scopeId;
        }

    }
})();
