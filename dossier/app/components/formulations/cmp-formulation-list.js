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
            templateUrl: './app/components/formulations/tpl-formulation-list.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {
                formulations : '<'
            }
        });

    function formulationsCtrl(){

        var self=this;
        self.isDetailValid = true //TODO this must be managed
        self.noFormulations="";
        self.$onInit = function() {

            self.newFormShown = false;

            self.colNames = [
                {label: "FORM_ID", binding: "formulationId", width: "15"},
                {label: "FORMULATION_NAME", binding: "formulationName", width: "85"}
            ];
            self.formulationList = [];

            if(self.formulations){
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



        self.addNew = function(frm){
            console.debug('self.formulationList.length add new: ' + self.formulationList.length);
            frm.formulationId = self.formulationList.length + 1;
            self.formulationList.push(frm);
            self.newFormShown = false;
            self.resetToCollapsed = true;
            self.updateFormulationsError();
        };

        self.update = function(idx, frm){
            self.formulationList[idx] = angular.copy(frm);
        };

        self.delete = function(idx){
            //console.debug('frmList delete: ' + idx);
            if(self.formulationList.splice(idx,1))
                self.resetToCollapsed = true;

            self.updateFormulationsError();

        }

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

        }



    }

})();

