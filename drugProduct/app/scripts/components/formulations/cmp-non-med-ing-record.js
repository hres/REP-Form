/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule', [
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
        .module('nonMedIngRecordModule')
        .component('cmpNonMedIngRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-non-med-ing-record.html',
            controllerAs: 'nIngRecCtrl',
            controller: nonMedIngRecCtrl,
            bindings: {
                deleteBtn: '<',
                record: '<',
                showErrors: '&',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&',
                recordIndex:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }

        });
    nonMedIngRecCtrl.$inject = ['DossierLists', '$scope','$translate','OTHER','YES'];
    function nonMedIngRecCtrl(DossierLists, $scope,$translate, OTHER, YES) {

        var vm = this;
        vm.nanoMaterialList = DossierLists.getNanoMaterials(); //nanoMaterial list
        vm.yesNoList = DossierLists.getYesNoList(); //yes-no lists
        vm.unitsList=DossierLists.getUnitsList();
       // vm.savePressed=false;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberMinError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN0"},
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];
        
        vm.ingModel = {
            varId:"",
            ingName: "",
            cas: "",
            standard: "",
            strength: null,
            units: "",
            otherUnits:"",
            per: "",
            nanoMaterial: "",
            nanoMaterialOther: "",
            calcAsBase: "",
            humanAnimalSourced: ""
        };

        vm.exclusions={
        };
        vm.alias={};
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object

        vm.$onInit = function () {
            vm.savePressed=false;
            vm.backup = angular.copy(vm.ingModel);
            _setIdNames();
            vm.summaryName="cmp-non-med-ing-record_"+(vm.recordIndex);
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.ingModel = angular.copy(changes.record.currentValue);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
            if(changes.recordIndex){

                vm.summaryName="cmp-non-med-ing-record_"+(vm.recordIndex.currentValue);
            }

        };

        vm.saveIng = function () {
            if(vm.nonMedIngForm.$valid) {

                if (vm.record) {
                    vm.onUpdate({ing: vm.ingModel});
                } else {
                    vm.onAddIng({ing: vm.ingModel});
                }
                vm.nonMedIngForm.$setPristine();
                vm.showSummary=false;
                vm.updateErrorSummaryState();
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
            vm.ingModel = angular.copy(vm.backup);
            vm.nonMedIngForm.$setPristine();
            vm.updateErrorSummaryState();
            vm.onCancel();
        };

        vm.delete = function () {
            if (vm.record) {
                //  console.log('product details delete product');
                vm.onDelete();
            } else {

            }
        };

        /**
         * Checks if the model is animal or human sourced
         * Used to set the state of the info box
         * @returns {boolean}
         */
        vm.isAnimalHumanSourced=function(){
            if(!vm.ingModel){ //should never happen
                return false;
            }
            return(vm.ingModel.humanAnimalSourced===YES);
        };

        vm.copy = function () {
            var ingredientCopy = angular.copy( vm.ingModel);
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
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

        $scope.$watch('nIngRecCtrl.nonMedIngForm.$dirty', function () {
            vm.isDetailValid({state: !vm.nonMedIngForm.$dirty});
        }, true);

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.variantId="variant_name" + scopeId;
            vm.nmiFormId="nmiRecordForm" + scopeId;
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



    }

})();
