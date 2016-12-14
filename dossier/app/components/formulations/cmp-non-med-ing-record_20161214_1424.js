/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule')
        .component('cmpNonMedIngRecord', {
            templateUrl: './app/components/formulations/tpl-non-med-ing-record_20161214_1424.html',
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
                isDetailValid: '&'
            }

        });
    nonMedIngRecCtrl.$inject = ['DossierLists', '$scope'];
    function nonMedIngRecCtrl(DossierLists, $scope) {

        var self = this;
        self.nanoMaterialList = DossierLists.getNanoMaterials(); //nanoMaterial list
        self.yesNoList = DossierLists.getYesNoList(); //yes-no lists
        self.savePressed=false;

        self.$onInit = function () {
            self.savePressed=false;
            self.ingModel = {};

            if (self.record) {
                self.ingModel = angular.copy(self.record);
            }
            self.backup = angular.copy(self.ingModel);
        };


        /* self.duplicate = function () {
            if (self.record) {
                self.onAddIng({ing: self.record});
            }
         };*/

        self.saveIng = function () {
            // self.ingModel.animalHumanSourced = self.ingModel.animalHumanSourced == true ? "Yes" : "No";
            if(self.nonMedIngForm.$valid) {

                if (self.record) {
                    // console.log('product details update product');
                    self.onUpdate({ing: self.ingModel});
                } else {
                    //  console.log('product details add product');
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

        self.copy = function () {
            var ingredientCopy = angular.copy( self.ingModel);
            self.onAddIng({ing: ingredientCopy});
        }


        self.$onChanges = function (changes) {
            if (changes.record) {
                self.ingModel = changes.record.currentValue;
            }
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
            if (self.ingModel.nanoMaterial === DossierLists.getOtherValue()) {
                return true;
            } else {
                self.ingModel.nanoMaterialOther = "";
                return false;
            }
        };
        $scope.$watch('nIngRecCtrl.nonMedIngForm.$dirty', function () {
            self.isDetailValid({state: !self.nonMedIngForm.$dirty});
        }, true);



    }

})();
