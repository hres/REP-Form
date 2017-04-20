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
                showErrors: '&'
            }
        });

    timelySubmissionController.$inject = ['EUOTHER','NO_APPLICATION','APPLICATION'];
    function timelySubmissionController(EUOTHER,NO_APPLICATION,APPLICATION) {

        var vm = this;
        vm.model = {};
        vm.countries = [];
        vm.noAppValue=NO_APPLICATION;
        vm.appValue=APPLICATION;
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {

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
        vm.showError = function (ctrl) {

            if (!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }

        }

    }
})();

