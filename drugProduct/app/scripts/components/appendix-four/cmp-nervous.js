/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('nervousModule', ['errorMessageModule', 'drugProductService'])
})();


(function () {
    'use strict';

    angular
        .module('nervousModule')
        .component('cmpNervousSystem', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-nervous.html',
            controllerAs: 'sysCtrl',
            controller: nervousSystemController,
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

    nervousSystemController.$inject=['$scope', 'DrugProductService']
    function nervousSystemController($scope, DrugProductService) {
        var vm = this;
        vm.model = {};
        vm.showError = false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function () {
            vm.drugProductService = new DrugProductService();
            vm.isSelected = vm.isFileLoaded == true && vm.drugProductService.checkSelectedValues(vm.model, 'Nervous') ? "selected" : "";
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
            if (vm.model.otherNervous) {
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
            vm.systemRoleId = "nervous_legend" + scopeId;
            vm.otherDetailsId = "nervous_details" + scopeId;
        }
    }
})();
