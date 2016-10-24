(function () {
    'use strict';
    angular
        .module('companyMain', [
            'pascalprecht.translate',
            'companyService',
            'applicationInfoService',
            'ngMessages',
            'ngAria',
            'addressList2',
            'contactList2',
            'fileIO',
            'ngSanitize',
            'applicationInfo',
            'filterLists',
            'hpfbConstants'
        ])
})();

(function () {
    'use strict';
    angular
        .module('companyMain')
        .component('cmpCompanyMain', {
            templateUrl: 'app/scripts/components/companyMain/tpl-company-main.html',
            controller: companyMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    companyMainCtrl.$inject = ['CompanyService', 'ApplicationInfoService', 'hpfbFileProcessing', '$filter', '$scope'];

    function companyMainCtrl(CompanyService, ApplicationInfoService, hpfbFileProcessing, $filter, $scope) {

        var vm = this;
        //TODO magic number
        vm.rootTag = 'COMPANY_ENROL';
        vm.isIncomplete = true;
        vm.formAmendType = false;
        vm.userType = "EXT";
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.applicationInfoService = new ApplicationInfoService();
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        var _company = new CompanyService();
        vm.configCompany = {
            "label": "COMPANY_ID",
            "fieldLength": "6",
            "tagName": "companyId"
        };

        //TODO get rid of private variable
        vm.companyService = _company;
        vm.applTypes = vm.companyService.getApplicationTypes(); //TODO service ofor app types
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

        vm.initUser = function (id) { //TODO needed?
            /*
             if (!id) id = 'EXT'
             vm.userType = id;
             if (id == 'INT') {
             vm.saveXMLLabel = "APPROVE_FINAL"
             } else {
             vm.saveXMLLabel = "SAVE_DRAFT"
             }*/
        };

        vm.$onChanges = function (changes) {
            if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType == 'INT') {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }

        };

        /**
         * @ngdoc method -returns whether this application is an amendment
         * @returns {boolean}
         */
        vm.setAmend = function () {

            vm.formAmendType = (vm.company.applicationType === vm.applicationInfoService.getAmendType())
        };

        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.rootTag);
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();

            hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
        };

        function _createFilename() {
            var filename = "HC_CO_Enrolment";
            if (vm.company && vm.company.companyId) {
                filename = filename + "_" + vm.company.companyId;
            }
            return filename;
        }

        /**
         * @ngdcc method updates data and increments version before creating json
         */

        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                vm.company.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.company.enrolmentVersion);
                vm.company.applicationType = ApplicationInfoService.prototype.getApprovedType();
                updateModelOnApproval();
            } else {
                vm.company.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.company.enrolmentVersion)
            }
            return _company.transformToFileObj(vm.company);
        }

        $scope.$watch("main.companyEnrolForm.$valid", function () {
            disableXMLSave()
        }, true);

        function disableXMLSave() {

            vm.disableXML = vm.companyEnrolForm.$invalid || (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern())
        }

        function disableJSONSave() {

            vm.disableJson = (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern())
        }

        function _setComplete() {
            vm.isIncomplete = !vm.company.companyId;
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            _company = new CompanyService();
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                _company.transformFromFileObj(resultJson);
                vm.company = {};
                angular.extend(vm.company, _company.getModelInfo());
                _setComplete();
                vm.setAmend();

            }
            disableXMLSave();
        }
        /**
         * ngdoc method to set the application type to amend
         * @private
         */
        vm.setApplType = function (type) {

            vm.company.applicationType = type;
            disableXMLSave();
            vm.setAmend();
        }

        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        };

        vm.getNewAddress = function () {
            return _company.createAddressRecord();
        };

        vm.getNewContact = function () {
            return _company.createContactRecord();
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

        //TODO remove?
        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
        };

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.company) {
                vm.company.dateSaved = vm.applicationInfoService.getTodayDate()
            }
        }


        vm.isExtern = function () {
            return vm.userType == "EXT";

        };
        /**
         * @ngdoc method when a form gets approved
         * remove any amendment checkboxes
         */
        function updateModelOnApproval() {
            //reset any amend selections
            for (var i = 0; i < vm.company.addressList.length; i++) {
                vm.company.addressList[i].amendRecord = false;
            }
            for (var j = 0; j < vm.company.contactList.length; j++) {
                vm.company.contactList[j].amendRecord = false;
            }
        }

    }
})();
