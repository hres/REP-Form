/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('materialIngListModule', ['expandingTable', 'materialIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('materialIngListModule')
        .component('cmpMaterialIngList', {
            templateUrl: 'app/scripts/components/formulations/tpl-material-ing-list.html',
            controller: materialIngListCtrl,
            controllerAs: 'milCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&',
                errorSummaryUpdate:'<',
                isFileLoaded: '<',
                showErrorSummary:'<',
                isFocus: '<'
            }
        });

    function materialIngListCtrl() {

        var vm = this;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.newIngFormShown = false;
        vm.colNames = [
            {label: "MATERIAL_NAME", binding: "ingredientName", width: "70", isHtml: "true"},
            {label: "CAS_NUM", binding: "cas", width: "15", isHtml: "true"},
            {label: "PRESENT_IN_FINAL", binding: "inFinalContainer", width: "15"}
        ];

        vm.$onInit = function () {
            vm.newIngFormShown = false;
            vm.isDetailValid = true;
            vm.selectRecord = -1;
            vm.ingList = [];

            if (vm.ingredients) {
                vm.ingList = vm.ingredients;
            }

        };

        vm.$onChanges = function (changes) {

            if (changes.ingredients) {
                vm.ingList = changes.ingredients.currentValue;
            }
            if (changes.isFileLoaded) {
                if (changes.isFileLoaded.currentValue) {
                    vm.newIngFormShown = false;
                }
            }
        };

        vm.$postLink = function () {
            if(!vm.isFileLoaded) {
                vm.addNewIngredientState();
            }
        };

        vm.addNew = function (ing) {
            vm.setValid(true);
            vm.ingList.push(ing);
            vm.newIngFormShown = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.onUpdate({list:vm.ingList});
            setRecord(-1);
        };

        vm.updateIng = function (idx, ing) {
            vm.ingList[idx] = angular.copy(ing);
            vm.onUpdate({list:vm.ingList});
            vm.setValid(true);
        };

        vm.deleteIng = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            vm.ingList.splice(idx, 1);
            vm.onUpdate({list:vm.ingList});
            vm.setValid(true);
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
        };

        function setRecord(value){
            vm.selectRecord = value;
        }

        /**
         * Sets the UI state for the add new template
         */
        vm.addNewIngredientState=function(){
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.newIngFormShown = true;
            vm.setValid(false);
            return(vm.newIngFormShown);
        };
        vm.addNewDisabled=function(){
            return ( vm.newIngFormShown || !vm.isDetailValid);
        };
        vm.setValid=function(value){
            vm.isDetailValid=value;
        };
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.newIngFormShown = false
        }
        vm.setFocus = function () {
            vm.isFocus = true;
        }
        vm.cancelFocus = function () {
            vm.isFocus = false;
        }


    }

})();
