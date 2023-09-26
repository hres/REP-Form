/**
 * Created by dkilty   on 06/04/2017.
 */
(function () {
    'use strict';

    angular
        .module('cspTimelySubmission', ['cspConstants','hpfbConstants','cspDataModule']);

})();

(function () {
    'use strict';

    angular
        .module('cspTimelySubmission')
        .component('cmpCspTimelySubmission', {
            templateUrl: 'app/scripts/components/cspTimelySubmission/tpl-csp-timely-submission.html',
            controller: timelySubmissionController,
            controllerAs: 'timelySubCtrl',
            bindings: {
                record: '<',
                countryList: '<',
                showErrors: '&',
                updateErrorSummary: '&'

            }
        });

    timelySubmissionController.$inject = ['FRENCH','EUOTHER', 'NO_APPLICATION', 'APPLICATION', '$scope','$translate','cspDataLists'];
    function timelySubmissionController(FRENCH, EUOTHER, NO_APPLICATION, APPLICATION, $scope,$translate,cspDataLists) {

        var vm = this;
        vm.model = {};
        vm.countries = [];
        vm.noAppValue = NO_APPLICATION;
        vm.appValue = APPLICATION;

        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.alerts = [false];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
            vm.lang = $translate.proposedLanguage() || $translate.use();
            vm.countries=cspDataLists.getMarketingCountries();
            $translate('NOAPPLICATION').then(function (data) {
                vm.noApplication = data;
            });
            $translate('APPLICATION').then(function (data) {
                vm.application = data;
            });
            vm.alerts = [false];
           // vm.noApplication = $translate.instant('NOAPPLICATION'); //NEW LINE
           // vm.application = $translate.instant('APPLICATION'); //NEW LINE
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
        };

        vm.isApplicationMarketing = function () {

            if (!vm.model) return false;

            if (vm.model.submissionStatement === APPLICATION) {
                if(!vm.countries || !vm.countries.length>0) {
                    //guarding against potential race conditions
                    console.warn("Needed to redefine marketing countries")
                    vm.countries = cspDataLists.getMarketingCountries();
                }
                return true;
            } else {
                vm.model.approvalDate = "";
                vm.model.country = "";
                vm.alerts[0] = false; //reset alert
                return false;
            }
        };
        vm.isFrench=function(){
            return vm.lang===FRENCH;
        };

        /**
         * sets the ids of the controls
         * If use the same name as label, don't need a separate definition!
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.timelyId = "statements_timely" + scopeId;
            vm.dateId = "timelyDate" + scopeId;
            vm.countryId = "timelyCountry" + scopeId;
            vm.otherCountryId = "other_eu_country" + scopeId;
        }

        $scope.$watch('timelySubCtrl.timelySubForm.$error', function () {
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

        vm.isFrench=function(){
            return(vm.lang===FRENCH);
        };



    }
})();

