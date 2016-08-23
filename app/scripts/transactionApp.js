(function () {
    'use strict';
    angular
        .module('transactionApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'fileIO',
            'services',
            'transactionInfo',
            'addressModule',
            'contactModule25',
            'contactModule26',
            'contactModule',
            'transactionService',
            'filterLists',
            'lcDetailsModule'
        ])
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .controller('MainController', MainController);

    MainController.$inject = ['TransactionService','hpfbFileProcessing','$filter']

    function MainController(TransactionService, hpfbFileProcessing, $filter) {

        var vm = this;
        vm.isIncomplete = true;
        vm.userType;
        vm.transactionService = new TransactionService();
        vm.rootTag = vm.transactionService.getRootTag();
        vm.transaction = vm.transactionService.getModelInfo();
        vm.showContent = _loadFileContent;
        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson=function(){
            var writeResult=_transformFile()
            vm.rootTag = vm.transactionService.getRootTag();
            hpfbFileProcessing.writeAsJson(writeResult, "transactionEnrol", vm.rootTag);
        }
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML=function(){
            var writeResult=_transformFile()
            hpfbFileProcessing.writeAsXml(writeResult, "transactionEnrol", vm.rootTag);
        }
        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile(){
           /* updateDate();
            if(!vm.isExtern()) {
                incrementMajorVersion();
            }else {
                incrementMinorVersion();
            }*/
            var writeResult = vm.transactionService.transformToFileObj(vm.transaction);
            return writeResult;
        }

        /*function _setComplete() {
            if (vm.company.companyId) {
                vm.isIncomplete = false;
            } else {
                vm.isIncomplete = true;
            }
        }*/
        function _loadFileContent(fileContent) {
            if(!fileContent)return;
            vm.transactionService = new TransactionService();
           var resultJson = fileContent.jsonResult;

            if(resultJson) {
                vm.transactionService.transformFromFileObj(resultJson)
                vm.transaction={}
                angular.extend(vm.transaction, vm.transactionService.getModelInfo())
            }
        };


        vm.getNewRepContact = function () {
            var result = vm.transactionService.createRepContact();
            return result;
        }

        //TODO remove?
        vm.updateAddressRecord=function(address){
            if(!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.company.addressList[idx] = address
            var temp=vm.company.addressList;
            vm.company.addressList=[];
            vm.company.addressList=temp;
        }



        vm.isExtern=function(){
            if(vm.userType=="EXT"){
                return true;
            }
            return false;
        }
    }
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: 'app/resources/countries-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/address-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/stateProvinces-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    },
                    {
                     prefix: 'app/resources/fileIO-',
                     suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/messages-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/contact-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/transaction-',
                        suffix: '.json'
                    }
                ]
            })
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
        }]);
})();
