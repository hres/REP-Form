/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'expandingTable'
        ,'tabsModule'
        ,'refProductListModule'
        ,'drugUseModule'
        ,'therapeuticClassModule'
        ,'scheduleAModule',
        'dossierDataLists',
        'filterLists',
        'fileIO',
        'contactModule25',
        'contactModule26',
        'applicationInfoService',
        'applicationInfo',
        'ui.bootstrap',
        'filterLists',
       'numberFormat'
    ];

    angular
        .module('dossierModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .component('cmpDossier', {
            templateUrl: './app/components/dossier/tpl-dossier.html',
            controller: dossierCtrl,
            controllerAs: 'dos',
            bindings: {
                dossierRecordInput: '<',
                onUpdateDossier: '&',
                onDeleteDossier: '&',
                formType: '@'
                // selectedCountryChanged: '&'
            }
        });

    dossierCtrl.$inject = ['$scope', 'hpfbFileProcessing', 'ApplicationInfoService', 'DossierService'];


    function dossierCtrl($scope, hpfbFileProcessing, ApplicationInfoService, DossierService) {

        var self = this;
        self.showContent = _loadFileContent; //binds the component to the function
        self.formUserType = 'EXT'; //set default to external type
        self.applicationInfoService = new ApplicationInfoService();
        self.userType = "EXT";
        self.saveXMLLabel = "SAVE_DRAFT";

        //config for applicationInfoCompoenent
        self.configField = {
            "label": "DOSSIER_ID",
            "fieldLength": "7",
            "tagName": "dossierId",
            "errorMsg": "MSG_LENGTH_7"
        };
        self.isIncomplete = true;
        self.formAmend = false;
        self.showAllErrors = false;
        self.errorAppendix = [];
        self.noThera="";
        self.$onInit = function () {

            self.dossierService = new DossierService();

            self.dossierModel = self.dossierService.getDefaultObject();
        }
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        self.$onChanges = function (changes) {

            if (changes.formType) {
                self.userType = changes.formType.currentValue;
                self.userType='EXT';
                if (self.userType == 'INT') {
                    self.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    self.saveXMLLabel = "SAVE_DRAFT"
                }
            }
        };

        self.appendixMissingError = function () {
            return (self.errorAppendix && self.errorAppendix.length > 0);

        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {

                // console.info('file loaded ... ' + JSON.stringify(resultJson));
                self.dossierModel = self.dossierService.loadFromFile(resultJson);


                //process file load results
                //load into data model as result json is not null
            }
            //if content is attempted to be loaded show all the errors
            self.showAllErrors = true;
            disableXMLSave();
        }

        self.setApplicationType = function (value) {
            self.dossierModel.applicationType = value;
            self.formAmend = self.dossierModel.applicationType === self.applicationInfoService.getAmendType();
            disableXMLSave();
        };

        /**
         * @ngdoc Used to determine if the form is incomplete
         *
         * @private
         * @return true if the form is incomplete
         */
        function _setComplete() {
            self.isIncomplete = !self.activityRoot.dossierID;
        }


        /**
         * @ngdoc disables the XML save button
         */
        function disableXMLSave() {
            self.disableXML = self.dossierForm.$invalid || (self.dossierModel.applicationType == self.applicationInfoService.getApprovedType() && self.isExtern());

        }

        /**
         * @ngdoc - determines if the form is the internal or the external version
         * @returns {boolean}
         */
        self.isExtern = function () {
            return self.userType == "EXT";

        };

        /**
         * Used to show all the fields in an error state. Can be activated by a parent component
         * @returns {boolean}
         */
        self.showErrors = function () {
            return (self.showAllErrors);
        }
        /**
         * For individual controls, whether to show the error for a fiedl
         * @param isInvalid - control $invalid flag
         * @param isTouched -control $touched flag
         * @returns {*|dossierCtrl.showErrors}
         */
        self.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (self.showErrors() && isInvalid))
        }

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
        }
        self.saveJson = function () {
            var writeResult = _transformFile();
            console.log(writeResult);
           hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), self.dossierService.getRootTagName());
            self.showAllErrors = true;
            //_setComplete()
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
                console.log(self.dossierModel.enrolmentVersion);
                self.dossierModel.enrolmentVersion = self.applicationInfoService.incrementMinorVersion(self.dossierModel.enrolmentVersion);
            }
            return  self.dossierService.dossierToOutput(self.dossierModel);
        };

        /**
         * @ngdoc -creates a filename for dossier file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {
            var filename = "HC_DO_Enrolment";
            /*if (vm.activityRoot && vm.activityRoot.dstsControlNumber) {
                filename = filename + "_" + vm.activityRoot.dstsControlNumber;
            }*/
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
         * @ngdoc method - updates if there are classifications
         */
        self.noTheraRecs=function(){
            if(!self.model){
                self.noRoa="";
                console.log("false")
                return false;
            }
            if(!self.model.list || self.model.list.length===0){
                self.noRoa="";
                console.log("true")
                return true;
            }
            self.noRoa= self.model.list.length;
            console.log("false2")
            return false;

        }

        /**
         * Manages errors for no ROA
         * @returns {boolean}
         */
        self.noTheraRecs=function() {

            if (!self.dossierModel ||! self.dossierModel.drugProduct) {
                self.noThera = "";
                return false;
            }
            if (!self.dossierModel.drugProduct.therapeutic || self.dossierModel.drugProduct.therapeutic.length === 0) {
                self.noThera = "";
                return true;
            }
            self.noThera =self.dossierModel.drugProduct.therapeutic.length;
            return false;
        }

    }

})();


