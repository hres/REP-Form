(function () {
    'use strict';
    angular
        .module('transactionApp')
        .component('cmpTransactionMain', {
            templateUrl: 'app/scripts/components/transactionMain/tpl-transaction-main.html',
            controller: TransactionMainCtrl,
            controllerAs: 'main'
        });

    TransactionMainCtrl.$inject = ['TransactionService', 'hpfbFileProcessing', '$filter'];

    function TransactionMainCtrl(TransactionService, hpfbFileProcessing, $filter) {

        var vm = this;
        vm.savePressed = false;
        vm.userType = "EXT";
        vm.transactionService = new TransactionService();
        vm.rootTag = vm.transactionService.getRootTag();
        vm.transaction = vm.transactionService.getModelInfo();
        vm.showContent = _loadFileContent;
        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            vm.rootTag = vm.transactionService.getRootTag();
            hpfbFileProcessing.writeAsJson(writeResult, _getFileName(), vm.rootTag);
            vm.savePressed = true;
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsXml(writeResult, _getFileName(), vm.rootTag);
            vm.savePressed = true;
        };

        function _getFileName() {
            var date = new Date();
            var filename = "HCREPRT";
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            filename = filename + "_" + date.getFullYear() + "_" + month + "_" + day + "_" + date.getHours() + date.getMinutes();
            return (filename);
        }


        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            return vm.transactionService.transformToFileObj(vm.transaction);
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.transactionService = new TransactionService();
            var resultJson = fileContent.jsonResult;

            if (resultJson) {
                vm.transactionService.transformFromFileObj(resultJson);
                vm.transaction = {};
                angular.extend(vm.transaction, vm.transactionService.getModelInfo())
            }
        }
        vm.getNewRepContact = function () {
            return vm.transactionService.createRepContact();
        };

        //TODO remove?
        vm.updateAddressRecord = function (address) {
            if (!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.company.addressList[idx] = address;
            var temp = vm.company.addressList;
            vm.company.addressList = [];
            vm.company.addressList = temp;
        };

        vm.isExtern = function () {
            return vm.userType == "EXT";

        };
        vm.showErrors = function () {
            return (vm.transactionEnrolForm.$dirty && vm.transactionEnrolForm.$invalid && vm.savePressed)

        }


    }
})();

