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
                language: '<',
                paymentTypes: '<',
                showErrors: '&',
                updateErrorSummary: '&'
            }
        });

    feePaymentController.$inject = ['FRENCH', '$scope'];
    function feePaymentController(FRENCH, $scope) {
        var vm = this;

        var url_en = 'http://www.hc-sc.gc.ca/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv_pa_av-eng.pdf';
        var url_fr = 'http://www.hc-sc.gc.ca/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv_pa_av-fra.pdf';
        var preambleHtml_en = "This form should <b><u>not</u></b> include payment information (eg credit card number),"
            + " other than as specifically requested below, as the information included within an electronic submission"
            + " cannot be deleted and will remain aspart of the CSP application on record. As such, please separately <b><u>mail</u></b> or <b><u>fax</u></b> the";

        var preambleHtml_fr = "fr_This form should <b><u>not</u></b> include payment information (eg credit card number),"
            + " other than as specifically requested below, as the information included within an electronic submission"
            + " cannot be deleted and will remain aspart of the CSP application on record. As such, please separately <b><u>mail</u></b> or <b><u>fax</u></b> the";

        var urlTitle_en = "Advanced Payment Details Form for Drug Submissions, Master Files and Certificates of Supplementary Protection";
        var urlTitle_fr = "";

        vm.model = null;
        vm.lang = 'en';
        vm.paymentList = [];
        vm.url = url_en;
        vm.preamble = preambleHtml_en;
        vm.urlTitle = urlTitle_en;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberMaxError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "min", displayAlias: "TYPE_ZERO_MIN"},
            {type: "max", displayAlias: "MSG_ERR_MAX"},
            {type: "number", displayAlias: "TYPE_NUMBER"}
        ];


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
            if (changes.paymentTypes) {
                vm.paymentList = changes.paymentTypes.currentValue;
            }
            if (changes.language) {
                vm.lang = changes.language.currentValue;
                if (vm.lang === FRENCH) {
                    vm.url = url_fr;
                    vm.preamble = preambleHtml_fr;
                    vm.urlTitle = urlTitle_fr;
                } else {
                    vm.url = url_en;
                    vm.preamble = preambleHtml_en;
                    vm.urlTitle = urlTitle_en;
                }
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
            vm.ackFeeSubmitId = "ack_fee_submit" + scopeId;
        }

        /**
         * Watch for changes in the errors and tell the error summary
         */
        $scope.$watch('cspFeePayCtrl.paymentForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

    }
})();