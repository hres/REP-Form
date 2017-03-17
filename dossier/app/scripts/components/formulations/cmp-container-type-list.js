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
                onUpdate: '&'
            }
        });

    function containerTypeListCtrl() {

        var self = this;
        self.isDetailValid = true;
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.isDetailValid = true;
        self.newIngFormShown = false;

        self.$onInit = function () {
            self.selectRecord = -1;
            self.resetToCollapsed = false;
            self.isDetailValid = true;
            self.newIngFormShown = false;

            self.colNames = [
                {label: "CONTAINER_TYPE", binding: "containerType", width: "50"},
                {label: "PACKAGE_SIZE", binding: "packageSize", width: "50"}
            ];

            self.containerList = [];

            if (self.containers) {
                self.containerList = self.containers;
            }

        };

        self.$onChanges = function (changes) {

            if (changes.containers) {
                self.containerList = changes.containers.currentValue;
            }
        };

        self.addNew = function (ing) {
            self.setValid(true);
            self.containerList.push(ing);
            self.newIngFormShown = false;
            self.resetToCollapsed = !self.resetToCollapsed;
            self.onUpdate({list:self.containerList});
            setRecord(-1);
        };

        self.updateRec = function (idx, ing) {
            self.containerList[idx] = angular.copy(ing);
            self.onUpdate({list:self.containerList});
            self.setValid(true);
        };

        self.deleteRec = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            self.containerList.splice(idx, 1);
            self.onUpdate({list:self.containerList});
            self.setValid(true);
            setRecord(-1);
            self.resetToCollapsed = !self.resetToCollapsed;
        };
        /**
         * sets the record in the expanding table to select less than zero means none
         * @param value
         */
        function setRecord(value){
            self.selectRecord = value;
        }

        /**
         * Flag set to indicate if the record details are in a valid state
         * @param value
         */
        self.setValid=function(value){
            self.isDetailValid=value;
        };
        /**
         * Controls the state of the add new ingredient button
         * @returns {*|boolean}
         */
        self.addNewDisabled=function(){
            return (self.newIngFormShown || !self.isDetailValid);
        };
        /**
         * Sets the UI state for the add new template
         */
        self.addNewIngredientState=function(){
            self.resetToCollapsed = !self.resetToCollapsed;
            self.newIngFormShown = true;
            self.setValid(false);
            return(self.newIngFormShown);
        };

        /**
         * When a new record is cancelled, resets state;
         */
        self.onNewCancel=function(){
            self.setValid(true);
            self.newIngFormShown = false
        }

    }

})();
