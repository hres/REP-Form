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
            'commonStaticLists',
            'activityChange',
            'activityForm',
            'numberFormat',
            'contactModule26',
            'contactModule',
            'contactModule25',
            'adminSubmission',
            'ui.bootstrap'
        ])
})();

(function () {
    'use strict';

    angular
        .module('activityMain')
        .component('cmpActivityMain', {
            templateUrl: 'app/scripts/components/activityMain/tpl-activity-main_20170106_1415.html',
            controller: activityMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    activityMainCtrl.$inject = ['ActivityService', 'ApplicationInfoService', 'hpfbFileProcessing', '$scope', '$window', '$location', '$translate', 'CommonLists'];
    function activityMainCtrl(ActivityService, ApplicationInfoService, hpfbFileProcessing, $scope, $window, $location, $translate, CommonLists) {
        var vm = this;
        vm.isIncomplete = true;
        vm.userType = "EXT";
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        //vm.activityService = null;
        // vm.applicationInfoService ={};
        //vm.rootTag = "";
        //vm.activityRoot = {};
        vm.showAllErrors = false;
        vm.formAmend = false;
        vm.isNotifiable = false;
        vm.isRationale = false;
        vm.showActivity = false;
        vm.activityService = new ActivityService();
        vm.applicationInfoService = new ApplicationInfoService();
        vm.rootTag = vm.activityService.getRootTag();
        vm.activityRoot = vm.activityService.getModelInfo();

        vm.alerts = [];
        vm.configField = {
            "label": "CONTROL_NUMBER",
            "fieldLength": "6",
            "tagName": "dstsControlNumber",
            "errorMsg": "MSG_LENGTH_6"
        };
        vm.CommonLists = CommonLists;
        vm.yesNoList = vm.CommonLists.getYesNoList();
        vm.alert1 = {
            type: 'info',
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.',
            show: false
        };
        vm.alert2 = {
            type: 'info',
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.',
            show: false
        };
        vm.alert3 = {
            type: 'info',
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat nunc et tempor malesuada. Nullam tristique ligula blandit, posuere est ac, sagittis mi. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ullamcorper sagittis erat ac lobortis. Suspendisse bibendum sed mauris eget condimentum. Suspendisse egestas ligula a libero tincidunt, ut vehicula sem fermentum. Quisque semper scelerisque urna, in dignissim odio condimentum ac. Nullam suscipit malesuada magna, eget lacinia nulla tempor id. Curabitur tristique ipsum libero, ut pulvinar ipsum venenatis non. Ut porta, sem non blandit aliquet, ante mauris porta ex, quis iaculis elit orci eu leo. Morbi at enim nec odio ullamcorper molestie. Nulla sit amet magna consequat, blandit orci a, porta eros. Sed enim nisl, tempus ac imperdiet a, ornare gravida sapien. Curabitur ultricies dolor aliquet bibendum accumsan.',
            show: false
        };

        //TODO remove?
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
            vm.setThirdParty();
            vm.updateActivityType();
            vm.setAdminSubmission();
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
        /**
         * Sets the visibility and state of the related activities
         */
        vm.setAdminSubmission = function () {
            if (vm.activityRoot.isAdminSub === vm.CommonLists.getYesValue()) {
                vm.showActivity = true;
            } else {
                vm.activityRoot.relatedActivity = vm.activityService.getEmptyRelatedActivity();
                vm.showActivity = false;
            }

        }

        /**
         * @ngdoc -creates a filename for activity file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {


            var draft_prefix = "DRAFTREPRA";
            var final_prefix = "HCREPRA";
            var filename = "";
            if (vm.userType === 'INT') { //TODO magic numbers

                filename = final_prefix;
            } else {
                filename = draft_prefix;
            }
            if (vm.activityRoot && vm.activityRoot.dstsControlNumber) {
                filename = filename + "_" + vm.activityRoot.dstsControlNumber;
            }
            if (vm.activityRoot.enrolmentVersion) {
                //var parts = vm.activityRoot.enrolmentVersion.split('.');
                filename = filename + "_" + vm.activityRoot.enrolmentVersion;
            }
            return filename;


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
                vm.activityRoot.applicationType = ApplicationInfoService.getApprovedType();
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
                vm.isRationale = false;
            } else if (vm.activityService.isRationale(vm.activityRoot.regActivityType, vm.activityRoot.regActivityLead)) {
                vm.isRationale = true;
                vm.activityService.resetNotifiableChanges();
                vm.isNotifiable = false;
            }

            else {
                vm.activityService.resetNotifiableChanges();
                vm.activityService.resetRationale();
                vm.isNotifiable = false;
                vm.isRationale = false;
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
                vm.activityRoot = vm.activityService.getModelInfo();
                _setComplete();
            }
            vm.showAllErrors = true;
            disableXMLSave();
            vm.setThirdParty();
            vm.updateActivityType();
            vm.setAdminSubmission();
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

            if (vm.activityRoot.contactRecord) {
                for (var j = 0; j < vm.activityRoot.contactRecord.length; j++) {
                    vm.activityRoot.contactRecord[j].amend = false;
                }
            }
        }

        vm.closeAlert = function (value) {
            switch (value) {
                case '1':
                    vm.alert1.show = false;
                    break;
                case '2':
                    vm.alert2.show = false;
                    break;
                case '3':
                    vm.alert3.show = false;
                    break;
            }
        }

        vm.addInstruct = function (value) {

            switch (value) {
                case '1':
                    vm.alert1.show = true;
                    break;
                case '2':
                    vm.alert2.show = true;
                    break;
                case '3':
                    vm.alert3.show = true;
                    break;
            }

        }
    }
})();

