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


            self.ingList = [
                {
                    "ingredientId": "A",
                    "ingredientName": "A",
                    "cas": "00-00-0",
                    "ingredientStandard": "A",
                    "inFinalContainer": "Y"
                },
                {
                    "ingredientId": "B",
                    "ingredientName": "A",
                    "cas": "00-00-1",
                    "ingredientStandard": "A",
                    "inFinalContainer": "Y"
                },
                {
                    "ingredientId": "C",
                    "ingredientName": "A",
                    "cas": "00-00-2",
                    "ingredientStandard": "A",
                    "inFinalContainer": "Y"
                }
            ];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }

        }

    }

})();
