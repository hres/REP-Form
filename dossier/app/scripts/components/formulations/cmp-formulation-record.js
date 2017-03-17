/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', ['activeIngListModule', 'nonMedIngListModule', 'containerTypeListModule', 'materialIngListModule', 'roaListModule', 'dossierDataLists','ui.select'])
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
                addCopy:'&'
            }

        });

    formulationRecCtrl.$inject = ['DossierLists','$translate'];
    function formulationRecCtrl(DossierLists, $translate) {

        var self = this;
        self.noCountries="";
        self.noROAValues="";
        self.noActiveValues="";
        self.noContainers="";
        self.dosageFormList = DossierLists.getDosageFormList();
        self.otherValue = DossierLists.getDosageOther();
        self.savePressed=false;
        self.lang = $translate.proposedLanguage() || $translate.use();
        self.$onInit = function () {

            self.frmModel = {};


            if(self.record){
                self.frmModel = self.record;
            }
        };

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };
        self.copy=function(){
            if(self.record){
                var formulationCopy=angular.copy(self.record);
                self.addCopy({record:formulationCopy});
            }

        };

        self.showError=function(isInvalid,isTouched){
           return(((isInvalid && isTouched)|| (isInvalid && self.showErrors()) ||(isInvalid && self.savePressed)))
        };
        /***
         * Shows the no country of manufacture errro
         * TODO: Not show this until someone saves?
         * @returns {boolean}
         */
        self.noCountry=function(){
            if(!self.frmModel){
                self.noCountries="";
                return false;
            }
            if(!self.frmModel.countryList || self.frmModel.countryList.length===0){
                self.noCountries="";
                return true;
            }
            self.noCountries=self.frmModel.countryList.length;
            return false;
        };
        /**
         * Tracks for error handling if there are one or more ROA
         * @returns {boolean}
         */
        self.noROA=function(){

            if(!self.frmModel){
                self.noROAValues="";
                return false;
            }
            if(!self.frmModel.routeAdmins || self.frmModel.routeAdmins.length===0){
                self.noROAValues="";
                return true;
            }
            self.noROAValues="values";
            return false;

        };
        self.noActives=function(){

            if(!self.frmModel){
                self.noActiveValues="";
                return false;
            }
            if(!self.frmModel.activeIngList || self.frmModel.activeIngList.length===0){
                self.noActiveValues="";
                return true;
            }
            self.noActiveValues="values";
            return false;

        };
        /**
         * Checks if there is at least one container type
         * @returns {boolean}
         */
        self.noContainers=function(){

            if(!self.frmModel){
                self.noContainerValues="";
                return false;
            }
            if(!self.frmModel.containerTypes || self.frmModel.containerTypes.length===0){
                self.noContainerValues="";
                return true;
            }
            self.noContainerValues="values";
            return false;

        };



        self.updateActiveIngList = function(list){
            if(!list) return;

            self.frmModel.activeIngList = list;
            self.recordChanged();
        };

        self.updateNonMedIngList = function(list){
            if(!list) return;

            self.frmModel.nMedIngList = list;
            self.recordChanged();
        };

        self.updateContainerTypeList = function(list){
            if(!list) return;

            self.frmModel.containerTypes = list;

        };

        self.updateMaterialList = function(list){
            if(!list) return;

            self.frmModel.animalHumanMaterials = list;
            self.recordChanged();
        };

        self.updateRoaList = function(list){
            if(!list) return;

            self.frmModel.routeAdmins = list;
        };

        self.updateCountryList = function(list){
            if(!list) return;

            self.frmModel.countryList = list;
        };
        /**
         * @ngDoc determines if dosage Other should be shown
         * @returns {boolean}
         */
        self.isDosageOther = function () {

            if(!self.frmModel.dosageForm) return false;
            if ((self.frmModel.dosageForm.id === self.otherValue)) {
                return true;
            } else {
                self.frmModel.dosageFormOther = "";
                return false;
            }
        }
    }
})();
