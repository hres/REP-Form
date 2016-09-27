/**
 * Created by Abdessamad on 9/23/2016.
 */


(function () {
    'use strict';

    angular
        .module('nonMedIngListModule', ['expandingTable','nonMedIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('nonMedIngListModule')
        .component('cmpNonMedIngList', {
            templateUrl: './app/components/formulations/tpl-non-med-ing-list.html',
            controller: nonMedIngListCtrl,
            controllerAs: 'nmilCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function nonMedIngListCtrl(){

        var self = this;

        self.$onInit = function(){
            self.colNames = [
                {"label":"Variant ID", "binding":"varId"},
                {"label":"Active Ingredient Name", "binding":"ingName"},
                {"label":"CAS", "binding":"cas"},
                {"label":"Human/Animal Sourced ?", "binding":"humanAnimalSourced"}
            ];
            self.ingList = [
                {
                    "varId": "Var1",
                    "ingName": "ing1",
                    "cas": "00-00-1",
                    "type": "A",
                    "humanAnimalSourced": "No",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced":true,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "varId": "Var2",
                    "ingName": "ing2",
                    "cas": "00-00-2",
                    "type": "A",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced":false,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "varId": "Var3",
                    "ingName": "ing3",
                    "cas": "00-00-3",
                    "type": "A",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": false,
                    "animalHumanSourced":true,
                    "nanoMaterial": "Other",
                    "nanoMaterialOther": "A"
                },

            ];
        }

    }
})();

