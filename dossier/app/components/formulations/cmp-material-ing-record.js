/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule')
        .component('cmpMaterialIngRecord', {
            templateUrl: './app/components/formulations/tpl-material-ing-record.html',
            controllerAs: 'mirCtrl',
            controller: materialIngRecCtrl,
            bindings: {
                record: '<',
                showError: '&'
            }

        });
    materialIngRecCtrl.$inject = ['DossierLists'];
    function materialIngRecCtrl(DossierLists) {

        var self = this;
        self.yesNoList = DossierLists.getYesNoList();

        self.$onInit = function () {

            self.mirModel = {
                "ingredientId": "A",
                "ingredientName": "A",
                "cas": "00-00-0",
                "ingredientStandard": "A",
                "inFinalContainer": ""
            };

            if (self.record) {
                self.mirModel = self.record;
            }
        }

        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && self.showErrors()));

        }

    }
})();
