/**
 * Created by Abdessamad on 9/25/2016.
 */


(function () {
    'use strict';

    angular
        .module('containerTypeListModule', ['expandingTable', 'containerTypeRecordModule'])
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

    function containerTypeListCtrl() {

        var self = this;
        self.isDetailValid = true; //TODO": needs to be managed on delete and add
        self.$onInit = function () {

            self.colNames = [
                {label: "CONTAINER_TYPE", binding: "containerType", width: "50"},
                {label: "PACKAGE_SIZE", binding: "packageSize", width: "50"}
            ];

            self.containerList = [

                {
                    "containerType": "A",
                    "packageSize": "A",
                    "shelfLifeYears": 9999,
                    "shelfLifeMonths": 99,
                    "tempMin": 999,
                    "tempMax": 999
                },

                {
                    "containerType": "B",
                    "packageSize": "A",
                    "shelfLifeYears": 9999,
                    "shelfLifeMonths": 99,
                    "tempMin": 999,
                    "tempMax": 999
                },

                {
                    "containerType": "C",
                    "packageSize": "A",
                    "shelfLifeYears": 9999,
                    "shelfLifeMonths": 99,
                    "tempMin": 999,
                    "tempMax": 999
                },

            ]
        }

    }

})();
