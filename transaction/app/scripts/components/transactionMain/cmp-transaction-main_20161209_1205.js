(function () {
    'use strict';
    angular
        .module('transactionApp')
        .component('cmpTransactionMain', {
            templateUrl: 'app/scripts/components/transactionMain/tpl-transaction-main_20161209_1205.html',
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
            var hours = date.getHours();
            var minutes = date.getMinutes();

            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }


            filename = filename + "_" + date.getFullYear() + "_" + month + "_" + day + "_" + hours + minutes;
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
            //vm.transactionService = new TransactionService();
            var resultJson = fileContent.jsonResult;

            if (resultJson) {
                vm.transactionService.transformFromFileObj(resultJson);
                vm.transaction = {};
                // angular.extend(vm.transaction, vm.transactionService.getModelInfo())
                vm.transaction = vm.transactionService.getModelInfo();
                //doing this as model won't update otherwise
                vm.transaction.projectManager1 = "";
                vm.transaction.projectManager2 = "";
                vm.transaction.isSolicited = "";
                vm.transaction.solicitedRequester = "";
                vm.transaction.contactSame = false;

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

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        }

        vm.addInstruct = function () {
            vm.alerts = [
                {
                    type: 'info',
                    msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.'
                }
            ];
        }


    }
})();

