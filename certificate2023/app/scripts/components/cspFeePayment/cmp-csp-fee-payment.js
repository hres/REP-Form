/**
 * Created by dkilty on 06/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspFeePayment', [
            'hpfbConstants',
            'errorMessageModule'

        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspFeePayment')
        .component('cmpCspFeePayment', {
            templateUrl: 'app/scripts/components/cspFeePayment/tpl-csp-fee-payment.html',
            controller: feePaymentController,
            controllerAs: 'cspFeePayCtrl',
            bindings: {
                record: '<',
                paymentTypes: '<',
                showErrors: '&',
                updateErrorSummary: '&'
            }
        });

    feePaymentController.$inject = ['FRENCH', '$scope', '$translate'];
    function feePaymentController(FRENCH, $scope,$translate) {
        var vm = this;
        vm.model = null;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.paymentList = [];
        vm.url = "";
        vm.preamble = "";
        vm.urlTitle = "";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberMaxError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "TYPE_ZERO_MIN"},
            {type: "max", displayAlias: "MSG_ERR_MAX"},
            {type: "number", displayAlias: "TYPE_NUMBER"}
        ];
        vm.alerts = [false];

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
            //formatted text so needs to be injecteed
            $translate('FEE_PREAMBLE').then(function (data) {
                vm.preamble = data;
            });
            // $translate('FEE_URL').then(function (data) {
            //     vm.url = data;
            // });
            // $translate('FEE_URLTITLE').then(function (data) {
            //     vm.urlTitle = data;
            // });
           // vm.preamble =  $translate.instant("FEE_PREAMBLE");
            //vm.url = $translate.instant("FEE_URL");
            //vm.urlTitle = $translate.instant("FEE_URLTITLE");
            vm.alerts = [false];
        };

        vm.showError = function (ctrl) {
            if (!ctrl) return;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true;
            }
            return false;
        };
        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
            if (changes.paymentTypes) {
                vm.paymentList = changes.paymentTypes.currentValue;
            }
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.feeId = "fee" + scopeId;
            vm.feeTypeId = "feeType" + scopeId;
            // vm.ackFeeSubmitId = "ack_fee_submit" + scopeId;
        }

        /**
         * Watch for changes in the errors and tell the error summary
         */
        $scope.$watch('cspFeePayCtrl.paymentForm.$error', function () {
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