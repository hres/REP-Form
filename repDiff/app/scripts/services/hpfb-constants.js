/**
 * Created by hcuser on 07/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('hpfbConstants', []);

    angular.module('hpfbConstants')
        .constant('SOFTWARE_VERSION','1.3.0')
        .constant('CANADA','CAN')
        .constant('OTHER', 'OTHER')
        .constant('YES', 'Y')
        .constant('NO', 'N')
        .constant('USA','USA')
        .constant("UNKNOWN","UNKNOWN")
        .constant("ENGLISH","en")
        .constant("FRENCH","fr")
        .constant("NEW_TYPE","NEW")
        .constant("APPROVED_TYPE","FINAL")
        .constant("AMEND_TYPE","AMEND")
        .constant("INTERNAL_TYPE","INT")
        .constant("EXTERNAL_TYPE","EXT")
        .constant("PHARMA_TYPE", "PHARMA")
        .constant("RELATIVE_FOLDER_DATA","../data/")
        .constant("CSP_XSL","CSP_Enrolment.xsl")
        .constant("ADVANCE_FEE_PAYMENT_EN","https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv-pa-av2-eng.pdf")
        .constant("ADVANCE_FEE_PAYMENT_FR","https://www.canada.ca/content/dam/hc-sc/migration/hc-sc/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv-pa-av2-fra.pdf");
})();