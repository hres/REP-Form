/**
 * Created by Abdessamad on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule', ['expandingTable', 'dossierDataLists', 'filterLists'])
})();

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule')
        .component('cmpRefProductDetails', {
            templateUrl: './app/components/can-ref-products/tpl-ref-product-details.html',
            controller: refProductDetailsCtrl,
            bindings: {
                productRecord: '<',
                deleteBtn: '<',
                onAddProduct: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }
        });
    refProductDetailsCtrl.$inject = ['DossierLists'];
    function refProductDetailsCtrl(DossierLists) {
        var self = this;
        self.dosageFormList = DossierLists.getDosageFormList();
        self.otherValue = DossierLists.getDosageOther();

        self.$onInit = function () {

            self.productModel = {};

            if (self.productRecord) {

                angular.extend(self.productModel, self.productRecord);
            }

        }


        /**
         * @ngDoc determines if dosage Other should be readonky
         * @returns {boolean}
         */
        self.isDosageOther = function () {
            if (self.productModel.dosageForm === self.otherValue) {
                return true;
            } else {
                self.productModel.dosageFormOther = ""
                return false;
            }
        }
        /**
         * @ngdoc show an error on an individual control
         * @param ctrl -control
         * @returns {true if ctrl in error}
         */
        self.showError = function (ctrl) {
            return ((ctrl.$touched && ctrl.$invalid) /**||(TODO invalid and showErrors)*/);
        }

        self.saveProduct = function () {
            if (self.productRecord) {
               // console.log('product details update product');
                self.onUpdate({product:self.productModel});
            }else{
              //  console.log('product details add product');
                self.onAddProduct({product:self.productModel});
        }

        };

        self.discardChanges = function(){
            self.productModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function(){
            if (self.productRecord) {
              //  console.log('product details delete product');
                self.onDelete();
            }else{
                //TODO
            }

        };
    }


})();