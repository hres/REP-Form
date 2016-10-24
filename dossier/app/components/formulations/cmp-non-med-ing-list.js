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
            templateUrl: './app/components/formulations/tpl-non-med-ing-list.html',
            controller: nonMedIngListCtrl,
            controllerAs: 'nmilCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function nonMedIngListCtrl() {

        var self = this;
        self.isDetailValid = true; //TODO: Need to manage for Add and Delete

        self.$onInit = function () {

            self.newIngFormShown = false;

            self.colNames = [
                {label: "VARIANT_NAME", binding: "varId", width: "15"},
                {label: "NONMEDICINAL_INGREDIENT", binding: "ingName", width: "65"},
                {label: "CAS_NUM", binding: "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "animaHumanSourced", width: "10"}
            ];
            self.ingList = [];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }
        };


        self.addIng = function (ing) {
            //console.debug('ingList addIng: ' + ing);
            self.ingList.push(ing);
            self.newIngFormShown = false;
            self.onUpdate({list:self.ingList});
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
            self.onUpdate({list:self.ingList});
        };

        self.deleteIng = function (idx) {
            // console.debug('ingList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
            self.onUpdate({list:self.ingList});
        }

    }
})();

