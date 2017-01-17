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
            'ui.bootstrap',
            'ui.select',
            'activityLoadService'

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
            templateUrl: 'app/scripts/components/activityMain/tpl-activity-main_20170117_1009.html',
            controller: activityMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    activityMainCtrl.$inject = ['ActivityService', 'ApplicationInfoService', 'hpfbFileProcessing', '$scope', '$translate', 'CommonLists','ActivityListFactory','customLoad'];
    function activityMainCtrl(ActivityService, ApplicationInfoService, hpfbFileProcessing, $scope, $translate, CommonLists, ActivityListFactory,customLoad) {
        var vm = this;
        vm.isIncomplete = true;
        vm.userType = "EXT";
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        vm.showAllErrors = false;
        vm.formAmend = false;
        vm.isNotifiable = false;
        vm.isRationale = false;
        vm.showActivity = false;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.activityService = new ActivityService();
        vm.applicationInfoService = new ApplicationInfoService();
        vm.rootTag = vm.activityService.getRootTag();
        vm.activityRoot = vm.activityService.getModelInfo();
        //vm.activityTypeList=ActivityListFactory.getRaTypeList();
        /*vm.activityTypeList=[
            {"id":"B02-20160301-001","en":"ANDS (Abbreviated New Drug Submission)","fr":"ANDS (Présentation abrégée de drogue nouvelle)"},
            {"id":"B02-20160301-031","en":"EU NDS (Extraordinary Use New Drug Submission)","fr":"EU NDS (Présentation de drogue nouvelle pour usage exceptionnel)"},
            {"id":"B02-20160301-032","en":"EUSNDS (Extraordinary Use Supplement to a New Drug Submission)","fr":"EUSNDS (Supplément à une présentation de drogue nouvelle pour usage exceptionnel)"},
            {"id":"B02-20160301-038","en":"Level 3 - Notice of Change (Post-Notice of Compliance Changes - Level III)","fr":"Level 3 - Notice of Change (Changements survenus après l'avis de conformité - Niveau III)"},
            {"id":"B02-20160301-041","en":"MPANDS","fr":"MPANDS"},
            {"id":"B02-20160301-046","en":"MPNC (Pre-NC Meeting)","fr":"MPNC (Réunion préalable - PM)"},
            {"id":"B02-20160301-047","en":"MPNDS (Pre-NDS Meeting)","fr":"MPNDS (Réunion préalable – PDN)"},
            {"id":"B02-20160301-048","en":"MPSANDS","fr":"MPSANDS"},
            {"id":"B02-20160301-049","en":"MPSNDS (Pre-SNDS Meeting)","fr":"MPSNDS (Réunion préalable – RPPDN)"},
            {"id":"B02-20160301-050","en":"NC (Notifiable Change)","fr":"NC (Préavis de modification)"},
            {"id":"B02-20160301-051","en":"NDS (New Drug Submission)","fr":"NDS (Présentation de drogue nouvelle)"},
            {"id":"B02-20160301-067","en":"PAND (Pandemic Application)","fr":"PAND (Demande pandémique)"},
            {"id":"B02-20160301-068","en":"PBR-C ","fr":"PBR-C "},
            {"id":"B02-20160301-069","en":"PBR-PV ","fr":"PBR-PV "},
            {"id":"B02-20160301-075","en":"PRNDS (Priority Request NDS)","fr":"PRNDS (Demande de statut d’évaluation prioritaire - PDN)"},
            {"id":"B02-20160301-077","en":"PRSNDS (Priority Request SNDS)","fr":"PRSNDS (Demande de statut d’évaluation prioritaire - SPDN)"},
            {"id":"B02-20160301-078","en":"PSUR-C (Periodic Safety Update Report - Conditional)","fr":"PSUR-C (Rapport périodique de pharmacovigilance - Conditionnel)"},
            {"id":"B02-20160301-079","en":"PSUR-PV (Periodic Safety Update Report - Pharmacovigilance)","fr":"PSUR-PV (Rapport périodique de pharmacovigilance - pharmacovigilance)"},
            {"id":"B02-20160301-080","en":"RMP-PV (Risk Management Plan - Pharmacovigilance)","fr":"RMP-PV (Plan de gestion des risques - Pharmacovigilance)"},
            {"id":"B02-20160301-082","en":"SANDS (Supplement to an Abbreviated New Drug Submission)","fr":"SANDS (Supplément à une présentation abrégée de drogue nouvelle)"},
            {"id":"B02-20160301-084","en":"SNDS (Supplement to a New Drug Submission)","fr":"SNDS (Supplément à une présentation de drogue nouvelle)"},
            {"id":"B02-20160301-085","en":"SNDS-C (Supplement to a New Drug Submission - Conditional)","fr":"SNDS-C (Supplément à 'une présentation de drogue nouvelle - Conditionnelle)"},
            {"id":"B02-20160301-087","en":"UD-PV (Undefined Data Pharmacovigilance)","fr":"UD-PV (Données non définies – Pharmacovigilance)"},
            {"id":"B02-20160301-088","en":"UDRA (Undefined Regulatory Activity)","fr":"UDRA (Activité réglementaire non définie)"},
            {"id":"B02-20160301-089","en":"YBPR (Yearly Biologic Product Report)","fr":"YBPR (Rapport annuel sur un produit biologique)"},
            {"id":"B02-20160301-090","en":"DIN","fr":"DIN"}
        ]*/;


        vm.feeClassList=ActivityListFactory.getFeeClassList();
        vm.leadList= ActivityListFactory.getActivityLeadList();




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
           var result=loadActivityData();
        };

        function loadActivityData(){
            ActivityListFactory.getRaTypeList()
                .then(function(data){
                    vm.activityTypeList=data;
                    return true;
                });
        }

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

