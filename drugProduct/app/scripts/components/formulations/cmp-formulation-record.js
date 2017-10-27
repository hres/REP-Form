/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', 
            [
                'activeIngListModule',
                'nonMedIngListModule',
                'containerTypeListModule',
                'materialIngListModule',
                'roaListModule',
                'dossierDataLists',
                'ui.select',
                'errorSummaryModule',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('formulationRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })

        .component('cmpFormulationRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-formulation-record.html',
            controllerAs: 'formulRecCtrl',
            controller: formulationRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                //onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                recordChanged:'&',
                addCopy:'&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                updateErrorSummary:'&'
            }

        });

    formulationRecCtrl.$inject = ['DossierLists','$translate','$scope'];
    function formulationRecCtrl(DossierLists, $translate,$scope) {

        var vm = this;
        vm.noCountries="";
        vm.noROAValues="";
        vm.noActiveValues="";
        vm.dosageFormList = DossierLists.getDosageFormList();
        vm.otherValue = DossierLists.getDosageOther();
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
       // vm.formName="";
        vm.summaryName="";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.frmModel = {};
        vm.exclusions={
            "ingRecCtrl.activeIngForm":"true",
            "nIngRecCtrl.nonMedIngForm":"true",
            "mirCtrl.materialIngRecordForm":"true",
            "ctrCtrl.containerTypeForm":"true"
        };
        vm.alias={
            "no_country": {
                "type": "buttonSearch",
                "buttonName": "addCountry"
            },
            "no_roa": {
                "type": "buttonSearch",
                "buttonName": "addRoaRec"
            },
            "no_active": {
                "type": "buttonSearch",
                "buttonName": "addAI"
            },
            "no_container": {
                "type": "buttonSearch",
                "buttonName": "addContainer"
            }
        };
        vm.transcludeList={

        };
        // "cmp-roa-record": "true"
        vm.$onInit = function () {

            _setIdNames();
        };
        vm.$onChanges=function(changes){
            if(changes.record){
                vm.frmModel = changes.record.currentValue;
                vm.summaryName="cmp-formulation-record_"+(vm.frmModel.formulationId-1);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
                console.log("Formulation show summary value is "+vm.showSummary)
            }
            if(changes.errorSummaryUpdate){

                vm.updateErrorSummaryState();
            }

        }

        vm.delete = function(){
            if (vm.record) {
                vm.onDelete();
            }

        };
        vm.copy=function(){
            if(vm.record){
                var formulationCopy=angular.copy(vm.record);
                vm.addCopy({record:formulationCopy});
            }

        };
        //TODO Delete
       /* vm.showErrors=function(){
            return vm.showSummary;
        }
*/
        vm.showError=function(isInvalid,isTouched){
           return(((isInvalid && isTouched)||(isInvalid && vm.showSummary)))
        };
        /***
         * Shows the no country of manufacture errro
         * TODO: Not show this until someone saves?
         * @returns {boolean}
         */
        vm.noCountry=function(){
            if(!vm.frmModel){
                vm.noCountries="";
                return false;
            }
            if(!vm.frmModel.countryList || vm.frmModel.countryList.length===0){
                vm.noCountries="";
                return true;
            }
            vm.noCountries=vm.frmModel.countryList.length;
            return false;
        };
        /**
         * Tracks for error handling if there are one or more ROA
         * @returns {boolean}
         */
        vm.noROA=function(){

            if(!vm.frmModel){
                vm.noROAValues="";
                return false;
            }
            if(!vm.frmModel.routeAdmins || vm.frmModel.routeAdmins.length===0){
                vm.noROAValues="";
                return true;
            }
            vm.noROAValues="values";
            return false;

        };
        /*vm.noActives=function(){

            if(!vm.frmModel){
                vm.noActiveValues="";
                return true;
            }
            if(!vm.frmModel.activeIngList || vm.frmModel.activeIngList.length===0){
                vm.noActiveValues="";
                return true;
            }
            vm.noActiveValues="values";
            return false;

        };*/
        /**
         * Checks if there is at least one container type
         * @returns {boolean}
         */
        vm.noContainers=function(){

            if(!vm.frmModel){
                vm.noContainerValues="";
                return true;
            }
            if(!vm.frmModel.containerTypes || vm.frmModel.containerTypes.length===0){
                vm.noContainerValues="";
                return true;
            }
            vm.noContainerValues="values";
            return false;

        };



        vm.updateActiveIngList = function(list){
            if(!list) return;

            vm.frmModel.activeIngList = list;
            vm.recordChanged();
        };

        vm.updateNonMedIngList = function(list){
            if(!list) return;

            vm.frmModel.nMedIngList = list;
            vm.recordChanged();
        };

        vm.updateContainerTypeList = function(list){
            if(!list) return;

            vm.frmModel.containerTypes = list;

        };

        vm.updateMaterialList = function(list){
            if(!list) return;

            vm.frmModel.animalHumanMaterials = list;
            vm.recordChanged();
        };

        vm.updateRoaList = function(list){
            if(!list) return;

            vm.frmModel.routeAdmins = list;
        };

        vm.updateCountryList = function(list){
            if(!list) return;

            vm.frmModel.countryList = list;
        };
        /**
         * @ngDoc determines if dosage Other should be shown
         * @returns {boolean}
         */
        vm.isDosageOther = function () {

            if(!vm.frmModel|| !vm.frmModel.dosageForm) return false;
            if ((vm.frmModel.dosageForm.id === vm.otherValue)) {
                return true;
            } else {
                vm.frmModel.dosageFormOther = "";
                return false;
            }
        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

       /* vm.getFormName=function(){

            return vm.formName;
        }*/
        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.formulationFormRecordId="formulationRecord" + scopeId;
            vm.dosageId = "dosage_form" + scopeId;
            vm.dosageOtherId = "dosage_form_other" + scopeId;
            vm.noActiveId="no_active"+scopeId;
            vm.noContainerId="no_container"+scopeId;
            vm.noRoaId="no_roa"+scopeId;
            vm.noCountryId="no_country"+scopeId;
        }

        $scope.$watch('formulRecCtrl.formulationForm.$error', function () {
            vm.updateErrorSummary();
        }, true);


    }
})();
