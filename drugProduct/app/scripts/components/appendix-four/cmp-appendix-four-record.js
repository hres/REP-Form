/**
 * Created by Abdessamad on 8/22/2016.
 * //Is used
 */

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule', [
            'tissuesFluidsList',
            'animalSourcedSection',
            'errorSummaryModule',
            'errorMessageModule'
        ])
})();

(function () {
        'use strict';

        angular
            .module('appendix4RecordModule')
            .component('cmpAppendixFourRecord', {
                templateUrl: 'app/scripts/components/appendix-four/tpl-appendix-four-record.html',
                controllerAs: 'ap4RecCtrl',
                controller: app4RecCtrl,
                bindings: {
                    record: '<',
                    showListErrors: '&',
                    onAddNew: '&',
                    onUpdate: '&',
                    onDelete: '&',
                    onCancel: '&',
                    deleteBtn: '<',
                    recordChanged: '&',
                    service: '<',
                    errorSummaryUpdate: '<', //sending a signal that the error summary should be updated
                    showErrorSummary: '<', //flag to show or hide the error summary
                    updateErrorSummary: '&' //function to update the list of error summmaries
                }

            });
        app4RecCtrl.$inject = ['$scope']

        function app4RecCtrl($scope) {

            var vm = this;
            vm.isSourced = ""; //determines if at least one source is selected
            var emptyFluidsTissues = {
                tissuesList: []
            };
            var emptyAnimalSource = {
                animalSrcList: [],
                isCellLine: "",
                isBiotechDerived: "",
                isControlledPop: "",
                ageAnimals: '',
                countryList: []
            };

            vm.model = {};
            vm.exclusions = {};
            //vm.appendix4RecForm={};
            vm.transcludeList = {};

            vm.alias = {
                "msg_app4_type": {
                    "type": "fieldset",
                    "parent": "fs_type"
                },
                "roleMissing": {
                    "type": "fieldset",
                    "parent": "system_role"
                },
                "msg_err_one_tissue": {
                    "type": "element",
                    "target": "addTissuesRec"
                }

            };
            vm.showSummary = false;
            vm.updateSummary = 0;
            vm.summaryName = "";
            vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

            vm.$onInit = function () {
                vm.isSourcedSelected();
                _setIdNames();
                vm.showErrors();
            };
            vm.$onChanges = function (changes) {
                if (changes.record) { //model changes
                    vm.model = (changes.record.currentValue);

                    vm.isSourcedSelected();
                    vm.summaryName = "cmp-appendix-four-record_" + (vm.model.id - 1);
                    vm.showErrors();
                }
                if (changes.showErrorSummary) {
                    vm.showSummary = changes.showErrorSummary.currentValue;
                    vm.updateErrorSummaryState();
                    vm.showErrors();
                }
                if (changes.errorSummaryUpdate) {
                    vm.updateErrorSummaryState();
                }

            };
            vm.updateErrorSummaryState = function () {
                vm.updateSummary = vm.updateSummary + 1;
            };

            vm.isSourcedSelected = function () {
                var result = (vm.model.humanSourced || vm.model.animalSourced);
                if (result) {
                    vm.isSourced = result;
                } else {
                    vm.isSourced = "";
                }
                return (result);

            };

            vm.noSelectionError = function () {
                return ((vm.appendix4RecForm.$dirty && !vm.isSourcedSelected() ) || (vm.showListErrors() && !vm.isSourcedSelected()));
            };
            /**
             * Used to show field level errors
             * @param isInvalid
             * @param isTouched
             * @returns {boolean}  true if you should show error
             */
            vm.showError = function (isInvalid, isTouched) {
                return ((isInvalid && isTouched) || (isInvalid && vm.showListErrors()))
            };
            vm.save = function () {
                if (vm.record) {
                    // console.log('product details update product');
                    vm.onUpdate({record: vm.model});
                } else {
                    //  console.log('product details add product');
                    vm.onAddNew({record: vm.model});
                }

            };
            vm.showErrors = function () {
                return vm.showSummary;
            }

            /*vm.discardChanges = function () {
                vm.model = {};
                //vm.productDetailsForm.$setPristine();
                vm.onCancel();
            }*/

            vm.delete = function () {
                if (vm.record) {
                    //  console.log('product details delete product');
                    vm.onDelete();
                }

            };

            vm.updateTissuesFluids = function (input) {

                //console.log('apdx4 record updateTissuesFluids : ' + JSON.stringify(input));

                vm.model.tissuesFluidsOrigin = input;
                vm.onUpdate({record: vm.model});


                /* if (vm.record) {
                     vm.onUpdate({record: vm.model});
                 }*/

            };

            vm.updateAnimalSourced = function (input) {

                vm.model.sourceAnimalDetails = input;
                vm.onUpdate({record: vm.model});

            };

            /**
             * Determines whether to show or hide tissues o=r fluids
             * @returns {boolean}
             */
            vm.showTissuesFluids = function () {
                if (vm.model.humanSourced || vm.model.animalSourced) {
                    if (!vm.model.tissuesFluidsOrigin) {
                        vm.model.tissuesFluidsOrigin = angular.copy(emptyFluidsTissues);
                    }
                    return true;
                } else {
                    vm.model.tissuesFluidsOrigin = null;
                }
                return false;

            };
            vm.showAnimalSources = function () {
                vm.showTissuesFluids();
                if (vm.model.animalSourced) {
                    if (!vm.model.sourceAnimalDetails) {
                        vm.model.sourceAnimalDetails = angular.copy(emptyAnimalSource);
                    }
                    return true;
                } else {
                    vm.model.sourceAnimalDetails = null;
                }
                return false;
            };

            function _setIdNames() {
                var scopeId = "_" + $scope.$id;
                vm.appendixFormRecordId = "appendix4FormRecord" + scopeId;
                vm.ingredNameId = "ingred_mat_name" + scopeId;
                vm.oneTypeId = "msg_app4_type" + scopeId;
                vm.fsType = "fs_type" + scopeId;
            }

            $scope.$watch('ap4RecCtrl.appendix4RecForm.$error', function () {
                vm.updateErrorSummaryState();
                vm.isSourcedSelected(); //updates source
            }, true);

        }
    })();
