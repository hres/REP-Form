/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule')
        .component('cmpNonMedIngRecord', {
            templateUrl: './app/components/formulations/tpl-non-med-ing-record.html',
            controllerAs: 'ingRecCtrl',
            controller: nonMedIngRecCtrl,
            bindings: {
                record:'<'
            }

        });

    function nonMedIngRecCtrl(){

        var self = this;

        self.$onInit = function(){

            self.ingModel = {
                varId : "001",
                ingName : "",
                cas : "",
                type: "",
                standard : "",
                strength : "",
                units : "",
                per: "",
                calcAsBase: false,
                animalHumanSourced : false,
                nanoMaterial : "",
                nanoMaterialOther : ""
            };

            if(self.record){
                self.ingModel = self.record;
            }
        }

    }

})();
