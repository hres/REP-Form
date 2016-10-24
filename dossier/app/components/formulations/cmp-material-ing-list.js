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
            templateUrl: './app/components/formulations/tpl-material-ing-list.html',
            controller: materialIngListCtrl,
            controllerAs: 'milCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function materialIngListCtrl() {

        var self = this;
        self.isDetailValid = true; //TODO manage detail state in add and delete
        self.colNames = [
            {label: "MATERIAL_NAME", binding: "ingredientName", width: "70"},
            {label: "CAS_NUM", binding: "cas", width: "15"},
            {label: "PRESENT_IN_FINAL", binding: "inFinalContainer", width: "15"}
        ];

        self.$onInit = function () {


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
            self.ingList.push(ing);
            self.newFormShown = false;
            self.resetToCollapsed = true;
            self.onUpdate({list:self.ingList});
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
            self.onUpdate({list:self.ingList});
        };

        self.deleteIng = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
            self.resetToCollapsed = true;
            self.onUpdate({list:self.ingList});
        }

    }

})();
