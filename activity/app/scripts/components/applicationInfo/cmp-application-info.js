/**
 * Created by dkilty on 8/14/2016.
 */

(function () {
    'use strict';
    angular
        .module('applicationInfo', ['numberFormat','hpfbConstants'])
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

    ApplInfoCtrl.$inject=['NEW_TYPE','AMEND_TYPE','APPROVED_TYPE','EXTERNAL_TYPE'];

    function ApplInfoCtrl(NEW_TYPE,AMEND_TYPE,APPROVED_TYPE,EXTERNAL_TYPE) {
        var vm = this;
        vm.applTypes = [NEW_TYPE, AMEND_TYPE, APPROVED_TYPE];
        vm.formType = EXTERNAL_TYPE;
        vm.infoModel = {
            applicationType: "NEW",
            enrolmentVersion: "0.0",
            dateSaved: ""
        };
        vm.fieldIdLabel = "";
        vm.minFieldLength = "";
        vm.isNumber=false;
        vm.fieldLength = "";
        vm.tagName = "fieldId";
        vm.setAsIncomplete = true;
        vm.errorMsg = "";
        vm.maxErrorMsg = "";
        vm.isDossier = false;
        vm.isNumber=false;

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
            if (changes.configureIdField) {
                _setConfigItems(changes.configureIdField.currentValue);
            }
        };
        function _setConfigItems(configJson) {
            vm.fieldIdLabel = configJson.label;
            vm.fieldLength = configJson.fieldLength; //this is the max
            vm.tagName = configJson.tagName;
            if (configJson.minFieldLength) {
                vm.minFieldLength = configJson.minFieldLength;
            } else {
                vm.minFieldLength = configJson.fieldLength;
            }
            vm.errorMsg = configJson.errorMsg;

            if (configJson.minErrorMsg) {
                vm.minErrorMsg = configJson.minErrorMsg;
            } else {
                vm.minErrorMsg = configJson.errorMsg;
            }
            if(configJson.isNumber){
                vm.isNumber=configJson.isNumber;
            }
            vm.isDossier = configJson.isDossier;
            if (angular.isUndefined(vm.isDossier)) {
                vm.isDossier = false;
            }
        }
        vm.showAmendMsg=function(){

            if(!vm.record){
                return false;
            }
            return vm.record.applicationType===AMEND_TYPE;
        };

        vm.isExtern = function () {
            return vm.formType == EXTERNAL_TYPE;
        };
        vm.setAmendState = function () {
            //TODO hardcode should be service
            vm.setType({type: AMEND_TYPE});
        }

    }
})();
