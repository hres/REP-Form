/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule')
        .component('cmpActiveIngRecord', {
            templateUrl: './app/components/formulations/tpl-active-ing-record.html',
            controllerAs: 'ingRecCtrl',
            controller: activeIngRecCtrl,
            bindings: {
                record: '<'
            }

        });

    function activeIngRecCtrl() {

        var self = this;

        self.$onInit = function () {

            self.ingModel = {
                ingId: "001",
                ingName: "",
                cas: "",
                standard: "",
                strength: "",
                units: "",
                per: "",
                calcAsBase: false,
                animalHumanSourced: false,
                nanoMaterial: "",
                nanoMaterialOther: ""
            };

            if (self.record) {
                self.ingModel = self.record;
            }
        }

    }

})();
