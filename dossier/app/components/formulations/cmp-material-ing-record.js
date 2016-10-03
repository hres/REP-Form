/**
 * Created by Abdessamad on 9/26/2016.
 */

(function () {
    'use strict';

    angular
        .module('materialIngRecordModule', [])
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
                record: '<'
            }

        });

    function materialIngRecCtrl() {

        var self = this;

        self.$onInit = function () {

            self.mirModel = {
                "ingredientId": "A",
                "ingredientName": "A",
                "cas": "00-00-0",
                "ingredientStandard": "A",
                "inFinalContainer": true
            };


            if (self.record) {
                self.mirModel = self.record;
            }
        }
    }
})();
