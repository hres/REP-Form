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
        vm.strengthList = DossierLists.getStrengthList();
        vm.perList = DossierLists.getPerList();
        vm.presentationList = DossierLists.getDosageFormList();
       // vm.savePressed=false;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberMinError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN0"},
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];
        vm.numberMinLowerError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN_LOWER"},
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];
        
        vm.ingModel = {
            varId:"",
            ingName: "",
            cas: "",
            standard: "",
            strength: {operator: "",
                       data1: null,
                       data2: null },
            units: "",
            otherUnits:"",
            per: "",
            unitsPresentation: "",
            perMeasureUnits: "",
            perMeasureOtherUnits:"",
            calcAsBase: "",
            isNano: "",
            nanoMaterial: "",
            nanoMaterialOther: "",
            humanAnimalSourced: ""
        };

        vm.strengthData1Title="";

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
        };

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
         * @param ctrl - an instance of the control to check
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
            vm.strengthData1Id= scopeId;
            vm.strengthData2Id="strength_data2"+scopeId;
            vm.unitsId="units"+scopeId;
            vm.otherUnitsId="other_units"+scopeId;
            vm.perMeasureUnitId="unit_measure"+scopeId;
            vm.perMeasureOtherUnitId="other_unit_measure"+scopeId;
            vm.perId="per_strength"+scopeId;
            vm.presentationId="unit_presentation"+scopeId;
            vm.isNanoMaterialId="is_nano_material"+scopeId;
            vm.nanoId="nano_material"+scopeId;
            vm.nanoOtherId="nano_material_other"+scopeId;
            vm.asBaseId="calculated_as_base"+scopeId;
            vm.animalHumanSrcId="animal_human_sourced"+scopeId;
        }

        /**
         * Fires on selection OR when the value has changed
         */
        vm.strengthSelectionUpdated = function () {

            if(vm.ingModel.strength.operator.id !== ""){
                switch (vm.ingModel.strength.operator.id)
                {
                    case "EQ":
                        vm.strengthData1Title = "EQUALS";
                        break;
                    case "NGT":
                        vm.strengthData1Title = "NOT_GREAT_THAN";
                        break;
                    case "NLT":
                        vm.strengthData1Title = "NOT_LESS_THAN";
                        break;
                    case "RA":
                        vm.strengthData1Title = "RANGE_LOWER_LIMIT";
                        break;
                }
            }
        };

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isPerPresentation = function () {
            return (vm.ingModel.per.id === 'UP');
        };

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isPerMeasure = function () {
            return (vm.ingModel.per.id === 'UM');
        };

        /**
         * check update when the value has changed
         */
        vm.isStrengthSet = function () {
            var isSet = false;
            if (vm.ingModel.strength.operator.id !== undefined
                && vm.ingModel.strength.operator.id !== "") {
                isSet = true;
                switch (vm.ingModel.strength.operator.id)
                {
                    case "EQ":
                        vm.strengthData1Title = "EQUALS";
                        break;
                    case "NGT":
                        vm.strengthData1Title = "NOT_GREAT_THAN";
                        break;
                    case "NLT":
                        vm.strengthData1Title = "NOT_LESS_THAN";
                        break;
                    case "RA":
                        vm.strengthData1Title = "RANGE_LOWER_LIMIT";
                        break;
                }
                vm.strengthData1Id = "strength_" + vm.strengthData1Title + "_" + $scope.$id;
            }
            return isSet;
        };

        /**
         * @ngDoc determines if units Other should be shown
         * @returns {boolean}
         */
        vm.isMeasureUnitsOther = function () {

            if (!vm.ingModel || !vm.ingModel.perMeasureUnits) return false;
            if ((vm.ingModel.perMeasureUnits.id === OTHER)) {
                return true;
            } else {
                vm.ingModel.perMeasureOtherUnits = "";
                return false;
            }
        };

        /**
         * check update when the value has changed
         */
        vm.isRange = function () {
            return (vm.ingModel.strength.operator.id === "RA");
        };

        /**
         * Update when the value has changed
         */
        vm.isNanoMaterial = function () {
            return (vm.ingModel.isNano === YES);
        };
        vm.unitsChange = function() {
            var found = false;
            for(var i = 0; i < vm.unitsList.length; i++) {
                var option =vm.unitsList[i];
                if(option[vm.lang] === vm.ingModel.unitsHtml) {
                    vm.ingModel.units = option;
                    found = true;
                    break;
                }
            }
            if( ! found ){
                for(var i = 0; i < vm.unitsList.length; i++) {
                    var option =vm.unitList[i];
                    if(option['id'] === vm.ingModel.units['id']) {
                        vm.ingModel.unitsHtml = option[vm.lang];
                        break;
                    }
                }
            }
        }
        vm.perMeasUnitsChange = function() {
            var found = false;
            for(var i = 0; i < vm.unitsList.length; i++) {
                var option =vm.unitsList[i];
                if(option[vm.lang] === vm.ingModel.perMeasUnitsHtml) {
                    vm.ingModel.perMeasUnits = option;
                    found = true;
                    break;
                }
            }
            if( ! found ){
                for(var i = 0; i < vm.unitsList.length; i++) {
                    var option =vm.unitsList[i];
                    if(option['id'] === vm.ingModel.perMeasUnits['id']) {
                        vm.ingModel.perMeasUnitsHtml = option[vm.lang];
                        break;
                    }
                }
            }
        }

    }

})();
