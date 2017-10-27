/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendixFourModule',
            [
                'expandingTable',
                'errorSummaryModule',
                'errorMessageModule',
                'appendix4RecordModule'
            ])
})();

(function () {
    'use strict';
    angular
        .module('appendixFourModule')
        .component('cmpAppendixFour', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-appendix-four.html',
            controller: appendixFourCtrl,
            controllerAs: 'ap4Ctrl',
            bindings: {
                ingredients: '<',
                recordChanged: '&',
                service: '<',
               errorSummaryUpdate:'<',
                showErrorSummary:'<',
                updateErrorSummary:'&'
            }
        });

    appendixFourCtrl.$inject=['$scope'];

    function appendixFourCtrl($scope) {
        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        //vm.resetToCollapsed = true;
        vm.colNames = [
            {label: "INGRED_NAME", binding: "ingredientName", width: "98"}
        ];
        vm.ingredientList = [];
        vm.updateSummary = 0; //increment to send message to error summaries
        vm.showSummary = false;
        vm.focusSummary = 0;
        vm.exclusions = {
            "tissuesListSrcCtrl.tissuesListForm":"true"
        };
        vm.transcludeList={
            "cmp-appendix-four-record": "true"
        };
        vm.alias = {
            "oneselected": {
                "type": "element",
                "target": "addSrcIngred"
            }
        }


        vm.$onInit = function () {
            _setIdNames();
            vm.newFormShown = false;
            vm.isDetailValid = true; //TODO needs to be managed in ADD and delete

            if (!vm.ingredientList) {
                vm.ingredientList = [];
                // vm.ingredientList = vm.ingredients;
            }
            vm.exclusions = {
            };

        };

        vm.$onChanges = function (changes) {

            if (changes.ingredients) {
                vm.ingredientList = changes.ingredients.currentValue;
            }

            if(changes.showErrorSummary){

                vm.showSummary=changes.showErrorSummary.currentValue;

            }
            if(changes.errorSummaryUpdate){

                vm.updateErrorSummaryState();
            }

        };

        vm.addNew = function () {
            var newRecord = {
                "id": (getListMaxID() + 1),
                "ingredientName": ""
            };
            vm.ingredientList.push(newRecord);
           // vm.resetToCollapsed = !vm.resetToCollapsed;
            //vm.selectRecord = ( vm.ingredientList.length - 1);
            vm.setRecord(vm.ingredientList.length - 1);

        };

        function getListMaxID() {
            var out = 0;
            var list = vm.ingredientList;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id > out) {
                        out = list[i].id;
                    }
                }
            }
            return out;
        }

        vm.update = function (idx, ing) {
            //vm.ingredientList[idx] = angular.copy(ing);
        };

        vm.delete = function (idx) {
            //console.debug('frmList delete: ' + idx);
            if (vm.ingredientList.splice(idx, 1))
                vm.resetToCollapsed = true;

        }

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        $scope.$watchCollection(
            "ap4Ctrl.appendixForm.$error",
            function( newValue, oldValue ) {
                vm.updateErrorSummary();
            }
        );


        vm.setRecord=function(value){
            resetMe();
            vm.selectRecord=-1;
            vm.selectRecord=value;

        };
        function resetMe(){
            vm.resetToCollapsed = !vm.resetToCollapsed;

        }


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.appendix4Id="appendix_form" + scopeId;

        }

    }
})();
