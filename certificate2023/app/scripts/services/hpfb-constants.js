/**
 * Created by hcuser on 07/06/2016.
 */
(function () {
    'use strict';

    angular
        .module('hpfbConstants', []);

    angular.module('hpfbConstants')
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
        .constant("RELATIVE_FOLDER_DATA","../data/");

})();