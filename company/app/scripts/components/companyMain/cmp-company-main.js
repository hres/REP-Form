(function () {
    'use strict';
    angular
        .module('companyMain', [
            'companyService',
            'applicationInfoService',
            'ngMessages',
            'ngAria',
            'addressList',
            'contactList2',
            'fileIO',
            'ngSanitize',
            'applicationInfo',
            'filterLists',
            'hpfbConstants',
            'ui.bootstrap',
            'errorSummaryModule',
            'focus-if'
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

    companyMainCtrl.$inject = ['CompanyService', 'ApplicationInfoService', 'hpfbFileProcessing', '$filter', '$scope', 'INTERNAL_TYPE', 'EXTERNAL_TYPE', 'APPROVED_TYPE', 'AMEND_TYPE','ENGLISH','$translate'];

    function companyMainCtrl(CompanyService, ApplicationInfoService, hpfbFileProcessing, $filter, $scope, INTERNAL_TYPE, EXTERNAL_TYPE, APPROVED_TYPE, AMEND_TYPE, ENGLISH, $translate) {

        var vm = this;
        vm.userType = EXTERNAL_TYPE;
        vm.isIncomplete = true;
        vm.formAmendType = false;
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.applicationInfoService = new ApplicationInfoService();
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        vm.disableDraftButton = false;
        vm.configCompany = {
            "label": "COMPANY_ID",
            "minFieldLength": "5",
            "fieldLength": "6",
            "tagName": "companyId",
            "minErrorMsg": "MSG_LENGTH_MIN5",
            "errorMsg": "MSG_LENGTH_6NUM"
        };
        vm.companyService = new CompanyService();
        vm.rootTag = '';
        if (vm.companyService) {
            vm.rootTag = vm.companyService.getRootTag();
        }
        vm.applTypes = vm.companyService.getApplicationTypes();
        vm.company = vm.companyService.getModelInfo();
        vm.alerts = [false, false, false, false, false];
        vm.updateSummary=false;
        vm.showErrorSummary=false;
        vm.lang = $translate.proposedLanguage() || $translate.use();

        vm.exclusions = {
            "contactListCtrl.contactListForm": "true",
            "addressListCtrl.addressListForm": "true"
        };
        vm.alias = {
            "roleMissing": {
                "type": "fieldset",
                "parent": "fs_roleMissing"
            },
            "contactRolesValid": {
                "type": "button",
                "parent": "",
                "target": "addContact"
            },
            "addressRolesValid": {
                "type": "button",
                "parent": "",
                "target": "addAddressBtn"
            },
            "phoneNumber": {
                "type": "pattern",
                "errorType": "MSG_ERR_PHONE_FORMAT"
            },
            "country": {
                "type": "select2",
                "name": "country"
            }
        };


        vm.initUser = function (id) {

        };

        vm.$onInit = function () {
            //add init code here
            //reset instructions
            vm.alerts = [false, false, false, false, false];
            vm.updateSummary=false;
            vm.showErrorSummary=false;
        };

        vm.$onChanges = function (changes) {
            if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType == INTERNAL_TYPE) {
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

            vm.formAmendType = (vm.company.applicationType === AMEND_TYPE)
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
            if(vm.companyEnrolForm.$invalid){
                vm.showErrorSummary= vm.showErrorSummary+1;
                vm.updateErrorSummary();

            }else {
                var writeResult = _transformFile();
                hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
                vm.showErrorSummary=true;
                vm.companyEnrolForm.$setPristine();
            }
        };

        /**
         * Creates a filename based on HC specifications
         * @returns {string}
         * @private
         */
        function _createFilename() {
            var draft_prefix = "DRAFTREPCO";
            var final_prefix = "HCREPCO";
            var filename = "";
            var separator="-";
            if (vm.userType === INTERNAL_TYPE) {

                filename = final_prefix;
            } else {
                filename = draft_prefix;
            }
            if (vm.company.companyId) {
                filename = filename + separator+ vm.company.companyId;
            }
            if (vm.company.enrolmentVersion) {
                filename = filename + separator+  vm.company.enrolmentVersion;
            }
            filename=filename.replace(".",separator);
            return filename.toLowerCase();
        }

        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                if(!vm.companyEnrolForm.$pristine) {
                    vm.company.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.company.enrolmentVersion);
                    vm.company.applicationType = ApplicationInfoService.prototype.getApprovedType();
                    updateModelOnApproval();
                }
            } else {
                vm.company.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.company.enrolmentVersion)
            }
            return vm.companyService.transformToFileObj(vm.company);
        }

        $scope.$watch("main.companyEnrolForm.$valid", function () {
            disableXMLSave()
        }, true);

        function disableXMLSave() {
            var isApprovedExternal = (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern());
            vm.disableDraftButton = isApprovedExternal;
            vm.disableXML = vm.companyEnrolForm.$invalid || isApprovedExternal; //used to disable the generate xml button
            //vm.showErrorSummary=true;
        };

        function disableJSONSave() {

            vm.disableJson = (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern())
        }

        function _setComplete() {
            vm.isIncomplete = !vm.company.companyId;
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.companyService = new CompanyService();
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.companyService.transformFromFileObj(resultJson);
                vm.company = {};
                angular.extend(vm.company, vm.companyService.getModelInfo());
                _setComplete();
                vm.setAmend();
                vm.showErrorSummary=false;
                vm.companyEnrolForm.$setDirty();

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
        };

        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        };

        vm.getNewAddress = function () {
            return vm.companyService.createAddressRecord();
        };

        vm.getNewContact = function () {
            return vm.companyService.createContactRecord();
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
            return vm.userType == EXTERNAL_TYPE;
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

        /*
        Makes an instruction visible baseed on an index passed in
        Index sets the UI state in the alerts array
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        }

        /**
         * Increments the conunter to send a signal to update the error summary module
          */
        vm.updateErrorSummary=function(){
            vm.updateSummary= vm.updateSummary+1;

        }
        /**
         * Determines if the current language is french
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang!== ENGLISH);
        };

    }
})();
