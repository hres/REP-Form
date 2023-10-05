/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationsModule',
            [
                'expandingTable',
                'formulationRecordModule',
                'errorSummaryModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('formulationsModule')
        .component('cmpFormulations', {
            templateUrl: 'app/scripts/components/formulations/tpl-formulation-list.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {
                formulations: '<',
                recordChanged: '&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                isFileLoaded: '<',
                htIndxList:'<',
                updateErrorSummary:'&',
                dossierType: '<'
            }
        });

    formulationsCtrl.$inject = ['$scope'];

    function formulationsCtrl($scope) {

        var vm = this;
        vm.isDetailValid = true; //TODO this must be managed
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.noFormulations = "";
        vm.updateSummary=0;
        vm.showSummary=false;
        vm.requiredFlag = true; //use to signal expanding table extend an empty record
        vm.exclusions = {

        };
        vm.transcludeList={
            "cmp-formulation-record": "true"
        };
        vm.alias = {
            "no_formulation": {
                "type": "element",
                "target": "list_formulation"
            }
        };
        vm.isFocus = false;


        vm.$onInit = function () {

            vm.newFormShown = false;
            vm.formulationListId="formulation-list-form";

            vm.colNames = [
                {label: "FORM_ID", binding: "formulationId", width: "15", isHtml: "true"},
                {label: "FORMULATION_NAME", binding: "formulationName", width: "85", isHtml: "true"}
            ];
            vm.formulationList = [];

            if (vm.formulations) {
                vm.formulationList = vm.formulations;
            }
            vm.updateFormulationsError();
        };


        vm.$onChanges = function (changes) {

            if (changes.formulations) {
                vm.formulationList = changes.formulations.currentValue;
                vm.updateFormulationsError();
            }

            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
            if (changes.isFileLoaded) {
                if (changes.isFileLoaded.currentValue) {
                    vm.requiredFlag = false;
                }
            }
        };

        vm.$postLink = function () {
            vm.addNew();
        };

        vm.addNew = function () {

            var newRecord = {
                "formulationId": (getMaxFormulationId() + 1),
                "formulationName": "",
                "dosageForm": "",
                "dosageFormHtml": "",
                "dosageFormOther": "",
                activeIngList: [],
                nMedIngList: [],
                containerTypes: [],
                "isAnimalHumanMaterial": "",
                animalHumanMaterials: [],
                routeAdmins: [],
                countryList: []
            };

            vm.formulationList.push(newRecord);
            //set the expanding table
           vm.setRecord(vm.formulationList.length - 1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.updateFormulationsError();
        };

        vm.addCopy=function(formulation){
            if(formulation) {
                formulation.formulationId=(getMaxFormulationId() + 1);
                vm.formulationList.push(formulation);
                vm.requiredFlag = false;
                vm.isFileLoaded = true;
                vm.setRecord(- 1);
                //vm.resetToCollapsed = !vm.resetToCollapsed;
            }
        };

        vm.update = function (idx, frm) {
            vm.formulationList[idx] = angular.copy(frm);
        };

        vm.updateFormulationRecord = function () {
            vm.recordChanged();
            vm.requiredFlag = false;
        };

        vm.delete = function (idx) {
            if (vm.formulationList.splice(idx, 1))
                vm.setRecord(-1);
                vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.updateFormulationsError();
            vm.requiredFlag = false;
        };



        /**
         * Used for error messaging that there are no active ingredients
         * @returns {string} string is empty if not empty
         */
        vm.updateFormulationsError = function () {
            if (vm.formulationList && vm.formulationList.length > 0) {
                vm.noFormulations = vm.formulationList.length;
                return false;
            }
            vm.noFormulations = "";
            return true;

        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };


        vm.setRecord=function(value){
          resetMe();
            vm.selectRecord=-1;
            vm.selectRecord=value;

        };
        vm.setFocus = function () {
            vm.isFocus = true;
        }
        vm.cancelFocus = function () {
            vm.isFocus = false;
        }

        function resetMe(){
            vm.resetToCollapsed = !vm.resetToCollapsed;

        }

        function getMaxFormulationId() {
            var out = 0;
            var list = vm.formulationList;
            if (list) {
                for (var i = 0; i < list.length; i++) {

                    if (parseInt(list[i].formulationId) > out) {
                        out = parseInt(list[i].formulationId);
                    }
                }
            }
            return out;
        }
        $scope.$watch('formulCtrl.formulationsForm.$error', function () {
            vm.updateErrorSummary();
        }, true);
    }

})();

