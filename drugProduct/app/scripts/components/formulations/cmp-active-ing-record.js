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
                htIndxList:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                updateErrorSummary:'&',
                isFocus: '<',
                cancelFocus: '&'
            }

        });
    activeIngRecCtrl.$inject = ['DossierLists', '$scope','$translate', 'OTHER','YES','NO', 'ENGLISH', 'FRENCH'];
    function activeIngRecCtrl(DossierLists, $scope, $translate,OTHER,YES,NO,ENGLISH,FRENCH) {

        var vm = this;
        vm.ingRoleList = DossierLists.getIngRoleList();
        vm.nanoMaterialList = DossierLists.getNanoMaterials();
        vm.yesNoList = DossierLists.getYesNoList();
        vm.calAsBaseYesNoList = DossierLists.getCalAsBaseYesNoList();
        vm.activeList = DossierLists.getActiveList();
        vm.unitsList=DossierLists.getUnitsList();
        vm.strengthList = DossierLists.getStrengthList();
        vm.perList = DossierLists.getPerList();
        vm.presentationList = DossierLists.getUnitsPresentationList();
        vm.measureList = DossierLists.getUnitsMeasureList();
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.alerts = [false, false, false, false, false, false]; //for help boxes
        vm.numberMinError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "TYPE_MIN"},
            {type: "number", displayAlias: "TYPE_NUMBER"}
        ];
        vm.numberMinLowerError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN_LOWER"},
            {type: "number", displayAlias: "TYPE_NUMBER"}
        ];
        vm.alias={
            "strength_data2": {
                "type": "min",
                "errorType": "MSG_ERR_INVALID_NUM_MIN_LOWER"
            }
        };

        vm.ingModel = {
            autoIngred: NO,
            ingRole: "",
            ingId: "",
            variant: "",
            purpose: "",
            ingLabel: "",
            proprietaryAttestation: {
            	attested: 'N',
            	info:""},
            cas: "",
            standard: "",
            strength: {operator: "",
                data1: null,
                data2: null },
            units: "",
            unitsHtml: "",
            otherUnits:"",
            per: "",
            perPresentationValue: 1,
            perMeasureValue: null,
            perPresUnits: "",
            perPresOtherUnits:"",
            perMeasUnits: "",
            perMeasUnitsHtml: "",
            perMeasOtherUnits:"",
            isNano: "",
            nanoMaterial:"",
            nanoMaterialOther: "",
            calcAsBase: "",
            humanAnimalSourced: "",
            focusOnIngRole: false
        };

        vm.strengthData1Title="";

        vm.exclusions={
        };
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.focusSummary=0; //messaging to focus on the active ingredient summary

        vm.$onInit = function () {
            vm.showSummary=false;
            vm.ingModel.focusOnIngRole = vm.isFocus;
            vm.backup = angular.copy(vm.ingModel);
            _setIdNames();
           // vm.summaryName="cmp-active-ing-record_"+(vm.recordIndex);
            vm.activeList = vm.translateLabels(DossierLists.getActiveList());
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
            if(!vm.activeList || vm.activeList.length <= 0){
                vm.activeList = vm.translateLabels(DossierLists.getActiveList());
            }
        };

        vm.translateLabels = function (jsonObj) {
            var result = [];
            if (!jsonObj) { return result; }

            for (var i = 0; i < jsonObj.length; i++) {
                jsonObj[i].label = jsonObj[i][$translate.proposedLanguage() || $translate.use()];
                result.push(jsonObj[i]);
            }
            return result;
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

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isRoleChosen = function () {
            return (vm.ingModel.ingRole === 'MED' || vm.ingModel.ingRole === 'NONMED');
        };
        
        vm.isNMIProprietaryInfoChecked = function () {
			return vm.ingModel.proprietaryAttestation.attested ==='Y';
        };

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isMedIng = function () {
            return (vm.ingModel.ingRole === 'MED');
        };

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isPerPresentation = function () {
            return (typeof vm.ingModel.per != "undefined" && vm.ingModel.per.id === 'UP');
        };

        /**
         * Fires on selection OR when the value has changed
         */
        vm.isPerMeasure = function () {
            return (typeof vm.ingModel.per != "undefined" && vm.ingModel.per.id === 'UM');
        };

        /**
         * check update when the value has changed
         */
        vm.isStrengthSet = function () {
            var isSet = false;
            if (vm.ingModel.strength != null
            	&& vm.ingModel.strength.operator != null
            	&& vm.ingModel.strength.operator.id !== undefined
                && vm.ingModel.strength.operator.id !== "") {
                isSet = true;
                if (vm.ingModel.strength.operator.id === "RA")
                {
                    vm.strengthData1Title = "RANGE_LOWER_LIMIT";
                } else {
                    vm.strengthData1Title = "VALUE";
                }
                vm.strengthData1Id = "strength_" + vm.strengthData1Title + "_" + $scope.$id;
            }
            return isSet;
        };

        /**
         * check update when the value has changed
         */
        vm.isRange = function () {
            return (vm.ingModel.strength != null 
            	&& vm.ingModel.strength.operator != null
            	&& vm.ingModel.strength.operator.id === "RA");
        };

        /**
         * Update when the value has changed
         */
        vm.isNanoMaterial = function () {
            return (vm.ingModel.isNano === YES);
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
                window.location.hash = '#errors-summary-ingRecCtrl.activeIngForm';
            }
        };

        vm.makeFocused=function(){
            vm.focusSummary=vm.focusSummary+1;
        };

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
        vm.isUnitsOtherDetail = function () {

            if (!vm.ingModel || !vm.ingModel.units) return false;
            if ((vm.ingModel.units.id === OTHER)) {
                return vm.ingModel.otherUnits == '';
            } else {
                vm.ingModel.otherUnits = "";
                return false;
            }
        };

        /**
         * @ngDoc determines if per units Other should be shown
         * @returns {boolean}
         */
        vm.isPerPresUnitsOther = function () {

            if (!vm.ingModel || !vm.ingModel.perPresUnits) return false;
            if ((vm.ingModel.perPresUnits.id === OTHER)) {
                return true;
            } else {
                vm.ingModel.perPresOtherUnits = "";
                return false;
            }
        };

        /**
         * @ngDoc determines if per units Other should be shown
         * @returns {boolean}
         */
        vm.isPerMeasUnitsOther = function () {

            if (!vm.ingModel || !vm.ingModel.perMeasUnits) return false;
            if ((vm.ingModel.perMeasUnits.id === OTHER)) {
                return true;
            } else {
                vm.ingModel.perMeasOtherUnits = "";
                return false;
            }
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
            return(vm.lang === FRENCH);
        };
        vm.unitsBlur = function() {
            if(! vm.ingModel.units.id ) {
                vm.ingModel.unitsHtml = "";
                vm.ingModel.otherUnits = "";
            }
        }
        vm.unitsChange = function(e) {
            console.log(e);
            vm.ingModel.units = {};
            vm.ingModel.unitsHtml = e;
            for(var i = 0; i < vm.unitsList.length; i++) {
                var option =vm.unitsList[i];
                if(option[vm.lang] === vm.ingModel.unitsHtml) {
                    vm.ingModel.units = option;
                    break;
                }
            }
            $scope.$apply();
        }
        vm.perMeasUnitsBlur = function() {
            if(!  vm.ingModel.perMeasUnits.id ){
                vm.ingModel.perMeasUnitsHtml = "";
                vm.ingModel.perPresOtherUnits = "";
            }
        }
        vm.perMeasUnitsChange = function(e) {
            vm.ingModel.perMeasUnits = {};
            vm.ingModel.perMeasUnitsHtml = e;
            for(var i = 0; i < vm.measureList.length; i++) {
                var option =vm.measureList[i];
                if(option[vm.lang] === vm.ingModel.perMeasUnitsHtml) {
                    vm.ingModel.perMeasUnits = option;
                    break;
                }
            }
            $scope.$apply();
        }

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
            vm.ingredRoleId="ing_role"+scopeId;
            vm.ingredName="ing_name"+scopeId;
            vm.nIngredName="n_ing_name"+scopeId;
            
            vm.proprietaryAttestationCheckBox="proprietary_attestation_checkbox"+scopeId;
            vm.proprietaryAttestationInfo="nmi_proprietary_info_lbl"+scopeId;
            
            vm.casId="cas"+scopeId;
            vm.standardId="standard"+scopeId;
            vm.strengthId="strength_operator"+scopeId;
            vm.strengthData1Id=scopeId;
            vm.strengthData2Id="strength_data2"+scopeId;
            vm.unitsId="units"+scopeId;
            vm.otherUnitsId="other_units"+scopeId;
            vm.perMeasureUnitId="unit_measure"+scopeId;
            vm.perPresOtherUnitId="other_unit_presentation"+scopeId;
            vm.perMeasureOtherUnitId="other_unit_measure"+scopeId;
            vm.perId="per_strength"+scopeId;
            vm.perPreValueId="per_value"+scopeId;
            vm.perMeaValueId="per_value"+scopeId;
            vm.presentationId="unit_presentation"+scopeId;
            vm.isNanoMaterialId="is_nano_material"+scopeId;
            vm.nanoId="nano_material"+scopeId;
            vm.nanoOtherId="nano_material_other"+scopeId;
            vm.asBaseId="calculated_as_base"+scopeId;
            vm.animalHumanSrcId="animal_human_sourced"+scopeId;
            vm.purposeId="purpose"+scopeId;
            vm.dr9c1Ref = 'dr9c1_ref' + scopeId;
            vm.dr9c2Ref = 'dr9c2_ref' + scopeId;
            vm.dr9c3Ref = 'dr9c3_ref' + scopeId;
            vm.dr9c4Ref = 'dr9c4_ref' + scopeId;
            vm.dr9c5Ref = 'dr9c5_ref' + scopeId;
            vm.dr9c6Ref = 'dr9c6_ref' + scopeId;
            vm.dr9c7Ref = 'dr9c7_ref' + scopeId;
            vm.dr9c8Ref = 'dr9c8_ref' + scopeId;
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
