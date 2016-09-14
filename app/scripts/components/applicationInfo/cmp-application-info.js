/**
 * Created by dkilty on 8/14/2016.
 */

(function () {
    'use strict';
    angular
        .module('applicationInfo', [])
})();

(function () {
    'use strict';
    angular
        .module('applicationInfo')
        .component('cmpApplicationInfo', {
            templateUrl: 'app/scripts/components/applicationInfo/tpl-application-info.html',
            controller: ApplInfoCtrl,
            controllerAs: 'infoCtrl',
            bindings: {
                record: '<',
                userType: '<',
                isIncomplete: '<',
                configureIdField: '<',
                setType: '&'
            }
        });

    function ApplInfoCtrl() {
        var vm = this;
        vm.applTypes = ["NEW", "AMEND", "APPROVED"];
        vm.formType = 'EXT';
        vm.infoModel = {
            applicationType: "NEW",
            enrolmentVersion: "0.0",
            dateSaved: ""
        };
        vm.fieldIdLabel="";
        vm.fieldLength="";
        vm.tagName="fieldId";
        vm.setAsIncomplete = true;
        vm.errorMsg = "";

        vm.$onInit = function () {
            ///do init
        };
        vm.$onChanges = function (changes) {
            if (changes.userType) {
                vm.formType = changes.userType.currentValue;
            }
            if (changes.record) {
                vm.infoModel = changes.record.currentValue;
            }
            if (changes.isIncomplete) {
                vm.setAsIncomplete = changes.isIncomplete.currentValue;
            }
            if(changes.configureIdField){
                _setConfigItems(changes.configureIdField.currentValue);
            }
        };
        function _setConfigItems(configJson){
          vm.fieldIdLabel=  configJson.label;
            vm.fieldLength = configJson.fieldLength;
          vm.tagName=configJson.tagName;
            vm.errorMsg = configJson.errorMsg;
        }
        vm.isExtern = function () {
            return vm.formType == "EXT";
        };
        vm.setAmendState = function () {
            //TODO hardcode should be service
            vm.setType({type: 'AMEND'});
        }

    }
})();
