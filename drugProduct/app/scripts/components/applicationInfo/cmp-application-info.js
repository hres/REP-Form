/**
 * Created by dkilty on 8/14/2016.
 */

(function () {
    'use strict';
    angular
        .module('applicationInfo', ['numberFormat','hpfbConstants','errorSummaryModule','errorMessageModule'])
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
                isHide: '<',
                configureIdField: '<',
                setType: '&',
                indexList:'<'

            }
        });

    ApplInfoCtrl.$inject=['NEW_TYPE','AMEND_TYPE','APPROVED_TYPE','EXTERNAL_TYPE','$scope', '$translate'];

    function ApplInfoCtrl(NEW_TYPE,AMEND_TYPE,APPROVED_TYPE,EXTERNAL_TYPE, $scope, $translate) {
        var vm = this;
        vm.applTypes = [NEW_TYPE, AMEND_TYPE, APPROVED_TYPE];
        vm.formType = EXTERNAL_TYPE;
        vm.infoModel = {
            applicationType: "NEW",
            applicationTypeText:"",
            enrolmentVersion: "0.0",
            dateSaved: "",
            reasonAmend:""
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
        vm.isAmend = false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.min6Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"}
        ];
        vm.min7Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"},
            {type: "pattern", displayAlias: "MSG_FORMAT_CHAR_6DIGITS"}
        ];
        vm.$onInit = function () {
            ///do init
            vm.infoModel.applicationTypeText = $translate.instant(vm.infoModel.applicationType);
            _setIdNames();
        };
        vm.$onChanges = function (changes) {
            if (changes.userType) {
                vm.formType = changes.userType.currentValue;
            }
            if (changes.record) {
                vm.infoModel = changes.record.currentValue;
                if(vm.infoModel.applicationType===AMEND_TYPE) {
                    vm.isAmend = true;
                }
                else if(vm.infoModel.applicationType===APPROVED_TYPE && !vm.isEmpty(vm.infoModel.reasonAmend)){
                    vm.isAmend = true;
                }
                else{
                    vm.isAmend = false;
                }
            }
            if (changes.isIncomplete) {
                vm.setAsIncomplete = changes.isIncomplete.currentValue;
            }
            if (changes.configureIdField) {
                _setConfigItems(changes.configureIdField.currentValue);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
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

        vm.showAmendButton = function(){
            return !vm.isHide;
        };

        vm.isExtern = function () {
            return vm.formType === EXTERNAL_TYPE;
        };
        vm.setAmendState = function () {
            //TODO hardcode should be service
            vm.setType({type: AMEND_TYPE});
            vm.isAmend = true;
        };

        function _setIdNames() {
            var scopeId="_"+  $scope.$id;
            vm.fieldId = "fieldId" +scopeId;
            vm.reasonAmend = "reason_amend" + scopeId;
            vm.compId = "company_id"+ scopeId;
            vm.dossierId = "dossier_id" + scopeId;
        }

        vm.isEmpty = function(aValue){
            return (typeof aValue === 'undefined' || aValue === null || aValue === "");
        };

        vm.showError = function (ctrl) {
            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (vm.showSummary && ctrl.$invalid));
        };

    }
})();
