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
            templateUrl: './app/components/formulations/tpl-active-ing-list.html',
            controller: activeIngListCtrl,
            controllerAs: 'ailCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function activeIngListCtrl() {

        var self = this;
        self.noActives = "";
        self.$onInit = function () {

            self.newIngFormShown = false;
            self.isDetailValid = true; //TODO needs to be managed for save and add
            self.colNames = [
                {label: "MEDICINAL_INGREDIENT", binding: "ingName", width: "70"},
                {label: "CAS_NUM", "binding": "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "15"}
            ];
            self.ingList = [];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }
            self.updateActiveError();
        };


        self.addIng = function (ing) {
            //console.debug('ingList addIng: ' + ing);
            self.ingList.push(ing);
            self.newIngFormShown = false;
            self.updateActiveError();
            self.onUpdate({list:self.ingList});
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
            self.onUpdate({list:self.ingList});
        };

        self.deleteIng = function (idx) {
            // console.debug('ingList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
            self.updateActiveError();
            self.onUpdate({list:self.ingList});
        }
        /**
         * Used for error messaging that there are no active ingredients
         * @returns {string} string is empty if not empty
         */
        self.updateActiveError = function () {
            if (self.ingList && self.ingList.length > 0) {
                self.noActives = self.ingList.length;
                return false;
            }
            self.noActives = "";
            return true;

        }
    }
})();
