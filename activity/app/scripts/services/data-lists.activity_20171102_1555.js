/**
 * Created by dkilty on 12/08/2016.
 * @ngdoc module -gets the list of transaction activity tpyes
 */
(function () {
    'use strict';

    angular
        .module('services', []);

})();


(function () {
    'use strict';

    angular
        .module('services')
        .factory('TransactionLists', getTransactionSeq);

    /* @ngInject */
    getTransactionSeq.inject = ['$http', '$q'];

    function getTransactionSeq($http, $q) {
        var vm = this;
        vm.raTypeArray = [];
        vm.allActivities = {
            ADMINISTRATIVE: "ADMINISTRATIVE", //administrative
            BENEFIT_RISK_ASSESS: "BENEFIT_RISK_ASSESS", //benefit risk assessment
            CANCEL_LETTER: "CANCEL_LETTER", //cancellation letter
            CHANGE_TO_DIN: "CHANGE_TO_DIN", //changes to din
            CLARIF_RESPONSE: "CLARIF_RESPONSE", //Response to clarification request
            COMMENTS_NOC: "COMMENTS_NOC", // comments on notice of decision
            COMMENTS_SUMMARY_BASIS: "COMMENTS_SUMMARY_BASIS", //commments on summary basis of decision (SBD)
            DIN_DISCONTINUED: "DIN_DISCONTINUED", // Notification of Discontinued Sale (DIN Cancellation)
            DRUG_NOTIF_FORM: "DRUG_NOTIF_FORM", // drug notification form
            FOR_PERIOD: "FOR_PERIOD", //for period of ....
            INITIAL: "INITIAL", //Initial
            MEETING_MINUTES: "MEETING_MINUTES", //minutes of meeting dated
            NOTIFICATION_CHANGE: "NOTIFICATION_CHANGE", //notificaiton of change in benefit profile
            NOTIFICATION_INTERRUPT_SALE: "NOTIFICATION_INTERRUPT_SALE",//Notification Interruption of Sale
            PANDEMIC_APPL: "PANDEMIC_APPL", //pandemic applicaiton
            POST_CLEARANCE_DATA: "POST_CLEARANCE_DATA", //post clearance data
            POST_MARKET_SURV: "POST_MARKET_SURV", // post marketing surveillance
            POST_NOC_CHANGE: "POST_NOC_CHANGE", //Post NOC change
            POST_AUTH_DIV1_CHANGE: "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
            PRESUB_MEETING_PKG: "PRESUB_MEETING_PKG", // submission meeting package -used to be presub
            PRESUB_MEETING_RQ: "PRESUB_MEETING_RQ",   //submission Meeting Request -used to be presub
            PRIORITY_REVIEW_RQ: "PRIORITY_REVIEW_RQ", // Priority rewiew request
            PRISTINE_PM: "PRISTINE_PM", // Pristine PM
            PRISTINE_PM_2LANG: "PRISTINE_PM_2LANG", // pristine PM second language
            ADVISEMENT_LETTER_RESPONSE: "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
            CLIN_CLARIF_RESPONSE: "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
            EMAIL_RQ_RESPONSE: "EMAIL_RQ_RESPONSE",// response to email request
            LABEL_CLARIF_RESPONSE: "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
            MHPD_RQ_RESPONSE: "MHPD_RQ_RESPONSE", //Response to MHPD request
            NOC_RESPONSE: "NOC_RESPONSE", //response to NOC/ c-Qn
            NOD_RESPONSE: "NOD_RESPONSE", //Response to NOD
            NOL_RESPONSE: "NOL_RESPONSE", //Response to NOL dated
            NON_RESPONSE: "NON_RESPONSE", //Response to NON
            PROCESSING_CLARIF_RESPONSE: "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
            QUAL_CLIN_CLARIF_RESPONSE: "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
            QUAL_CLARIF_RESPONSE: "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
            RECON_DECIS_LTR_INTENT: "RECON_DECIS_LTR_INTENT",// Reconsideration of Decision - Letter of Intent
            RECON_DECIS_RQ_RECON: "RECON_DECIS_RQ_RECON", //Reconsideration of Decision - Request for Reconsideration
            RECON_DECIS_OTHER_INFO: "RECON_DECIS_OTHER_INFO",// Reconsideration of Decision - Other Information
            SCREENING_ACCEPT_RESPONSE: "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
            SCREENING_CLARIF_RESPONSE: "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
            SDN_RESPONSE: "SDN_RESPONSE", //response to SDN
            LABEL_PREAPPROVAL_2LANG: "LABEL_PREAPPROVAL_2LANG", //Second Language Label - Pre-Approval
            PHONE_RQ_RESPONSE: "PHONE_RQ_RESPONSE", //Response to telephone Request
            RISK_COMMUN_DOC: "RISK_COMMUN_DOC", //Risk communication document
            RMP_VERSION_DATE: "RMP_VERSION_DATE", //RMP verison
            SIGNAL_WORK_UP: "SIGNAL_WORK_UP", //Signal Work up
            UNSOLICITED_DATA: "UNSOLICITED_DATA", //Unsolicited Data
            YEAR_LIST_OF_CHANGE: "YEAR_LIST_OF_CHANGE", //Year, list of change number,
            BE_CLARIF_RESPONSE: "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
            CORR_PATENT_MED: "CORR_PATENT_MED", //Correspondence - Patented Medicines
            ALLEGATION_NOTICE: "ALLEGATION_NOTICE", //Notice of allegation
            FORM_IV: "FORM_IV", //Form IV
            FORM_V: "FORM_V", //Form V
            CONSENT_LTR: "CONSENT_LTR", //Consent Letter
            DATA_PROTECT_CORRESP: "DATA_PROTECT_CORRESP", //Correspondence - Data Protection
            NONCLIN_CLARIF_RESPONSE: "NONCLIN_CLARIF_RESPONSE" //response to Nonclinical clarification request

        }


        var service = {
            getTransactionDescriptions: getTransactionDescriptionsArray,
            getActivityTypes: getActivityArray,
            createRaTypes: _createRaArray,
            getPresubTypes: getPresubArray,
            getAndsType: getANDSArray,
            getDinaType: getDINAArray,
            getDinbType: getDINBArray,
            getDindType: getDINDArray,
            getDinfType: getDINFArray,
            getDSurType: getDSurArray,
            getEundsType: getEUNDSArray,
            getEusndsType: getEUSNDSArray,
            getLevel3Type: getLevel3Array,
            getMPDINType:getMPDINArray,
            getNcType: getNCArray,
            getNdsType: getNDSArray,
            getPdcType: getPDCArray,
            getPdcBType: getPDCBArray,
            getPresubType: getPresubArray,
            getpSurCType: getPSURCArray,
            getpSurPvType: getPSURPVArray,
            getRmpPvType: getRMPPVArray,
            getSandsType: getSANDSArray,
            getSndsType: getSNDSArray,
            getSndsCArray: getSNDSCArray,
            getUdpvType: getUDPVArray,
            getUdraType: getUDRAArray,
            getYbprType: getYBPRArray,
            getConsultType: getConsultArray,
            getMPNCType: _getMPNCArray,
            getMPNDSType: _getMPNDSArray,
            getMPSNDSType: _getMPSNDSArray,
            getPANDType: _getPANDArray,
            getPBRERCType: _getPBRERCArray,
            getPBRERPVType: _getPBRERPVArray,
            getPRNDSType: _getPRNDSArray,
            getPRSNDSType: _getPRSNDSArray,
            getYesNoList: yesNoArray
        };
        return service;

        ////////////////

        //TODO make lists be activity.. yikes!

        function yesNoArray() {

            return ([
                "Y",
                "N"
            ]);
        }

        function _createRaArray(value) {
            vm.raTypeArray = value;
        }


        //returns a list of all the unique description values
        function getTransactionDescriptionsArray() {
            return (vm.allActivities);
        }

        function getActivityArray() {

            return (vm.raTypeArray);
        }

        function getPresubArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE
            ]);
        }

        function getANDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.BE_CLARIF_RESPONSE,
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing  Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP //Correspondence - Data Protection
            ]);
        }

        function getDINAArray() {

            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRISTINE_PM, // Pris vm.allActivities.ine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
            ]);


        }

        //note DINB is the same as DINA
        function getDINBArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
            ]);

        }

        function getEUNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Nonclinical clarification request
            ]);

        }

        function getEUSNDSArray() {

            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //second langage preapproval
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Nonclinical clarification request
            ]);

        }

        function getLevel3Array() {

            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.YEAR_LIST_OF_CHANGE, //Year, list of change number,
                vm.allActivities.CLARIF_RESPONSE //Response to clarification request
            ]);
        }

        function getNCArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOL_RESPONSE, //Response to NOL dated
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
            ]);
        }

        function getNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Nonclinical clarification request
            ])
        }


        function getPSURCArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis of decision (SBD)
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE//Response to telephone Request
            ]);
        }

        function getPSURPVArray() {

            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ]);
        }

        function getRMPPVArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.RMP_VERSION_DATE //RMP verison
            ]);
        }

        function getSANDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP //Correspondence - Data Protection
            ]);
        }

        function getSNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRESUB_MEETING_PKG, // submission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Nonclinical clarification request
            ]);
        }

        function getSNDSCArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis of decision (SBD)
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP //Correspondence - Data Protection
            ]);

        }

        function getUDPVArray() {

            return ([
                vm.allActivities.BENEFIT_RISK_ASSESS, //benefit risk assessment
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.NOTIFICATION_CHANGE, //notificaiton of change in benefit profile
                vm.allActivities.POST_MARKET_SURV, // post marketing surveillance
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.RISK_COMMUN_DOC, //Risk communication document
                vm.allActivities.SIGNAL_WORK_UP //Signal Work up
            ])

        }

        function getUDRAArray() {

            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                vm.allActivities.DIN_DISCONTINUED, // din discontinued
                vm.allActivities.ADVISEMENT_LETTER_RESPONSE, //REspose to Advisement Letter dated
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ])

        }

        function getConsultArray() {

            return ([
                vm.allActivities.PANDEMIC_APPL //pandemic applicaiton,
            ])
        }

        function _getMPNCArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request,
                vm.allActivities.PRESUB_MEETING_PKG, //submission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ   //Pre-submission Meeting Request
            ]);
        }

        function _getMPNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request,
                vm.allActivities.PRESUB_MEETING_PKG, //ubmission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ   //Pre-submission Meeting Request
            ]);
        }

        function _getMPSNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.PRESUB_MEETING_PKG, //submission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ   //submission Meeting Request
            ]);
        }

        function _getPANDArray() {
            return ([
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical  Clarification request
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PRISTINE_PM, // Pristine PM
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD"
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Nonclinical clarification request
            ]);
        }

        function _getPBRERCArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifaction request
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis of decision (SBD)
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ]);
        }

        function _getPBRERPVArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ]);
        }

        function _getPRNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PRIORITY_REVIEW_RQ, // Priority rewiew request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO// Reconsideration of Decision - Other Information
            ]);
        }

        function _getPRSNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PRIORITY_REVIEW_RQ, // Priority rewiew request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO// Reconsideration of Decision - Other Information
            ]);
        }

        function getYBPRArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ]);
        }


        function getDSurArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical  Clarification request
                vm.allActivities.FOR_PERIOD, //for period of ....
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE //Response to telephone Request
            ]);
        }

        function getDINAArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CHANGE_TO_DIN,
                vm.allActivities.DRUG_NOTIF_FORM,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.PRISTINE_PM,
                vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.BE_CLARIF_RESPONSE,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG
            ]);
        }
        function getDINBArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CHANGE_TO_DIN,
                vm.allActivities.DRUG_NOTIF_FORM,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.PRISTINE_PM,
                vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG,
                vm.allActivities.YEAR_LIST_OF_CHANGE
            ]);
        }
        function getDINDArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CHANGE_TO_DIN,
                vm.allActivities.DRUG_NOTIF_FORM,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG
            ]);
        }

        function getDINFArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CHANGE_TO_DIN,
                vm.allActivities.DRUG_NOTIF_FORM,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG
            ]);
        }

        function getMPDINArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PRESUB_MEETING_PKG, //submission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE
            ]);
        }
        function getPDCArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_AUTH_DIV1_CHANGE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRISTINE_PM,
                vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE
            ]);
        }
        function getPDCBArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_AUTH_DIV1_CHANGE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRISTINE_PM,
                vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE
            ]);
        }




    }
})();
