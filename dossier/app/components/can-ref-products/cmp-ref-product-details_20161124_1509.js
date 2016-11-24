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
            templateUrl: './app/components/can-ref-products/tpl-ref-product-details_20161124_1509.html',
            controller: refProductDetailsCtrl,
            bindings: {
                productRecord: '<',
                deleteBtn: '<',
                onAddProduct: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                isDetailValid:'&'
            }
        });
    refProductDetailsCtrl.$inject = ['DossierLists','$scope'];
    function refProductDetailsCtrl(DossierLists, $scope) {
        var self = this;
        self.dosageFormList = DossierLists.getDosageFormList();
        self.otherValue = DossierLists.getDosageOther();
        self.savePressed=false;

        self.$onInit = function () {

            self.productModel = {};
            self.savePressed=false;
            if (self.productRecord) {

                self.productModel = angular.copy(self.productRecord);
            }
            self.backup = angular.copy(self.productModel);

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
            return ((ctrl.$touched && ctrl.$invalid) || (ctrl.$invalid && self.showErrors())|| (ctrl.$invalid && self.savePressed));
        }

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

        self.discardChanges = function(){
            self.productModel = angular.copy(self.backup);
           //self.productModel = backup;
            self.productDetailsForm.$setPristine();
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
        $scope.$watch('$ctrl.productDetailsForm.$dirty', function () {
            self.isDetailValid({state: !self.productDetailsForm.$dirty});
        }, true);

    }


})();