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
            templateUrl: './app/components/formulations/tpl-material-ing-record.html',
            controllerAs: 'mirCtrl',
            controller: materialIngRecCtrl,
            bindings: {
                deleteBtn: '<',
                record: '<',
                showErrors: '&',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });
    materialIngRecCtrl.$inject = ['DossierLists'];
    function materialIngRecCtrl(DossierLists) {

        var self = this;
        self.yesNoList = DossierLists.getYesNoList();
        self.savePressed=false;
        self.$onInit = function () {

            self.mirModel = {};

            if (self.record) {
                self.mirModel = self.record;
            }
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
                } else {
                    //  console.log('product details add product');
                    self.onAddNew({ing: self.mirModel});
                }
                self.savePressed=false;
                self.materialIngRecordForm.$setPristine();
            }else{
                self.savePressed=true;
            }

        };

        self.discardChanges = function () {
            self.mirModel = self.record ? self.record : {};
            self.onCancel();
        }

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };

    }
})();
