/**
 * Created by dkilty on 03/04/2017.
 */


(function () {
    'use strict';

    angular
        .module('cspApplicant', [
            'contactModule',
            'addressModule',
            'errorMessageModule'
        ]);

})();


(function () {
    'use strict';
    angular
        .module('cspApplicant')
        .component('cmpCspApplicant', {
            templateUrl: 'app/scripts/components/cspContactRecord/tpl-csp-applicant.html',
            controller: cspApplicantCtrl,
            controllerAs: 'cspApplCtrl',
            bindings: {
                record: '<',
                addApplicant: '&',
                deleteApplicant: '&',
                showErrors: '&',
                alias: '<',
                updateErrorSummary: '&'
            }
        });


    cspApplicantCtrl.$inject = ['$scope'];

    /* @ngInject */
    function cspApplicantCtrl($scope) {
        var vm = this;
        vm.title = 'CspApplicantCtrl';

        vm.model =
                {
                    "role": {
                        "applicant": true,
                        "billing": true
                    },
                    "contact": {
                        "salutation": "",
                        "givenName": "",
                        "surname": "",
                        "initials": "",
                        "title": "",
                        "phone": "",
                        "phoneExt": "",
                        "fax": "",
                        "email": ""
                    },
                    "address": {
                        "street": "",
                        "city": "",
                        "stateList": "",
                        "stateText": "",
                        "country": "",
                        "postalCode": ""
                    },
                    "applicantName": "",
                    "isBillingDifferent": false
                };
        vm.applicantTextAlias = "APPLICANTNAME";

        vm.type = "_appl"; //sets the type of applicant either applicant or billing
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function () {
            //after on changes called
            if (vm.model && vm.model.role && (!vm.model.role.applicant)) {
                vm.applicantTextAlias = "COMPANY_NOABBREV";
                vm.type = "_bill";

            } else {
                vm.applicantTextAlias = "APPLICANTNAME";
                vm.type = "_appl";
            }
            _setIDNames();
        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
            if (changes.alias) {

                vm.pref = changes.alias.currentValue;
            }

        };

        // component only has one field, just watch this field for changes to update error summary
        $scope.$watch('cspApplCtrl.applForm[cspApplCtrl.applicantId].$invalid', function () {
            vm.updateErrorSummary();
        }, true);

        /**
         * Adds or deletes and applicant address depending if a
         * user selects billing address or not
         */
        vm.setBilling = function () {
            if (vm.model.isBillingDifferent) {

                vm.addApplicant();
            } else {
                vm.deleteApplicant();
            }
            vm.updateErrorSummary();
        };

        /**
         * Creates the ids for all the ui elements
         * @private
         */
        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.applicantId = "applicant" + vm.type + scopeId;
        }


    }
    }

    )();

