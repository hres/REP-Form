/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule', [
            'dossierDataLists',
            'hpfbConstants',
            'ui.select',
            'errorSummaryModule',
            'errorMessageModule'
        ])
})();

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule')
        .component('cmpActiveIngRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-active-ing-record.html',
            controllerAs: 'ingRecCtrl',
            controller: activeIngRecCtrl,
            bindings: {
               /* showErrors: '&',*/
                deleteBtn: '<',
                record: '<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&',
                recordIndex: '<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                updateErrorSummary:'&'
            }

        });
    activeIngRecCtrl.$inject = ['DossierLists', '$scope','$translate', 'OTHER','YES','NO'];
    function activeIngRecCtrl(DossierLists, $scope, $translate,OTHER,YES,NO) {

        var vm = this;
        vm.nanoMaterialList = DossierLists.getNanoMaterials();
        vm.yesNoList = DossierLists.getYesNoList();
        vm.activeList = DossierLists.getActiveList();
        vm.UnitsList=DossierLists.getUnitsList();
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberMinError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN0"},
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];

        vm.ingModel = {
            autoIngred: NO,
            ingId: "",
            ingLabel: "",
            cas: "",
            standard: "",
            strength: null,
            units: "",
            otherUnits:"",
            per: "",
            nanoMaterial:"",
            nanoMaterialOther: "",
            calcAsBase: "",
            humanAnimalSourced: ""
        };
        vm.exclusions={
        };
        vm.alias={};
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.focusSummary=0; //messaging to focus on the active ingredient summary

        vm.$onInit = function () {
            vm.showSummary=false;
            vm.backup = angular.copy(vm.ingModel);
            _setIdNames();
           // vm.summaryName="cmp-active-ing-record_"+(vm.recordIndex);
        };

        vm.$onChanges = function (changes) {

            //TODO: move init code to changes event where it belongs
            if (changes.record && changes.record.currentValue) {
                vm.ingModel = angular.copy(changes.record.currentValue);
                if (!vm.ingModel.ingId) {
                    vm.ingModel.autoIngred = NO;
                } else {
                    vm.ingModel.autoIngred = YES;
                }
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
            if(changes.recordIndex){

                vm.summaryName="cmp-active-ing-record_"+(vm.recordIndex.currentValue);
            }
        };

        /**
         * Checks if the model is animal or human sourced
         * Used to set the state of the info box
         * @returns {boolean}
         */
        vm.isAnimalHumanSourced=function(){
            if(!vm.ingModel){ //should never happend
                return false;
            }
            return(vm.ingModel.humanAnimalSourced===YES);
        };

       /* $scope.$watch('ingRecCtrl.newIngred', function () {
            if (vm.newIngred === true) {
                vm.ingModel.autoIngred = 'N';
                vm.ingModel.ingId = "";
            } else {
                vm.ingModel.autoIngred = 'Y';
            }
        }, true);*/

        /**
         * Fires on selection OR when the value has changed
         * A bit of overkill, but avoids using a watch and worksaround the case where autocomplete is considered
         * In the list but not selected.
         * @param item
         * @param model
         * @param label
         * @param event
         */
        vm.ingredSelectionUpdated = function (item, model, label, event) {

            //if no item this means fired from the change event

            if(!item){
                vm.ingModel.ingId="";
                vm.ingModel.autoIngred = NO;
            }else {
                vm.ingModel.ingId = item.id;
                vm.ingModel.autoIngred = YES;
            }
        };

        vm.saveIng = function () {
            if (vm.activeIngForm.$valid) {
                if (vm.record) {
                    vm.onUpdate({ing: vm.ingModel});
                } else {
                    vm.onAddIng({ing: vm.ingModel});
                }
                vm.activeIngForm.$setPristine();
                vm.showSummary=false;
                vm.updateErrorSummaryState();

            } else {
                vm.showSummary=true;
                vm.makeFocused();
                vm.updateErrorSummaryState();
            }
        };

        vm.makeFocused=function(){
            vm.focusSummary=vm.focusSummary+1;
        }

        vm.discardChanges = function () {
            vm.ingModel = angular.copy(vm.backup);
            vm.activeIngForm.$setPristine();
            vm.updateErrorSummaryState();
            vm.onCancel();
        };

        vm.delete = function () {
            if (vm.record) {
                vm.onDelete();
            }

        };

        vm.copy = function () {
            var ingredientCopy = angular.copy(vm.ingModel);
            vm.onAddIng({ing: ingredientCopy});
        };




        /**
         * Controls showing errors for a field
         * @param ctrl- an instance of the control to check
         * @returns {*}
         */
        vm.showError = function (ctrl) {
            if(!ctrl){
                return false
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid &&  vm.showSummary))
        };

        /**
         * Sets the state of the nanomaterial other field
         * @returns {boolean} true if other is the value
         */
        vm.isNanoOther = function () {

            if (vm.ingModel.nanoMaterial.id === DossierLists.getOtherValue()) {
                return true;
            } else {
                vm.ingModel.nanoMaterialOther = "";
                return false;
            }
        };

        /**
         * @ngDoc determines if units Other should be shown
         * @returns {boolean}
         */
        vm.isUnitsOther = function () {

            if (!vm.ingModel || !vm.ingModel.units) return false;
            if ((vm.ingModel.units.id === OTHER)) {
                return true;
            } else {
                vm.ingModel.otherUnits = "";
                return false;
            }
        };


        $scope.$watch('ingRecCtrl.activeIngForm.$dirty', function () {
            vm.isDetailValid({state: !vm.activeIngForm.$dirty});
        }, true);

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.activeFormId="activeRecordForm" + scopeId;
            vm.ingredName="ing_name"+scopeId;
            vm.casId="cas"+scopeId;
            vm.standardId="standard"+scopeId;
            vm.strengthId="strength"+scopeId;
            vm.unitsId="units"+scopeId;
            vm.otherUnitsId="other_units"+scopeId;
            vm.perId="per"+scopeId;
            vm.nanoId="nano_material"+scopeId;
            vm.nanoOtherId="nano_material_other"+scopeId;
            vm.asBaseId="calculated_as_base"+scopeId;
            vm.animalHumanSrcId="animal_human_sourced"+scopeId;
        }

        /**
         * Used as messaging to get the error summary to update itself
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

        $scope.$watch('ingRecCtrl.activeIngForm.$error', function () {
            vm.updateErrorSummaryState();
            vm.updateErrorSummary();
        }, true);
    }

})();
