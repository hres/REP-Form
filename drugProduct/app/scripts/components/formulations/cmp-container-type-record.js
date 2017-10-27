/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', [
            'errorSummaryModule',
            'errorMessageModule'
        ])
})();

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule')
        .component('cmpContainerTypeRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-container-type-record.html',
            controllerAs: 'ctrCtrl',
            controller: containerTypeRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                isDetailValid: '&',
                recordIndex:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }

        });
    containerTypeRecCtrl.$inject=['$scope'];
    function containerTypeRecCtrl($scope) {

        var vm = this;

        vm.ctModel = { //TODO move to service
            "containerType": "",
            "packageSize": "",
            "shelfLifeYears": undefined,
            "shelfLifeMonths": undefined,
            "tempMin": undefined,
            "tempMax": undefined
        };
        vm.backup = angular.copy(vm.ctModel);

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberError = [
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];
        vm.numberInvalidMinMax=[
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN"},
            {type: "max", displayAlias: "MSG_ERR_INVALID_NUM_MAX"}
        ];

        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the error summary object
        vm.focusSummary=0;
        
        vm.$onInit = function () {
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.ctModel = angular.copy(changes.record.currentValue);
                vm.ctModel.shelfLifeYears = Number(changes.record.currentValue.shelfLifeYears);
                vm.ctModel.shelfLifeMonths = Number(changes.record.currentValue.shelfLifeMonths);
                vm.ctModel.tempMin = Number(changes.record.currentValue.tempMin);
                vm.ctModel.tempMax = Number(changes.record.currentValue.tempMax);
                vm.backup = angular.copy(vm.ctModel);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }

        };

        vm.save = function () {
            if(vm.containerTypeForm.$valid) {
                if (vm.record) {
                    // console.log('product details update product');
                    vm.onUpdate({cType: vm.ctModel});

                } else {
                    //  console.log('product details add product');
                    vm.onAddIng({cType: vm.ctModel});
                }
                vm.containerTypeForm.$setPristine();
                vm.showSummary=false;
                vm.updateErrorSummaryState();
            }else{
                vm.showSummary=true;
                vm.makeFocused();
                vm.updateErrorSummaryState();
            }

        };

        vm.discardChanges = function(){
            vm.ctModel = angular.copy(vm.backup);
            vm.containerTypeForm.$setPristine();
            vm.onCancel();
        };

        vm.delete = function(){
            if (vm.record) {
                //  console.log('product details delete product');
                vm.onDelete();
            }

        };
        /**
         * Manages visibility of error messages for an indvidual control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        vm.showError=function(ctrl){

            if(!ctrl){
                return false
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid &&  vm.showSummary) /* TODO add showErrors||(isInvalid && vm.showErrors())*/)
        };

        $scope.$watch('ctrCtrl.containerTypeForm.$dirty', function () {
            vm.isDetailValid({state: !vm.containerTypeForm.$dirty});
        }, true);
        $scope.$watch('ctrCtrl.containerTypeForm.$error', function () {
            vm.updateErrorSummaryState();
        }, true);
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.containerFormId="containerRecordForm" + scopeId;
            vm.containerTypeId="container_type"+ scopeId;
            vm.packageSizeId="package_size" +scopeId;
            vm.shelfLifeYearsId="shelf_life_years" +scopeId;
            vm.shelfLifeMonthsId="shelf_life_months" +scopeId;
            vm.tempMinId="min_temp" +scopeId;
            vm.tempMaxId="max_temp" +scopeId;
        }

        /**
         * Sends a signal to the error Summary component to set focus
         */
        vm.makeFocused=function(){
            vm.focusSummary=vm.focusSummary+1;
        }

        /**
         * Sends a signal to the error Summary to recalculate its state
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

    }

})();
