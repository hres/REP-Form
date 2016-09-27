/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule')
        .component('cmpContainerTypeRecord',{
            templateUrl: './app/components/formulations/tpl-container-type-record.html',
            controllerAs: 'ctrCtrl',
            controller: containerTypeRecCtrl,
            bindings: {
                record:'<'
            }

        });

    function containerTypeRecCtrl(){

        var self = this;

        self.$onInit = function(){

            self.ctModel = {
                "containerType" : "A",
                "packageSize" : "A",
                "shelfLifeYears": "9999",
                "shelfLifeMonths": "99",
                "tempMin": "999",
                "tempMax": "999"
            };

            if(self.record){
                self.ctModel = self.record;
            }
        }

    }

})();
