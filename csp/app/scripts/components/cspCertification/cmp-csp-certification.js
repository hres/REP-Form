/**
 * Created by dkilty on 06/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspCertification', [
            'errorMessageModule',
            'hpfbConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspCertification')
        .component('cmpCspCertification', {
            templateUrl: 'app/scripts/components/cspCertification/tpl-csp-certification.html',
            controller: cspCertificationController,
            controllerAs: 'cspCertCtrl',
            bindings: {
                record: '<',
                showErrors: '&',
                updateErrorSummary: '&',
                language:'<'
            }
        });

    cspCertificationController.$inject = ['$scope','FRENCH'];
    function cspCertificationController($scope, FRENCH) {

        var vm = this;
        vm.model = {
            "givenName": "",
            "initials": "",
            "surname": "",
            "title": "",
            "dateSigned": ""
        };

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIDNames();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
            if(changes.language){
                vm.lang=changes.language.currentValue;
            }
        };

        /**
         * Sets the field names and ids called on $onInit.
         * Important: use underscore scope as the last in name
         * @private
         */
        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.firstNameId = "certFirstName" + scopeId;
            vm.lastNameId = "certLastName" + scopeId;
            vm.salutationId = "certSalut" + scopeId;
            vm.jobTitleId = "certJobTitle" + scopeId;
            vm.dateSignedId = "certDateSigned" + scopeId;
        }

        vm.isFrench=function(){
            return vm.lang===FRENCH;
        };

        /**
         * Watch for changes in the errors and tell the error summary
         */
        $scope.$watch('cspCertCtrl.certForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

    }
})();