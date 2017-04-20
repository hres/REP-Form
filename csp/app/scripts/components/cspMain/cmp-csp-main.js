/**
 * Created by dkilty on 03/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMain', [
            'fileIO',
            'applicationInfoService',
            'hpfbConstants',
            'cspService',
            'cspApplicant',
            'cspHCOnly',
            'cspMainApplication',
            'cspPatent',
            'cspTimelySubmission',
            'cspFeePayment',
            'cspCertification',
            'errorSummaryModule'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMain')
        .component('cmpCspMain', {
            templateUrl: 'app/scripts/components/cspMain/tpl-csp-main.html',
            controller: cspMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    cspMainCtrl.$inject = ['CspService', 'hpfbFileProcessing', 'ApplicationInfoService', 'INTERNAL_TYPE', 'EXTERNAL_TYPE'];
    function cspMainCtrl(CspService, hpfbFileProcessing, ApplicationInfoService, INTERNAL_TYPE, EXTERNAL_TYPE) {

        var vm = this;
        vm.userType=EXTERNAL_TYPE;
        vm.saveXMLLabel = "SAVE_DRAFT"; //used to dynamically label save button
        vm.modelService = null;
        vm.cspModel = {};
        vm.countryList = [];
        vm.paymentType = [];
        vm.drugUseList = [];
        vm.rootTag = "";
        vm.showContent = _loadFileContent; //could just make a function avail
        vm.applicationInfoService = null;
        vm.showErrorSummary=0; //signals child error summaries to show
        vm.updateSummary=0; //signals to update the error summary contents

        vm.exclusions = {
            "contactListCtrl.contactListForm": "true",
            "contactRec.contactRecForm": "true",
            "addressListCtrl.addressListForm": "true",
            "addressRec.addressRecForm": "true"
        };
        vm.alias = {
            "roleMissing": {
                "type": "fieldset",
                "parent": "fs_roleMissing"
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



        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            vm.modelService = new CspService(); //create the service
            vm.cspModel = vm.modelService.getModelInfo(); //the model
            vm.countryList = vm.modelService.getMarketingCountries();
            vm.paymentType = vm.modelService.getAdvancedPaymentTypes();
            vm.drugUseList = vm.modelService.getDrugUses();
            vm.rootTag = vm.modelService.getRootTag();
            vm.applicationInfoService = new ApplicationInfoService();
        };

        /**
         * Called on binding changes
         */
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
         * Controls the visibility of the Health Canada section information
         * @returns {boolean}
         */
        vm.showHCOnlySection=function(){
            return (vm.userType===INTERNAL_TYPE);
        };

        /**
         * If a file is successfully loaded, this function is called
         * Transform the raw data here to the internal data model
         * @param fileContent
         * @private
         */
        function _loadFileContent(fileContent) {
            if (!fileContent)return;

            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.modelService = new CspService(); //do I need to do this?
                vm.modelService.transformFromFileObj(resultJson);
                vm.cspModel = vm.modelService.getModelInfo(); //the model
                //angular.extend(vm.company, vm.companyService.getModelInfo());
                //vm.companyEnrolForm.$setDirty();
            }
        }

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

            if(vm.cspForm.$invalid){
                vm.showErrorSummary= vm.showErrorSummary+1;
                vm.updateErrorSummary();

            }else {

                var writeResult = _transformFile();

                hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
                vm.cspForm.$setPristine();
            }
        };


        /**
         * Creates the filename for the output file
         * @returns {string}
         * @private
         */
        function _createFilename() {
            //TODO algorithm
            var filename="hccsp";
            var separator="-";

            if (vm.cspModel.enrolmentVersion) {
                filename = filename + separator+  vm.cspModel.enrolmentVersion;
            }
            filename=filename.replace(".",separator);
            return filename.toLowerCase();

            return filename
        }

        /**
         * Adds the date and increments version number before the data is written to file
         * @private
         */
        function _transformFile() {
            updateDate();
        if(vm.userType===EXTERNAL_TYPE){
            vm.cspModel.enrolmentVersion= vm.applicationInfoService.incrementMajorVersion(vm.cspModel.enrolmentVersion);
        }
            return vm.modelService.transformToFileObj(vm.cspModel);
        }

        /**
         * Updatyes the date saved field in the model
         */
        function updateDate() {
            if (vm.cspModel) {
                vm.cspModel.dateSaved = vm.applicationInfoService.getTodayDate();
            }
        }

        /**
         * Updates the Error Summary Flag. This causes the Error Summary to update
         */
        vm.updateErrorSummary=function(){
            vm.updateSummary= vm.updateSummary+1;

        }
        vm.setAlias=function(record){

            if(record&& record.billing){
                return "billing";
            }else{
                return("appl");

            }

        }


    }
})();


