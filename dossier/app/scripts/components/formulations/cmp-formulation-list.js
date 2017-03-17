/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationsModule', ['expandingTable', 'formulationRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationsModule')
        .component('cmpFormulations', {
            templateUrl: 'app/scripts/components/formulations/tpl-formulation-list.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {
                formulations: '<',
                recordChanged: '&'
            }
        });

    function formulationsCtrl() {

        var self = this;
        self.isDetailValid = true; //TODO this must be managed
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.noFormulations = "";
        self.$onInit = function () {

            self.newFormShown = false;

            self.colNames = [
                {label: "FORM_ID", binding: "formulationId", width: "15"},
                {label: "FORMULATION_NAME", binding: "formulationName", width: "85"}
            ];
            self.formulationList = [];

            if (self.formulations) {
                self.formulationList = self.formulations;
            }
            self.updateFormulationsError();
        };


        self.$onChanges = function (changes) {

            if (changes.formulations) {
                self.formulationList = changes.formulations.currentValue;
                self.updateFormulationsError();
            }
        };

        self.addNew = function () {


            var newRecord = {
                "formulationId": (getMaxFormulationId() + 1),
                "formulationName": "",
                "dosageForm": "",
                "dosageFormOther": "",
                activeIngList: [],
                nMedIngList: [],
                containerTypes: [],
                animalHumanMaterials: [],
                routeAdmins: [],
                countryList: []
            };

            self.formulationList.push(newRecord);
            //set the expanding table
            setRecord(self.formulationList.length - 1);
            self.resetToCollapsed = !self.resetToCollapsed;
            self.updateFormulationsError();
        };

        self.addCopy=function(formulation){
            if(formulation) {
                formulation.formulationId=(getMaxFormulationId() + 1);
                self.formulationList.push(formulation);
                setRecord(- 1);
                self.resetToCollapsed = !self.resetToCollapsed;
            }
        };

        self.update = function (idx, frm) {
            self.formulationList[idx] = angular.copy(frm);
        };

        self.delete = function (idx) {
            //console.debug('frmList delete: ' + idx);
            if (self.formulationList.splice(idx, 1))
                setRecord(-1);
                self.resetToCollapsed = !self.resetToCollapsed;

            self.updateFormulationsError();

        };



        /**
         * Used for error messaging that there are no active ingredients
         * @returns {string} string is empty if not empty
         */
        self.updateFormulationsError = function () {
            if (self.formulationList && self.formulationList.length > 0) {
                self.noFormulations = self.formulationList.length;
                return false;
            }
            self.noFormulations = "";
            return true;

        };

        function setRecord(value){
            self.selectRecord=value;

        }
        function getMaxFormulationId() {
            var out = 0;
            var list = self.formulationList;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].formulationId > out) {
                        out = list[i].formulationId;
                    }
                }
            }
            return out;
        }


    }

})();

