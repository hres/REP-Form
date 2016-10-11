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

        self.$onInit = function () {

            self.newIngFormShown = false;
            self.isDetailValid = true; //TODO needs to be managed for save and add
            self.colNames = [
                {label: "MEDICINAL_INGREDIENT", binding: "ingName", width: "70"},
                {label: "CAS_NUM", "binding": "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "15"}
            ];
            self.ingList = [
                {
                    "ingName": "ing1",
                    "cas": "00-00-1",
                    "humanAnimalSourced": "No",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced": true,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "ingName": "ing2",
                    "cas": "00-00-2",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced": false,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "ingName": "ing3",
                    "cas": "00-00-3",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": false,
                    "animalHumanSourced": true,
                    "nanoMaterial": "Other",
                    "nanoMaterialOther": "A"
                },

            ];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }
        };


        self.addIng = function (ing) {
            //console.debug('ingList addIng: ' + ing);
            self.ingList.push(ing);
            self.newIngFormShown = false;
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
        };

        self.deleteIng = function (idx) {
            // console.debug('ingList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
        }

    }
})();
