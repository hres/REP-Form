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

        self.$onInit = function () {

            self.colNames = [
                {"label": "Material Name", "binding": "ingredientName"},
                {"label": "CAS", "binding": "cas"},
                {"label": "Present In Final", "binding": "inFinalContainer"}
            ];

            self.ingList = [
                {
                    "ingredientId": "A",
                    "ingredientName": "A",
                    "cas": "00-00-0",
                    "ingredientStandard": "A",
                    "inFinalContainer": true
                },
                {
                    "ingredientId": "B",
                    "ingredientName": "A",
                    "cas": "00-00-1",
                    "ingredientStandard": "A",
                    "inFinalContainer": true
                },
                {
                    "ingredientId": "C",
                    "ingredientName": "A",
                    "cas": "00-00-2",
                    "ingredientStandard": "A",
                    "inFinalContainer": true
                }
            ];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }

        }

    }

})();
