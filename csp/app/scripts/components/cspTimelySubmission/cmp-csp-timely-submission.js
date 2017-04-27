/**
 * Created by dkilty   on 06/04/2017.
 */
(function () {
    'use strict';

    angular
        .module('cspTimelySubmission', ['cspConstants']);

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
                updateErrorSummary:'&'
            }
        });

    timelySubmissionController.$inject = ['EUOTHER', 'NO_APPLICATION', 'APPLICATION', '$scope'];
    function timelySubmissionController(EUOTHER, NO_APPLICATION, APPLICATION, $scope) {

        var vm = this;
        vm.model = {};
        vm.countries = [];
        vm.noAppValue=NO_APPLICATION;
        vm.appValue=APPLICATION;

        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];


        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
            if (changes.countryList) {
                vm.countries = changes.countryList.currentValue;
            }
        };

        vm.isEuOther = function () {
            vm.model.country
            if (vm.model.country === EUOTHER) {
                return true;

            } else {
                vm.model.otherCountry = "";
            }
            return false;

        };
        vm.isApplicationMarketing=function(){

            if(!vm.model) return false;

            if(vm.model.submissionStatement=== APPLICATION){
              return true;
            }else{
                vm.model.approvalDate="";
                vm.model.country="";
                vm.model.otherCountry="";
                return false;
            }
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

    }
})();

