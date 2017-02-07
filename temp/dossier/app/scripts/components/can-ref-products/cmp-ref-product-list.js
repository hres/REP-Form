/**
 * Created by Abdessamad on 8/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('refProductListModule', ['expandingTable', 'refProductDetailsModule'])
})();

(function () {
    'use strict';

    angular
        .module('refProductListModule')
        .component('cmpRefProductList', {
            templateUrl: 'app/scripts/components/can-ref-products/tpl-ref-product-list.html',
            controller: refProductListCtrl,
            controllerAs: 'crpl',
            bindings: {
                products: '<',
                onUpdate: '&'
            }
        });

    function refProductListCtrl() {
        var self = this;
        self.isDetailValid = true;
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.newProductFormShown = false;
        self.$onInit = function () {

            self.newProductFormShown = false;
            self.isDetailValid = true;
            self.selectRecord = -1;

            self.colNames = [
                {label: "BRAND_NAME", binding: "brandName", width: "50"},
                {label: "COMPANY_NAME", binding: "companyName", width: "50"}
            ];
            self.productList = [];
            self.newProductFormShown = false;

            if (self.products) {
                self.productList = self.products;
            }
            // }


        };

        self.$onChanges = function (changes) {

            if (changes.products) {
                self.productList = changes.products.currentValue;
            }
        };

        self.addProduct = function (product) {
            self.setValid(true);
            self.resetToCollapsed = !self.resetToCollapsed;
            self.productList.push(product);
            self.newProductFormShown = false;
            self.onUpdate({recs: self.productList});
            setRecord(-1);
        };

        self.updateProduct = function (idx, product) {
            self.productList[idx] = angular.copy(product);
            self.setValid(true);
            self.onUpdate({recs: self.productList});
        };

        self.deleteProduct = function (idx) {
            // console.debug('productList deleteProduct: ' + idx);
            self.productList.splice(idx, 1);
            self.setValid(true);
            setRecord(-1);
            self.onUpdate({recs: self.productList});
            self.resetToCollapsed = !self.resetToCollapsed;
        };
        function setRecord(value){
            self.selectRecord = value;
        }

        /**
         * Sets the UI state for the add new template
         */
        self.addNewProductState=function(){
            self.resetToCollapsed = !self.resetToCollapsed;
            self.newProductFormShown = true;
            self.setValid(false);
            return(self.newProductFormShown);
        };
        self.addNewDisabled=function(){
            return ( self.newProductFormShown || !self.isDetailValid);
        };
        self.setValid=function(value){
            self.isDetailValid=value;
        };
        self.onNewCancel=function(){
            self.setValid(true);
            self.newProductFormShown = false
        }



    }


})();