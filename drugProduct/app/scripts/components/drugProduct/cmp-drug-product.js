/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'tabsModule',
         'drugUseModule',
        'scheduleAModule',
        'importerListModule',
        'speciesListModule',
        'clinicalTrial',
        'administrativeSubmission',
        'disinfectantTypeModule',
        'dossierDataLists',
        'dataLists',
        'filterLists',
        'fileIO',
        'applicationInfoService',
        'applicationInfo',
        'ui.bootstrap',
        'numberFormat',
        'updateLang',
        'ngMessages',
        'ngAria',
        'drugProductService',
        'productInfoHelpText',
        'ngSanitize',
        'errorSummaryModule',
        'errorMessageModule',
        'alertModule'
    ];

    angular
        .module('drugProductModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('drugProductModule')
        .component('cmpDrugProduct', {
            templateUrl: 'app/scripts/components/drugProduct/tpl-drug-product.html',
            controller: drugProductCtrl,
            controllerAs: 'drugProdCtrl',
            bindings: {
                dossierRecordInput: '<',
                onUpdateDossier: '&',
                onDeleteDossier: '&',
                formType: '@',
                service: '<'
                // selectedCountryChanged: '&'
            }
        });

    drugProductCtrl.$inject = ['$scope', 'hpfbFileProcessing', 'ApplicationInfoService', 'DrugProductService', 'DossierLists', 'getRoleLists', 'YES', 'PROD', 'INTERNAL_TYPE','EXTERNAL_TYPE','APPROVED_TYPE','FRENCH','$translate','$anchorScroll','$location'];


    function drugProductCtrl($scope, hpfbFileProcessing, ApplicationInfoService, DrugProductService, DossierLists, getRoleLists, YES, PROD, INTERNAL_TYPE,EXTERNAL_TYPE,APPROVED_TYPE,FRENCH,$translate, $anchorScroll,$location) {

        var vm = this;
        vm.showContent = _loadFileContent; //binds the component to the function
        vm.applicationInfoService = new ApplicationInfoService();
        vm.drugProductService = new DrugProductService();
        vm.userType = EXTERNAL_TYPE;
        vm.saveXMLLabel = "APPROVE_FINAL";
        vm.yesNoList = DossierLists.getYesNoList();
        vm.yesValue = YES; //is this needed?
        vm.isForProd = PROD === DossierLists.getEnv();
        vm.formTypeList = getRoleLists.getFormTypes(vm.isForProd);
        vm.htIndxList = vm.drugProductService.helpTextSequences;
        //config for applicationInfoCompoenent
       /* vm.configField = {
            "label": "DOSSIER_ID",
            "fieldLength": "7",
            "tagName": "dossierID",
            "errorMsg": "MSG_LENGTH_7",
            "isDossier": true
        };*/

        vm.isIncomplete = true;
        vm.formAmend = false;
       // vm.showAllErrors = false;
        vm.errorAppendix = [];
        vm.extraAppendix = [];
        vm.noThera = "";

        //error summary fields
        vm.updateSummary=0; //increment to send message to error summaries
        vm.showSummary=false;
        vm.isFileLoaded=false;
        vm.focusSummary=0;
        vm.exclusions = {
            "formulCtrl.formulationsForm":"tab_0",
            "contactRec.contactRecForm":"true",
            "ap4Ctrl.appendixForm":"tab_1",
           "refProdCtrl.productDetailsForm":"true",
            "fake.appendix_extra_error":"true",
            "fake.appendix_missing_error":"true"
        };
        vm.transcludeList={};
        vm.alias = {
            "no_theraVal": {
                "type": "element",
                "target": "addTheraClass"
            },
            "one_rep": {
                "type": "element",
                "target": "addRepContactBtn"
            },
            "msg_err_one_cdn_ref": {
                "type": "elementNoId",
                "target": "addRefProductBtn"
            },
            "msg_one_scheda":{
                "type":"fieldset",
                "parent": "fs_schedAMissing"
            },
            "disi_type_missing": {
                "type": "fieldset",
                "parent": "fs_disi_type_missing"
            },
            "no_cta_country": {
                "type": "element",
                "target": "list_cta_country"
            },
            "postal": {
                "type": "pattern",
                "errorType": "MSG_ERR_POSTAL"
            },
            "contactEmail": {
                "type": "pattern",
                "errorType": "MSG_ERR_EMAIL_FORMAT"
            },
            "phoneNumber": {
                "type": "pattern",
                "errorType": "MSG_ERR_PHONE_FORMAT"
            },
            "fax_number": {
                "type": "pattern",
                "errorType": "MSG_ERR_FAX_FORMAT"
            },
            "dossier_id":{
                "type":"pattern",
                "errorType": "FORMAT_TYPE_PATTERN"
            },
            "VET_DAYS":{
                "type":"max",
                "errorType": "MSG_DAY_MAX"
            },
            "VET_HOURS":{
                "type":"max",
                "errorType": "MSG_HOUR_MAX"
            }
        };
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.min5Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"}
        ];
        vm.min7Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "FORMAT_TYPE_MINLENGTH"},
            {type: "pattern", displayAlias: "FORMAT_TYPE_PATTERN"}
        ];

        vm.alerts = [false, false, false, false, false, false, false, false, false, false, false, false]; //for help boxes
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.rootTag="";
        vm.drugUseList=[];
        vm.disinfectantTypeList=[];
        vm.extraAppendixModel="none";
        vm.missingAppendixModel="none";

        vm.$onInit = function () {
            vm.showSummary = false;
            vm.defaultDrugUseList = DossierLists.getDrugUseList();
            vm.vetDrugUseList = DossierLists.getVetDrugUseList();
            vm.ctaDrugUseList = DossierLists.getCTADrugUseList();
            vm.drugUseList = vm.defaultDrugUseList;
            vm.disinfectantTypeList = DossierLists.getDisinfectantTypeList();
            _setIdNames();
            vm.model = vm.drugProductService.getDefaultObject();
            vm.rootTag= vm.drugProductService.getRootTagName();
            vm.setVisibleTabIndex=-1;
            $('#privacyNoticeStatement').trigger( "wb-init.wb-details" );
            $('#securityDisclaimer').trigger( "wb-init.wb-details" );
            $('#footnoteInstruction').trigger( "wb-init.wb-details" );
            loadAdminSubData();
        };
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        vm.$onChanges = function (changes) {

          /*  if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType === INTERNAL_TYPE) {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }
           */
        };


        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        vm.appendixMissingError = function () {
            if(vm.errorAppendix && vm.errorAppendix.length > 0){
                vm.missingAppendixModel="";
                return true
            }else{
               // vm.missingAppendixModel=false;
                return false
            }

        };
        vm.appendixExtraError = function () {
            if (vm.extraAppendix && vm.extraAppendix.length > 0){
                vm.extraAppendixModel="";
                return true;
            }else{
               // vm.extraAppendixModel=false;
                return false;
            }

        };


        vm.thirdPartySignedChanged = function () {
            return (vm.model.drugProduct.thirdPartySigned === YES);
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.model = vm.drugProductService.loadFromFile(resultJson);
                //process file load results
                //load into data model as result json is not null
                vm.dossierTypeChange();
                vm.drugUseUpdate();
                if (vm.model.drugProduct) {
                    vm.setSceduleFieldset();
                }
                vm.drugProdForm.$setDirty();
                //vm.model.privacyStat = false;
            }
            //if content is attempted to be loaded show all the errors
            getAppendix4Errors();
            vm.setAdminSubmission();
            _setComplete();
            vm.isFileLoaded = true;
           // vm.showAllErrors = true;
           // disableXMLSave();
        }

        vm.recordsChanged = function () {
            getAppendix4Errors();
        };

        vm.isRefProducts = function () {

            if (vm.model.isRefProducts === YES) {
                return true;
            }
            vm.model.drugProduct.canRefProducts = [];
            return false;
        };

        vm.setApplicationType = function (value) {
            vm.model.applicationType = value;
            vm.formAmend = vm.model.applicationType === vm.applicationInfoService.getAmendType();
            //disableXMLSave();
        };

        vm.cdnRefUpdated = function (list) {
            //don't do anything with the list
        };

        vm.disableJSONSave=function() {

            return(!vm.isExtern());

        };

        function getAppendix4Errors() {
            var appendixCheck = vm.drugProductService.getMissingAppendix4(vm.model);
            vm.errorAppendix = appendixCheck.missing;
            vm.extraAppendix = appendixCheck.extra;
            vm.appendixMissingError();
            vm.appendixExtraError();
        }

        /**
         * @ngdoc Used to determine if the form is incomplete
         * Todo: check if this works
         * @private
         * @return true if the form is incomplete
         */
        function _setComplete() {
            vm.isIncomplete = !vm.model.dossierID;
        }

        $scope.$watch("drugProdCtrl.drugProdForm.$error", function () {

            vm.updateErrorSummaryState();
        }, true);

        /**
         * @ngdoc - determines if the form is the internal or the external version
         * @returns {boolean}
         */
        vm.isExtern = function () {
            return vm.userType === EXTERNAL_TYPE;

        };

        /**
         * Used to show all the fields in an error state. Can be activated by a parent component
         * @returns {boolean}
         */
        vm.showErrors = function () {
            return (vm.showSummary);
        };
        /**
         * For individual controls, whether to show the error for a fiedl
         * @param ctrl: isInvalid - control $invalid flag
         * @param ctrl: isTouched -control $touched flag
         * @returns {boolean}
         */
        vm.showError = function (ctrl) {
            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (vm.showSummary && ctrl.$invalid))
        };

        /***
         * Manages the schedule A details since the fields are always in the model
         */
        vm.isSchedA = function () {
            if (!vm.model || !vm.model.drugProduct || !vm.drugProductService) return false; //never happen case;
            if (vm.model.drugProduct.isScheduleA) {

                return true;
            } else {
                vm.model.drugProduct.scheduleAGroup = vm.drugProductService.getDefaultScheduleA();
            }
            return false;
        };

        /***
         * determin to display Disinfectant Type field
         */
        vm.isDisinfectant = function () {
            if (!vm.model || !vm.model.drugProduct || !vm.model.drugProduct.drugUse) return false;
            return (vm.model.drugProduct.drugUse.id === "DISINFECT");
        };

        /***
         * determin to display Address to sent fieldset
         */
        vm.isNotCTA = function () {
            if (!vm.model || !vm.model.dossierType) return false;
            return (vm.model.dossierType !== "D26");
        };

        /***
         * determin to display Address to sent fieldset
         */
        vm.isCTA = function () {
            if (vm.model && vm.model.dossierType && vm.model.dossierType === "D26") {
                return true;
            } else if (vm.drugProductService) {
            vm.model.clinicalTrial = vm.drugProductService.getEmptyCtaModel();
            }
            return false;
        };

        /***
         * determin to display schedule fieldset
         */
        vm.isVet = function () {
            if (vm.model && vm.model.drugProduct && vm.model.drugProduct.drugUse && vm.model.drugProduct.drugUse.id === "VET") {
                return true;
            } else if (vm.model && vm.model.drugProduct) {
                vm.model.drugProduct.speciesRecord = [];
            }
            return false;
        };

        /***
         * reset Disinfectant Type field
         */
        vm.drugUseUpdate = function () {
            if (!vm.isDisinfectant()) {
                vm.model.drugProduct.disinfectantType = {
                    hospital: false,
                    foodProcessing: false,
                    medicalInstruments: false,
                    domestic: false,
                    barn: false,
                    institutionalIndustrial: false,
                    contactLens: false
                };
            }
        };

        /***
         * dossier Type Changed
         */
        vm.dossierTypeChange = function () {
            if (vm.model && vm.model.dossierType && vm.model.dossierType === "D26") {
                vm.drugUseList = vm.ctaDrugUseList;
                vm.model.manu = false;
                vm.model.mailling = false;
                vm.model.thisActivity = false;
                vm.model.importer = false;
                vm.model.importerRecord = [];
                vm.model.incCTData = "";
                vm.model.effAreRltdSex = "";
                vm.model.effAreRltdAge = "";
                vm.model.effAreRltdRace = "";
                vm.model.safAreRltdSex = "";
                vm.model.safAreRltdAge = "";
                vm.model.safAreRltdRace = "";
                vm.model.fromPediPopul = "";
            } else if (vm.model && vm.model.dossierType && vm.model.dossierType === "D24"){
                vm.drugUseList = vm.vetDrugUseList;
                vm.model.areDrugsImported ="";
                vm.model.incCTData = "";
                vm.model.effAreRltdSex = "";
                vm.model.effAreRltdAge = "";
                vm.model.effAreRltdRace = "";
                vm.model.safAreRltdSex = "";
                vm.model.safAreRltdAge = "";
                vm.model.safAreRltdRace = "";
                vm.model.fromPediPopul = "";
            } else {
                vm.drugUseList = vm.defaultDrugUseList;
                vm.model.areDrugsImported ="";
            }
        };

        //update Disinfectant Type
        vm.onDisiTypeUpdate = function (newRole) {
            var aRole = {};
            angular.extend(aRole, newRole);
            vm.addressModel.addressRole = aRole;

            if (vm.addressRecForm.$valid) {
                vm.isDetailValid({state: true});
                vm.addressRecForm.$setPristine();
                vm.onUpdate({rec: vm.addressModel});
                vm.showSummary=false;
                vm.errorSummaryUpdate(); //updating parent
            } else {
                vm.showSummary = true;
                vm.updateErrorSummaryState(); //updating current
                vm.focusOnSummary()
            }
        };

        /***
         * update importer list
         */
        vm.updateImporterList = function(list){
            if(!list) return;
            vm.model.importerRecord = list;
        };

        /***
         * update species list
         */
        vm.updateSpeciesList = function(list){
            if(!list) return;
            vm.model.drugProduct.speciesRecord = list;
        };

        /***
         * update Clinical Trial record
         */
        vm.updateCTAInfo = function(record){
            if(!record) return;
            vm.model.clinicalTrial = record;
        };

        /***
         * update sceduleSelected field when load data from file
         */
        vm.setSceduleFieldset = function(){
            if(vm.model.drugProduct.isScheduleC ||
                vm.model.drugProduct.isScheduleD ||
                vm.model.drugProduct.isPrescriptionDrugList ||
                vm.model.drugProduct.isRegulatedCDSA ||
                vm.model.drugProduct.isNonPrescriptionDrug ||
                vm.model.drugProduct.isScheduleA ||
                vm.model.drugProduct.isDrugAdmin) {
                vm.model.drugProduct.scheduleSelected = "scheduleSelected";
            } else {
                vm.model.drugProduct.scheduleSelected = "";
            }
        };

        /***
         * update sceduleSelected field
         */
        vm.updateSceduleFieldset = function(value){
            if(value) {
                vm.model.drugProduct.scheduleSelected = "scheduleSelected";
            } else if(!vm.model.drugProduct.isScheduleC &&
                    !vm.model.drugProduct.isScheduleD &&
                    !vm.model.drugProduct.isPrescriptionDrugList &&
                    !vm.model.drugProduct.isRegulatedCDSA &&
                    !vm.model.drugProduct.isNonPrescriptionDrug &&
                    !vm.model.drugProduct.isScheduleA &&
                    !vm.model.drugProduct.isDrugAdmin) {
                vm.model.drugProduct.scheduleSelected = "";
            }
        };

        /**
         * Save as a json file. Convert interal model to external model for output
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.drugProductService.getRootTagName());
           // vm.showAllErrors = true; //TODO get rid of this?
            //_setComplete()
        };

        vm.saveXML = function () {

            if(vm.drugProdForm.$invalid) {
                vm.showSummary=true;
                vm.focusSummary++;
               // vm.showErrorSummary = vm.showErrorSummary + 1;
                vm.updateErrorSummaryState();
                goToErrorSummary();
            }else {
                var writeResult = _transformFile();
                hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.drugProductService.getRootTagName(),
                    vm.drugProductService.getXSLFileName());
               // vm.showAllErrors = false;
                vm.drugProdForm.$setPristine();
                vm.showSummary=false;
            }
        };


        /**
         * Takes the internal model and transforms to a json object compatible with the output
         * @returns {*}
         * @private
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                if(!vm.drugProdForm.$pristine) {
                    vm.model.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.model.enrolmentVersion);
                    //vm.model.applicationType = ApplicationInfoService.prototype.getApprovedType();
                }
                // updateModelOnApproval(); //updates all the amend
            } else {

                vm.model.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.model.enrolmentVersion);
            }
            return vm.drugProductService.formDataToOutput(vm.model);
        }

        /**
         * @ngdoc -creates a filename for dossier file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {

            var date = new Date();
            var filename = "pi-" + vm.model.dossierID ;
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var separator = "-";

            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            filename = filename + separator + date.getFullYear() + separator + month + separator + day + separator + hours + minutes;
            return (filename.toLowerCase());
        }

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.model) {
                vm.model.dateSaved = vm.applicationInfoService.getTodayDate();
            }
        }
        
        /**
         * Manages errors for no Thera
         * @returns {boolean}
         */
        vm.noTheraRecs = function () {

            if (!vm.model || !vm.model.drugProduct) {
                vm.noThera = "";
                return false;
            }
            if (!vm.model.drugProduct.therapeutic || vm.model.drugProduct.therapeutic.length === 0) {
                vm.noThera = "";
                return true;
            }
            vm.noThera = vm.model.drugProduct.therapeutic.length;
            return false;
        };

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };


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
         * Determines if form is in french
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang===FRENCH);
        };

        vm.selectTab=function(index){
            var temp={id:index};
            vm.setVisibleTabIndex=temp;
        };

        vm.humanAnimalIngredientNameList = function () {
            return getAnimalIngredients(vm.model.drugProduct.formulations);
        };
        function getAnimalIngredients(formulations) {
            var yesValue = 'Y';
            var allAnimalSourcedNames = [];
            if( formulations === undefined){
                return allAnimalSourcedNames;
            }
            for (var i = 0; i < formulations.length; i++) {
                //Step 1 get active ingredients
                var oneFormulation = formulations[i];
                if (oneFormulation.activeIngList) {
                    for (var j = 0; j < (oneFormulation.activeIngList.length); j++) {
                        var oneActive = oneFormulation.activeIngList[j];
                        if (oneActive && oneActive.humanAnimalSourced === yesValue && allAnimalSourcedNames.indexOf(oneActive.ingLabel) < 0 ) {
                            allAnimalSourcedNames.push(oneActive.ingLabel);
                        }
                    }
                }
                //step 2 get nmi flagged
                if (oneFormulation.nMedIngList) {
                    for (var j = 0; j < (oneFormulation.nMedIngList.length); j++) {
                        var oneActive = oneFormulation.nMedIngList[j];
                        if (oneActive.humanAnimalSourced === yesValue && allAnimalSourcedNames.indexOf(oneActive.ingName) < 0 ) {
                            allAnimalSourcedNames.push(oneActive.ingName);
                        }
                    }
                }
                //step 3  all materials
                if (oneFormulation.animalHumanMaterials) {
                    for (var j = 0; j < (oneFormulation.animalHumanMaterials.length); j++) {
                        var oneActive = oneFormulation.animalHumanMaterials[j];
                        if(allAnimalSourcedNames.indexOf(oneActive.ingredientName) < 0){
                            allAnimalSourcedNames.push(oneActive.ingredientName);
                        }
                    }
                }
            }
            return allAnimalSourcedNames;
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.formId="drug_product_form" + scopeId;
            vm.dossierId="dossier_id"+ scopeId;
            vm.compId="company_id"+ scopeId;
            vm.typeId="dossier_type"+ scopeId;
            vm.thirdId="signed_third"+ scopeId;
            vm.prodNameId="prod_name"+ scopeId;
            vm.properNameId="proper_name"+ scopeId;
            vm.isRefId="is_cdn_ref"+ scopeId;
            vm.noTheraId="no_theraVal"+scopeId;
            vm.drugUseId="drug_use"+scopeId;
            vm.propIndicationId="prop_Indication"+scopeId;
            vm.fsType = "fs_type" + scopeId;
            vm.scheduleSelectedId = "schedule_presc_status" + scopeId;
            vm.disiTypeId = "disinfectant_type" + scopeId;
            vm.privacyStatementID = "privacy_statement" + scopeId;
            vm.isAdminSubId = "is_admin_submission" + scopeId;

            vm.incCTDataId = "does_include_ct_data" + scopeId;
            vm.effAreRltdSexId = "efficacy_are_rltd_sex" + scopeId;
            vm.effAreRltdAgeId = "efficacy_are_rltd_age" + scopeId;
            vm.effAreRltdRaceId = "efficacy_are_rltd_race" + scopeId;
            vm.safAreRltdSexId = "safety_are_rltd_sex" + scopeId;
            vm.safAreRltdAgeId = "safety_are_rltd_age" + scopeId;
            vm.safAreRltdRaceId = "safety_are_rltd_race" + scopeId;
            vm.fromPediPopulId = "from_pediatric_populations" + scopeId;
        }

        function goToErrorSummary() {
            var masterError = angular.element(document.querySelector('#master-error'));
            if (masterError) {
                $location.hash('master-error');
                $anchorScroll();
            }
        }

        vm.setAdminSubmission = function () {
            if (vm.model.isAdminSub === YES) {
                vm.showAdminSub = true;
            } else {
                vm.showAdminSub = false;
                vm.model.subType = "";
            }
        };

        vm.updateAdminSubType = function(newSubType){
            //console.log("parent updateAdminSubType " + JSON.stringify(newSubType));
            vm.model.subType = newSubType;
        };

        function loadAdminSubData() {
            vm.drugProductService.getAdminSubTypeList().then(function (data) {
                    vm.adminSubTypeList = data;
                });
        }

        vm.cleanupCTData = function () {
            vm.model.effAreRltdSex = null;
            vm.model.effAreRltdAge = null;
            vm.model.effAreRltdRace = null;
            vm.model.safAreRltdSex = null;
            vm.model.safAreRltdAge = null;
            vm.model.safAreRltdRace = null;
            vm.model.fromPediPopul = null;
        };
    }//endcontroller

})();


