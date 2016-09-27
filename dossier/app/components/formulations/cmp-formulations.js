/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationsModule', ['expandingTable','formulationRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationsModule')
        .component('cmpFormulations',{
            templateUrl: './app/components/formulations/tpl-formulations.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {}
        });

    function formulationsCtrl(){

        var self=this;

        self.$onInit = function() {
            self.colNames = [
                {"label": "Formulation", "binding": "formulation"},
                {"label": "Formulation Name", "binding": "formulationName"}
            ];
            self.formulationList = [
                {
                    "formulation": "1",
                    "formulationName": "Main Formulation",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                },
                {
                    "formulation": "2",
                    "formulationName": "Alternate 1",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                },
                {
                    "formulation": "3",
                    "formulationName": "Alternate 2",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                }

            ];
        }

    }

})();

