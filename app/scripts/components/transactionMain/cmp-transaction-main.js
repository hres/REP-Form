(function () {
    'use strict';
    angular
        .module('transactionApp')
        .component('cmpTransactionMain', {
            templateUrl: 'app/scripts/components/transactionMain/tpl-transaction-main.html',
            controller: TransactionMainCtrl,
            controllerAs: 'main'
        });

    TransactionMainCtrl.$inject = ['TransactionService', 'hpfbFileProcessing', '$filter']

    function TransactionMainCtrl(TransactionService, hpfbFileProcessing, $filter) {

        var vm = this;
        vm.savePressed = false;
        vm.userType;
        vm.transactionService = new TransactionService();
        vm.rootTag = vm.transactionService.getRootTag();
        vm.transaction = vm.transactionService.getModelInfo();
        vm.showContent = _loadFileContent;
        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile()
            vm.rootTag = vm.transactionService.getRootTag();
            hpfbFileProcessing.writeAsJson(writeResult, "transactionEnrol", vm.rootTag)
            vm.savePressed = true;
        }
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile()
            hpfbFileProcessing.writeAsXml(writeResult, "transactionEnrol", vm.rootTag);
            vm.savePressed = true;
        }
        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            var writeResult = vm.transactionService.transformToFileObj(vm.transaction);
            return writeResult;
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.transactionService = new TransactionService();
            var resultJson = fileContent.jsonResult;

            if (resultJson) {
                vm.transactionService.transformFromFileObj(resultJson)
                vm.transaction = {}
                angular.extend(vm.transaction, vm.transactionService.getModelInfo())
            }
        };


        vm.getNewRepContact = function () {
            var result = vm.transactionService.createRepContact();
            return result;
        }

        //TODO remove?
        vm.updateAddressRecord = function (address) {
            if (!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.company.addressList[idx] = address
            var temp = vm.company.addressList;
            vm.company.addressList = [];
            vm.company.addressList = temp;
        }

        vm.isExtern = function () {
            if (vm.userType == "EXT") {
                return true;
            }
            return false;
        }
        vm.showErrors = function () {
            return (vm.transactionEnrolForm.$dirty && vm.transactionEnrolForm.$invalid && vm.savePressed)

        }


    }
})();

