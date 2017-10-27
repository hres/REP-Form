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
                showErrorSummary:'<'
            }
        });

    function materialIngListCtrl() {

        var self = this;
        self.isDetailValid = true;
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.newIngFormShown = false;
        self.colNames = [
            {label: "MATERIAL_NAME", binding: "ingredientName", width: "70"},
            {label: "CAS_NUM", binding: "cas", width: "15"},
            {label: "PRESENT_IN_FINAL", binding: "inFinalContainer", width: "15"}
        ];

        self.$onInit = function () {
            self.newIngFormShown = false;
            self.isDetailValid = true;
            self.selectRecord = -1;
            self.ingList = [];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }

        };

        self.$onChanges = function (changes) {

            if (changes.ingredients) {
                self.ingList = changes.ingredients.currentValue;
            }
        };

        self.addNew = function (ing) {
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
            // console.debug('containerList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
            self.onUpdate({list:self.ingList});
            self.setValid(true);
            setRecord(-1);
            self.resetToCollapsed = !self.resetToCollapsed;
        };

        function setRecord(value){
            self.selectRecord = value;
        }

        /**
         * Sets the UI state for the add new template
         */
        self.addNewIngredientState=function(){
            self.resetToCollapsed = !self.resetToCollapsed;
            self.newIngFormShown = true;
            self.setValid(false);
            return(self.newIngFormShown);
        };
        self.addNewDisabled=function(){
            return ( self.newIngFormShown || !self.isDetailValid);
        };
        self.setValid=function(value){
            self.isDetailValid=value;
        };
        self.onNewCancel=function(){
            self.setValid(true);
            self.newIngFormShown = false
        }




    }

})();
