/**
 * Created by Abdessamad on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule',
            [
                'expandingTable',
                'dossierDataLists',
                'filterLists',
                'ui.select',
                'hpfbConstants',
                'errorSummaryModule',
                'errorMessageModule'
            ])
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
            controllerAs: 'refProdCtrl',
            bindings: {
                productRecord: '<',
                deleteBtn: '<',
                onAddProduct: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                isDetailValid: '&',
                recordIndex: '<',
                showErrorSummary: '<', //flag to show or hide the error summary
                errorSummaryUpdate: '&' /* used to message that errorSummary needs updating */
            }
        });
    refProductDetailsCtrl.$inject = ['DossierLists', '$scope', '$translate', 'OTHER'];
    function refProductDetailsCtrl(DossierLists, $scope, $translate, OTHER) {
        var vm = this;
        vm.dosageFormList = DossierLists.getDosageFormList();
        vm.unitsList = DossierLists.getUnitsList();
        vm.activeList = DossierLists.getActiveList();
        vm.savePressed = false;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.productModel = {
            brandName: "",
            // medIngredient: "",
            newIngred: "Y",
            ingId: "",
            ingLabel: "",
            autoIngred: 'N',
            strengths: "",
            units: "",
            otherUnits: "",
            per: "",
            dosageForm: "",
            dosageFormOther: "",
            companyName: ""
        };
        vm.summaryName = "";
        vm.updateSummary = 0; //triggers and error summary update
        vm.setSummaryFocus = 0; //sets the summary focus
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN0"}
        ];
        vm.showSummary = false;

        vm.$onInit = function () {
            _setIdNames();
        };
        vm.$onChanges = function (changes) {

            if (changes.productRecord && changes.productRecord.currentValue) {
                vm.productModel = angular.copy(vm.productRecord);
                vm.backup = angular.copy(vm.productModel);
                vm.savePressed = false;
                vm.summaryName = "cmp-ref-product-details_" + (vm.productModel.id - 1);
            }
            if (changes.showErrorSummary) {

                vm.showSummary = changes.showErrorSummary.currentValue;
                console.log("Show summary"+ vm.showSummary);

                if (vm.showSummary) {
                    vm.updateErrorSummaryState(); //updating current
               }

            }

        };
        /**
         * @ngDoc determines if dosage Other should be readonky
         * @returns {boolean}
         */
        vm.isDosageOther = function () {
            if (!vm.productModel.dosageForm) return false;
            if (vm.productModel.dosageForm.id === OTHER) {
                return true;
            } else {
                vm.productModel.dosageFormOther = "";
                return false;
            }
        };
        /**
         * @ngdoc show an error on an individual control
         * @param ctrl -control
         * @returns {true if ctrl in error}
         */
        vm.showError = function (ctrl) {
            return ((ctrl.$touched && ctrl.$invalid) || (ctrl.$invalid && vm.showRecordSummary()));
        };

        vm.saveProduct = function () {
            if (vm.productDetailsForm.$valid) {
                if (vm.productRecord) {
                    vm.onUpdate({product: vm.productModel});

                } else {
                    vm.onAddProduct({product: vm.productModel});
                }
                vm.productDetailsForm.$setPristine();
                vm.savePressed = false;
            } else {
                vm.savePressed = true;
                vm.updateErrorSummaryState(); //updating current
                vm.focusOnSummary()
            }

        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        }
        vm.focusOnSummary = function () {

            vm.setSummaryFocus = vm.setSummaryFocus + 1;
        }
        vm.showRecordSummary = function () {
            console.log("Show summary in Show record"+vm.showSummary);
            console.log("Show summary in Save pressed record"+vm.savePressed)
            return ((vm.savePressed || vm.showSummary));

        };


        vm.ingredSelectionUpdated = function (item, model, label, event) {
            if (!item) {
                vm.productModel.ingId = "";
                vm.productModel.autoIngred = 'N';
            } else {
                vm.productModel.ingId = item.id;
                vm.productModel.autoIngred = 'Y';
            }

        };
        vm.discardChanges = function () {
            vm.productModel = angular.copy(vm.backup);
            //vm.productModel = backup;
            vm.productDetailsForm.$setPristine();
            //vm.productDetailsForm.$setPristine();
            vm.onCancel();
        };

        vm.delete = function () {
            if (vm.productRecord) {
                //  console.log('product details delete product');
                vm.onDelete();
            } else {
                //TODO
            }
        };


        /**
         * @ngDoc determines if units Other should be shown
         * @returns {boolean}
         */
        vm.isUnitsOther = function () {

            if (!vm.productModel) return false;
            if ((vm.productModel.units.id === OTHER)) {
                return true;
            } else {
                vm.productModel.otherUnits = "";
                return false;
            }
        };


        $scope.$watch('refProdCtrl.productDetailsForm.$dirty', function () {
            vm.isDetailValid({state: !vm.productDetailsForm.$dirty});
        }, true);
        $scope.$watch('refProdCtrl.productDetailsForm.$error', function () {
            vm.updateErrorSummaryState();
        }, true);


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.repProductFormId = "productDetailsForm" + scopeId;
            vm.brandId = "brand_name" + scopeId;
            vm.ingredNameId = "medicinal_ingredient" + scopeId;
            vm.strengthId = "strength" + scopeId;
            vm.unitsId = "units" + scopeId;
            vm.otherId="other_units"+scopeId;
            vm.perId="per"+scopeId;
            vm.dosageFormId="dosage_form"+scopeId;
            vm.dosageFormOtherId="dosage_form_other"+scopeId;
            vm.companyId="company_noabbrev"+scopeId;
        }


    }


})();