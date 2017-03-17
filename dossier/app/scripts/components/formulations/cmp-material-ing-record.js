/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule')
        .component('cmpMaterialIngRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-material-ing-record.html',
            controllerAs: 'mirCtrl',
            controller: materialIngRecCtrl,
            bindings: {
                deleteBtn: '<',
                record: '<',
                showErrors: '&',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&',
                recordIndex:'<'
            }

        });
    materialIngRecCtrl.$inject = ['DossierLists','$scope'];
    function materialIngRecCtrl(DossierLists, $scope) {

        var self = this;
        self.yesNoList = DossierLists.getYesNoList();
        self.savePressed=false;
        self.$onInit = function () {

            self.mirModel = {};

            if (self.record) {
                self.mirModel = self.record;
            }
            self.backup = angular.copy(self.mirModel);
        };

        self.showError = function (isInvalid, isTouched) {
            //return ((isInvalid && isTouched) || (isInvalid && self.showErrors())); generates error
            return ((isInvalid && isTouched) ||(isInvalid && self.showErrors())||(self.savePressed && isInvalid));

        };

        self.save = function () {
            if(self.materialIngRecordForm.$valid) {
                if (self.record) {
                    // console.log('product details update product');
                    self.onUpdate({ing: self.mirModel});
                    self.materialIngRecordForm.$setPristine();
                } else {
                    //  console.log('product details add product');
                    self.onAddNew({ing: self.mirModel});
                }
                self.materialIngRecordForm.$setPristine();
                self.savePressed=false;
            }else{
                self.savePressed=true;
            }

        };

        self.discardChanges = function () {
            self.mirModel = angular.copy(self.backup);
            self.materialIngRecordForm.$setPristine();
            self.onCancel();
        };

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };

        $scope.$watch('mirCtrl.materialIngRecordForm.$dirty', function () {
            self.isDetailValid({state: !self.materialIngRecordForm.$dirty});
        }, true);

    }
})();
