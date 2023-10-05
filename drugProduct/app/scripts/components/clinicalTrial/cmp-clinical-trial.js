/**
 * cmp-clinical-trail.js
 * Created by steve zhao on 9/10/2019.
 */

(function () {
    'use strict';
    angular
        .module('clinicalTrial', ['numberFormat',
            'filterLists','hpfbConstants','errorSummaryModule','countryListModule','errorMessageModule'])
})();

(function () {
    'use strict';
    angular
        .module('clinicalTrial')
        .component('cmpClinicalTrial', {
            templateUrl: 'app/scripts/components/clinicalTrial/tpl-clinical-trial.html',
            controller: ctaCtrl,
            controllerAs: 'ctaCtrl',
            bindings: {
                record: '<',
                onUpdate: '&',
                updateErrorSummary: '&',
                isFileLoaded: '<',
                showErrors: '<',
                htIndxList: '<'
            }
        });

    ctaCtrl.$inject=['$scope', '$translate'];

    function ctaCtrl($scope, $translate) {
        var vm = this;
        vm.compositionKeys = ['fmpp', 'mpp', 'fmap', 'map'];
        vm.phaseKeys = ['phase1Bio', 'phase1Study', 'phase1Other', 'phase2', 'phase3', 'phaseOther'];
        vm.oneComposSelected = "";
        vm.onePhaseSelected = "";
        vm.updateSummary=0; //triggers and error summary update
        vm.errorMsg = "";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.oneComposError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.onePhaseError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function () {
            ///do init
            _setIdNames();
        };
        vm.$onChanges = function (changes) {
            if (changes.userType) {
                vm.formType = changes.userType.currentValue;
            }
            if (changes.record) {
                vm.ctaModel = changes.record.currentValue;
            }
            if (changes.isIncomplete) {
                vm.setAsIncomplete = changes.isIncomplete.currentValue;
            }
            if (changes.configureIdField) {
                _setConfigItems(changes.configureIdField.currentValue);
            }
            if(changes.showErrors){

                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };

        vm.isPhaseOther = function(){
            if(!vm.ctaModel){
                return false;
            }
            return vm.ctaModel.phase.phaseOther;
        };

        vm.isCompositionSelected = function () {
            var composSelected = false;
            for (var i = 0; i < vm.compositionKeys.length; i++) {
                if (vm.ctaModel.composition[vm.compositionKeys[i]] === true) {
                    composSelected = true;
                    break;
                }
            }
            vm.oneComposSelected = "";

            if (composSelected) {
                vm.oneComposSelected = true;
                return true;
            } else {
                vm.oneComposSelected = false;
                return false;
            }

        };

        vm.isPhaseSelected = function () {
            var phaseSelected = false;
            for (var i = 0; i < vm.phaseKeys.length; i++) {
                if (vm.ctaModel.phase[vm.phaseKeys[i]] === true) {
                    phaseSelected = true;
                    break;
                }
            }
            vm.onePhaseSelected = "";

            if (phaseSelected) {
                vm.onePhaseSelected = true;
                return true;
            } else {
                vm.onePhaseSelected = false;
                return false;
            }

        };

        function _setIdNames() {
            var scopeId="_"+  $scope.$id;
            vm.protocolNumId = "protocol_number" +scopeId;
            vm.protocolTitleId = "protocol_title" + scopeId;
            vm.composId = "cta_composition"+ scopeId;
            vm.phaseId = "cta_phase" + scopeId;
            vm.phaseOtherId = "cta_other" +scopeId;
            vm.isInfoRebId = "info_reb" + scopeId;
        }

        vm.isEmpty = function(aValue){
            return (typeof aValue === 'undefined' || aValue === null || aValue === "");
        };

        vm.showError = function (ctrl) {
            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (vm.showDetailErrors && ctrl.$invalid));
        };

    }
})();
