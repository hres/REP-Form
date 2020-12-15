/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMainApplication', [
            'cspConstants',
            'errorMessageModule',
            'numberFormat',
            'alertModule'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMainApplication')
        .component('cmpCspMainApplication', {
            templateUrl: 'app/scripts/components/cspMainAppl/tpl-csp-main-application.html',
            controller: mainApplicationController,
            controllerAs: 'cspMainApplCtrl',
            bindings: {
                record: '<',
                drugUses: '<',
                showErrors: '&',
                updateErrorSummary: '&'
            }
        });

    mainApplicationController.$inject = ['NOC', 'GRANT', 'OWNER', 'OWNER_BEHALF','FRENCH', '$scope','$translate'];
    function mainApplicationController(NOC, GRANT, OWNER, OWNER_BEHALF,FRENCH, $scope,$translate) {

        var vm = this;
        vm.model="";
        vm.nocValue=NOC;
        vm.grantValue=GRANT;
        vm.ownerValue=OWNER;
        vm.ownerBehalfValue=OWNER_BEHALF;
        vm.drugUseList = [];
        vm.ngModelOptSetting = {updateOn: 'blur'};
        vm.requiredOnlyError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.numberError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_6NUM"}
        ]; //used for control number
        vm.alerts = [false, false, false, false, false];
        vm.lang = $translate.proposedLanguage() || $translate.use();

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            _setIDNames();
            vm.alerts = [false, false, false, false, false, false];
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){

                vm.model=changes.record.currentValue;
            }
            if (changes.drugUses) {
                vm.drugUseList = changes.drugUses.currentValue;
            }
        };

        /**
         * Sets the names and ids of the fields
         * Important: end of name to contain underscore and scope
         * @private
         */
        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.controlNumberId = "controlNumber" + scopeId;
            vm.dateNOCId = "dateNOC" + scopeId;
            vm.drugUseId = "drugUse" + scopeId;
            vm.applApplyId = "time120" + scopeId; //timely submission radio question
            vm.applStateId = "applicantApply" + scopeId; //Statements as to applicant
            vm.medIngedId = "medicinalIngredient" + scopeId;
            vm.prodNameId = "prod_name" + scopeId;
        }

        $scope.$watch('cspMainApplCtrl.mainApplForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

        /*
         Makes an instruction visible baseed on an index passed in
         Index sets the UI state in the alerts array
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };
        vm.toggleAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = !vm.alerts[value];
            }
        };

        vm.isFrench=function(){
            return(vm.lang===FRENCH);
        };


    }
})();