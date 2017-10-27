/**
 * Created by Abdessamad on 9/25/2016.
 */


(function () {
    'use strict';

    angular
        .module('containerTypeListModule', ['expandingTable', 'containerTypeRecordModule'])
})();


(function () {
    'use strict';

    angular
        .module('containerTypeListModule')
        .component('cmpContainerTypeList', {
            templateUrl: 'app/scripts/components/formulations/tpl-container-type-list.html',
            controller: containerTypeListCtrl,
            controllerAs: 'ctlCtrl',
            bindings: {
                containers: '<',
                onUpdate: '&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }
        });
    containerTypeListCtrl.$inject = ['$scope'];

    function containerTypeListCtrl($scope) {

        var vm = this;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.isDetailValid = true;
        vm.newIngFormShown = false;
        vm.noContainerValues="";

        vm.$onInit = function () {
            vm.selectRecord = -1;
            vm.resetToCollapsed = false;
            vm.isDetailValid = true;
            vm.newIngFormShown = false;
            _setIdNames();
            vm.colNames = [
                {label: "CONTAINER_TYPE", binding: "containerType", width: "50"},
                {label: "PACKAGE_SIZE", binding: "packageSize", width: "50"}
            ];

            vm.containerList = [];

            if (vm.containers) {
                vm.containerList = vm.containers;
            }

        };

        vm.$onChanges = function (changes) {

            if (changes.containers) {
                vm.containerList = changes.containers.currentValue;
                vm.noContainers();
            }
        };

        vm.addNew = function (ing) {
            vm.setValid(true);
            vm.containerList.push(ing);
            vm.newIngFormShown = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.onUpdate({list:vm.containerList});
            setRecord(-1);
            vm.noContainers();
        };

        vm.updateRec = function (idx, ing) {
            vm.containerList[idx] = angular.copy(ing);
            vm.onUpdate({list:vm.containerList});
            vm.setValid(true);
        };

        vm.deleteRec = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            vm.containerList.splice(idx, 1);
            vm.onUpdate({list:vm.containerList});
            vm.setValid(true);
            vm.noContainers();
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
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
            vm.noContainers();
            return(vm.newIngFormShown);
        };

        /**
         * When a new record is cancelled, resets state;
         */
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.newIngFormShown = false
            vm.noContainers();
        };

        /**
         * Checks if there is at least one container type
         * @returns {boolean}
         */
        vm.noContainers=function(){

            if(!vm.containerList ||   vm.containerList.length===0){
                vm.noContainerValues="";
                return true;
            }
            vm.noContainerValues="values";
            return false;
        };




        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.noContainerId="no_container"+scopeId;
        }
        
        
    }

})();
