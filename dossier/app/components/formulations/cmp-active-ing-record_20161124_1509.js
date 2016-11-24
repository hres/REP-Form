/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule')
        .component('cmpActiveIngRecord', {
            templateUrl: './app/components/formulations/tpl-active-ing-record_20161124_1509.html',
            controllerAs: 'ingRecCtrl',
            controller: activeIngRecCtrl,
            bindings: {
                showErrors: '&',
                deleteBtn: '<',
                record: '<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&'
            }

        });
    activeIngRecCtrl.$inject = ['DossierLists', '$scope'];
    function activeIngRecCtrl(DossierLists, $scope) {

        var self = this;
        self.nanoMaterialList = DossierLists.getNanoMaterials();
        self.yesNoList = DossierLists.getYesNoList();
        self.savePressed = false;
        self.$onInit = function () {
            self.savePressed = false;
            self.ingModel = {};

            if (self.record) {
                self.ingModel = angular.copy(self.record);
            }
            self.backup = angular.copy(self.ingModel);
        };

        self.saveIng = function () {
            if (self.activeIngForm.$valid) {
                if (self.record) {
                    self.onUpdate({ing: self.ingModel});
                } else {
                    self.onAddIng({ing: self.ingModel});
                }
                self.activeIngForm.$setPristine();
                self.savePressed = false;
            } else {
                self.savePressed = true;
            }
        };

        self.discardChanges = function () {
            self.ingModel = angular.copy(self.backup);
            self.activeIngForm.$setPristine();
            self.onCancel();
        }

        self.delete = function () {
            if (self.record) {
                self.onDelete();
            }

        };

        self.copy = function () {
            var ingredientCopy = angular.copy( self.ingModel);
           self.onAddIng({ing: ingredientCopy});
        }

        self.$onChanges = function (changes) {
            /*
             //Commented out as none of the other details records do this
             //TODO: move init code to changes event where it belongs
             if(changes.record){
             self.ingModel = changes.record.currentValue;
             }*/
        };


        /**
         * Controls showing errors for a field
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showErrors()) || (isInvalid && self.savePressed))
        }

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


        $scope.$watch('ingRecCtrl.activeIngForm.$dirty', function () {
            self.isDetailValid({state: !self.activeIngForm.$dirty});
        }, true);


    }

})();
