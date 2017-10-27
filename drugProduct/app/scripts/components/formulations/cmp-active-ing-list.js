/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngListModule', ['expandingTable', 'activeIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('activeIngListModule')
        .component('cmpActiveIngList', {
            templateUrl: 'app/scripts/components/formulations/tpl-active-ing-list.html',
            controller: activeIngListCtrl,
            controllerAs: 'ailCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<',
                updateErrorSummary:'&'
            }
        });

    activeIngListCtrl.$inject = ['$scope'];

    function activeIngListCtrl($scope) {

        var vm = this;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.isDetailValid = true;
        vm.newIngFormShown = false;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.noActiveValues=""; //used for error handling Business Rule: must be at least one active

        vm.colNames = [
            {label: "MEDICINAL_INGREDIENT", binding: "ingLabel", width: "65"},
            {label: "IN_LIST", binding: "autoIngred", width: "7"},
            {label: "CAS_NUM", "binding": "cas", width: "13"},
            {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "15"}
        ];
        vm.ingList = [];
        vm.$onInit = function () {
            _setIdNames();
          /*  if (vm.ingredients) {
                vm.ingList = vm.ingredients;
            }*/
        };
        vm.$onChanges=function(changes){
            //TODO get rid of the currentvalue check
            if(changes.ingredients && changes.ingredients.currentValue){
                vm.ingList = vm.ingredients;
                vm.isDetailValid = true;
                vm.noActives();
            }

        }

        vm.addIng = function (ing) {
            vm.setValid(true);
            vm.ingList.push(ing);
            vm.newIngFormShown = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.onUpdate({list:vm.ingList});
            setRecord(-1);
            vm.noActives();
        };

        vm.updateIng = function (idx, ing) {
            vm.ingList[idx] = angular.copy(ing);
            vm.onUpdate({list:vm.ingList});
            vm.setValid(true);
        };

        vm.deleteIng = function (idx) {
            vm.ingList.splice(idx, 1);
            vm.onUpdate({list:vm.ingList});
            vm.setValid(true);
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.noActives();
        };

        /**
         * sets the record in the expanding table to select less than zero means none
         * @param value
         */
        function setRecord(value){
            vm.selectRecord = value;
        }

        /**
         * Flag set to indicate if the record details are in a valid state
         * @param value
         */
        vm.setValid=function(value){
            vm.isDetailValid=value;
        };
        /**
         * Controls the state of the add new ingredient button
         * @returns {*|boolean}
         */
        vm.addNewDisabled=function(){
            return (vm.newIngFormShown || !vm.isDetailValid);
        };
        /**
         * Sets the UI state for the add new template
         */
        vm.addNewIngredientState=function(){
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.newIngFormShown = true;
            vm.setValid(false);
            return(vm.newIngFormShown);
        };
        /**
         * When new record is cancelled, resets the state
         */
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.newIngFormShown = false
        };

        //this sends a signal to the error summary to update itself, when a value changes.
        //is $error is a nested json object, won't fire for any child form errors
        $scope.$watch('ailCtrl.activeIngListForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

        vm.noActives=function(){

            if(!vm.ingList ||vm.ingList.length===0){
                vm.noActiveValues="";
                return true;
            }
            vm.noActiveValues="values";
            return false;
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.noActiveId="no_active"+scopeId;
        }



    }
})();
