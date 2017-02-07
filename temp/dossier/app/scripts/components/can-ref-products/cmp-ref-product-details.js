/**
 * Created by Abdessamad on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule', ['expandingTable', 'dossierDataLists', 'filterLists','ui.select','hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpRefProductDetails', {
            templateUrl: 'app/scripts/components/can-ref-products/tpl-ref-product-details.html',
            controller: refProductDetailsCtrl,
            bindings: {
                productRecord: '<',
                deleteBtn: '<',
                onAddProduct: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                isDetailValid:'&',
                recordIndex: '<'
            }
        });
    refProductDetailsCtrl.$inject = ['DossierLists','$scope','$translate','OTHER'];
    function refProductDetailsCtrl(DossierLists, $scope, $translate,OTHER) {
        var self = this;
        self.dosageFormList = DossierLists.getDosageFormList();
        self.unitsList=DossierLists.getUnitsList();
        self.activeList = DossierLists.getActiveList();
        self.savePressed=false;
        self.lang = $translate.proposedLanguage() || $translate.use();
        self.productModel = {
            brandName: "",
           // medIngredient: "",
            "newIngred": "Y",
            "ingId": "",
            "ingLabel": "",
            strengths: "",
            units: "",
            otherUnits:"",
            per: "",
            dosageForm: "",
            dosageFormOther: "",
            companyName: ""
        };
        self.$onInit = function () {

        };
        self.$onChanges=function(changes){

            if(changes.productRecord && changes.productRecord.currentValue){
                self.productModel = angular.copy(self.productRecord);
                self.backup = angular.copy(self.productModel);
                self.savePressed=false;
            }
        };
        /**
         * @ngDoc determines if dosage Other should be readonky
         * @returns {boolean}
         */
        self.isDosageOther = function () {
            if(!self.productModel.dosageForm) return false;
            if (self.productModel.dosageForm.id  === OTHER) {
                return true;
            } else {
                self.productModel.dosageFormOther = "";
                return false;
            }
        };
        /**
         * @ngdoc show an error on an individual control
         * @param ctrl -control
         * @returns {true if ctrl in error}
         */
        self.showError = function (ctrl) {
            return ((ctrl.$touched && ctrl.$invalid) || (ctrl.$invalid && self.showErrors())|| (ctrl.$invalid && self.savePressed));
        };

        self.saveProduct = function () {
            if(self.productDetailsForm.$valid) {
                if (self.productRecord) {
                    // console.log('product details update product');
                    self.onUpdate({product: self.productModel});
                } else {
                    //  console.log('product details add product');
                    self.onAddProduct({product: self.productModel});
                }
                self.productDetailsForm.$setPristine();
                self.savePressed=false;
            }else{
                self.savePressed=true;
            }

        };
        self.ingredSelectionUpdated = function (item, model, label, event) {
            self.productModel.ingId = item.id;
        };
        self.discardChanges = function(){
            self.productModel = angular.copy(self.backup);
           //self.productModel = backup;
            self.productDetailsForm.$setPristine();
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        };

        self.delete = function(){
            if (self.productRecord) {
              //  console.log('product details delete product');
                self.onDelete();
            }else{
                //TODO
            }
        };


        /**
         * @ngDoc determines if units Other should be shown
         * @returns {boolean}
         */
        self.isUnitsOther = function () {

            if(!self.productModel) return false;
            if ((self.productModel.units.id === OTHER)) {
                return true;
            } else {
                self.productModel.otherUnits = "";
                return false;
            }
        };



        $scope.$watch('$ctrl.productDetailsForm.$dirty', function () {
            self.isDetailValid({state: !self.productDetailsForm.$dirty});
        }, true);

    }


})();