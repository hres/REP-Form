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

    activityMainCtrl.$inject = ['ActivityService', 'ApplicationInfoService', 'hpfbFileProcessing', '$scope', '$window', '$location', '$translate'];
    function activityMainCtrl(ActivityService, ApplicationInfoService, hpfbFileProcessing, $scope, $window, $location, $translate) {
        var vm = this;
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
        vm.yesNoList = ["Y", "N"]; //TODO magic numbers

        vm.initUser = function (id) {
            /* if (!id) id = 'EXT';
            vm.userType = id;
            if (id == 'INT') {
                vm.saveXMLLabel = "APPROVE_FINAL"
            } else {
                vm.saveXMLLabel = "SAVE_DRAFT"
             }*/

        };

        vm.$onInit = function () {
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
        vm.isAmend = function () {
            return (vm.formAmend);
        };


        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.rootTag);
            vm.showAllErrors = true;
            _setComplete()
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
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

        vm.openHelp = function (type) {
            var helpLink = ""
            var currentLang = $translate.proposedLanguage() || $translate.use();

            var url = $location.absUrl() //this is the only one that seems to work
            var split = url.split('/')
            var length = url.length - split[split.length - 1].length;
            var newUrl = url.substring(0, length);
            console.log("new url" + newUrl)

            switch (type) {
                case'activityFile':
                    helpLink = newUrl + "help-activity-load-" + currentLang + ".html";
                    $window.open(helpLink);
                    break;
                case 'activityMain':
                    helpLink = newUrl + "help-activity-main-" + currentLang + ".html";
                    $window.open(helpLink);
                    break;

                case 'activityRep':
                    helpLink = newUrl + "help-activity-rep-" + currentLang + ".html";
                    $window.open(helpLink);
                    break;
            }

        }


        /**
         * @ngdoc -creates a filename for activity file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {
            var filename = "HC_RA_Enrolment";
            if (vm.activityRoot && vm.activityRoot.dstsControlNumber) {
                filename = filename + "_" + vm.activityRoot.dstsControlNumber;
            }
            return filename;
        }

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
            return vm.activityService.transformToFileObj(vm.activityRoot);
        }

        vm.updateActivityType = function () {
            if (vm.activityService.isNotifiableChange(vm.activityRoot.regActivityType)) {
                vm.activityService.resetRationale();
                vm.isNotifiable = true;
            } else {
                vm.activityService.resetNotifiableChanges();
                vm.isNotifiable = false;
            }
        };

        function _updateInfoValues() {
            vm.updateValues++;
        }

        $scope.$watch("main.activityEnrolForm.$valid", function () {
            disableXMLSave()
        }, true);

        function disableXMLSave() {

            vm.disableXML = vm.activityEnrolForm.$invalid || (vm.activityRoot.applicationType == vm.applicationInfoService.getApprovedType() && vm.isExtern());
        }
        function disableJSONSave() {

            vm.disableJson = (vm.activityRoot.applicationType == vm.applicationInfoService.getApprovedType() && vm.isExtern())
        }
        function _setComplete() {
            vm.isIncomplete = !vm.activityRoot.dstsControlNumber;
        }
        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.activityService = new ActivityService();
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.activityService.transformFromFileObj(resultJson);
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

        /**
         * @ngdoc returns if an external form
         * @returns {boolean}
         */
        vm.isExtern = function () {
            return vm.userType == "EXT";

        };

        /**
         * @ngdoc method when a form gets approved
         * remove any amendment checkboxes
         */
        function updateModelOnApproval() {
            //reset any amend selections
            if (!vm.activityRoot) return;
            if (vm.activityRoot.relatedActivity) {
                for (var i = 0; i < vm.activityRoot.relatedActivity.length; i++) {
                    vm.activityRoot.relatedActivity[i].amendRecord = false;
                }
            }
            if (vm.activityRoot.contactRecord) {
                for (var j = 0; j < vm.activityRoot.contactRecord.length; j++) {
                    vm.activityRoot.contactRecord[j].amend = false;
                }
            }
        }
    }
})();

