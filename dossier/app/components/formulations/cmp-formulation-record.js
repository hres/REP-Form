/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', ['activeIngListModule', 'nonMedIngListModule', 'containerTypeListModule', 'materialIngListModule', 'roaModule', 'dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('formulationRecordModule')
        .component('cmpFormulationRecord', {
            templateUrl: './app/components/formulations/tpl-formulation-record.html',
            controllerAs: 'formulRecCtrl',
            controller: formulationRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&'
            }

        });

    formulationRecCtrl.$inject = ['DossierLists'];
    function formulationRecCtrl(DossierLists) {

        var self = this;
        self.noCountries="";
        self.dosageFormList = DossierLists.getDosageFormList();
        self.otherValue = DossierLists.getDosageOther();
        self.savePressed=false;
        self.$onInit = function () {

            self.frmModel = {};


            if(self.record){
                self.frmModel = self.record;
            }
        };

        self.save = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({record:self.frmModel});
            }else{
                //  console.log('product details add product');
                self.onAddNew({record:self.frmModel});
            }

        };

        self.discardChanges = function(){
            self.frmModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };
        self.showError=function(isInvalid,isTouched){
           return(((isInvalid && isTouched)|| (isInvalid && self.showErrors()) ||(isInvalid && self.savePressed)))
        }
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
        }

        self.updateActiveIngList = function(list){
            if(!list) return;

            self.frmModel.activeIngList = list;
        };

        self.updateNonMedIngList = function(list){
            if(!list) return;

            self.frmModel.nMedIngList = list;
        };

        self.updateContainerTypeList = function(list){
            if(!list) return;

            self.frmModel.containerTypes = list;
        };

        self.updateMaterialList = function(list){
            if(!list) return;

            self.frmModel.animalHumanMaterials = list;
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
            if (self.frmModel.dosageForm === self.otherValue) {
                return true;
            } else {
                self.frmModel.dosageFormOther = ""
                return false;
            }
        }
    }
})();
