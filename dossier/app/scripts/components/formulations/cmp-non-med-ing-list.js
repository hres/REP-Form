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
                onUpdate: '&'
            }
        });

    function nonMedIngListCtrl() {

        var self = this;
        self.isDetailValid = true;
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.newIngFormShown = false;
        self.$onInit = function () {

            self.newIngFormShown = false;
            self.isDetailValid = true;
            self.selectRecord = -1;
            self.colNames = [
                {label: "VARIANT_NAME", binding: "varId", width: "15"},
                {label: "NONMEDICINAL_INGREDIENT", binding: "ingName", width: "65"},
                {label: "CAS_NUM", binding: "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "10"}
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
            // console.debug('ingList deleteIng: ' + idx);
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

