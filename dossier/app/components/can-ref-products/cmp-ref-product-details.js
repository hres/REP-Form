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
                onDelete: '&'
            }
        });
    refProductDetailsCtrl.$inject = ['DossierLists'];
    function refProductDetailsCtrl(DossierLists) {
        var self = this;
        self.dosageFormList = DossierLists.getDosageFormList();
        self.otherValue = DossierLists.getDosageOther();

        self.$onInit = function () {

            self.productModel = {
                brandName: "A",
                medIngredient: "A",
                dosageForm: "3",
                dosageFormOther: "",
                strengths: "5454",
                companyName: "B"
            };

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
                console.log('update product');
                self.onUpdate({product: self.productModel});
            } else {
                console.log('add product');
                self.onAddProduct({product: self.productModel});
            }

        };

        self.delete = function () {
            if (self.productRecord) {
                self.onDelete({id: self.productModel.productId});
            } else {
                //TODO
            }

        };
    }


})();