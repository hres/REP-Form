/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', [
            'dossierDataLists',
            'hpfbConstants',
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
                htIndxList:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                isFocus: '<',
                cancelFocus: '&'
            }

        });
    containerTypeRecCtrl.$inject=['DossierLists', '$scope', '$translate', 'FRENCH'];
    function containerTypeRecCtrl(DossierLists, $scope, $translate, FRENCH) {

        var vm = this;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.selfLifeUnitsList = DossierLists.getShelfLifeUnitsList();
        vm.ctModel = { //TODO move to service
            "containerType": "",
            "packageSize": "",
            "shelfLifeUnit": undefined,
            "shelfLifeNumber": undefined,
            "tempMin": undefined,
            "tempMax": undefined,
            "otherShelflifeConsider": ""
        };
        vm.backup = angular.copy(vm.ctModel);

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberInvalidMinMax=[
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN"},
            {type: "number", displayAlias: "TYPE_NUMBER"},
            {type: "max", displayAlias: "MSG_ERR_INVALID_NUM_MAX"}
        ];
        vm.alias={
            "min_temp": {
                "type": "min",
                "errorType": "MSG_ERR_INVALID_NUM_MIN"
            },
            "max_temp": {
                "type": "min",
                "errorType": "MSG_ERR_INVALID_NUM_MIN"
            }

        };

        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the error summary object
        vm.focusSummary=0;
        vm.alerts = [false, false, false]; //for help boxes
        
        vm.$onInit = function () {
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.ctModel = angular.copy(changes.record.currentValue);
                vm.ctModel.shelfLifeUnit = angular.copy(changes.record.currentValue.shelfLifeUnit);
                vm.ctModel.shelfLifeNumber = changes.record.currentValue.shelfLifeNumber ? Number(changes.record.currentValue.shelfLifeNumber) : undefined;
                vm.ctModel.tempMin = changes.record.currentValue.tempMin ? Number(changes.record.currentValue.tempMin) : undefined;
                vm.ctModel.tempMax = changes.record.currentValue.tempMax ? Number(changes.record.currentValue.tempMax) : undefined;
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
                window.location.hash = '#errors-summary-ctrCtrl.containerTypeForm';
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
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid &&  vm.showSummary) /* TODO add showErrors||(isInvalid && vm.showErrors())*/)
        };

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };

        /**
         * Determines if form is in french
         * @returns {boolean}
         */
        vm.isFrench = function(){
            return(vm.lang===FRENCH);
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
            vm.shelfLifeUnitId="shelf_life_unit" +scopeId;
            vm.shelfLifeNumberId="shelf_life_number" +scopeId;
            vm.tempMinId="min_temp" +scopeId;
            vm.tempMaxId="max_temp" +scopeId;
            vm.otherShelflifeConsiderId="other_shelf_life_considerations" + scopeId;
            vm.dr9e1Ref= 'dr9e1_ref' + scopeId;
            vm.dr9e2Ref= 'dr9e2_ref' + scopeId;
            vm.dr9e3Ref= 'dr9e3_ref' + scopeId;
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
