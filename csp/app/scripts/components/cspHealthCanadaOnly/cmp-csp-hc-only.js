/**
 * Created by dkilty on 04/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspHCOnly', [
            'errorMessageModule',
            'hpfbConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspHCOnly')
        .component('cmpCspHcOnly', {
            templateUrl: 'app/scripts/components/cspHealthCanadaOnly/tpl-csp-hc-only.html',
            controller: hcOnlyController,
            controllerAs: 'hcOnlyCtrl',
            bindings: {
                record: '<',
                showErrors:'&',
                updateErrorSummary:'&'
            }
        });

    hcOnlyController.$inject = ['$scope','$translate','FRENCH'];
    function hcOnlyController($scope,$translate, FRENCH) {

        var vm = this;
        vm.model = {};
        vm.requiredOnlyError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.lang = $translate.proposedLanguage() || $translate.use();
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
            if(changes.record){
                vm.model=changes.record.currentValue;
            }
        };


        vm.isFrench=function(){
            return vm.lang===FRENCH;
        };

        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.dateReceivedId = "date_appl_rec" + scopeId;
            vm.companyCodeId= "csp_company_code"+ scopeId;
            vm.applicationCodeId="csp_application_code"+ scopeId;
            vm.notesId="notes"+ scopeId;
        }

        $scope.$watch('hcOnlyCtrl.hcOnlyForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

    }
})();