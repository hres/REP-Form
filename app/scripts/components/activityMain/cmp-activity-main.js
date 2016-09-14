/**
 * Created by dkilty on 9/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityMain', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'fileIO',
            'ngSanitize',
            'activityService',
            'applicationInfoService',
            'applicationInfo',
            'filterLists',
            'relatedActivityList',
            'activityChange',
            'activityForm',
            'numberFormat',
            'contactModule26',
            'contactModule',
            'contactModule25'
        ])
})();

(function () {
    'use strict';

    angular
        .module('activityMain')
        .component('cmpActivityMain', {
            templateUrl: 'app/scripts/components/activityMain/tpl-activity-main.html',
            controller: activityMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    activityMainCtrl.$inject = ['ActivityService', 'ApplicationInfoService', 'hpfbFileProcessing', '$filter', '$scope', '$location'];
    function activityMainCtrl(ActivityService, ApplicationInfoService, hpfbFileProcessing, $filter, $scope, $location) {
        var vm = this;

        vm.$onInit = function () {
        };

        /**
         *
         * @param changes
         */

        var vm = this;
        //TODO magic number

        vm.isIncomplete = true;
        vm.userType = "EXT";
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        vm.activityService = new ActivityService();
        vm.applicationInfoService = new ApplicationInfoService();
        vm.rootTag = vm.activityService.getRootTag();
        vm.activityRoot = vm.activityService.getModelInfo();
        vm.showAllErrors = false;
        vm.formAmend = false;
        vm.isNotifiable = false;

        vm.configField = {
            "label": "CONTROL_NUMBER",
            "fieldLength": "6",
            "tagName": "dstsControlNumber",
            "errorMsg": "MSG_LENGTH_6"
        };
        vm.yesNoList = ["Y", "N"];
        vm.initUser = function (id) {
            /* if (!id) id = 'EXT';
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

        }

        /**
         * @ngdoc method -returns whether this application is an amendment
         * @returns {boolean}
         */
        vm.isAmend = function () {
            return (vm.formAmend);
        };


        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, "activityEnrol", vm.rootTag);
            vm.showAllErrors = true;
            _setComplete()
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsXml(writeResult, "activityEnrol", vm.rootTag);
            _setComplete()
        };


        vm.showError = function (isTouched, isInvalid) {

            return (isInvalid && isTouched) || (vm.showErrors() && isInvalid );
        };
        //TODO remove?
        vm.showErrorCheck = function (isTouched, value) {

            return (!value && isTouched) || (vm.showErrors() && !value );
        };

        //TODO handled save pressed?
        vm.showErrors = function () {
            return vm.showAllErrors;
        };
        vm.setThirdParty = function () {
            vm.thirdPartyState = (vm.activityRoot.isThirdParty === "Y")
        };

        vm.setApplicationType = function (value) {
            vm.activityRoot.applicationType = value;
            vm.formAmend = vm.activityRoot.applicationType === vm.applicationInfoService.getAmendType();
            disableXMLSave();
        };
        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                vm.activityRoot.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.activityRoot.enrolmentVersion);
                vm.activityRoot.applicationType = ApplicationInfoService.prototype.getApprovedType();
                updateModelOnApproval(); //updates all the amend
            } else {
                vm.activityRoot.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.activityRoot.enrolmentVersion);
            }
            _updateInfoValues();
            var writeResult = vm.activityService.transformToFileObj(vm.activityRoot);
            return writeResult;
        }

        vm.updateActivityType = function () {
            if (vm.activityService.isNotifiableChange(vm.activityRoot.regActivityType)) {
                vm.activityService.resetRationale();
                vm.isNotifiable = true;
            } else {
                vm.activityService.resetNotifiableChanges();
                vm.isNotifiable = false;
            }
        }

        function _updateInfoValues() {
            vm.updateValues++;
        }

        $scope.$watch("main.activityEnrolForm.$valid", function () {
            disableXMLSave()
        }, true);

        function disableXMLSave() {

            vm.disableXML = vm.activityEnrolForm.$invalid || (vm.activityRoot.applicationType == vm.applicationInfoService.getApprovedType() && vm.isExtern());
        };

        function disableJSONSave() {

            vm.disableJson = (vm.activityRoot.applicationType == vm.applicationInfoService.getApprovedType() && vm.isExtern())
        };

        function _setComplete() {
            vm.isIncomplete = !vm.activityRoot.dstsControlNumber;
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.activityService = new ActivityService();
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.activityService.transformFromFileObj(resultJson);
                vm.activityRoot = {};
                vm.activityRoot = {};
                angular.extend(vm.activityRoot, vm.activityService.getModelInfo());
                _setComplete();
            }
            vm.showAllErrors = true;
            disableXMLSave();
            vm.setThirdParty();
        }

        /**
         * ngdoc method to set the application type to amend
         * @private
         */
        function _setApplTypeToAmend() {

            vm.activityRoot.applicationType = vm.ApplicationInfoService.getAmendType();
            disableXMLSave();
        }

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.activityRoot) {
                vm.activityRoot.dateSaved = vm.applicationInfoService.getTodayDate();
            }
        }

        vm.isExtern = function () {
            if (vm.userType == "EXT") {
                return true;
            }
            return false;
        }

        /**
         * @ngdoc method when a form gets approved
         * remove any amendment checkboxes
         */
        function updateModelOnApproval() {
            //reset any amend selections

            if (activityRoot.relatedActivity) {
                for (var i = 0; i < activityRoot.relatedActivity.length; i++) {
                    activityRoot.relatedActivity[i].amendRecord = false;
                }
            }
            if (activityRoot.contactRecord) {
                for (var j = 0; i < activityRoot.contactRecord.length; j++) {
                    activityRoot.contactRecord[j].amend = false;
                }
            }
            /*
             for (var i = 0; i < vm.company.addressList.length; i++) {
             vm.company.addressList[i].amendRecord = 'N';
             }
             for (var j = 0; j < vm.company.contactList.length; j++) {
             vm.company.contactList[j].amendRecord = 'N';
             }*/
        }


    }
})();

