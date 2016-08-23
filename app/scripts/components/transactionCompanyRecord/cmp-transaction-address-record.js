/**
 * Created by dkilty on 8/5/2016.
 */


(function () {
    'use strict';

    angular
        .module('addressModule2', [])
})();


/**
 * Created by dkilty on 16/08/2016.
 */
/*

(function () {
    'use strict';

    angular
        .module('addressModule2', ['addressModule'])
})();
 */

(function () {
    'use strict';

    angular
        .module('addressModule2')
        .component('cmpTransactionAddressRecord', {
            templateUrl: 'app/scripts/components/transactionCompanyRecord/tpl-transaction-address-record.html',
            controller: transAddressRecCtrl,
            controllerAs: 'addressRec',
            bindings: {
                addressRecord: '<'
            }
        });

    //transAddressRecCtrl.$inject = ['TransactionService']

    function transAddressRecCtrl() {
        var vm = this;
        vm.addressModel = {}

        vm.$onInit = function () {
            console.log("init the transaction record")
            vm.addressModel = vm.addressModel;
        };


        vm.$onChanges = function (changes) {
            //how this is currently wired, this will never fire!
            if (changes.addressRecord) {
                vm.addressModel = changes.addressRecord.currentValue;
            }
        };


        vm.showErrors = function () {

            return (true);
        };
    }

})();

