/**
 * Created by Abdessamad on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule', ['expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule')
        .component('cmpRefProductDetails', {
            templateUrl: './components/can-ref-products/tpl-ref-product-details.html',
            controller: refProductDetailsCtrl,
            bindings: {
                productRecord: '<',
                deleteBtn: '<',
                onAddProduct: '&',
                onUpdate: '&',
                onDelete: '&'
            }
        });

    function refProductDetailsCtrl(){
        var self = this;

        self.$onInit = function(){

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

        self.saveProduct = function(){
            if (self.productRecord) {
                console.log('update product');
                self.onUpdate({product:self.productModel});
            }else{
                console.log('add product');
                self.onAddProduct({product:self.productModel});
            }

        };

        self.delete = function(){
            if (self.productRecord) {
                self.onDelete({id : self.productModel.productId});
            }else{
                //TODO
            }

        };
    }


})();