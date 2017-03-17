/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'tabsModule',
        'refProductListModule',
         'drugUseModule',
         'scheduleAModule',
        'dossierDataLists',
        'dataLists',
        'filterLists',
        'fileIO',
        'contactModule26',
        'applicationInfoService',
        'applicationInfo',
        'ui.bootstrap',
        'numberFormat',
        'ngMessages',
        'ngAria',
        'theraClass',
        'dossierService',
        'ngSanitize'
    ];

    angular
        .module('dossierModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .component('cmpDossier', {
            templateUrl: 'app/scripts/components/dossier/tpl-dossier.html',
            controller: dossierCtrl,
            controllerAs: 'dos',
            bindings: {
                dossierRecordInput: '<',
                onUpdateDossier: '&',
                onDeleteDossier: '&',
                formType: '@',
                service: '<'
                // selectedCountryChanged: '&'
            }
        });

    dossierCtrl.$inject = ['$scope', 'hpfbFileProcessing', 'ApplicationInfoService', 'DossierService', 'DossierLists', 'getRoleLists', 'YES','INTERNAL_TYPE','EXTERNAL_TYPE','APPROVED_TYPE'];


    function dossierCtrl($scope, hpfbFileProcessing, ApplicationInfoService, DossierService, DossierLists, getRoleLists, YES,INTERNAL_TYPE,EXTERNAL_TYPE,APPROVED_TYPE) {

        var self = this;
        self.showContent = _loadFileContent; //binds the component to the function
        self.applicationInfoService = new ApplicationInfoService();
        self.userType = EXTERNAL_TYPE;
        self.saveXMLLabel = "SAVE_DRAFT";
        self.yesNoList = DossierLists.getYesNoList();
        self.yesValue = DossierLists.getYesValue();
        self.formTypeList = getRoleLists.getFormTypes();
        //config for applicationInfoCompoenent
        self.configField = {
            "label": "DOSSIER_ID",
            "fieldLength": "7",
            "tagName": "dossierID",
            "errorMsg": "MSG_LENGTH_7",
            "isDossier": true
        };

        self.isIncomplete = true;
        self.formAmend = false;
        self.showAllErrors = false;
        self.errorAppendix = [];
        self.extraAppendix = [];
        self.noThera = "";
        self.oneRefSelected = "";
        self.alerts = [false, false, false, false,false,false,false];

        var yesValue = YES;
        self.$onInit = function () {
            self.dossierService = new DossierService();

            self.dossierModel = self.dossierService.getDefaultObject();
        };
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        self.$onChanges = function (changes) {

            if (changes.formType) {
                self.userType = changes.formType.currentValue;
                if (self.userType == INTERNAL_TYPE) {
                    self.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    self.saveXMLLabel = "SAVE_DRAFT"
                }
            }

        };

        self.appendixMissingError = function () {
            return (self.errorAppendix && self.errorAppendix.length > 0);

        };
        self.appendixExtraError = function () {
            return (self.extraAppendix && self.extraAppendix.length > 0);

        };


        self.thirdPartySignedChanged = function () {
            return (self.dossierModel.drugProduct.thirdPartySigned === yesValue);
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                self.dossierModel = self.dossierService.loadFromFile(resultJson);
                //process file load results
                //load into data model as result json is not null
            }
            //if content is attempted to be loaded show all the errors
            self.showNoRefReError();
            getAppendix4Errors();
            _setComplete();
            self.showAllErrors = true;
            disableXMLSave();
        }

        self.recordsChanged = function () {
            getAppendix4Errors();
        };

        self.isRefProducts = function () {

            if (self.dossierModel.isRefProducts === self.yesValue) {
                return true;
            }
            self.dossierModel.drugProduct.canRefProducts = [];
            return false;
        };

        self.setApplicationType = function (value) {
            self.dossierModel.applicationType = value;
            self.formAmend = self.dossierModel.applicationType === self.applicationInfoService.getAmendType();
            disableXMLSave();
        };

        self.cdnRefUpdated = function (list) {
            //don't do anything with the list
            self.showNoRefReError();
        };

        self.showNoRefReError = function () {

            if (self.dossierModel.drugProduct.canRefProducts.length > 0 && self.dossierModel.isRefProducts === yesValue) {
                self.oneRefSelected = "sel";
                return false
            } else {
                self.oneRefSelected = "";
                return true;
            }
        };

        self.disableJSONSave=function() {

            return(self.dossierModel.applicationType == APPROVED_TYPE&& self.isExtern());

        }

        function getAppendix4Errors() {
            var appendixCheck = self.dossierService.getMissingAppendix4(self.dossierModel);
            self.errorAppendix = appendixCheck.missing;
            self.extraAppendix = appendixCheck.extra;
        }

        /**
         * @ngdoc Used to determine if the form is incomplete
         *
         * @private
         * @return true if the form is incomplete
         */
        function _setComplete() {
            self.isIncomplete = !self.activityRoot.dossierID;
        }

        $scope.$watch("dos.dossierForm.$invalid", function () {
            disableXMLSave()
        }, true);

        /**
         * @ngdoc disables the XML save button
         */
        function disableXMLSave() {
            var formInvalid = true; //TODO hack
            if (self.dossierForm) {
                formInvalid = self.dossierForm.$invalid;
            }
            self.disableXML = (formInvalid || (self.dossierModel.applicationType == self.applicationInfoService.getApprovedType() && self.isExtern()));

        }




        function _setComplete() {
            self.isIncomplete = !self.dossierModel.dossierID;
        }

        /**
         * @ngdoc - determines if the form is the internal or the external version
         * @returns {boolean}
         */
        self.isExtern = function () {
            return self.userType == EXTERNAL_TYPE;

        };

        /**
         * Used to show all the fields in an error state. Can be activated by a parent component
         * @returns {boolean}
         */
        self.showErrors = function () {
            return (self.showAllErrors);
        };
        /**
         * For individual controls, whether to show the error for a fiedl
         * @param isInvalid - control $invalid flag
         * @param isTouched -control $touched flag
         * @returns {*|dossierCtrl.showErrors}
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (self.showErrors() && isInvalid))
        };

        /***
         * Manages the schedule A details since the fields are always in the model
         */
        self.isSchedA = function () {
            if (!self.dossierModel || !self.dossierModel.drugProduct || !self.dossierService) return false; //never happen case;
            if (self.dossierModel.drugProduct.isScheduleA) {

                return true;
            } else {
                self.dossierModel.drugProduct.scheduleAGroup = self.dossierService.getDefaultScheduleA();
            }
            return false;
        };

        /**
         * Save as a json file. Convert interal model to external model for output
         */
        self.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), self.dossierService.getRootTagName());
            self.showAllErrors = true;
            //_setComplete()
        };

        self.saveXML = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), self.dossierService.getRootTagName());
            self.showAllErrors = false;
        };


        /**
         * Takes the internal model and transforms to a json object compatible with the output
         * @returns {*}
         * @private
         */
        function _transformFile() {
            updateDate();
            if (!self.isExtern()) {
                self.dossierModel.enrolmentVersion = self.applicationInfoService.incrementMajorVersion(self.dossierModel.enrolmentVersion);
                self.dossierModel.applicationType = ApplicationInfoService.prototype.getApprovedType();
                // updateModelOnApproval(); //updates all the amend
            } else {

                self.dossierModel.enrolmentVersion = self.applicationInfoService.incrementMinorVersion(self.dossierModel.enrolmentVersion);
            }
            return self.dossierService.dossierToOutput(self.dossierModel);
        }

        /**
         * @ngdoc -creates a filename for dossier file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {

            var draft_prefix = "DRAFTREPDO";
            var final_prefix = "HCREPDO";
            var filename = "";
            var separator="-";
            if (self.userType === INTERNAL_TYPE) {

                filename = final_prefix;
            } else {
                filename = draft_prefix;
            }
            if (self.dossierModel && self.dossierModel.dossierID) {
                filename = filename + separator + self.dossierModel.dossierID;
            }
            if (self.dossierModel.enrolmentVersion) {
                filename = filename + separator + self.dossierModel.enrolmentVersion;
            }
            return filename;
        }

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (self.dossierModel) {
                self.dossierModel.dateSaved = self.applicationInfoService.getTodayDate();
            }
        }


        /**
         * Manages errors for no Thera
         * @returns {boolean}
         */
        self.noTheraRecs = function () {

            if (!self.dossierModel || !self.dossierModel.drugProduct) {
                self.noThera = "";
                return false;
            }
            if (!self.dossierModel.drugProduct.therapeutic || self.dossierModel.drugProduct.therapeutic.length === 0) {
                self.noThera = "";
                return true;
            }
            self.noThera = self.dossierModel.drugProduct.therapeutic.length;
            return false;
        };

        self.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < self.alerts.length) {
                self.alerts[value] = true;
            }
        }


        /**
         * Closes the instruction alerts
         * @param value
         */
        self.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < self.alerts.length) {
                self.alerts[value] = false;
            }
        };


    }

})();


