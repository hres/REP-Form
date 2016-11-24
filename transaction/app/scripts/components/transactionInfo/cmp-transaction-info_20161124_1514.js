/**
 * Created by dkilty on 16/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionInfo', ['contactModule25', 'lifecycleList', 'ui.bootstrap'])
})();

(function () {
    'use strict';

    angular
        .module('transactionInfo')
        .component('cmpTransactionInfo', {
            templateUrl: 'app/scripts/components/transactionInfo/tpl-transaction-info_20161124_1514.html',
            controller: transactionInfoCtrl,
            controllerAs: 'transInfoCtrl',
            bindings: {
                transactionRoot: '<',
                 onUpdate: '&',
                 isAmend: '<',
                showErrors: '&',
                getTransaction: '&',
                getRepContact: '&',
                resetEctd: '&',
                deprecateSequence: '&'
            }
        });

    transactionInfoCtrl.$inject = ['TransactionService']
    function transactionInfoCtrl(TransactionService) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.transactionModel = {};
        vm.yesNoList = ['Y', 'N'];
        vm.showEctdSection = true;
        vm.showSolicitedDetail = false;
        vm.activityEditable = true;
        vm.isEctd = false;
        vm.alert1 = {
            type: 'info',
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.',
            show: false
        };
        vm.alert2 = {
            type: 'info',
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.',
            show: false
        };
        vm.$onInit = function () {
            vm.updateEctdState()
        }
        //TODO rename
        vm.$onChanges = function (changes) {
            if (changes.transactionRoot) {
                vm.transactionModel = changes.transactionRoot.currentValue;
                vm.updateEctdState();
                vm.setSolicitedState();
            }
        }

        vm.getNewTransaction = function () {
            return (vm.getTransaction());
        }
        vm.getNewRepContact = function () {
            return (vm.getRepContact());
        }

        vm.subtractSequence = function () {
            vm.deprecateSequence();
        }
        vm.showFormErrors=function(){

            return(vm.showErrors())
        }

        vm.showError = function (ctrl) {
            if (!ctrl) return;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
             return true
            }
            return false
        }
        vm.updateEctdState = function () {
            if (isEctdValue()) {
                //vm.showEctdSection = true;
                vm.isEctd = true;
            } else {
                //clear data
                //  vm.resetEctd();
                vm.isEctd = false;
                //vm.showEctdSection = false;
            }
        }
        function isEctdValue() {
            //TODO magic number
            return vm.transactionModel.isEctd === 'Y';
        }

        function isSolicitedValue() {
            //TODO magic number
            return vm.transactionModel.isSolicited === 'Y';
        }

        function isActivityChangesValue() {
            //TODO magic number
            return vm.transactionModel.isActivityChanges === 'Y';
        }


        /**
         * @ngdoc method sets the visibilty of the solicited requester field. Clears
         * the data if the field is hidden
         */
        vm.setSolicitedState = function () {
            if (isSolicitedValue()) {
                vm.showSolicitedDetail = true;
            } else {
                vm.showSolicitedDetail = false;
                vm.transactionModel.solicitedRequester = "";
            }
        }
        vm.updateActivityChanges = function () {
            vm.activityEditable = isActivityChangesValue();
        }

        vm.closeAlert = function (value) {
            switch (value) {
                case '1':
                    vm.alert1.show = false;
                    break;
                case '2':
                    vm.alert2.show = false;
                    break;
            }
        }

        vm.addInstruct = function (value) {

            switch (value) {
                case '1':
                    vm.alert1.show = true;
                    break;
                case '2':
                    vm.alert2.show = true;
                    break;
            }

        }



    }

})();

