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
            templateUrl: './app/components/formulations/tpl-active-ing-record.html',
            controllerAs: 'ingRecCtrl',
            controller: activeIngRecCtrl,
            bindings: {
                showErrors: '&',
                deleteBtn: '<',
                record: '<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });
    activeIngRecCtrl.$inject = ['DossierLists'];
    function activeIngRecCtrl(DossierLists) {

        var self = this;
        self.nanoMaterialList=DossierLists.getNanoMaterials();
        self.yesNoList = DossierLists.getYesNoList();
        self.$onInit = function () {

            self.ingModel = {};

            if (self.record) {
                self.ingModel = self.record;
            }
        };

        self.saveIng = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({ing: self.ingModel});
            } else {
                //  console.log('product details add product');
                self.onAddIng({ing: self.ingModel});
            }
        };

        self.discardChanges = function () {
            self.ingModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            } else {

            }

        };

        self.$onChanges=function(changes){
            if(changes.record){
                self.ingModel = self.record.currentValue;
            }
        };


        /**
         * Controls showing errors for a field
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError=function(isInvalid,isTouched){
            return((isInvalid &&isTouched)|| (isInvalid && self.showErrors()))
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
        }

    }

})();
