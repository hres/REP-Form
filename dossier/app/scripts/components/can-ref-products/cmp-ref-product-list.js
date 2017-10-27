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
                onUpdate: '&',
                showErrorSummary:'<',
                errorSummaryUpdate:'&'
            }
        });

    refProductListCtrl.$inject=['$scope'];

    function refProductListCtrl($scope) {
        var vm = this;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.newProductFormShown = false;
        vm.showSummmary=false;
        vm.$onInit = function () {

            vm.newProductFormShown = false;
            vm.isDetailValid = true;
            vm.selectRecord = -1;

            vm.colNames = [
                {label: "BRAND_NAME", binding: "brandName", width: "50"},
                {label: "COMPANY_NAME", binding: "companyName", width: "50"}
            ];
            vm.productList = [];
            vm.newProductFormShown = false;

            if (vm.products) {
                vm.productList = vm.products;
            }
            _setIdNames();
        };

        vm.$onChanges = function (changes) {

            if (changes.products) {
                vm.productList = changes.products.currentValue;
            }
            if(changes.showErrorSummary){

                vm.showSummmary=changes.showErrorSummary.currentValue;
            }
        };

        vm.addProduct = function (product) {
            vm.setValid(true);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.productList.push(product);
            vm.newProductFormShown = false;
            vm.onUpdate({recs: vm.productList});
            setRecord(-1);
            vm.showNoRefReError();
        };

        vm.updateProduct = function (idx, product) {
            vm.productList[idx] = angular.copy(product);
            vm.setValid(true);
            vm.onUpdate({recs: vm.productList});
        };

        vm.deleteProduct = function (idx) {
            // console.debug('productList deleteProduct: ' + idx);
            vm.productList.splice(idx, 1);
            vm.setValid(true);
            setRecord(-1);
            vm.onUpdate({recs: vm.productList});
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.showNoRefReError()
        };
        function setRecord(value){
            vm.selectRecord = value;
        }

        /**
         * Sets the UI state for the add new template
         */
        vm.addNewProductState=function(){
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.newProductFormShown = true;
            vm.setValid(false);
            vm.showNoRefReError();
            return(vm.newProductFormShown);
        };
        vm.addNewDisabled=function(){
            return ( vm.newProductFormShown || !vm.isDetailValid);
        };
        vm.setValid=function(value){
            vm.isDetailValid=value;
        };
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.newProductFormShown = false
        }

        vm.showNoRefReError = function () {
            //TODO show this error is form shown? || vm.newProductFormShown===true
            if (vm.productList.length > 0 ) {
                vm.oneRefSelected = "sel";
                return false
            } else {
                vm.oneRefSelected = "";
                return true;
            }
        };


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
           // vm.dossierFormId="dossier_form" + scopeId;
            vm.oneCdnRefId="msg_err_one_cdn_ref"+scopeId;
        }

    }


})();