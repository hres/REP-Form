/**
 * Created by Abdessamad on 9/25/2016.
 */


(function () {
    'use strict';

    angular
        .module('containerTypeListModule', ['expandingTable','containerTypeRecordModule'])
})();


(function () {
    'use strict';

    angular
        .module('containerTypeListModule')
        .component('cmpContainerTypeList', {
            templateUrl: './app/components/formulations/tpl-container-type-list.html',
            controller: containerTypeListCtrl,
            controllerAs: 'ctlCtrl',
            bindings: {
                containers: '<',
                onUpdate: '&'
            }
        });

    function containerTypeListCtrl(){

        var self = this;

        self.$onInit = function(){

            self.colNames = [
                {"label":"Container Type", "binding":"containerType"},
                {"label":"Package Size", "binding":"packageSize"}
            ];

            self.containerList = [

                {
                    "containerType" : "A",
                    "packageSize" : "A",
                    "shelfLifeYears": "9999",
                    "shelfLifeMonths": "99",
                    "tempMin": "999",
                    "tempMax": "999"
                },

                {
                    "containerType" : "B",
                    "packageSize" : "A",
                    "shelfLifeYears": "9999",
                    "shelfLifeMonths": "99",
                    "tempMin": "999",
                    "tempMax": "999"
                },

                {
                    "containerType" : "C",
                    "packageSize" : "A",
                    "shelfLifeYears": "9999",
                    "shelfLifeMonths": "99",
                    "tempMin": "999",
                    "tempMax": "999"
                },

            ]
        }

    }

})();
