/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule', ['dossierDataLists','hpfbConstants','ui.select'])
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
                recordIndex:'<'
            }

        });
    nonMedIngRecCtrl.$inject = ['DossierLists', '$scope','$translate','OTHER','YES'];
    function nonMedIngRecCtrl(DossierLists, $scope,$translate, OTHER, YES) {

        var self = this;
        self.nanoMaterialList = DossierLists.getNanoMaterials(); //nanoMaterial list
        self.yesNoList = DossierLists.getYesNoList(); //yes-no lists
        self.unitsList=DossierLists.getUnitsList();
        self.savePressed=false;
        self.lang = $translate.proposedLanguage() || $translate.use();
        self.ingModel = {
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

        self.$onInit = function () {
            self.savePressed=false;
            self.backup = angular.copy(self.ingModel);
        };

        self.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                self.ingModel = angular.copy(changes.record.currentValue);
            }
        };

        self.saveIng = function () {
            if(self.nonMedIngForm.$valid) {

                if (self.record) {
                    self.onUpdate({ing: self.ingModel});
                } else {
                    self.onAddIng({ing: self.ingModel});
                }
                self.nonMedIngForm.$setPristine();
                self.savePressed=false;
            }else{
                self.savePressed=true;
            }

        };

        self.discardChanges = function () {
            self.ingModel = angular.copy(self.backup);
            self.nonMedIngForm.$setPristine();
            self.onCancel();
        };

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            } else {

            }
        };

        /**
         * Checks if the model is animal or human sourced
         * Used to set the state of the info box
         * @returns {boolean}
         */
        self.isAnimalHumanSourced=function(){
            if(!self.ingModel){ //should never happen
                return false;
            }
            return(self.ingModel.humanAnimalSourced===YES);
        };

        self.copy = function () {
            var ingredientCopy = angular.copy( self.ingModel);
            self.onAddIng({ing: ingredientCopy});
        };



        /**
         * Controls showing errors for a field
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showErrors())|| (isInvalid && self.savePressed))
        };

        /**
         * Sets the state of the nanomaterial other field
         * @returns {boolean} true if other is the value
         */
        self.isNanoOther = function () {
            if (self.ingModel.nanoMaterial.id === DossierLists.getOtherValue()) {
                return true;
            } else {
                self.ingModel.nanoMaterialOther = "";
                return false;
            }
        };

        /**
         * @ngDoc determines if units Other should be shown
         * @returns {boolean}
         */
        self.isUnitsOther = function () {

            if(!self.ingModel) return false;
            if ((self.ingModel.units.id === OTHER)) {
                return true;
            } else {
                self.ingModel.otherUnits = "";
                return false;
            }
        };


        $scope.$watch('nIngRecCtrl.nonMedIngForm.$dirty', function () {
            self.isDetailValid({state: !self.nonMedIngForm.$dirty});
        }, true);



    }

})();
