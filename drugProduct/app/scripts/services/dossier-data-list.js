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
        var OTHER = "OTHER";
        var YES = 'Y';
        var vm = this;
        vm.env = '';
        vm.ver = [];
        vm.roaList = [];
        vm.nanoList = [];
        vm.dosageFormList = [];
        vm.unitsPresentationList = [];
        vm.unitsMeasureList = [];
        vm.activeList = [];
        vm.speciesList = [];
        vm.subTypesList = [];
        vm.unitsList = [];
        //TODO create getters/setters? safer as is
        var service = {
            getVer: _getVerString,
            setVer: _setVerString,
            getEnv: _getEnvString,
            setEnv: _setEnvString,
            setActiveList: _setActiveArray,
            setSpeciesList: _setSpeciesArray,
            setSubTypesList: _setSubTypesArray,
            getActiveList: _getActiveArray,
            getSpeciesList: _getSpeciesArray,
            getSubTypesList: _getSubTypesArray,
            createRoaList: _createRoaArray,
            createUnitsList: _createUnitsArray,
            createUnitsPresentationList: _createUnitsPresentationArray,
            createUnitsMeasureList: _createUnitsMeasureArray,
            createNanomaterialList: _createNanoArray,
            createDosageFormList: _createDosageFormArray,
            getDosageFormList: _getDosageFormsArray,
            getUnitsPresentationList: _getUnitsPresentationArray,
            getUnitsMeasureList: _getUnitsMeasureArray,
            getDrugUseList:_getDrugUseArray,
            getVetDrugUseList:_getVetDrugUseArray,
            getCTADrugUseList:_getCTADrugUseArray,
            getDisinfectantTypeList:_getDisinfectantTypeArray,
            getIngRoleList:_getIngRoleArray,
            getPerList:_getPerArray,
            getStrengthList:_getStrengthArray,
            getUnitsList:_getUnitsArray,
            getShelfLifeUnitsList:_getShelfLifeUnitsArray,
            getDosageOther: getDoseOtherValue,
            getNanoMaterials: getNanoMaterialArray,
            getRoa: getRoaArray,
            getOtherValue: getOtherValue, //TODO make a constant instead
            getUnknownValue: getUnknownValue, //TODO make a constant instead
            getYesNoList: yesNoArray,
            getYesNoUnknownList: yesNoUnknownArray,
            getCalAsBaseYesNoList: calAsBaseYesNoArray,
            getAnimalSources: animalSourcesArray,
            getTissuesSystem: tissuesSystemArray,
            getNervousSystem: nervousSystemArray,
            getDigestiveSystem: digestiveSystemArray,
            getImmuneSystem: immuneSystemArray,
            getSkinSystem: skinSystemArray,
            getReprodSystem: reprodSystemArray,
            getOtherSystem: otherSystemArray,
            getMuscleSystem: muscleSystemArray,
            getCardioSystem: cardioSystemArray,
            getDigestiveSystemValue: _getDigestiveSystemValue,
            getNervousSystemValue: _getNervousSystemValue,
            getReproductiveSystemValue: _getReproductiveSystemValue,
            getCardioSystemValue: _getCardioSystemValue,
            getImmuneSystemValue: _getImmuneSystemValue,
            getSkinSystemValue: _getSkinSystemValue,
            getMuscleSystemValue: _getMuscleSystemValue,
            getOtherTissuesSystemValue: _getOtherTissuesSystemValue,
            getYesValue: getYesValue,
            getTissuesFluidsLabels: _getTissuesFluidsLabels,
            getRoaPrefix: _getRoaListPrefix,
            getDosageFormPrefix: _getDosagePrefix,
            getUnitsPrefix: _getUnitsPrefix,
            getNanoPrefix: _getNanoPrefix

        };
        return service;

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
        
        function _getEnvString() {
            if (vm.env) {
                return vm.env;
            } else {
                return {
                    "ver": {
                        "CO": {
                            "major": "4",
                            "minor": "2",
                            "patch": "0"
                        },
                        "RT": {
                            "major": "4",
                            "minor": "2",
                            "patch": "0"
                        },
                        "PI": {
                            "major": "4",
                            "minor": "2",
                            "patch": "0"
                        },
                        "WET": {
                            "major": "v4",
                            "minor": "0",
                            "patch": "41"
                        }
                    }
                };
            }
        }

        function _setEnvString(value) {
            vm.env = value.env;
        }

        function _setActiveArray(data) {
            vm.activeList = data;
        }

        function _setSpeciesArray(data) {
            vm.speciesList = data;
        }

        function _setSubTypesArray(data) {
            vm.subTypesList = data;
        }

        function _getActiveArray() {
            return (vm.activeList);
        }

        function _getSpeciesArray() {
            return (vm.speciesList);
        }

        function _getSubTypesArray() {
            return (vm.subTypesList);
        }

        ////////////////
        function getDoseOtherValue() {
            return OTHER;
        }

        function getYesValue() {
            return YES;
        }

        function getUnknownValue() {
            return "UNLKNOWN";
        }

        function getOtherValue() {
            return getDoseOtherValue();
        }

        function _createNanoArray(translateJson) {

            vm.nanoList = translateJson
        }

        function _createDosageFormArray(translateJson) {
            vm.dosageFormList = (translateJson);
        }

        function _createUnitsPresentationArray(translateJson) {
            vm.unitsPresentationList = (translateJson);
        }

        function _createUnitsMeasureArray(translateJson) {
            vm.unitsMeasureList = (translateJson);
        }

        function _createRoaArray(translateJson) {
            vm.roaList = (translateJson);


        }

        function _createUnitsArray(translateJson) {
            vm.unitsList = (translateJson);

        }
        function _getUnitsArray() {
           return vm.unitsList;
        }


        function _getRoaListPrefix() {
            return "ROA_";
        }

        function _getDosagePrefix() {
            return "DOSFORM_";
        }
        function _getUnitsPrefix() {
            return "UNITS_";
        }
        function _getNanoPrefix(){
            return "NANOMAT_"
        }

        function _getDrugUseArray(){
            var dul = _getCTADrugUseArray();
            return (dul.concat(_getVetDrugUseArray()));
        }

        function _getVetDrugUseArray(){

            return(
                [
                    {"id":"VET","en":"Veterinary","fr":"Vétérinaire"}
                ]
            )
        }

        function _getCTADrugUseArray(){

            return(
                [
                    {"id":"HUMAN","en":"Human","fr":"Humain"},
                    {"id":"RADIO","en":"Radiopharmaceutical","fr":"Radiopharmaceutique"},
                    {"id":"DISINFECT","en":"Disinfectant","fr":"Désinfectant"},
                    {"id":"DM","en":"Drug and Medical Device","fr":"Drogue et instrument médicale"}
                ]
            )
        }

        function _getDisinfectantTypeArray(){
            return(
                [
                    {"id":"HOSPITAL","en":"Hospital","fr":"Hôpital"},
                    {"id":"FP","en":"Food Processing","fr":"Préparation des aliments"},
                    {"id":"MI","en":"Medical Instruments","fr":"Instruments médicaux"},
                    {"id":"DOMESTIC","en":"Domestic","fr":"Domestique"},
                    {"id":"BARN","en":"Barn","fr":"Grange"},
                    {"id":"II","en":"Institutional/Industrial","fr":"institutionnel ou industriel"}
                    // {"id":"CL","en":"Contact Lens","fr":"fr_Contact Lens"}
                ]
            );
        }

        function _getIngRoleArray(){

            return(
                [
                    {"id":"MED","en":"Medicinal Ingredient","fr":"Ingrédient médicinal actif"},
                    {"id":"NONMED","en":"Non-medicinal Ingredient","fr":"Ingrédient non-médicinal actif"}

                ]
            )
        }

        function _getPerArray(){

            return(
                [
                    {"id":"UP","en":"Unit of Presentation","fr":"Unité de présentation"},
                    {"id":"UM","en":"Unit of Measure","fr":"Unité de mesure"}

                ]
            )
        }

        function _getStrengthArray(){

            return(
                [
                    {"id":"EQ","en":"Equals","fr":"Egale"},
                    {"id":"NGT","en":"Not more than","fr":"Pas plus de"},
                    {"id":"NLT","en":"Not less than","fr":"Pas moins de"},
                    {"id":"RA","en":"Range","fr":"Gamme"}

                ]
            )
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

        /**
         * gets the keys for a list If there is a prefix,add it
         * @param translateJson
         * @param prefix
         * @returns {Array}
         * @private
         */
        function _getKeys(translateJson, prefix) {
            var result = [];
            if (!prefix) {
                prefix = "";
            }
            var keys = Object.keys(translateJson);
            for (var i = 0; i < keys.length; i++) {
                var appended = prefix + keys[i];
                result.push(appended)
            }
            return result;
        }

        function _getDosageFormsArray() {
            return vm.dosageFormList;
        }

        function _getUnitsPresentationArray() {
            return vm.unitsPresentationList;
        }

        function _getUnitsMeasureArray() {
            return vm.unitsMeasureList;
        }

        function getNanoMaterialArray() {
            return (vm.nanoList);
        }

        function getRoaArray() {
            return (vm.roaList);
        }

        function yesNoArray() {

            return ([
                "Y",
                "N"
            ]);
        }

        function yesNoUnknownArray() {

            return ([
                "Y",
                "N",
                "UNKNOWN"
            ]);
        }

        function calAsBaseYesNoArray() {

            return ([
                "CAB_YES1",
                "CAB_YES2",
                "CAB_NO",
                "CAB_NO2",
                "CAB_NO3"
            ]);
        }
        function animalSourcesArray() {

            return ([
                "NONHUMANPRIMATE_TYPE",
                "AQUATIC_TYPE",
                "AVIAN_TYPE",
                "BOVINE_TYPE",
                "CANINE_TYPE",
                "CAPRINE_TYPE",
                "CERVIDAE_TYPE",
                "EQUINE_TYPE",
                "FELINE_TYPE",
                "OVINE_TYPE",
                "PORCINE_TYPE",
                "RODENT_TYPE",
                "OTHERANIMAL_TYPE"
            ]);
        }

        /**
         * Tisssues and fluids system types
         * @returns {string[]}
         */
        function tissuesSystemArray() {

            return ([
                _getDigestiveSystemValue(),
                _getNervousSystemValue(),
                _getReproductiveSystemValue(),
                _getCardioSystemValue(),
                _getImmuneSystemValue(),
                _getSkinSystemValue(),
                _getMuscleSystemValue(),
                _getOtherTissuesSystemValue()
            ]);
        }

        function _getDigestiveSystemValue() {

            return "DIGESTIVE_SYSTEM"
        }

        function _getNervousSystemValue() {

            return "NERVOUS_SYSTEM"
        }

        function _getReproductiveSystemValue() {

            return "REPRODUCT_SYSTEM"
        }

        function _getCardioSystemValue() {

            return "CARDIO_SYSTEM"
        }

        function _getImmuneSystemValue() {

            return "IMMUNE_SYSTEM"
        }

        function _getSkinSystemValue() {

            return "SKINGLAND_SYSTEM"
        }

        function _getMuscleSystemValue() {

            return "MUSCULO_SYSTEM"
        }

        function _getOtherTissuesSystemValue() {

            return "OTHERTISSUE_SYSTEM"
        }


        /**
         * Nervous system Tissues or fluids LOV
         * @returns {*[]}
         */
        function nervousSystemArray() {

            return ([
                "BRAIN",
                "BRAINSTEM",
                "CEREBELLUM",
                "CEROFLUID",
                "DORSALROOT",
                "DURAMATER",
                "HYPOTHALAMUS",
                "RETINA",
                "SPINALCORD",
                "TRIGEMINAL",
                "NERVOUS_OTHER"
            ]);
        }

        /**
         * Digestive system Tissues or fluids LOV
         * @returns {*[]}
         */
        function digestiveSystemArray() {

            return ([
                "APPENDIX",
                "BILE",
                "DISTALILEUM",
                "LARGEINTEST",
                "SALIVA",
                "SMALLINTESTINE",
                "STOMACH",
                "DIGESTIVE_OTHER"
            ]);
        }

        /**
         * Reproductive system Tissues or fluids LOV
         * @returns {*[]}
         */
        function reprodSystemArray() {

            return ([
                "MILK",
                "KIDNEY",
                "COLOSTRUM",
                "MAMMARY",
                "OVARIES",
                "PLACENTA",
                "PLACENTAFLUID",
                "SEMEN",
                "TESTES",
                "URINE",
                "REPROD_OTHER"
            ]);
        }

        /**
         * Cardio system Tissues or fluids LOV
         * @returns {*[]}
         */
        function cardioSystemArray() {
            return ([
                "HEART",
                "LUNG",
                "NASALFLUID",
                "TRACHEA",
                "PLACENTALFLUID",
                "CARDIO_OTHER"
            ]);
        }

        /**
         * Immune system Tissues or fluids LOV
         * @returns {*[]}
         */
        function immuneSystemArray() {
            return ([
                "LYMPH",
                "SPLEEN",
                "THYMUS",
                "TONSILS",
                "IMMUNE_OTHER"
            ]);
        }

        /**
         * Skin system Tissues or fluids LOV
         * @returns {*[]}
         */
        function skinSystemArray() {
            return ([
                "ADRENAL",
                "HAIR",
                "LIVER",
                "PANCREAS",
                "PITUARYGLAND",
                "SKINHIDES",
                "THYROID",
                "SKIN_OTHER"
            ]);
        }

        /**
         * Muscle system Tissues or fluids LOV
         * @returns {*[]}
         */
        function muscleSystemArray() {
            return ([
                "ABDOMEN",
                "SKULL",
                "BONES",
                "COLLAGEN",
                "TENDONS",
                "VERTEBRALCOLUMN",
                "MUSCLE_OTHER"
            ]);
        }

        /**
         * Other system Tissues or fluids LOV
         * @returns {*[]}
         */
        function otherSystemArray() {
            return ([
                "ADIPOSE",
                "ASCITES",
                "ANTLERV",
                "SERUM",
                "WHOLEBLOOD",
                "PLASMA",
                "EMBRYONICTISS",
                "FETALTISS",
                "BONEMARROW",
                "EYESCORNEA",
                "GALL",
                "FLUIDS_OTHER"
            ]);
        }

        function _getTissuesFluidsLabels() {
            return ({
                brain: "BRAIN",
                brainStem: "BRAINSTEM",
                cerebellum: "CEREBELLUM",
                ceroFluid: "CEROFLUID",
                dorsalRoot: "DORSALROOT",
                duraMater: "DURAMATER",
                hypothalmus: "HYPOTHALAMUS",
                retina: "RETINA",
                spinalCord: "SPINALCORD",
                trigeminal: "TRIGEMINAL",
                appendix: "APPENDIX",
                bile: "BILE",
                distalIleum: "DISTALILEUM",
                largeIntestine: "LARGEINTEST",
                salivaSalivary: "SALIVA",
                smallIntestine: "SMALLINTESTINE",
                stomach: "STOMACH",
                milkProducts: "MILK",
                kidney: "KIDNEY",
                colostrum: "COLOSTRUM",
                mammaryGlands: "MAMMARY",
                ovaries: "OVARIES",
                placenta: "PLACENTA",
                placentalFluid: "PLACENTAFLUID",
                semen: "SEMEN",
                testes: "TESTES",
                urine: "URINE",
                heartPericardium: "HEART",
                lung: "LUNG",
                nasalFluid: "NASALFLUID",
                trachea: "TRACHEA",
                lymphNodes: "LYMPH",
                spleen: "SPLEEN",
                thymus: "THYMUS",
                tonsils: "TONSILS",
                adrenalGland: "ADRENAL",
                hairHoovesFeathers: "HAIR",
                liver: "LIVER",
                pancreas: "PANCREAS",
                pituitary: "PITUARYGLAND",
                skinHides: "SKINHIDES",
                thyroidParathyroid: "THYROID",
                abdomen: "ABDOMEN",
                skull: "SKULL",
                bones: "BONES",
                collagen: "COLLAGEN",
                tendonsLigaments: "TENDONS",
                vertebralColumn: "VERTEBRALCOLUMN",
                muscle: "MUSCLE",
                adipose: "ADIPOSE",
                ascites: "ASCITES",
                antlerVelvet: "ANTLERV",
                serum: "SERUM",
                wholeBlood: "WHOLEBLOOD",
                plasma: "PLASMA",
                embryonicTissue: "EMBRYONICTISS",
                fetalTissue: "FETALTISS",
                boneMarrow: "BONEMARROW",
                eyesCornea: "EYESCORNEA",
                gallBladder: "GALL"
            });
        }


    }


})();
