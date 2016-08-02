(function () {
    'use strict';
    angular
        .module('dossierApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'addressList',
            'contactList',
            'fileIO'
        ])
})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .controller('MainController', MainController);

    MainController.$inject = ['CompanyService','hpfbFileProcessing','$filter']

    function MainController(CompanyService,hpfbFileProcessing,$filter) {

        var vm = this;
        //TODO magic number
        vm.rootTag='COMPANY_ENROL'
        vm.isIncomplete = true;
        vm.userType;
        vm.applTypes = ["NEW", "AMEND", "APPROVED"] //TODO service ofor app types
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;

        var _company = new CompanyService();

       vm.company = {
           dataChecksum: "",
           enrolmentVersion: "1",
           dateSaved: "1999-01-21",
           applicationType: "APPROVED",
           softwareVersion: "string",
           companyId: "string",
           addressList: [],
           contactList: []
       };
       vm.company = _company.getModelInfo();

        vm.initUser=function(id){
            if(!id) id='INT'
            vm.userType=id;
        }
        vm.isAmend=function(){
            return(vm.company.applicationType==="AMEND")
        }

        vm.saveJson=function(){
            var writeResult=_transformFile()
            console.log("this is the transform result:\n"+writeResult)
            hpfbFileProcessing.writeAsJson(writeResult, "companyEnrol", vm.rootTag);
        }
        vm.saveXML=function(){
            var writeResult=_transformFile()
            hpfbFileProcessing.writeAsXml(writeResult, "companyEnrol", vm.rootTag);
        }
        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile(){
            updateDate();
            if(!vm.isExtern()) {
                incrementMajorVersion();
            }else {
                incrementMinorVersion();
            }
            var writeResult=_company.transformToFileObj(vm.company);
            return writeResult;
        }

        function _setComplete() {
            if (vm.company.companyId) {
                vm.isIncomplete = false;
            } else {
                vm.isIncomplete = true;
            }
        }
        function _loadFileContent(fileContent) {
            console.log("Calling the content callback")
            if(!fileContent)return;
            _company = new CompanyService();
            //used to do this way, caused focus issues
           // vm.company = _company.getModelInfo();

           var resultJson = fileContent.jsonResult;

            if(resultJson) {
                _company.transformFromFileObj(resultJson)
                vm.company={}
                angular.extend(vm.company,_company.getModelInfo())
                _setComplete();
            }
        };
        function _setApplTypeToAmend() {
            //TODO magic number
            vm.company.applicationType = 'AMEND';
        }

        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        }

        vm.getNewAddress = function () {
            var result = _company.createAddressRecord();
            return result;
        }

        vm.getNewContact = function () {
            console.log("This is hte contact gte")
            var result = _company.createContactRecord();
            return result;
        }

        vm.updateAddressRecord=function(address){
            console.log("in app updateAddressRecord"+address)
            if(!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            console.log("found an entry "+idx)
            vm.company.addressList[idx] = address
            var temp=vm.company.addressList;
            vm.company.addressList=[];
            vm.company.addressList=temp;
        }

        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
        }
        function updateDate(){
            if(vm.company) {

                vm.company.dateSaved=getTodayDate();

            }
        }

        function getTodayDate(){
            var d=new Date();
            var isoDate = d.getFullYear() + '-'
                + pad(d.getMonth() + 1) + '-'
                + pad(d.getDate())
            return(isoDate)
            function pad(n) {return n<10 ? '0'+n : n}
        }

        function incrementMinorVersion() {
            if (!vm.company.enrolmentVersion) {
                vm.company.enrolmentVersion = "0.1";
            } else {
                var parts = vm.company.enrolmentVersion.split('.')
                var dec = parseInt(parts[1]);
                var result = parts[0] + "." + (dec + 1);
                vm.company.enrolmentVersion = result;
            }
        }

        /**
         * Increments the major version. Sets the minor to false
         */
        function incrementMajorVersion(){
            if (!vm.company.enrolmentVersion) {
                vm.company.enrolmentVersion = "1.0";
            } else {
                var parts = vm.company.enrolmentVersion.split('.')
                var whole = parseInt(parts[0]);
                var result = (whole+1) + ".0"
                vm.company.enrolmentVersion = result;
            }
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
        .module('dossierApp')
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
                    }
                ]
            })
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
        }]);
})();