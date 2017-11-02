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
            'activityLists',
            'ui.select',
            'hpfbConstants',
            'alertModule',
            'errorMessageModule'
        ])
})();

(function () {
    'use strict';

    angular
        .module('activityMain')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpActivityMain', {
            templateUrl: 'app/scripts/components/activityMain/tpl-activity-main_20171102_1555.html',
            controller: activityMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    activityMainCtrl.$inject = ['ActivityService', 'ApplicationInfoService', 'hpfbFileProcessing', '$scope',
        '$translate', 'CommonLists', 'ActivityListFactory', 'NEW_TYPE', 'AMEND_TYPE', 'APPROVED_TYPE', 'INTERNAL_TYPE',
        'EXTERNAL_TYPE', 'ENGLISH'];
    function activityMainCtrl(ActivityService, ApplicationInfoService, hpfbFileProcessing, $scope, $translate,
                              CommonLists, ActivityListFactory, NEW_TYPE, AMEND_TYPE, APPROVED_TYPE, INTERNAL_TYPE,
                              EXTERNAL_TYPE, ENGLISH) {

        var vm = this;
        vm.isIncomplete = true;
        vm.userType = EXTERNAL_TYPE;
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        //vm.showAllErrors = false;
        vm.formAmend = false;
        vm.isNotifiable = false;
        vm.isRationale = false;
        vm.showActivity = false;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.activityService = new ActivityService();
        vm.applicationInfoService = new ApplicationInfoService();
        vm.rootTag = vm.activityService.getRootTag();
        vm.activityRoot = vm.activityService.getModelInfo();
        vm.leadList = ActivityListFactory.getActivityLeadList();
        vm.alerts = [];
        vm.configField = {
            "label": "CONTROL_NUMBER",
            "fieldLength": "6",
            "tagName": "dstsControlNumber",
            "errorMsg": "MSG_LENGTH_6",
            "isNumber": true
        };
        vm.CommonLists = CommonLists;
        vm.yesNoList = vm.CommonLists.getYesNoList();
        vm.alerts = [false, false, false, false];

        vm.exclusions = {
            "contactRec.contactRecForm":"true"
        };

        vm.alias = {
            "notif_missing": {
                "type": "fieldset",
                "parent": "fs_notif_change"
            },
            "rationale_missing": {
                "type": "fieldset",
                "parent": "fs_rationale_missing"
            },
            "one_rep": {
                "type": "element",
                "target": "addRepContactBtn"
            }
        };

        vm.focusSummary = false;
        vm.updateSummary = 0;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.length5Error = [{type: "required", displayAlias: "MSG_ERR_MAND"}, {
            type: "minlength",
            displayAlias: "MSG_LENGTH_MIN5"
        }];
        vm.length7Error = [{type: "required", displayAlias: "MSG_ERR_MAND"}, {
            type: "minlength",
            displayAlias: "MSG_LENGTH_7"
        }];

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
            _setIdNames();
            vm.setThirdParty();
            vm.updateActivityType();
            vm.setAdminSubmission();
            loadActivityData();
            loadFeeData();
        };

        function loadActivityData() {
            ActivityListFactory.getRaTypeList()
                .then(function (data) {
                    vm.activityTypeList = data;
                    return true;
                });
        }

        /**
         * Asynch load of Fee Data
         */
        function loadFeeData() {
            ActivityListFactory.getFeeClassList()
                .then(function (data) {
                    vm.feeClassList = data;
                    return true;
                });
        }

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

        vm.isFrench = function () {
            return (vm.lang !== ENGLISH);
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
            //vm.showAllErrors = true;
            _setComplete()
        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {

            if (vm.activityEnrolForm.$invalid) {
                vm.focusSummary++;
                vm.updateErrorSummaryState();
                vm.savePressed = true;
            } else {

                var writeResult = _transformFile();
                hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
                _setComplete();
                vm.activityEnrolForm.$setPristine();
                vm.savePressed = false;
            }
        };


        vm.showError = function (ctrl) {
            if (!ctrl) return;
            return (ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid);
        };
        //TODO remove?
        vm.showErrorCheck = function (isTouched, value) {

            return (!value && isTouched) || (vm.showErrors() && !value );
        };

        //TODO handled save pressed?
        vm.showErrors = function () {
            return vm.savePressed;
        };
        vm.setThirdParty = function () {
            vm.thirdPartyState = (vm.activityRoot.isThirdParty === "Y")
        };

        vm.setApplicationType = function (value) {
            vm.activityRoot.applicationType = value;
            vm.formAmend = vm.activityRoot.applicationType === AMEND_TYPE;
            //disableXMLSave();
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

        };

        /**
         * @ngdoc -creates a filename for activity file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {
            var draft_prefix = "DRAFTREPRA";
            var final_prefix = "HCREPRA";
            var filename = "";
            var separator = "-";
            if (vm.userType === INTERNAL_TYPE) { //TODO magic numbers

                filename = final_prefix;
            } else {
                filename = draft_prefix;
            }
            if (vm.activityRoot && vm.activityRoot.dstsControlNumber) {
                filename = filename + separator + vm.activityRoot.dstsControlNumber;
            }
            if (vm.activityRoot.enrolmentVersion) {

                filename = filename + separator + vm.activityRoot.enrolmentVersion;
            }
            filename = filename.replace(".", separator);
            return filename.toLowerCase();
        }

        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                if (!vm.activityEnrolForm.$pristine) {
                    vm.activityRoot.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.activityRoot.enrolmentVersion);
                    vm.activityRoot.applicationType = APPROVED_TYPE;
                    updateModelOnApproval(); //updates all the amend
                }
            } else {
                vm.activityRoot.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.activityRoot.enrolmentVersion);
            }
            _updateInfoValues();
            return vm.activityService.transformToFileObj(vm.activityRoot);
        }

        vm.updateActivityType = function () {
            //vm.activityRoot.regActivityType
            if (vm.activityService.isNotifiableChange(vm.activityRoot.regActivityType.id)) {
                vm.activityService.resetRationale();
                vm.isNotifiable = true;
                vm.isRationale = false;
            } else if (vm.activityService.isRationale(vm.activityRoot.regActivityType.id, vm.activityRoot.regActivityLead)) {
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

        /* $scope.$watch("main.activityEnrolForm.$valid", function () {
         disableXMLSave()
         }, true);
         */
        function disableXMLSave() {

            // vm.disableXML = vm.activityEnrolForm.$invalid || (vm.activityRoot.applicationType == APPROVED_TYPE && vm.isExtern());
        }

        vm.disableJSONSave = function () {

            return (vm.activityRoot.applicationType == APPROVED_TYPE && vm.isExtern());

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
                vm.activityEnrolForm.$setDirty();
            }
            //vm.showAllErrors = true;
            //disableXMLSave();
            vm.setThirdParty();
            vm.updateActivityType();
            vm.setAdminSubmission();
        }

        /**
         * ngdoc method to set the application type to amend
         * @private
         */
        function _setApplTypeToAmend() {

            vm.activityRoot.applicationType = AMEND_TYPE;
            //disableXMLSave();
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
            return vm.userType == EXTERNAL_TYPE;

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

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
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
        /**
         * Sets the ids and names for fields
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.formId = "activity_form" + scopeId;
            vm.companyId = "company_id" + scopeId;
            vm.dossierId = "dossier_id" + scopeId;
            vm.activityLeadId = "activity_lead" + scopeId;
            vm.activityTypeId = "activity_type" + scopeId;
            vm.feeClassId = "fee_class" + scopeId;
            vm.reasonId = "reason_file" + scopeId;
            vm.thirdPartyId = "is_solicited" + scopeId;
            vm.isAdminSubId = "is_admin_sub" + scopeId;
        }

    }
})();

