/**
 * Created by hcuser on 07/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('hpfbConstants', []);

    angular.module('hpfbConstants')
        .constant('SOFTWARE_VERSION','3.0.1')
        .constant('CANADA','CAN')
        .constant('OTHER', 'OTHER')
        .constant('YES', 'Y')
        .constant('NO', 'N')
        .constant('USA','USA')
        .constant("UNKNOWN","UNKNOWN")
        .constant("NEW","New")
        .constant("EXISTING","Existing")
        .constant("ENGLISH","en")
        .constant("FRENCH","fr")
        .constant("NEW_TYPE","NEW")
        .constant("APPROVED_TYPE","FINAL")
        .constant("DEPRECATED_APPROVED_TYPE","APPROVED") //change from the pilot March 20,2018. Needed for backwards compat.
        .constant("AMEND_TYPE","AMEND")
        .constant("INTERNAL_TYPE","INT")
        .constant("EXTERNAL_TYPE","EXT")
        .constant("PHARMA_TYPE", "PHARMA")
        .constant("RELATIVE_FOLDER_DATA","../data/")
        .constant("CSP_XSL","CSP_Enrolment.xsl")
        .constant("HCSC","hcsc")
        .constant("XML","xml")
        .constant("XSL_PREFIX","https://raw.githubusercontent.com/HealthCanada/HPFB/master/Regulatory-Enrolment-Process-REP/v_2_2/Style-Sheets/")
        .constant("ADVANCE_FEE_PAYMENT_EN","https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv-pa-av2-eng.pdf")
        .constant("ADVANCE_FEE_PAYMENT_FR","https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv-pa-av2-fra.pdf");
})();