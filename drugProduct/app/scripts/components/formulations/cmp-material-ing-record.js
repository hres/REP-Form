/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule',
            [
                'dossierDataLists',
                'errorSummaryModule',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule')
        .component('cmpMaterialIngRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-material-ing-record.html',
            controllerAs: 'mirCtrl',
            controller: materialIngRecCtrl,
            bindings: {
                deleteBtn: '<',
                record: '<',
                showErrors: '&',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&',
                recordIndex:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }

        });
    materialIngRecCtrl.$inject = ['DossierLists','$scope'];
    function materialIngRecCtrl(DossierLists, $scope) {

        var vm = this;
        vm.yesNoList = DossierLists.getYesNoList();

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.focusSummary=0;

        vm.$onInit = function () {
            vm.mirModel = {};
            vm.showSummary=false;
            vm.summaryName="cmp-material-ing-record_"+(vm.recordIndex);
            _setIdNames();
            if (vm.record) {
                vm.mirModel = vm.record;
            }
            vm.backup = angular.copy(vm.mirModel);
        };

        vm.$onChanges=function(changes){
            if(changes.showErrorSummary){
                console.log("active ingredient changes to show Error Summary")
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
        };


        vm.showError = function (ctrl) {

            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched)||(vm.showSummary && ctrl.$invalid));

        };

        vm.save = function () {
            if(vm.materialIngRecordForm.$valid) {
                if (vm.record) {
                    // console.log('product details update product');
                    vm.onUpdate({ing: vm.mirModel});
                    vm.materialIngRecordForm.$setPristine();
                } else {
                    //  console.log('product details add product');
                    vm.onAddNew({ing: vm.mirModel});
                }
                vm.materialIngRecordForm.$setPristine();
                vm.showSummary=false;
            }else{
                vm.showSummary=true;
                vm.makeFocused();
                vm.updateErrorSummaryState();
            }

        };

        vm.makeFocused=function(){
            vm.focusSummary=vm.focusSummary+1;
        }

        vm.discardChanges = function () {
            vm.mirModel = angular.copy(vm.backup);
            vm.materialIngRecordForm.$setPristine();
            vm.onCancel();
        };

        vm.delete = function () {
            if (vm.record) {
                //  console.log('product details delete product');
                vm.onDelete();
            }
        };

        $scope.$watch('mirCtrl.materialIngRecordForm.$dirty', function () {
            vm.isDetailValid({state: !vm.materialIngRecordForm.$dirty});
        }, true);

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.materialFormId="materialRecordForm" + scopeId;
            vm.nameId="material_name" + scopeId;
            vm.casId="cas_num"+ scopeId;
            vm.standardId="standard"+ scopeId;
            vm.inFinalId="in_final_container"+ scopeId;
        }

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

    }
})();
