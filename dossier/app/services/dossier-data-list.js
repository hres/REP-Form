/**
 * Created by dkilty on 9/18/2016.
 */
/**
 * Created by dkilty on 6/4/2016.
 */


(function () {
    'use strict';

    angular
        .module('dossierDataLists', []);

})();

/**
 * getCountryAndProvinces services
 * Returns Canada or US condes, canada provinces, us states
 */
(function () {
    'use strict';

    angular
        .module('dossierDataLists')
        .factory('DossierLists', getService);

    /* @ngInject */
    function getService() {
        var service = {
            getDosageFormList: getDosageFormsArray,
            getDosageOther: getDoseOtherValue,
            getNanoMaterials: getNanoMaterialArray,
            getRoa: getRoaArray,
            getOtherValue: getOtherValue,
            getYesNoList: yesNoArray
        };
        return service;


        ////////////////
        function getDoseOtherValue() {
            return "OTHER";
        }

        function getOtherValue() {
            return getDoseOtherValue();
        }

        function getDosageFormsArray() {
            return ([
                "AEROSOL",
                "BOLUS",
                "CAPSULE",
                "CAPSULE_DELAYED_RELEASE",
                "CAPSULE_EXTENDED_RELEASE",
                "CREAM",
                "EMULSION",
                "GAS",
                "GEL",
                "IMPLANT",
                "LOTION",
                "LOZENGE",
                "OINTMENT",
                "PATCH",
                "PATCH_EXTENDED_RELEASE",
                "POWDER",
                "POWDER_FOR_SOLUTION",
                "POWDER_FOR_SUSPENSION",
                "SHAMPOO",
                "SOLUTION",
                "SPRAY",
                "SPRAY_BAG_ON_VALVE",
                "SPRAY_METERED_DOSE",
                "STICK",
                "STRIP",
                "SUPPOSITORY",
                "SUSPENSION",
                "SYRUP",
                "TABLET",
                "TABLET_CHEWABLE",
                "TABLET_DELAYED_RELEASE",
                "TABLET_EXTENDED_RELEASE",
                "TABLET_ORALLY_DISINTEGRATING",
                "WIPE",
                "OTHER"
            ]);

        }

        function getNanoMaterialArray() {
            return ([
                "NOTNANO",
                "NANOPARTICLE",
                "DENDRIMER",
                "LIPOSOMES",
                "MICELLES",
                "NANOEMULSIONS",
                "NANOCRYSTAL",
                "METALCOLLOIDS",
                "OTHER"
            ]);
        }

        function getRoaArray() {

            return ([
                "BLOCK_INFILTRATION",
                "BUCCAL",
                "DENTAL",
                "DIALYSIS",
                "EPIDURAL",
                "INHALATION",
                "INTRA-ARTERIAL",
                "INTRA-ARTICULAR",
                "INTRABURSAL",
                "INTRADERMAL",
                "INTRAMAMMARY",
                "INTRAOCULAR",
                "INTRAPERITONEAL",
                "INTRATHECAL",
                "INTRATRACHEAL",
                "INTRAVASCULAR",
                "INTRAVENOUS",
                "INTRAVITREAL",
                "IRRIGATION",
                "NASAL",
                "OPHTHALMIC",
                "ORAL",
                "OTIC",
                "RECTAL",
                "SUBCUTANEOUS",
                "SUBLINGUAL",
                "TOPICAL",
                "TRANSDERMAL",
                "URETHRAL",
                "VAGINAL",
                "OTHER"
            ]);
        }

        function yesNoArray() {

            return ([
                "Y",
                "N"
            ]);
        }
    }


})();
