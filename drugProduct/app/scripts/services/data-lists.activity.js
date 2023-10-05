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
        vm.env = '';
        vm.ver = [];
        vm.raTypeArray = [];
        vm.feeTypeArray = [];
        vm.mitigationTypeArray = [];

        /** Lead values. Hard coded as different lists need to be   **/
        vm.D21 = 'D21';
        vm.D22 = 'D22';
        vm.D24 = 'D24';
        vm.D26 = 'D26';
        vm.BIOLOGICAL = "B14-20160301-02"; //biological
        vm.CONSUMERHEALTH = "B14-20160301-06"; //Consumer Health Products
        vm.PHARMA = "B14-20160301-09"; //pharmaceutical
        vm.POSTMARKET = "B14-20160301-10"; //postmarket covigilance
        vm.VETERINARY = "B14-20160301-11";
        vm.CLINICAL_BIO = "B14-20160301-02";
        vm.CLINICAL_PHA = "B14-20160301-09";

        vm.allActivities = {
            ADMINISTRATIVE: "ADMINISTRATIVE", //administrative
            BENEFIT_RISK_ASSESS: "BENEFIT_RISK_ASSESS", //benefit risk assessment
            CANCEL_LETTER: "CANCEL_LETTER", //cancellation letter
            CHANGE_TO_DIN: "CHANGE_TO_DIN", //changes to din
            CLARIF_RESPONSE: "CLARIF_RESPONSE", //Response to clarification request
            COMMENTS_NOC: "COMMENTS_NOC", // comments on notice of decision
            COMMENTS_SUMMARY_BASIS: "COMMENTS_SUMMARY_BASIS", //commments on summary basis of decision (SBD),
            COMMENTS_REGULARTORY_DECISION: "COMMENTS_REGULARTORY_DECISION", //Comments on Regulatory Decision Summary,
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
            PRODUCT_LABELLING_POST_APPROVAL: "PRODUCT_LABELLING_POST_APPROVAL",
            // PRISTINE_PM: "PRISTINE_PM", // Pristine PM
            // SECOND_LANG_PM: "SECOND_LANG_PM", // second language PM
            // PRISTINE_PM_2LANG: "PRISTINE_PM_2LANG", // pristine PM second language
            ADVISEMENT_LETTER_RESPONSE: "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
            CLIN_CLARIF_RESPONSE: "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
            EMAIL_RQ_RESPONSE: "EMAIL_RQ_RESPONSE",// response to email request
            HSC_RQ_RESPONSE: "HSC_RQ_RESPONSE", //Response to Human Safety Clarification Request
            QHSC_RQ_RESPONSE: "QHSC_RQ_RESPONSE", //Response to Quality & Human Safety Clarification Request
            CHSC_RQ_RESPONSE: "CHSC_RQ_RESPONSE", //Response to Clinical & Human Safety Clarification Request
            QCHSC_RQ_RESPONSE: "QCHSC_RQ_RESPONSE", //Response to Quality, Clinical and Human Safety Clarification Request
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
            // SIGNAL_WORK_UP: "SIGNAL_WORK_UP", //Signal Work up
            UNSOLICITED_DATA: "UNSOLICITED_DATA", //Unsolicited Data
            YEAR_LIST_OF_CHANGE: "YEAR_LIST_OF_CHANGE", //Year, list of change number,
            BE_CLARIF_RESPONSE: "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
            CORR_PATENT_MED: "CORR_PATENT_MED", //Correspondence - Patented Medicines
            ALLEGATION_NOTICE: "ALLEGATION_NOTICE", //Notice of allegation
            FORM_IV: "FORM_IV", //Form IV
            FORM_V: "FORM_V", //Form V
            CONSENT_LTR: "CONSENT_LTR", //Consent Letter
            DATA_PROTECT_CORRESP: "DATA_PROTECT_CORRESP", //Correspondence - Data Protection
            NONCLIN_CLARIF_RESPONSE: "NONCLIN_CLARIF_RESPONSE", //response to Nonclinical clarification request
            SEQUENCE_CLEANUP:"SEQUENCE_CLEANUP",
            ADV_COMP_REQ: "ADV_COMP_REQ", //Advertising Complaint Request for Information
            CSOtRMP: "CSOtRMP", //CSOtRMP (Canadian Specific Opioid RMP)
            DISSEM_LIST: "DISSEM_LIST", //Dissemination List
            FOREIGN_SAFETY_NOTIFICATION: "FOREIGN_SAFETY_NOTIFICATION", //Foreign Safety Action Notification
            ISSUE_SAFETY_REQUEST: "ISSUE_SAFETY_REQUEST", //Issue Related Safety Request
            PATIENT_SAFETY_INFO: "PATIENT_SAFETY_INFO", //Patient Safety Information (Medication error)
            PUB_RELEASE_INFO: "PUB_RELEASE_INFO", //Public Release of Clinical Information
            RESSESS_ORDER: "RESSESS_ORDER", //Reassessment Order
            WRITTEN_CONSULT_REQ: "WRITTEN_CONSULT_REQ", //Request for Written Consultation
            TEST_STUDIES_ORDER: "TEST_STUDIES_ORDER", //Test and Studies Order
            TERM_COND_COMM: "TERM_COND_COMM", //Terms and Conditions Commitment
            YEAR: "YEAR", //Year
            CTN_ADMINISTRATIVE:"CTN_ADMINISTRATIVE",
            CTN_APPENDIX:"CTN_APPENDIX",
            CTN_CONTACT:"CTN_CONTACT",
            // CTN_CROSS:"CTN_CROSS",
            CTN_DATA:"CTN_DATA",
            CTN_DEAR:"CTN_DEAR",
            CTN_DILUENT:"CTN_DILUENT",
            CTN_DRUG_PROD:"CTN_DRUG_PROD",
            CTN_DRUG_SUBS:"CTN_DRUG_SUBS",
            CTN_ENROLLMENT:"CTN_ENROLLMENT",
            CTN_ETHICS:"CTN_ETHICS",
            // CTN_EXCLUSION_INCLUSION:"CTN_EXCLUSION_INCLUSION",
            CTN_INFORMED:"CTN_INFORMED",
            CTN_INVESTIGATOR:"CTN_INVESTIGATOR",
            CTN_NEW_MANUFACTURING:"CTN_NEW_MANUFACTURING",
            CTN_NEW_PKG:"CTN_NEW_PKG",
            CTN_NEW_QC:"CTN_NEW_QC",
            // CTN_NOL:"CTN_NOL",
            CTN_PACKAGING_LABELLING:"CTN_PACKAGING_LABELLING",
            // CTN_PM:"CTN_PM",
            CTN_PROTOCOL_INFO_UPDATE:"CTN_PROTOCOL_INFO_UPDATE",
            CTN_PROTOCOL_UPDATE:"CTN_PROTOCOL_UPDATE",
            CTN_QOS:"CTN_QOS",
            CTN_REFUSALS:"CTN_REFUSALS",
            CTN_REGULATORY:"CTN_REGULATORY",
            CTN_RESPONSE:"CTN_RESPONSE",
            CTN_SAFETY:"CTN_SAFETY",
            CTN_SHELF_PD:"CTN_SHELF_PD",
            CTN_SHELF_DS:"CTN_SHELF_DS",
            CTN_SITE:"CTN_SITE",
            CTN_SOURCE:"CTN_SOURCE",
            CTN_STRAIN:"CTN_STRAIN",
            CTN_STUDY_COMPLETION:"CTN_STUDY_COMPLETION",
            CTN_STUDY_DISC:"CTN_STUDY_DISC",
            CTN_STUDY_EXT:"CTN_STUDY_EXT",
            CTN_STUDY_SUS:"CTN_STUDY_SUS",
            CTN_TRANS_OWN:"CTN_TRANS_OWN",
            CLINICAL:"CLINICAL",
            CLINICAL_QUALITY:"CLINICAL_QUALITY",
            QUALITY:"QUALITY",
            INITIAL_TEAT_SOLU_MONO:"INITIAL_TEAT_SOLU_MONO",   //INITIAL - Teat Solutions Monograph
            REQ_ACCEPTED:"REQ_ACCEPTED",                       //Request Accepted
            CTN_FORM_BROC_UPDATES:"CTN_FORM_BROC_UPDATES",     //  CTN- Informed Consent Form and Investigator’s Brochure Updates
            CTN_IMPD_UPDATE:"CTN_IMPD_UPDATE",                 // CTN-IMPD Update
            CTN_NEW_SUMM_ADF:"CTN_NEW_SUMM_ADF",                // CTN- New Summary of Additional Drugs Form
            COVIR_19: 'COVIR-19',
            COVIR_19AMD: 'COVIR-19AMD',
            NOC_COMPLIANCE_CFM:"NOC_COMPLIANCE_CFM",    // Notice of Compliance - Confirmatory (NOC/c) commitment
            NOF_DRUG_SHORT:"NOF_DRUG_SHORT",            // Notification of Drug Shortage
            POST_ANTH_CHANGE:"POST_ANTH_CHANGE",        // Post Authorization Change
            ROLLING_INFO:"ROLLING_INFO",                // Rolling Information
            WITHDRAWAL_NOF_FORM:"WITHDRAWAL_NOF_FORM",   // Withdrawal of Drug Notification Form
            PROTOCOL_REVIEW:"PROTOCOL_REVIEW",              //Protocol Review
            BLOOD_EST: "BLOOD_EST"                      // Blood Establishment
        };


        var service = {
            getEnv: _getEnvString,
            setEnv: _setEnvString,
            getVer: _getVerString,
            setVer: _setVerString,
            getTransactionDescriptions: getTransactionDescriptionsArray,
            getActivityTypes: getActivityArray,
            createRaTypes: _createRaArray,
            getPharmaceuticalValue: _getPharmaceutical,
            getBiologicValue: _getBiologic,
            getVeterinaryValue: _getVeterinary,
            getClinicalValue: _getClinical,
            getBiologicalLeadValue: _getBiologicalLead,
            getPharmaLeadValue: _getPharmaLead,
            getPostMarketLeadValue: _getPostMarketLead,
            getConsumHealthLeadValue: _getConsumHealthLead,
            getVeterinaryLeadValue: _getVeterinaryLead,
            getClinicalBioLeadValue: _getClinicalBioLead,
            getClinicalPhaLeadValue: _getClinicalPhaLead,
            getPresubTypes: getPresubArray,
            getAndsType: getANDSArray,
            getV_AndsType: getV_AndsArray,
            getCtaType: getCtaArray,
            getCta_aType: getCta_aArray,
            getPreCtaType: getPreCtaArray,
            getDinaType: getDINAArray,
            getV_DinvType: getV_DINVArray,
            getDinbType: getDINBArray,
            getDindType: getDINDArray,
            getDinfType: getDINFArray,
            getDSurType: getDSurArray,
            getEundsType: getEUNDSArray,
            getEusndsType: getEUSNDSArray,
            getLevel3Type: getLevel3Array,
            getV_Level3Type: getV_Level3Array,
            getMPDINType: getMPDINArray,
            getV_MpdinType: getV_MpdinArray,
            getNcType: getNcArray,
            getV_NcType: getV_NcArray,
            getB_NcType: getB_NcArray,
            getNdsType: getNDSArray,
            getV_NdsType: getV_NdsArray,
            getPdcType: getPDCArray,
            getPdcBType: getPDCBArray,
            getPresubType: getPresubArray,
            getpSurCType: getPSURCArray,
            getpSurPvType: getPSURPVArray,
            getV_PsurPvType: getV_PsurPvArray,
            getRmpPvType: getRMPPVArray,
            getSandsType: getSANDSArray,
            getV_SandsType: getV_SandsArray,
            getSndsType: getSNDSArray,
            getV_SndsType: getV_SndsArray,
            getSndsCType: getSNDSCArray,
            getUdpvType: getUDPVArray,
            getUdraType: getUDRAArray,
            getV_UdraType: getV_UdraArray,
            getYbprType: getYBPRArray,
            getConsultType: getConsultArray,
            getMPNCType: _getMPNCArray,
            getV_MpncType: getV_MpncArray,
            getMPNDSType: _getMPNDSArray,
            getMPCOVType: _getMPCOVArray,
            getV_MpndsType: getV_MpndsArray,
            getV_MpandsType: getV_MpandsArray,
            getV_MpsandsType: getV_MpsandsArray,
            getV_RccType: getV_RccArray,
            getMPSNDSType: _getMPSNDSArray,
            getV_MpsndsType: getV_MpsndsArray,
            getPANDType: _getPANDArray,
            getPBRERCType: _getPBRERCArray,
            getPBRERPVType: _getPBRERPVArray,
            getPRNDSType: _getPRNDSArray,
            getPRSNDSType: _getPRSNDSArray,

            getIRSRPVType: _getIRSRPVArray,
            getPAPVType: _getPAPVArray,
            getPSAPVType: _getPSAPVArray,
            getRCPVType: _getRCPVArray,
            getREGPVType: _getREGPVArray,
            getSANDSCType: _getSANDSCArray,
            getPostDINType: _getPostDINArray,
            getEUANDSType: _getEUANDSArray,
            getEUSANDSType: _getEUSANDSArray,
            getNDSCVType: _getNDSCVArray,

            getYesNoList: yesNoArray,
            getFeeList: _getfeeTypeArray,
            createFeeTypes: _createFeeArray,
            getMitigationList: _getMitigationTypeArray,
            createMitigationList: _createMitigationArray,
            getActivityLeadList: _getActivityLeadArray,
            getActivityLeadListByD22: _getActivityLeadD22Array,
            getActivityLeadListByD21: _getActivityLeadD21Array,
            getActivityLeadListByD24: _getActivityLeadD24Array,
            getActivityLeadListByD26: _getActivityLeadD26Array,
            getShelfLifeUnitsList:_getShelfLifeUnitsArray,

            getCOVIR19Type: _getCoVir19Array, //--remove temporary for the release 2020-09-10, will add them back after
            getV_COV19Type: _getV_CoV19Array,
            getCOVID19AMDType: _getCoVir19AmdArray,  //--remove temporary for the release 2020-09-10, will add them back after
            getV_COV19AMDType: _getV_CoV19AmdArray,
            getVNDSCVType: _getV_NDSCVArray,
            getVPROREType: _getV_PROREArray,
            getBEType: _getBEArray
        };
        return service;

        //TODO make lists be activity.. yikes!

        function yesNoArray() {

            return ([
                "Y",
                "N"
            ]);
        }

        function _getEnvString() {
            if (vm.env) {
                return vm.env;
            } else {
                return '@@envValue';
            }
        }

        function _setEnvString(value) {
            vm.env = value.env;
        }

        function _getVerString() {
            if (vm.ver) {
                return vm.ver;
            } else {
                return '@@verValue';
            }
        }

        function _setVerString(value) {
            vm.ver = value.ver;
        }

        function _createRaArray(value) {
            vm.raTypeArray = value;
        }

        function _createFeeArray(value) {
            vm.feeTypeArray = value;
        }

        function _createMitigationArray(value) {
            vm.mitigationTypeArray = value;
        }

        //returns a list of all the unique description values
        function getTransactionDescriptionsArray() {
            return (vm.allActivities);
        }

        function getActivityArray() {
            return (vm.raTypeArray);
        }

        function _getfeeTypeArray() {
            return (vm.feeTypeArray);
        }

        function _getMitigationTypeArray() {
            return (vm.mitigationTypeArray);
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
                vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL,
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE,
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM //Withdrawal of Drug Notification Form
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getEUNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Nonclinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Nonclinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);

        }
        //Level 3-  Notice of Change
        function getLevel3Array() {

            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.YEAR_LIST_OF_CHANGE, //Year(s), list of change number(s),
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarification request
                vm.allActivities.QUAL_CLARIF_RESPONSE //Response to Quality Clarification request
                // vm.allActivities.CLARIF_RESPONSE //Response to clarification request
            ]);
        }

        // function getNCArray() {
        //     return ([
        //         vm.allActivities.ADMINISTRATIVE, //administrative
        //         vm.allActivities.CANCEL_LETTER, //cancellation letter
        //         vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis
        //         // vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
        //         vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
        //         vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
        //         vm.allActivities.POST_NOC_CHANGE, //Post NOC change
        //         vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
        //         vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
        //         // vm.allActivities.PRISTINE_PM, // Pristine PM
        //         //vm.allActivities.SECOND_LANG_PM, // Second Language PM
        //         //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
        //         vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
        //         vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
        //         vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
        //         vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
        //         vm.allActivities.NOL_RESPONSE, //Response to NOL dated
        //         //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
        //         vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
        //         vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
        //         vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
        //         vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
        //         vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
        //         vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
        //         vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
        //         vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
        //         vm.allActivities.SDN_RESPONSE, //response to SDN
        //         vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
        //         vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
        //         //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
        //     ]);
        // }

        function getNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                // vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Non-clinical clarification request
                vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ])
        }

        function _getNDSCVArray() {		// NDS CV - Pharma/Biologic (IO)
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                // vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
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
                // vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.FORM_IV, //Form IV
                // vm.allActivities.FORM_V, //Form V
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.ROLLING_INFO, //Rolling Information
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Non-clinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.CLIN_CLARIF_RESPONSE //Response to clinical clarification request
            ]);
        }

        function getRMPPVArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.CSOtRMP, //CSOtRMP (Canadian Specific Opioid RMP)
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarification request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.RMP_VERSION_DATE, //RMP verison
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
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
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to Quality & Clinical Clarification Request
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getSNDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                // vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PRESUB_MEETING_PKG, // submission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                // vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                // vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Nonclinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getSNDSCArray() {		// SNDS-C
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis of decision (SBD)
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                vm.allActivities.UNSOLICITED_DATA //Unsolicited Data
                // vm.allActivities.SIGNAL_WORK_UP //Signal Work up
            ])

        }

        function getUDRAArray() {

            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                //vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                vm.allActivities.DIN_DISCONTINUED, // din discontinued
                vm.allActivities.ADVISEMENT_LETTER_RESPONSE, //REspose to Advisement Letter dated
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PRESUB_MEETING_PKG, //submission/presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE, //Notification of interruputions of sale,
                vm.allActivities.NOC_COMPLIANCE_CFM, //Notice of Compliance - Confirmatory (NOC/c) commitment,
                vm.allActivities.NOF_DRUG_SHORT,            // Notification of Drug Shortage
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                vm.allActivities.WRITTEN_CONSULT_REQ, //Request for Written Consultation,
                // vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                // vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request,
                vm.allActivities.PRESUB_MEETING_PKG, //submission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ,   //Pre-submission Meeting Request
                // vm.allActivities.UNSOLICITED_DATA //Unsolicited Information
            ]);
        }

        function _getMPNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.WRITTEN_CONSULT_REQ, //Request for Written Consultation,
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request,
                vm.allActivities.PRESUB_MEETING_PKG, //ubmission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ   //Pre-submission Meeting Request
            ]);
        }

        function _getMPCOVArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request,
                vm.allActivities.PRESUB_MEETING_PKG, //ubmission Meeting Package
                vm.allActivities.PRESUB_MEETING_RQ   //Pre-submission Meeting Request
            ]);
        }

        function _getMPSNDSArray() {
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.WRITTEN_CONSULT_REQ, //Request for Written Consultation,
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
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                // vm.allActivities.PRISTINE_PM, // Pristine PM
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
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.CLIN_CLARIF_RESPONSE //Response to clinical clarification request
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
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
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
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
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL,
                // vm.allActivities.PRISTINE_PM,
                //vm.allActivities.PRISTINE_PM_2LANG,
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
                vm.allActivities.LABEL_PREAPPROVAL_2LANG,
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NOD_RESPONSE //Response to NOD
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getV_DINVArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CHANGE_TO_DIN,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.INITIAL_TEAT_SOLU_MONO,
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NOD_RESPONSE //Response to NOD
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
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL,
                // vm.allActivities.PRISTINE_PM,
                //vm.allActivities.PRISTINE_PM_2LANG,
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
                // vm.allActivities.YEAR_LIST_OF_CHANGE,
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NOD_RESPONSE //Response to NOD
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
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
                vm.allActivities.LABEL_PREAPPROVAL_2LANG,
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NOD_RESPONSE //Response to NOD
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
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
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.LABEL_PREAPPROVAL_2LANG
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getMPDINArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PRESUB_MEETING_PKG, //submission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.WRITTEN_CONSULT_REQ, //Request for Written Consultation,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE
            ]);
        }

        function getPDCArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_AUTH_DIV1_CHANGE,
                vm.allActivities.POST_CLEARANCE_DATA,
                // vm.allActivities.PRISTINE_PM,
                //vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                // vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO, // Reconsideration of Decision - Other Information
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function getPDCBArray() {	// PDC-B
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_AUTH_DIV1_CHANGE,
                vm.allActivities.POST_CLEARANCE_DATA,
                // vm.allActivities.PRISTINE_PM,
                //vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                // vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.RECON_DECIS_OTHER_INFO, // Reconsideration of Decision - Other Information
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                //vm.allActivities.SEQUENCE_CLEANUP // Sequence cleanup as per email FEb 16, 2018
            ]);
        }

        function _getIRSRPVArray() {
            return ([
                vm.allActivities.ISSUE_SAFETY_REQUEST, //Issue Related Safety Request
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PRESUB_MEETING_RQ //submission Meeting Request
            ]);
        }

        function _getPAPVArray() {
            return ([
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.NOTIFICATION_CHANGE, //notificaiton of change in benefit profile
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.POST_MARKET_SURV // post marketing surveillance
            ]);
        }
        //add new RT description arrays - request v3.0.3
        function _getPSAPVArray() {
            return ([
                vm.allActivities.ADV_COMP_REQ, //Advertising Complaint Request for Information
                vm.allActivities.PATIENT_SAFETY_INFO //Patient Safety Information (Medication error)
            ]);
        }

        function _getRCPVArray() {
            return ([
                vm.allActivities.DISSEM_LIST, //Dissemination List
                vm.allActivities.RISK_COMMUN_DOC //Risk communication document
            ]);
        }

        function _getREGPVArray() {
            return ([
                vm.allActivities.BENEFIT_RISK_ASSESS, //benefit risk assessment
                vm.allActivities.FOREIGN_SAFETY_NOTIFICATION, //Foreign Safety Action Notification
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.RESSESS_ORDER, //Reassessment Order
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.TEST_STUDIES_ORDER, //Test and Studies Order
                vm.allActivities.MHPD_RQ_RESPONSE, //Response to MHPD requests
                vm.allActivities.TERM_COND_COMM //Terms and Conditions Commitment
            ]);
        }

        function _getSANDSCArray() {	// SANDS-C
            return ([
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis of decision (SBD)
                vm.allActivities.CONSENT_LTR, //Consent Letter
                vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.FORM_IV, //Form IV
                vm.allActivities.FORM_V, //Form V
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.POST_NOC_CHANGE, //Post NOC change
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
            ]);
        }

        function _getPostDINArray() {
            return ([
                vm.allActivities.YEAR
            ]);
        }

        function _getEUANDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Nonclinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
            ]);

        }

        function _getEUSANDSArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                // vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                // vm.allActivities.PRISTINE_PM, // Pristine PM
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// response to email request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                vm.allActivities.NOD_RESPONSE, //Response to NOD
                vm.allActivities.NON_RESPONSE, //Response to NON
                //vm.allActivities.NOTIFICATION_INTERRUPT_SALE,//Notification Interruption of Sale
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
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.NONCLIN_CLARIF_RESPONSE, //response to Nonclinical clarification request
				vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
            ]);
        }

        function getV_AndsArray() { //V-ANDS
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CONSENT_LTR,
                vm.allActivities.DATA_PROTECT_CORRESP,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.CORR_PATENT_MED,
                vm.allActivities.FORM_IV,
                vm.allActivities.FORM_V,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.ALLEGATION_NOTICE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.NON_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getCtaArray() { //CTA
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.INITIAL,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.CTN_ADMINISTRATIVE,
                vm.allActivities.CTN_APPENDIX,
                vm.allActivities.CTN_CONTACT,
                vm.allActivities.CTN_DATA,
                vm.allActivities.CTN_DEAR,
                vm.allActivities.CTN_DILUENT,
                vm.allActivities.CTN_DRUG_PROD,
                vm.allActivities.CTN_DRUG_SUBS,
                vm.allActivities.CTN_ENROLLMENT,
                vm.allActivities.CTN_ETHICS,
                vm.allActivities.CTN_IMPD_UPDATE,
                vm.allActivities.CTN_INFORMED,
                vm.allActivities.CTN_FORM_BROC_UPDATES,
                vm.allActivities.CTN_INVESTIGATOR,
                vm.allActivities.CTN_NEW_MANUFACTURING,
                vm.allActivities.CTN_NEW_PKG,
                vm.allActivities.CTN_NEW_QC,
                vm.allActivities.CTN_NEW_SUMM_ADF,
                vm.allActivities.CTN_PACKAGING_LABELLING,
                vm.allActivities.CTN_PROTOCOL_INFO_UPDATE,
                vm.allActivities.CTN_PROTOCOL_UPDATE,
                vm.allActivities.CTN_QOS,
                vm.allActivities.CTN_REFUSALS,
                vm.allActivities.CTN_REGULATORY,
                vm.allActivities.CTN_RESPONSE,
                vm.allActivities.CTN_SAFETY,
                vm.allActivities.CTN_SHELF_PD,
                vm.allActivities.CTN_SHELF_DS,
                vm.allActivities.CTN_SITE,
                vm.allActivities.CTN_SOURCE,
                vm.allActivities.CTN_STRAIN,
                vm.allActivities.CTN_STUDY_COMPLETION,
                vm.allActivities.CTN_STUDY_DISC,
                vm.allActivities.CTN_STUDY_EXT,
                vm.allActivities.CTN_STUDY_SUS,
                vm.allActivities.CTN_TRANS_OWN
            ]);
        }
        function getCta_aArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.CLINICAL,
                vm.allActivities.CLINICAL_QUALITY,
                vm.allActivities.QUALITY
            ]);
        }
        function getPreCtaArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
            ]);
        }
        function getV_Level3Array() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                // vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.YEAR_LIST_OF_CHANGE
            ]);
        }
        function getV_MpdinArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                // vm.allActivities.EMAIL_RQ_RESPONSE,
                // vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_MpncArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                // vm.allActivities.EMAIL_RQ_RESPONSE,
                // vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_MpndsArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                // vm.allActivities.EMAIL_RQ_RESPONSE,
                // vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_MpsndsArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                // vm.allActivities.EMAIL_RQ_RESPONSE,
                // vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_MpandsArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_MpsandsArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ
                // vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_RccArray() {
            return ([
                vm.allActivities.REQ_ACCEPTED
            ]);
        }
        function getV_NcArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.POST_NOC_CHANGE,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }

        function getB_NcArray() {	// NC (Biologic)
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                // vm.allActivities.COMMENTS_SUMMARY_BASIS,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.POST_NOC_CHANGE,
                //vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.UNSOLICITED_DATA,
                vm.allActivities.PRODUCT_LABELLING_POST_APPROVAL
                // vm.allActivities.SECOND_LANG_PM
                ]);
         }

        function getNcArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.POST_CLEARANCE_DATA,
                //vm.allActivities.PRISTINE_PM_2LANG,
                vm.allActivities.RECON_DECIS_LTR_INTENT,
                vm.allActivities.RECON_DECIS_RQ_RECON,
                vm.allActivities.RECON_DECIS_OTHER_INFO,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.NOL_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.LABEL_PREAPPROVAL_2LANG,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.UNSOLICITED_DATA,
                // vm.allActivities.SECOND_LANG_PM
            ]);
        }

        function _getV_NDSCVArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CONSENT_LTR,
                vm.allActivities.DATA_PROTECT_CORRESP,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.CORR_PATENT_MED,
                vm.allActivities.FORM_IV,
                // vm.allActivities.FORM_V,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                // vm.allActivities.ALLEGATION_NOTICE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.ROLLING_INFO, //Rolling Information
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA
            ])
        }

        function getV_NdsArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CONSENT_LTR,
                vm.allActivities.DATA_PROTECT_CORRESP,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.CORR_PATENT_MED,
                vm.allActivities.FORM_IV,
                vm.allActivities.FORM_V,
                vm.allActivities.INITIAL,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.ALLEGATION_NOTICE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_PsurPvArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.FOR_PERIOD,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_SandsArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CONSENT_LTR,
                vm.allActivities.DATA_PROTECT_CORRESP,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.CORR_PATENT_MED,
                vm.allActivities.FORM_IV,
                vm.allActivities.FORM_V,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.ALLEGATION_NOTICE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.POST_NOC_CHANGE,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.NON_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_SndsArray() {
            return ([
                vm.allActivities.ADMINISTRATIVE,
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.CONSENT_LTR,
                vm.allActivities.DATA_PROTECT_CORRESP,
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                vm.allActivities.CORR_PATENT_MED,
                vm.allActivities.FORM_IV,
                vm.allActivities.FORM_V,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.ALLEGATION_NOTICE,
                vm.allActivities.POST_CLEARANCE_DATA,
                vm.allActivities.POST_NOC_CHANGE,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.LABEL_CLARIF_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.NON_RESPONSE,
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.SCREENING_ACCEPT_RESPONSE,
                vm.allActivities.SCREENING_CLARIF_RESPONSE,
                vm.allActivities.SDN_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function getV_UdraArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.DIN_DISCONTINUED,
                vm.allActivities.NOTIFICATION_INTERRUPT_SALE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.PROCESSING_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.PRESUB_MEETING_PKG,
                vm.allActivities.PRESUB_MEETING_RQ,
                vm.allActivities.UNSOLICITED_DATA
            ]);
        }
        function _getCoVir19Array() {
            return ([
                // vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                // vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                // vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                // vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                // vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                // vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                // vm.allActivities.NOD_RESPONSE, //Response to NOD
                // vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                // vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                // vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                // vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                // vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                // vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                // vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                // vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                // vm.allActivities.FORM_IV, //Form IV
                // vm.allActivities.FORM_V, //Form V
                // vm.allActivities.CONSENT_LTR, //Consent Letter
                // vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.PANDEMIC_APPL, //Pandemic application
                vm.allActivities.ROLLING_INFO //Rolling Information
                // vm.allActivities.TERM_COND_COMM //Terms and Conditions Commitment
                // vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Non-clinical clarification request
            ])
        }
        function _getCoVir19AmdArray() {
            return ([
                // vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                // vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                // vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                // vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                // vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_ANTH_CHANGE,        // Post Authorization Change
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                //vm.allActivities.SECOND_LANG_PM, // Second Language PM
                //vm.allActivities.PRISTINE_PM_2LANG, // pristine PM second language
                vm.allActivities.PUB_RELEASE_INFO, //Public Release of Clinical Information
                vm.allActivities.BE_CLARIF_RESPONSE, //Response to BE clarification request dated..
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                vm.allActivities.LABEL_PREAPPROVAL_2LANG, //Second Language Label - Pre-Approval
                // vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                // vm.allActivities.NOD_RESPONSE, //Response to NOD
                // vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                // vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                // vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                // vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                // vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                // vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                // vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                // vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                // vm.allActivities.FORM_IV, //Form IV
                // vm.allActivities.FORM_V, //Form V
                // vm.allActivities.CONSENT_LTR, //Consent Letter
                // vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.ROLLING_INFO //Rolling Information
                // vm.allActivities.TERM_COND_COMM //Terms and Conditions Commitment
                // vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Non-clinical clarification request
            ])
        }

        function _getV_CoV19Array() {
            return ([
                // vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                // vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                // vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                // vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                // vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.PANDEMIC_APPL, //Pandemic application
                // vm.allActivities.POST_ANTH_CHANGE,        // Post Authorization Change
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                // vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                // vm.allActivities.NOD_RESPONSE, //Response to NOD
                // vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                // vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                // vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                // vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                // vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                // vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                // vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                // vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                // vm.allActivities.FORM_IV, //Form IV
                // vm.allActivities.FORM_V, //Form V
                // vm.allActivities.CONSENT_LTR, //Consent Letter
                // vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.ROLLING_INFO //Rolling Information
                // vm.allActivities.TERM_COND_COMM //Terms and Conditions Commitment
                // vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Non-clinical clarification request
            ])
        }

        function _getV_CoV19AmdArray() {
            return ([
                // vm.allActivities.ADMINISTRATIVE, //administrative
                vm.allActivities.CANCEL_LETTER, //cancellation letter
                // vm.allActivities.COMMENTS_NOC, // comments on notice of decision
                // vm.allActivities.COMMENTS_SUMMARY_BASIS, //commments on summary basis,
                // vm.allActivities.COMMENTS_REGULARTORY_DECISION, //commments on COMMENTS_REGULARTORY_DECISION basis
                vm.allActivities.DRUG_NOTIF_FORM, // drug notification form
                // vm.allActivities.INITIAL, //Initial
                vm.allActivities.MEETING_MINUTES, //minutes of meeting dated
                vm.allActivities.POST_ANTH_CHANGE,        // Post Authorization Change
                vm.allActivities.POST_CLEARANCE_DATA, //post clearance data
                vm.allActivities.PRESUB_MEETING_PKG, // presubmission meeting package
                vm.allActivities.PRESUB_MEETING_RQ,   //submission Meeting Request -used to be presub
                vm.allActivities.CLARIF_RESPONSE, //Response to clarification request
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.CLIN_CLARIF_RESPONSE, //Response to clinical clarifiaction request
                vm.allActivities.EMAIL_RQ_RESPONSE,// Response to E-mail Request
                vm.allActivities.LABEL_CLARIF_RESPONSE, //Response to labelling clarification request
                // vm.allActivities.NOC_RESPONSE, //response to NOC/ c-Qn
                // vm.allActivities.NOD_RESPONSE, //Response to NOD
                // vm.allActivities.NON_RESPONSE, //Response to NON
                vm.allActivities.PROCESSING_CLARIF_RESPONSE, //Response to processing Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE, //Response to quality and Clinical clarification REquest
                vm.allActivities.QUAL_CLARIF_RESPONSE, //Response to Quality Clarification request
                // vm.allActivities.RECON_DECIS_LTR_INTENT,// Reconsideration of Decision - Letter of Intent
                // vm.allActivities.RECON_DECIS_RQ_RECON, //Reconsideration of Decision - Request for Reconsideration
                // vm.allActivities.RECON_DECIS_OTHER_INFO,// Reconsideration of Decision - Other Information
                // vm.allActivities.SCREENING_ACCEPT_RESPONSE, //response to screening acceptance letter
                vm.allActivities.SCREENING_CLARIF_RESPONSE, // response to screening clarification request
                // vm.allActivities.SDN_RESPONSE, //response to SDN
                vm.allActivities.PHONE_RQ_RESPONSE, //Response to telephone Request
                vm.allActivities.UNSOLICITED_DATA, //Unsolicited Data
                // vm.allActivities.CORR_PATENT_MED, //Correspondence - Patented Medicines
                // vm.allActivities.ALLEGATION_NOTICE, //Notice of allegation
                // vm.allActivities.FORM_IV, //Form IV
                // vm.allActivities.FORM_V, //Form V
                // vm.allActivities.CONSENT_LTR, //Consent Letter
                // vm.allActivities.DATA_PROTECT_CORRESP, //Correspondence - Data Protection
                vm.allActivities.WITHDRAWAL_NOF_FORM, //Withdrawal of Drug Notification Form
                vm.allActivities.ROLLING_INFO //Rolling Information
                // vm.allActivities.TERM_COND_COMM //Terms and Conditions Commitment
                // vm.allActivities.NONCLIN_CLARIF_RESPONSE //response to Non-clinical clarification request
            ])
        }

        function _getV_PROREArray() {
            return ([
                vm.allActivities.CANCEL_LETTER,
                vm.allActivities.MEETING_MINUTES,
                vm.allActivities.PROTOCOL_REVIEW,
                vm.allActivities.CLIN_CLARIF_RESPONSE,
                vm.allActivities.EMAIL_RQ_RESPONSE,
                vm.allActivities.HSC_RQ_RESPONSE,
                vm.allActivities.NOD_RESPONSE,
                vm.allActivities.QHSC_RQ_RESPONSE, //Response to Quality & Human Safety Clarification Request
                vm.allActivities.CHSC_RQ_RESPONSE, // Response to Clinical & Human Safety Clarification Request
                vm.allActivities.QCHSC_RQ_RESPONSE, // Response to Quality, Clinical and Human Safety Clarification Request
                vm.allActivities.QUAL_CLIN_CLARIF_RESPONSE,
                vm.allActivities.QUAL_CLARIF_RESPONSE,
                vm.allActivities.PHONE_RQ_RESPONSE,
                vm.allActivities.UNSOLICITED_DATA
            ])
        }

        function  _getBEArray() {
            return ([
                vm.allActivities.BLOOD_EST
            ]);
        }

        /**
         * Gets the activity lead array. Hard coded as the biological entry has business logic
         * @returns {string[]}
         * @private
         */
        function _getActivityLeadArray() {
            return (
                [
                    vm.PHARMA, //Pharmaceutical
                    vm.BIOLOGICAL, //Biological
                    vm.POSTMARKET, //Post-Market Vigilance
                    vm.CONSUMERHEALTH //Consumer Health Products
                ]
            );
        }

        function _getActivityLeadD22Array() {
            return (
                [
                    vm.PHARMA, //Pharmaceutical - B14-20160301-09
                    vm.POSTMARKET, //Post-Market Vigilance - B14-20160301-10
                    vm.CONSUMERHEALTH //Consumer Health Products -	B14-20160301-06
                ]
            );
        }

        function _getActivityLeadD21Array() {
            return (
                [
                    vm.BIOLOGICAL, //Biological - B14-20160301-02
                    vm.POSTMARKET  //Post-Market Vigilance - B14-20160301-10
                ]
            );
        }
        function _getActivityLeadD24Array() {
            return (
                [
                    vm.VETERINARY
                ]
            );
        }
        function _getActivityLeadD26Array() {
            return (
                [
                    vm.CLINICAL_BIO,
                    vm.CLINICAL_PHA
                ]
            );
        }

        /**
         * Returns the biological Activity Lead value
         * @returns {string}
         * @private
         */

        function _getPharmaceutical(){
            return vm.D22; //D21 - Pharmaceutical
        }

        function _getBiologic(){
            return vm.D21; // D22 - Biologic
        }
        function _getVeterinary() {
            return vm.D24;
        }
        function _getClinical() {
            return vm.D26;
        }
        function _getBiologicalLead() {
            return vm.BIOLOGICAL;
        }
        function _getPharmaLead(){
            return vm.PHARMA;
        }
        function _getPostMarketLead(){
            return vm.POSTMARKET;
        }
        function _getConsumHealthLead(){
            return vm.CONSUMERHEALTH;
        }
        function _getVeterinaryLead() {
            return vm.VETERINARY;
        }
        function _getClinicalBioLead() {
            return vm.CLINICAL_BIO;
        }
        function _getClinicalPhaLead() {
            return vm.CLINICAL_PHA;
        }
        function _getShelfLifeUnitsArray(){
            return(
                [
                    {"id":"YR","en":"Years","fr":"Années"},
                    {"id":"MO","en":"Months","fr":"Mois"},
                    {"id":"DA","en":"Days","fr":"Jours"},
                    {"id":"HR","en":"Hours","fr":"Heures"},
                    {"id":"MI","en":"Minutes","fr":"Minutes"}
                ]
            )
        }
    }
})();
