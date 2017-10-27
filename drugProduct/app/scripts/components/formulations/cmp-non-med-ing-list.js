/**
 * Created by Abdessamad on 9/23/2016.
 */


(function () {
    'use strict';

    angular
        .module('nonMedIngListModule', ['expandingTable', 'nonMedIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('nonMedIngListModule')
        .component('cmpNonMedIngList', {
            templateUrl: 'app/scripts/components/formulations/tpl-non-med-ing-list.html',
            controller: nonMedIngListCtrl,
            controllerAs: 'nmilCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }
        });

    function nonMedIngListCtrl() {

        var vm = this;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.newIngFormShown = false;
        vm.$onInit = function () {

            vm.newIngFormShown = false;
            vm.isDetailValid = true;
            vm.selectRecord = -1;
            vm.colNames = [
                {label: "VARIANT_NAME", binding: "varId", width: "15"},
                {label: "NONMEDICINAL_INGREDIENT", binding: "ingName", width: "65"},
                {label: "CAS_NUM", binding: "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "10"}
            ];
            vm.ingList = [];

            if (vm.ingredients) {
                vm.ingList = vm.ingredients;
            }
        };

        vm.addIng = function (ing) {
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
            // console.debug('ingList deleteIng: ' + idx);
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

    }
})();

