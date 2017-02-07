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
                onUpdate: '&'
            }
        });

    function activeIngListCtrl() {

        var self = this;
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.isDetailValid = true;
        self.$onInit = function () {

            self.newIngFormShown = false;
            self.isDetailValid = true;
            self.selectRecord = -1;

            self.colNames = [
                {label: "MEDICINAL_INGREDIENT", binding: "ingLabel", width: "65"},
                {label: "IN_LIST", binding: "autoIngred", width: "7"},
                {label: "CAS_NUM", "binding": "cas", width: "13"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "15"}
            ];
            self.ingList = [];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }
        };


        self.addIng = function (ing) {
            self.setValid(true);
            self.ingList.push(ing);
            self.newIngFormShown = false;
            self.resetToCollapsed = !self.resetToCollapsed;
            self.onUpdate({list:self.ingList});
            setRecord(-1);
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
            self.onUpdate({list:self.ingList});
            self.setValid(true);
        };

        self.deleteIng = function (idx) {
            self.ingList.splice(idx, 1);
            self.onUpdate({list:self.ingList});
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
         * When new record is cancelled, resets the state
         */
        self.onNewCancel=function(){
            self.setValid(true);
            self.newIngFormShown = false
        }
    }
})();
