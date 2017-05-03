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

    function getTransactionSeq($http,$q) {
        var vm = this;
        vm.raTypeArray = [];

        var service = {
            getTransactionDescriptions: getTransactionDescriptionsArray,
            getActivityTypes: getActivityArray,
            createRaTypes: _createRaArray,
            getPresubTypes: getPresubArray,
            getAndsType: getANDSArray,
            getDinaType: getDINAArray,
            getDinbType: getDINBArray,
            getEundsType: getEUNDSArray,
            getEusndsType: getEUSNDSArray,
            getLevel3Type: getLevel3Array,
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
            getUdraType: getUDRAVArray,
            getYbprType: getYBPRArray,
            getConsultType: getConsultArray,
            getMPNCType: _getMPNCArray,
            getMPNDSType: _getMPNDSArray,
            getMPSNDSType: _getMPSNDSArray,
            getPANDType: _getPANDArray,
            getPBRERCType: _getPBRERCArray,
            getPBRERPVType: _getPBRERPVArray,
            getPRNDSType: _getPRNDSArray,
            getPRSNDSType:_getPRSNDSArray,
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
            vm.raTypeArray =value;
        }


        //returns a list of all the unique description values
        function getTransactionDescriptionsArray() {
            return (
                [
                    "ADMINISTRATIVE", //administrative
                    "BENEFIT_RISK_ASSESS", //benefit risk assessment
                    "CANCEL_LETTER", //cancellation letter
                    "CHANGE_TO_DIN", //changes to din
                    "COMMENTS_NOC", // comments on notice of decision
                    "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                    "DIN_DISCONTINUED", // din discontinued
                    "DRUG_NOTIF_FORM", // drug notification form
                    "FOR_PERIOD", //for period of ....
                    "INITIAL", //Initial
                    "MEETING_MINUTES", //minutes of meeting dated
                    "NOTIFICATION_CHANGE", //notificaiton of change in benefit profile
                    "PANDEMIC_APPL", //pandemic applicaiton
                    "POST_CLEARANCE_DATA", //post clearance data
                    "POST_MARKET_SURV", // post marketing surveillance
                    "POST_NOC_CHANGE", //Post NOC change
                    "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                    "PRESUB_MEETING_PKG", // presubmission meeting package
                    "PRIORITY_REVIEW_RQ", // Priority rewiew request
                    "PRISTINE_PM", // Pristine PM
                    "PRISTINE_PM_2LANG", // pristine PM second language
                    "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
                    "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                    "EMAIL_RQ_RESPONSE",// response to email request
                    "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                    "MHPD_RQ_RESPONSE", //Response to MHPD requests
                    "NOC_RESPONSE", //response to NOC/ c-Qn
                    "NOD_RESPONSE", //Response to NOD
                    "NOL_RESPONSE", //Response to NOL dated
                    "NON_RESPONSE", //Response to NON
                    "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                    "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                    "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                    "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                    "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                    "SDN_RESPONSE", //response to SDN
                    "PHONE_RQ_RESPONSE", //Response to telephone Request
                    "RISK_COMMUN_DOC", //Risk communication document
                    "RMP_VERSION_DATE", //RMP verison
                    "SIGNAL_WORK_UP", //Signal Work up
                    "UNSOLICITED_DATA", //Unsolicited Data
                    "YEAR_LIST_OF_CHANGE", //Year, list of change number,
                    "BE_CLARIF_RESPONSE" //Response to BE clarification request dated..
                ]);
        }

        function getActivityArray() {

            return (vm.raTypeArray);
        }

        function getPresubArray() {
            return ([
                "CANCEL_LETTER",
                "MEETING_MINUTES",
                "EMAIL_RQ_RESPONSE",
                "PROCESSING_CLARIF_RESPONSE",
                "PHONE_RQ_RESPONSE"
            ]);
        }

        function getANDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE",
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing  Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getDINAArray() {

            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);


        }

        //note DINB is the same as DINA
        function getDINBArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getEUNDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getEUSNDSArray() {

            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getLevel3Array() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "YEAR_LIST_OF_CHANGE" //Year, list of change number,
            ]);
        }

        function getNCArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOL_RESPONSE", //Response to NOL dated
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getNDSArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_NOC", // comments on notice of decision
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRIORITY_REVIEW_RQ", // Priority rewiew request
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ])
        }

        function getPDCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ])
        }

        //PDC and PDCB have the same content currently
        function getPDCBArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ])
        }

        function getPSURCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getPSURPVArray() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getRMPPVArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "RMP_VERSION_DATE" //RMP verison
            ]);
        }

        function getSANDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getSNDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRIORITY_REVIEW_RQ", // Priority rewiew request
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getSNDSCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "RISK_COMMUN_DOC", //Risk communication document
                "SIGNAL_WORK_UP" //Signal Work up
            ]);

        }

        function getUDPVArray() {

            return ([
                "BENEFIT_RISK_ASSESS", //benefit risk assessment
                "CANCEL_LETTER", //cancellation letter
                "NOTIFICATION_CHANGE", //notificaiton of change in benefit profile
                "POST_MARKET_SURV", // post marketing surveillance
                "EMAIL_RQ_RESPONSE",// response to email request
                "MHPD_RQ_RESPONSE", //Response to MHPD requests
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "RISK_COMMUN_DOC", //Risk communication document
                "SIGNAL_WORK_UP" //Signal Work up
            ])

        }

        function getUDRAVArray() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "DIN_DISCONTINUED", // din discontinued
                "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA"
            ])

        }

        function getConsultArray() {

            return ([
                "PANDEMIC_APPL" //pandemic applicaiton,
            ])
        }

        function _getMPNCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "MEETING_MINUTES",
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request,
                "PRESUB_MEETING_PKG", //Pre-submission Meeting Package
                "PRESUB_MEETING_RQ"   //Pre-submission Meeting Request
            ]);
        }

        function _getMPNDSArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "MEETING_MINUTES",
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request,
                "PRESUB_MEETING_PKG", //Pre-submission Meeting Package
                "PRESUB_MEETING_RQ"   //Pre-submission Meeting Request
            ]);
        }

        function _getMPSNDSArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "MEETING_MINUTES",
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "PRESUB_MEETING_PKG", //Pre-submission Meeting Package
                "PRESUB_MEETING_RQ"   //Pre-submission Meeting Request
            ]);
        }

        function _getPANDArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function _getPBRERCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function _getPBRERPVArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function  _getPRNDSArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function _getPRSNDSArray(){
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getYBPRArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }


    }
})();
