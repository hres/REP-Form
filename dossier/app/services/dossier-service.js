/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .factory('DossierService', DossierService)
    DossierService.$inject = ['$http', '$q'];
    function DossierService($http, $q) {
        // Define the DossierService function
        function DossierService() {}

        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }

        DossierService.CanadianPostalCodePattern = function () {

        }

        // DossierService.dossierDefault = ;


        DossierService.prototype = {

            _default: {
                dossierID: "",
                companyId:"",
                enrolmentVersion: "0.00",
                dateSaved: "",
                applicationType: "NEW",
                softwareVersion: "1.0.0",
                dataChecksum: "",
                productName: "",
                properName: "",
                drugProduct: {
                    thirdPartySigned: false,
                    drugUseList: getDefaultDrugUseList(),
                    isScheduleA: false,
                    scheduleAGroup: getDefaultSchedA(),
                    therapeutic: [],
                    canRefProducts: [],//grid
                    formulations: [],//tab + grid +
                    appendixFourList: []/*{
                        ingredientList:[]
                    }//tab + grid +*/

                },
                contactList: []

            },


            getDefaultObject: function () {

                return this._default;

            },
            loadFromFile: function (info) {

                if (!info)
                    return this._default;

                if(!info['DOSSIER_ENROL'])
                    return this._default;

                info = info['DOSSIER_ENROL'];

                var dossierModel = {
                    dossierID: info.dossier_id,
                    relatedDossierID: info.related_dossier_id,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type,
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    productName: info.brand_name,
                    properName: info.common_name,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: [],
                        isScheduleA: info.is_sched_a === 'Y' ? true:false ,
                        therapeutic: getTherapeuticList(info.therapeutic_class_list.therapeutic_class),
                        canRefProducts:  getCanRefProductList(info.ref_product_list.cdn_ref_product),//grid
                        formulations: getFormulationList(info.formulation_group.formulation_details),//tab + grid +
                        appendixFourList: getAppendix4IngredientList(info.appendix4_group)/*{
                            ingredientList :
                        }//tab + grid +*/

                    },
                   contactList: getContactList(info.contact_record)

                };
                dossierModel.drugProduct.scheduleAGroup = getDefaultSchedA();//always create the default for the forms
                dossierModel.drugProduct.drugUseList=loadDrugUseValues(info);

                if (info.schedule_a_group) {
                    dossierModel.drugProduct.scheduleAGroup.drugIdNumber = info.schedule_a_group.din_number;
                    dossierModel.drugProduct.scheduleAGroup.scheduleAClaimsIndDetails = info.schedule_a_group.sched_a_claims_ind_details;
                    getDiseaseDisorderList(info.schedule_a_group, dossierModel.drugProduct.scheduleAGroup.diseaseDisorderList);
                }

                return dossierModel;

            },

            getAddressList: function (adrList) {

                var list = [];

                if (adrList) {
                    for (var i = 0; i < adrList.length; i++) {
                        var address = {};
                        address.addressID = adrList[i].address_id;
                        address.dossierName = adrList[i].dossier_name;
                        address.amendRecord = adrList[i].amend_record === 'Y' ? true : false;
                        address.addressRole = {};
                        address.addressRole.manufacturer = adrList[i].manufacturer === 'Y' ? true : false;
                        address.addressRole.mailing = adrList[i].mailing === 'Y' ? true : false;
                        address.addressRole.billing = adrList[i].billing === 'Y' ? true : false;
                        address.addressRole.importer = adrList[i].importer === 'Y' ? true : false;
                        address.street = adrList[i].dossier_address_details.street_address;
                        address.city = adrList[i].dossier_address_details.city;
                        address.provState = adrList[i].dossier_address_details.province_lov;
                        address.country = adrList[i].dossier_address_details.country;
                        address.postalCode = adrList[i].dossier_address_details.postal_code;

                        list.push(address);
                    }
                }


                return list;

            }


        };

        /**
         * @ngdoc Main entry point for converting the internal data model to a compatible output for writing
         * @param jsonObj
         * @returns {*}
         */
        DossierService.prototype.dossierToOutput = function (jsonObj) {
            if (!jsonObj) return null;
            var baseDossier = {};
            //order is important!!! Must match schema
            baseDossier.company_id = jsonObj.companyId; //TODO missing from internal model
            baseDossier.dossier_id = jsonObj.dossierId; //TODO missing from  internal model and XML! Net New
            baseDossier.enrolment_version=jsonObj.enrolmentVersion;
            baseDossier.date_saved = jsonObj.dateSaved;
            baseDossier.application_type = jsonObj.applicationType;
            baseDossier.software_version = "1.0.0"; //TODO: hard code or make a function, should be centrally available
            baseDossier.data_checksum = "";
            if (jsonObj.contactList) { //TODO skip if empty list?
                baseDossier.contact_record = repContactToOutput(jsonObj.contactList);
            }
            baseDossier.related_dossier_id = jsonObj.relatedDossierID; //TODO missing from nodel
            baseDossier.brand_name = jsonObj.productName;
            baseDossier.common_name = jsonObj.properName;
            baseDossier.third_party_signed = jsonObj.drugProduct.thirdPartySigned===true ?'Y':'N';
            baseDossier.ref_product_list = {};
            baseDossier.ref_product_list.amend_record = "N" //TODO implement this functionality?
            //initialize values and order
            baseDossier.human_drug_use ='N';
            baseDossier.radiopharm_drug_use='N';
            baseDossier.vet_drug_use ='N';
            baseDossier.disinfectant_drug_use ='N';
            drugUseValuesToOutput(jsonObj.drugProduct.drugUseList,baseDossier)
            baseDossier.therapeutic_class_list = {};
            baseDossier.is_sched_a = jsonObj.drugProduct.isScheduleA===true ?'Y':'N';
            if (jsonObj.drugProduct.therapeutic && jsonObj.drugProduct.therapeutic.length>0) {
                baseDossier.therapeutic_class_list.therapeutic_class = therapeuticClassToOutput(jsonObj.drugProduct.therapeutic);
            }

            if (jsonObj.drugProduct.canRefProducts && jsonObj.drugProduct.canRefProducts.length>0) {
                baseDossier.ref_product_list.cdn_ref_product = canRefProductListToOutput(jsonObj.drugProduct.canRefProducts)
            }
            if (jsonObj.drugProduct.isScheduleA) {
                baseDossier.schedule_a_group=scheduleAToOutput(jsonObj.drugProduct.scheduleAGroup);
            }
            if (jsonObj.drugProduct) {
                var appendix4 = appendix4IngredientListToOutput(jsonObj.drugProduct.appendixFour)
                if (appendix4) {
                    baseDossier.appendix4_group = appendix4;
                }
                var formulations = formulationListToOutput(jsonObj.drugProduct.formulations)
                baseDossier.formulation_group={};
                if (formulations) {
                    baseDossier.formulation_group.formulation_details = formulations;
                }
            }
            //forgot to add root tag!
            return{DOSSIER_ENROL:baseDossier};

        }

        /**
         * Determines if any of the appendices have a data error
         */
        DossierService.prototype.isAppendixesComplete = function () {
            var dossierModel = this.getDossierInfo();
            //error check the model
            if (!dossierModel || !dossierModel.drugProduct || !dosssierModel.drugProduct.appendixFour) {
                return false;
            }
            //iterate through the appendices. If one is error report the error.
            var appendixList = dossierModel.drugProduct.appendixFour.ingredientList;
            for (var i = 0; i < appendixList.length; i++) {
                var appendix = appendixList[i];

                if (!appendix.name) return (true);
                if (!appendix.sourceHuman && !appendix.sourceAnimal) return (true);
                if (appendix.tissuesFluidsOrigin) {
                    var tissuesArray = [
                        appendix.tissuesFluidsOrigin.nervousSystem,
                        appendix.tissuesFluidsOrigin.digestiveSystem,
                        appendix.tissuesFluidsOrigin.reproductiveSystem,
                        appendix.tissuesFluidsOrigin.immuneSystem,
                        appendix.tissuesFluidsOrigin.cardioSystem,
                        appendix.tissuesFluidsOrigin.musculoSkeletalSystem,
                        appendix.tissuesFluidsOrigin.otherTissues,
                        appendix.tissuesFluidsOrigin.skinGlandSystem
                    ];
                    var isSelected = false;
                    for (var m = 0; m < tissuesArray.length; m++) {
                        for (var j = 0; j < tissuesArray[m].list.length; j++) {
                            if (tissuesArray[m].list[j].value === true) {
                                //if has otherText property, check that it is filled in
                                if (tissuesArray[m].list[j].hasOwnProperty('otherText')) {
                                    if (!tissuesArray[m].list[j].otherText) {
                                        return (true);
                                    }
                                } else {
                                    isSelected = true;
                                }
                            }
                        }
                    }
                    if (!isSelected) return true; //none have been selected
                }
                if (appendix.sourceAnimalDetails) {
                    var oneTypeSelected = false;
                    for (var k = 0; k < appendix.sourceAnimalDetails; k++) {
                        //required : true, value
                        var animalRecord = appendix.sourceAnimalDetails[k];
                        if (animalRecord.required && !animalRecord.value) {
                            return true;
                        }
                        if (!animalRecord.required && animalRecord.value) {
                            oneTypeSelected = true;
                        }
                    }
                    if (!oneTypeSelected) return true;
                }
            }
            return false;
        }
        // Return a reference to the function

        DossierService.prototype.getMissingAppendix4=function(dossierModel){
            var missingAppendices=[];

            if(!dossierModel || !dossierModel.drugProduct){
                return missingAppendices;
            }
            // Step 1 Get all the appendices that exist
            var appendices=getAppendiceData(dossierModel.drugProduct.appendixFour);
            //Step 2 get a unique list of ingredients
            var ingredients=getAnimalIngredients(dossierModel.drugProduct.formulations)
            //Step 3 Compare. Determine if there are missing ingredients
            missingAppendices=getMissingAppendices(appendices,ingredients);

            return missingAppendices;
        }


        /**
         * Gets an empty disease disorder list with values set to No
         * @returns {*[]}
         */
        DossierService.prototype.getDefaultDiseaseDisorderList = function () {
            return getDefaultDiseaseDisorderList();

        }

        /**
         * Gets an empty Schedule A Object
         * @returns {*}
         */
        DossierService.prototype.getDefaultScheduleA = function () {
            return (getDefaultSchedA());
        }

        DossierService.prototype.getRootTagName = function () {
            return ("DOSSIER_ENROL");
        }


        return DossierService;
    }

    function getContactList(contacts){

        var list = [];

        if (angular.isDefined(contacts)) {

            for(var i = 0; i < contacts.length; i++){
                var contact = {};
                contact.amend = contacts[i].amend_record === 'Y';
                contact.repRole = contacts[i].rep_contact_role;
                contact.salutation = contacts[i].rep_contact_details.salutation;
                contact.givenName = contacts[i].rep_contact_details.given_name;
                contact.surname =  contacts[i].rep_contact_details.surname;
                contact.initials = contacts[i].rep_contact_details.initials;
                contact.title = contacts[i].rep_contact_details.job_title;
                contact.phone = contacts[i].rep_contact_details.phone_num;
                contact.PhoneExt = contacts[i].rep_contact_details.phone_ext;
                contact.fax = contacts[i].rep_contact_details.fax_num;
                contact.email = contacts[i].rep_contact_details.email;
                contact.language = contacts[i].rep_contact_details.language_correspondance;

                list.push(contact);

            }

        }

        return list;
    };
    /**
     * Get diseaseDisorderList
     * @param info
     * @param diseaseList
     * @returns {*}
     */
    function getDiseaseDisorderList(info, diseaseList) {

        if(!info || !diseaseList) return;
            for(var i=0;i<diseaseList.length;i++){
                var checkboxRec=diseaseList[i];
                switch(checkboxRec.name){
                    case "acute-alcohol":
                        checkboxRec.value= info.acute_alcohol === 'Y';
                        break;
                    case "acute-anxiety":
                        checkboxRec.value= info.acute_anxiety === 'Y';
                        break;
                    case "acute-infectious":
                        checkboxRec.value= info.acute_infectious === 'Y';
                        break;
                    case "acute-inflammatory":
                        checkboxRec.value=info.acute_inflammatory === 'Y';
                        break;
                    case "acute-psychotic":
                        checkboxRec.value= info.acute_psychotic === 'Y';
                        break;
                    case "addiction":
                        checkboxRec.value= info.addiction === 'Y';
                        break;
                    case "ateriosclerosis":
                        checkboxRec.value= info.ateriosclerosis === 'Y';
                        break;
                    case "appendicitis":
                        checkboxRec.value= info.appendicitis === 'Y';
                        break;
                    case "asthma":
                        checkboxRec.value= info.asthma === 'Y';
                        break;

                    case "cancer":
                        checkboxRec.value= info.cancer === 'Y';
                        break;
                    case "congest-heart-fail":
                        checkboxRec.value= info.congest_heart_fail === 'Y';
                        break;
                    case "convulsions":
                        checkboxRec.value= info.convulsions === 'Y';
                        break;

                    case "dementia":
                        checkboxRec.value= info.dementia === 'Y';
                        break;

                    case "depression":
                        checkboxRec.value= info.depression === 'Y';
                        break;

                    case "diabetes":
                        checkboxRec.value= info.diabetes === 'Y';
                        break;

                    case "gangrene":
                        checkboxRec.value= info.gangrene === 'Y';
                        break;

                    case "glaucoma":
                        checkboxRec.value=info.glaucoma === 'Y';
                        break;

                    case "haematologic-bleeding":
                        checkboxRec.value=info.haematologic_bleeding  === 'Y';
                        break;

                    case "hepatitis":
                        checkboxRec.value=info.hepatitis  === 'Y';
                        break;

                    case "hypertension":
                        checkboxRec.value=info.hypertension  === 'Y';
                        break;

                    case "nausea-pregnancy":
                        checkboxRec.value=info.nausea_pregnancy  === 'Y';
                        break;

                    case "obesity":
                        checkboxRec.value=info.obesity  === 'Y';
                        break;
                    case "rheumatic-fever":
                        checkboxRec.value=info.rheumatic_fever   === 'Y';
                        break;
                    case "septicemia":
                        checkboxRec.value=info.septicemia   === 'Y';
                        break;
                    case "sex-transmit-disease":
                        checkboxRec.value=info.sex_transmit_disease  === 'Y';
                        break;
                    case "strangulated-hernia":
                        checkboxRec.value=info.strangulated_hernia   === 'Y';
                        break;
                    case "thrombotic-embolic-disorder":
                        checkboxRec.value=info.thrombotic_embolic_disorder  === 'Y';
                        break;
                    case "thyroid-disease":
                        checkboxRec.value=info.thyroid_disease  === 'Y';
                        break;
                    case "ulcer-gastro":
                        checkboxRec.value=info.ulcer_gastro  === 'Y';
                        break;

                }
            }
        return diseaseList;
    }




    function getTherapeuticList(input) {
        var list = [];

        if (input) {
            for (var i = 0; i < input.length; i++) {
                var item = {
                    "id" : "" + i+1,
                    "name" : input[i]
                };



                list.push(item);
            }
        }


        return list;


    }


    //formulations section

    function getCanRefProductList(info) {
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.brandName = info[i].brand_name;
                product.medIngredient = info[i].medicinal_ingredient;
                product.dosageForm = info[i].dosage_form;
                product.dosageFormOther = info[i].dosage_form_other;
                product.strengths = info[i].strengths;
                product.companyName = info[i].company_name;

                list.push(product);
            }
        }

       // console.log('getCanRefProductList : ' + JSON.stringify(list));


        return list;


    }



    function getAppendix4IngredientList (info){ //info = dossier.appendixFour.ingredientList
        var list = [];
        var getCountries = function (input) {
            var list = [];

            for (var i = 0; i < input.length; i++) {

                list.push({
                    "name": input[i].country_with_unknown,
                    "unknownCountryDetails": input[i].unknown_country_details
                });

            }
            return list;
        };

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.id = info[i].ingredient_id;
                ing.ingredientName = info[i].ingredient_name;
               // ing.role = info[i].dosage_form;
              // ing.abstractNum = info[i].dosage_form_other;
               // ing.standard = info[i].strengths;
                ing.humanSourced = info[i].human_sourced === 'Y' ? true:false;
                ing.animalSourced = info[i].animal_sourced === 'Y' ? true:false;
                var tissues = info[i].tissues_fluids_section;
                var srcAnimal = info[i].animal_sourced_section;
                //TODO fix the hasOtherDetials
                ing.tissuesFluidsOrigin = {
                    nervousSystem: {
                        title: "NERVOUSYSTEM", //the legend for checkbox list
                        groupName: "nervous-sys", // the group name for checkboxlist
                        list: [
                            {name: "brain", label: "BRAIN", value: tissues.brain === 'Y' ? true : false},
                            {name: "brain-stem", label: "BRAINSTEM", value: tissues.brain_stem === 'Y' ? true : false},
                            {name: "cerebellum", label: "CEREBELLUM", value: tissues.cerebellum === 'Y' ? true : false},
                            {name: "cerebrospinal-fluid", label: "CEROFLUID", value: tissues.cerebrospinal_fluid === 'Y' ? true : false},
                            {name: "dorsal-root-ganglia", label: "DORSALROOT", value: tissues.dorsal_root_ganglia === 'Y' ? true : false},
                            {name: "dura-mater", label: "DURAMATER", value: tissues.dura_mater === 'Y' ? true : false},
                            {name: "hypothalmus", label: "HYPOTHALAMUS", value: tissues.hypothalmus === 'Y' ? true : false},
                            {name: "retina-optic", label: "RETINA", value: tissues.retina_optic === 'Y' ? true : false},
                            {name: "spinal-cord", label: "SPINALCORD", value: tissues.spinal_cord === 'Y' ? true : false},
                            {name: "trigerminal-ganglia", label: "TRIGEMINAL", value: tissues.trigerminal_ganglia === 'Y' ? true : false},
                            {name: "other-nervous", label: "OTHERNERVOUS", value: tissues.other_nervous === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_nervous_details}
                        ]
                    },
                    digestiveSystem: {
                        title: "DIGESTIVESYSTEM",
                        groupName: "digestive-sys",
                        list: [
                            {name: "appendix", label: "APPENDIX", value: tissues.appendix === 'Y' ? true : false},
                            {name: "bile", label: "BILE", value: tissues.bile === 'Y' ? true : false},
                            {name: "distal-ileum", label: "DISTALILEUM", value: tissues.distal_ileum === 'Y' ? true : false},
                            {name: "large-intestine", label: "LARGEINTEST", value: tissues.large_intestine === 'Y' ? true : false},
                            {name: "saliva-salivary", label: "SALIVA", value: tissues.saliva_salivary === 'Y' ? true : false},
                            {name: "small-intestine", label: "SMALLINTESTINE", value: tissues.small_intestine === 'Y' ? true : false},
                            {name: "stomach", label: "STOMACH", value: tissues.stomach === 'Y' ? true : false},
                            {name: "other-digestive", label: "DIGESTIVEOTHER", value: tissues.other_digestive === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_digestive_details
                            }
                        ]
                    },
                    reproductiveSystem: {
                        title: "REPRODUCTSYSTEM",
                        groupName: "reproductive-sys",
                        list: [
                            {name: "milk-products", label: "MILK", value: tissues.milk_products === 'Y' ? true : false},
                            {name: "kidney", label: "KIDNEY", value: tissues.kidney === 'Y' ? true : false},
                            {name: "colostrum", label: "COLOSTRUM", value: tissues.colostrum === 'Y' ? true : false},
                            {name: "mammary-glands", label: "MAMMARY", value: tissues.mammary_glands === 'Y' ? true : false},
                            {name: "ovaries", label: "OVARIES", value: tissues.ovaries === 'Y' ? true : false},
                            {name: "placenta", label: "PLACENTA", value: tissues.placenta === 'Y' ? true : false},
                            {name: "placental-fluid", label: "PLACENTAFLUID", value: tissues.placental_fluid === 'Y' ? true : false},
                            {name: "semen", label: "SEMEN", value: tissues.semen === 'Y' ? true : false},
                            {name: "testes", label: "TESTES", value: tissues.testes === 'Y' ? true : false},
                            {name: "urine", label: "URINE", value: tissues.urine === 'Y' ? true : false},
                            {name: "other-reproductive", label: "OTHERREPROD", value: tissues.other_reproductive === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_reproductive_details}
                        ]
                    },
                    cardioSystem: {
                        title: "CARDIOSYSTEM",
                        groupName: "cardio-sys",
                        list: [
                            {name: "heart-pericardium", label: "HEART", value: tissues.heart_pericardium === 'Y' ? true : false},
                            {name: "lung", label: "LUNG", value: tissues.lung === 'Y' ? true : false},
                            {name: "nasal-fluid", label: "NASALFLUID", value: tissues.nasal_fluid === 'Y' ? true : false},
                            {name: "trachea", label: "TRACHEA", value: tissues.trachea === 'Y' ? true : false},
                            {name: "other-cardio-respiratory", label: "CARDIOOTHER", value: tissues.other_cardio_respiratory === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_cardio_respiratory_details}
                        ]
                    },
                    immuneSystem: {
                        title: "IMMUNESYSTEM",
                        groupName: "immune-sys",
                        list: [
                            {name: "lymph-nodes", label: "LYMPH", value: tissues.lymph_nodes === 'Y' ? true : false},
                            {name: "spleen", label: "SPLEEN", value: tissues.spleen === 'Y' ? true : false},
                            {name: "thymus", label: "THYMUS", value: tissues.thymus === 'Y' ? true : false},
                            {name: "tonsils", label: "TONSILS", value: tissues.tonsils === 'Y' ? true : false},
                            {name: "other-immune", label: "IMMUNEOTHER", value: tissues.other_immune === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_immune_details
                            }
                        ]
                    },
                    skinGlandSystem: {
                        title: "SKINGLANDSYSTEM",
                        groupName: "skin-gland-sys",
                        list: [
                            {name: "adrenal-gland", label: "ADRENAL", value: tissues.adrenal_gland === 'Y' ? true : false},
                            {name: "hair-hooves-feathers", label: "HAIR", value: tissues.hair_hooves_feathers === 'Y' ? true : false},
                            {name: "liver", label: "LIVER", value: tissues.liver === 'Y' ? true : false},
                            {name: "pancreas", label: "PANCREAS", value: tissues.pancreas === 'Y' ? true : false},
                            {name: "pituitary", label: "PITUARYGLAND", value: tissues.pituitary === 'Y' ? true : false},
                            {name: "skin-hides", label: "SKINHIDES", value: tissues.skin_hides === 'Y' ? true : false},
                            {name: "thyroid-parathyroid",label: "THYROID", value: tissues.thyroid_parathyroid === 'Y' ? true : false},
                            {name: "other-skin-glandular", label: "SKINOTHER", value: tissues.other_skin_glandular === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_skin_glandular_details}
                        ]
                    },
                    musculoSkeletalSystem: {
                        title: "MUSCULOSYSTEM",
                        groupName: "musculo-skeletal-sys",
                        list: [
                            {name: "abdomen", label: "ABDOMEN", value: tissues.abdomen === 'Y' ? true : false},
                            {name: "skull", label: "SKULL", value: tissues.skull === 'Y' ? true : false},
                            {name: "bones", label: "BONES", value: tissues.bones === 'Y' ? true : false},
                            {name: "collagen", label: "COLLAGEN", value: tissues.collagen === 'Y' ? true : false},
                            {name: "tendons-ligaments", label: "TENDONS",value: tissues.tendons_ligaments === 'Y' ? true : false},
                            {name: "vertebral-column", label: "VERTEBRALCOLUMN", value: tissues.vertebral_column === 'Y' ? true : false},
                            {name: "muscle", label: "MUSCLE", value: tissues.muscle === 'Y' ? true : false},
                            {name: "other-musculo-skeletal", label: "MUSCLEOTHER", value: tissues.other_musculo_skeletal === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_musculo_skeletal_details}
                        ]
                    },
                    otherTissues: {
                        title: "OTHERTISSUE",
                        groupName: "other-tissues",
                        list: [
                            {name: "adipose", label: "ADIPOSE", value: tissues.adipose === 'Y' ? true : false},
                            {name: "ascites", label: "ASCITES", value: tissues.ascites === 'Y' ? true : false},
                            {name: "antler-velvet", label: "ANTLERV", value: tissues.antler_velvet === 'Y' ? true : false},
                            {name: "serum", label: "SERUM", value: tissues.serum === 'Y' ? true : false},
                            {name: "whole-blood",label: "WHOLEBLOOD",value: tissues.whole_blood === 'Y' ? true : false},
                            {name: "plasma", label: "PLASMA", value: tissues.plasma === 'Y' ? true : false},
                            {name: "embryonic-tissue", label: "EMBRYONICTISS", value: tissues.embryonic_tissue === 'Y' ? true : false},
                            {name: "fetal-tissue", label: "FETALTISS", value: tissues.fetal_tissue === 'Y' ? true : false},
                            {name: "bone-marrow", label: "BONEMARROW", value: tissues.bone_marrow === 'Y' ? true : false},
                            {name: "eyes-cornea", label: "EYESCORNEA", value: tissues.eyes_cornea === 'Y' ? true : false},
                            {name: "gall-bladder", label: "GALL", value: tissues.gall_bladder === 'Y' ? true : false},
                            {name: "other-fluids-tissues", label: "OTHERFLUIDSEL", value: tissues.other_fluids_tissues === 'Y' ? true : false, hasOtherDetails: true, otherText: tissues.other_fluids_tissues_details}
                        ]
                    }
                };
                ing.sourceAnimalDetails = {

                    primateTypeList :  [
                        {label: "NONHUMANPRIMATE", type: "text", name: "nhp-type", required: false, value: srcAnimal.nonhuman_primate_type},
                        {label: "AQUATICTYPE", type: "text", name: "aqua-type", required: false, value: srcAnimal.aquatic_type},
                        {label: "AVIANTYPE", type: "text", name: "avian-type", required: false, value: srcAnimal.avian_type},
                        {label: "BOVINETYPE", type: "text", name: "bovine-type", required: false, value: srcAnimal.bovine_type},
                        {label: "CANINETYPE", type: "text", name: "canine-type", required: false, value: srcAnimal.canine_type},
                        {label: "CAPRINETYPE", type: "text", name: "caprine-type", required: false, value: srcAnimal.caprine_type},
                        {label: "CERVIDAETYPE", type: "text", name: "cervidae-type", required: false, value: srcAnimal.cervidae_type},
                        {label: "EQUINETYPE", type: "text", name: "equine-type", required: false, value: srcAnimal.equine_type},
                        {label: "FELINETYPE", type: "text", name: "feline-type", required: false, value: srcAnimal.feline_type},
                        {label: "OVINETYPE", type: "text", name: "ovine-type", required: false, value: srcAnimal.ovine_type},
                        {label: "PORCINETYPE", type: "text", name: "porcine-type", required: false, value: srcAnimal.porcine_type},
                        {label: "RODENTTYPE", type: "text", name: "rodent-type", required: false, value: srcAnimal.rodent_type},
                        {label: "OTHERANIMALTYPE", type: "text", name: "other-animal-type", required: false, value: srcAnimal.other_type},
                        {label: "CONTROLLEDPOP", type: "select", name: "controlled-pop", required: true, value: srcAnimal.is_controlled_pop},
                        {label: "BIOTECHDERIVED", type: "select", name: "biotech-derived", required: true, value: srcAnimal.is_biotech_derived},
                        {label: "CELLLINE", type: "select", name: "cell-line", required: true, value: srcAnimal.is_cell_line},
                        {label: "AGEANIMALS", type: "number", name: "age-animals", required: true, value: Number(srcAnimal.animal_age)}
                    ],
                    countryList: getCountries(srcAnimal.country_origin_list.country_origin)

                };


                list.push(ing);
            }
        }


        return list;


    }

    function getFormulationList(list){

        var formulationList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {

            //static fields
            var obj={
                "formulation": item.formulation_id,
                "formulationName": item.formulation_name,
                "dosageForm" : item.dosage_form_group.dosage_form,
                "dosageFormOther": item.dosage_form_group.dosage_form_other
            };

            if(item.nonmedicinal_ingredient) {
                obj.nMedIngList = getNonMedIngList(item.nonmedicinal_ingredient);
            }
            if(item.active_ingredient) {
                obj.activeIngList = getActiveIngList(item.active_ingredient);
            }
            //container_group is static but do a check to be safe
            if(item.container_group && item.container_group.container_details) {
                obj.activeIngList = getContainerTypeList(item.container_group.container_details);
            }
            if(item.material_ingredient){
                obj.animalHumanMaterials=getMaterialList(item.material_ingredient);
            }
            if(item.roa_group && item.roa_group.roa_details){
               obj.routeAdmins=getRouteAdminList(item.roa_group.roa_details);
            }
            if(item.country_group && item.country_group.country_manufacturer){
                obj.countryList=getFormulationCountryList(item.country_group.country_manufacturer);
            }
            formulationList.push(obj);
        });

        return formulationList;

    }

    function getActiveIngList(list){

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {

            var obj = {
                "ingId": item.ingredient_id,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc,
                "nanoMaterial": item.is_nanomaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };

            resultList.push(obj);

        });

        return resultList;

    }




    function getNonMedIngList(list){

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {
            var obj = {
                "ingId": item.ingredient_id,
                "varId": item.variant_name,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc,
                "nanoMaterial": item.is_nanomaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };
            resultList.push(obj);
        });

        return resultList;
    }


    function getContainerTypeList(list){

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        angular.forEach(list, function (item) {

            var obj = {
                "containerType": item.container_type,
                "packageSize": item.package_size,
                "shelfLifeYears": Number(item.shelf_life_years),
                "shelfLifeMonths": Number(item.shelf_life_months),
                "tempMin": Number(item.temperature_min),
                "tempMax": Number(item.temperature_max)
            };

            resultList.push(obj);

        });

        return resultList;
    }


    function getMaterialList(list) {

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {
            var obj = {
                "ingredientId": item.ingredient_id,
                "ingredientName": item.ingredient_name,
                "cas": item.cas_number,
                "ingredientStandard": item.ingred_standard,
                "inFinalContainer": item.in_final_container
            };
            resultList.push(obj);
        });
        return resultList;
    };


    function getRouteAdminList(list) {

        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        var resultList = [];

        var _id = 0;

        angular.forEach(list, function (item) {

            _id = _id + 1;
            var obj = {
                "id": _id,
                "roa": item.roa,
                "otherRoaDetails": item.roa_other
            };

            resultList.push(obj);

        });

        return resultList;
    }

    function getFormulationCountryList(list) {

        var resultList = [];

        var _id = 0;

        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        angular.forEach(list, function (item) {

            _id = _id + 1;
            var obj = {
                "id": _id,
                "name": item
            };

            resultList.push(obj);

        });

        return resultList;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };

    function canRefProductListToOutput(info) {
        var resultList = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.brand_name = info[i].brandName;
                product.medicinal_ingredient = info[i].medIngredient;
                product.dosage_form = info[i].dosageForm;
                product.dosage_form_other = info[i].dosageFormOther;
                product.strengths = info[i].strengths;
                product.company_name = info[i].companyName;
                resultList.push(product);
            }
        }
        return resultList;
    }

    /**
     * Converts all the appendix 4 data to output
     * @param info
     * @returns {*}
     */
    function appendix4IngredientListToOutput(info) {
        var appendices = []; //TODO may need better error checking
        //Note order of elements must match schema for validation
        if (!angular.isDefined(info)) {
            return null;
        }
        for (var i = 0; i < info.length; i++) {
            var ing = {};
            ing.ingredient_id = info[i].id;
            ing.ingredient_name = info[i].name;
            ing.animal_sourced = info[i].sourceAnimal === true ? 'Y' : 'N';
            ing.human_sourced = info[i].sourceHuman === true ? 'Y' : 'N';

            if (info.tissuesFluidsOrigin) {
                ing.tissues_fluids_section = createEmptyTissuesFluidsForOutput();
                var oneRecord = info.tissuesFluidsOrigin.nervousSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {
                        case "brain":
                            ing.tissues_fluids_section.brain = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "brain-stem":
                            ing.tissues_fluids_section.brain_stem = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "cerebellum":
                            ing.tissues_fluids_section.cerebellum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "cerebrospinal-fluid":
                            ing.tissues_fluids_section.cerebrospinal_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "dorsal-root-ganglia":
                            ing.dorsal_root_ganglia = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "dura-mater":
                            ing.dura_mater = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "hypothalmus":
                            ing.hypothalmus = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "retina-optic":
                            ing.retina_optic = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "spinal-cord":
                            ing.spinal_cord = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "trigerminal-ganglia":
                            ing.trigerminal_ganglia = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "other-nervous":
                            ing.other_nervous = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_nervous_details = oneRecord.list[g].otherText;
                            break;
                        //TODO complete
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.digestiveSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {
                        case "appendix":
                            ing.appendix = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "bile":
                            ing.bile = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "distal-ileum":
                            ing.distal_ileum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "large-intestine":
                            ing.large_intestine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "saliva-salivary":
                            ing.saliva_salivary = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "stomach":
                            ing.small_intestine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "stomach":
                            ing.stomach = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-digestive":
                            ing.other_digestive = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.tissues.other_digestive_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.reproductiveSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "milk-products":
                            ing.milk_products = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "kidney":
                            ing.kidney = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "colostrum":
                            ing.colostrum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "mammary-glands":
                            ing.mammary_glands = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "ovaries":
                            ing.ovaries = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "placenta":
                            ing.placenta = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "placental-fluid":
                            ing.placental_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "semen":
                            ing.semen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "testes":
                            ing.testes = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "urine":
                            ing.urine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-reproductive":
                            ing.other_reproductive = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_reproductive_details = oneRecord.list[g].otherText;
                            break;

                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.cardioSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "heart-pericardium":
                            ing.heart_pericardium = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "nasal-fluid":
                            ing.nasal_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "lung":
                            ing.lung = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "trachea":
                            ing.trachea = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-cardio-respiratory":
                            ing.other_cardio_respiratory = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_cardio_respiratory_details = oneRecord.list[g].otherText;
                            break;

                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.immuneSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "lymph-nodes":
                            ing.lymph_nodes = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "spleen":
                            ing.spleen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "thymus":
                            ing.thymus = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "tonsils":
                            ing.tonsils = oneRecord.list[g].value === true ? 'Y' : 'N';

                        case "other-immune":
                            ing.other_immune = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_immune_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.skinGlandSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "adrenal-gland":
                            ing.adrenal_gland = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "hair-hooves-feathers":
                            ing.hair_hooves_feathers = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "liver":
                            ing.liver = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "pancreas":
                            ing.pancreas = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "pituitary":
                            ing.pituitary = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "skin-hides":
                            ing.skin_hides = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "thyroid-parathyroid":
                            ing.thyroid_parathyroid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-skin-glandular":
                            ing.other_skin_glandular = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_skin_glandular_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.musculoSkeletalSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "abdomen":
                            ing.abdomen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "skull":
                            ing.skull = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "bones":
                            ing.bones = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "collagen":
                            ing.collagen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "tendons-ligaments":
                            ing.tendons_ligaments = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "vertebral-column":
                            ing.vertebral_column = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "muscle":
                            ing.muscle = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-musculo-skeletal":
                            ing.other_musculo_skeletal = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_musculo_skeletal_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.otherTissues;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "adipose":
                            ing.adipose = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "ascites":
                            ing.ascites = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "antler-velvet":
                            ing.antler_velvet = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "serum":
                            ing.serum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "whole-blood":
                            ing.whole_blood = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "plasma":
                            ing.plasma = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "embryonic-tissue":
                            ing.embryonic_tissue = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "fetal-tissue":
                            ing.fetal_tissue = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "bone-marrow":
                            ing.bone_marrow = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "eyes-cornea":
                            ing.eyes_cornea = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "gall-bladder":
                            ing.gall_bladder = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-fluids-tissues":
                            ing.other_fluids_tissues = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_fluids_tissues_details = oneRecord.list[g].otherText;
                            break;
                    }
                }

            }


            if (info.sourceAnimalDetails) {
                ing.animal_sourced_section = createEmptyAnimalSourceForOutput();
                var animalRecords = info.sourceAnimalDetails.primateTypeList;
                for (var j = 0; j < info.animalRecords.length; i++) {
                    switch (info.animalRecords[j].name) {
                        case "nhp-type":
                            ing.animal_sourced_section.nonhuman_primate_type = animalRecords.list[g].value;
                            break;
                        case "aqua-type":
                            ing.animal_sourced_section.aquatic_type = animalRecords.list[g].value;
                            break;
                        case "avian-type":
                            ing.animal_sourced_section.avian_type = animalRecords.list[g].value;
                            break;
                        case "bovine-type":
                            ing.animal_sourced_section.bovine_type = animalRecords.list[g].value;
                            break;
                        case "canine-type":
                            ing.animal_sourced_section.canine_type = animalRecords.list[g].value;
                            break;
                        case "caprine-type":
                            ing.animal_sourced_section.caprine_type = animalRecords.list[g].value;
                            break;
                        case "cervidae-type":
                            ing.animal_sourced_section.cervidae_type = animalRecords.list[g].value;
                            break;
                        case "equine-type":
                            ing.animal_sourced_section.equine_type = animalRecords.list[g].value;
                            break;
                        case "feline-type":
                            ing.animal_sourced_section.feline_type = animalRecords.list[g].value;
                            break;
                        case "ovine-type":
                            ing.animal_sourced_section.ovine_type = animalRecords.list[g].value;
                            break;
                        case "porcine-type":
                            ing.animal_sourced_section.porcine_type = animalRecords.list[g].value;
                            break;

                        case "rodent-type":
                            ing.animal_sourced_section.rodent_type = animalRecords.list[g].value;
                            break;

                        case "other-animal-type":
                            ing.animal_sourced_section.other_type = animalRecords.list[g].value;
                            break;
                        case "controlled-pop":
                            ing.animal_sourced_section.is_controlled_pop = animalRecords.list[g].value;
                            break;

                        case "biotech-derived":
                            ing.animal_sourced_section.is_biotech_derived = animalRecords.list[g].value;
                            break;

                        case "cell-line":
                            ing.animal_sourced_section.is_cell_line = animalRecords.list[g].value;
                            break;

                        case "age-animals":
                            ing.animal_sourced_section.animal_age = animalRecords.list[g].value;
                            break;

                    }
                }

                var countries = info.sourceAnimalDetails.countryList;
                for (var j = 0; j < countries.length; j++) {
                    ing.animal_sourced_section.country_origin_list.country_origin.push(countries[j]); //TODO is this data structure correct?
                }
            }

            appendices.push(ing);
        }


        return appendices;

    }

    /**
     * Creates an empty data structure for tissues and fluids XML
     */
    function createEmptyTissuesFluidsForOutput() {
        var tissues = {};
        var noValue = 'N'; //TODO should be part of  a service
        tissues.brain = noValue;
        tissues.brain_stem = noValue;
        tissues.cerebellum = noValue;
        tissues.cerebrospinal_fluid = noValue;
        tissues.dorsal_root_ganglia = noValue;
        tissues.dura_mater = noValue;
        tissues.hypothalmus = noValue;
        tissues.retina_optic = noValue;
        tissues.spinal_cord = noValue;
        tissues.trigerminal_ganglia = noValue;
        tissues.other_nervous = noValue;
        tissues.other_nervous_details = "";
        tissues.appendix = noValue;
        tissues.bile = noValue;
        tissues.distal_ileum = noValue;
        tissues.large_intestine = noValue;
        tissues.saliva_salivary = noValue;
        tissues.small_intestine = noValue;
        tissues.stomach = noValue;
        tissues.other_digestive = noValue;
        tissues.other_digestive_details = "";
        tissues.milk_products = noValue;
        tissues.kidney = noValue;
        tissues.colostrum = noValue;
        tissues.mammary_glands = noValue;
        tissues.ovaries = noValue;
        tissues.placenta = noValue;
        tissues.placental_fluid = noValue;
        tissues.semen = noValue;
        tissues.testes = noValue;
        tissues.urine = noValue;
        tissues.other_reproductive = noValue;
        tissues.other_reproductive_details = "";
        tissues.heart_pericardium = noValue;
        tissues.lung = noValue;
        tissues.nasal_fluid = noValue;
        tissues.trachea = noValue;
        tissues.other_cardio_respiratory = noValue;
        tissues.other_cardio_respiratory_details = "";
        tissues.lymph_nodes = noValue;
        tissues.spleen = noValue;
        tissues.thymus = noValue;
        tissues.tonsils = noValue;
        tissues.other_immune = noValue;
        tissues.other_immune_details = "";
        tissues.adrenal_gland = noValue;
        tissues.hair_hooves_feathers = noValue;
        tissues.liver = noValue;
        tissues.pancreas = noValue;
        tissues.pituitary = noValue;
        tissues.skin_hides = noValue;
        tissues.thyroid_parathyroid = noValue;
        tissues.other_skin_glandular = noValue;
        tissues.other_skin_glandular_details = "";
        tissues.abdomen = noValue;
        tissues.skull = noValue;
        tissues.bones = noValue;
        tissues.collagen = noValue;
        tissues.tendons_ligaments = noValue;
        tissues.vertebral_column = noValue;
        tissues.muscle = noValue;
        tissues.other_musculo_skeletal = noValue;
        tissues.other_musculo_skeletal_details = "";
        tissues.adipose = noValue;
        tissues.ascites = noValue;
        tissues.antler_velvet = noValue;
        tissues.serum = noValue;
        tissues.whole_blood = noValue;
        tissues.plasma = noValue;
        tissues.embryonic_tissue = noValue;
        tissues.fetal_tissue = noValue;
        tissues.bone_marrow = noValue;
        tissues.eyes_cornea = noValue;
        tissues.gall_bladder = noValue;
        tissues.other_fluids_tissues = noValue;
        tissues.other_fluids_tissues_details = "";
        return (tissues);
    }

    /**
     * Creates an empty structure for animals XML
     */
    function createEmptyAnimalSourceForOutput() {
        var animals = {};
        //Order is important
        animals.nonhuman_primate_type = "";
        animals.aquatic_type = "";
        animals.avian_type = "";
        animals.bovine_type = "";
        animals.canine_type = "";
        animals.caprine_type = "";
        animals.cervidae_type = "";
        animals.equine_type = "";
        animals.feline_type = "";
        animals.ovine_type = "";
        animals.porcine_type = "";
        animals.rodent_type = "";
        animals.other_type = "";
        animals.is_controlled_pop = "";
        animals.is_biotech_derived = "";
        animals.is_cell_line = "";
        animals.animal_age = "";
        animals.animal_age = "";
        animals.country_origin_list = {};
        animals.country_origin_list.country_origin = []; //TODO verify this is correct
        return (animals);
    }

    /**
     * Creates the formulation list in a format comapatible for output file
     * @param list
     * @returns {Array}
     */
    function formulationListToOutput(list) {
        var formulationList = [];
        //Order is important for the XML
        angular.forEach(list, function (item) {
            var obj = {
                "formulation_name": item.formulationName,
                "formulation_id": item.formulation
            };
           //dosage_form_group, static valuie
            obj.dosage_form_group={};
            obj.dosage_form_group.dosage_form= item.dosageForm;
            obj.dosage_form_group.dosage_form_other=item.dosageFormOther;
            obj.roa_group={};
            if(item.routeAdmins && item.routeAdmins.length>0){
                obj.roa_group.roa_details=routeAdminToOutput(item.routeAdmins);
            }
            obj.container_group={};
            if(item.containerTypes && item.containerTypes.length>0){
                obj.container_group.container_details= containerTypeListToOutput(item.containerTypes);
            }
            obj.country_group={};
            if(item.countryList && item.countryList.length>0){
                obj.country_group=formulationCountryListToOutput(item.countryList);
            }
            if(item.activeIngList && item.activeIngList.length>0){
                obj.active_ingredient= activeListToOutput(item.activeIngList);
            }
            if(item.nMedIngList && item.nMedIngList.length>0) {
                obj.nonmedicinal_ingredient=nonMedIngListToOutput(item.nMedIngList);
            }
            if(item.animalHumanMaterials && item.animalHumanMaterials.length>0){
                obj.material_ingredient=materialListToOutput(item.animalHumanMaterials);
            }
            formulationList.push(obj);
        });
        return formulationList;
    }

    /***
     * Maps the active ingredient list to the output Json
     * @param activeList
     */
    function activeListToOutput(activeList) {
        var resultList = [];

        angular.forEach(activeList, function (item) {

            var obj = {
                "ingredient_id": item.ingId,
                "ingredient_name": item.ingName,
                "cas_number": item.cas,
                "is_human_animal_src": item.humanAnimalSourced,
                "ingred_standard": item.standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "is_base_calc": item.calcAsBase,
                "is_nanomaterial": item.nanoMaterial,
                "nanomaterial_details": item.nanoMaterialOther
            };

            resultList.push(obj);
        });
        return (resultList);
    }

    /**
     * Creates an empty json object for output.
     * Uses default values
     * @returns json object
     */
    function createEmptyActiveForOutput(){
        var obj = {
            "ingredient_id": "",
            "ingredient_name":"",
            "cas_number":"",
            "is_human_animal_src": "",
            "ingred_standard": "",
            "strength": "",
            "per": "",
            "units": "",
            "is_base_calc": "",
            "is_nanomaterial": "",
            "nanomaterial_details": ""
        };
        return obj;
    }



    /**
     * Convertes nonMedicinal Ingredient to a the output json object
     * @param nonMedList
     * @returns {Array}
     */
    function nonMedIngListToOutput(nonMedList) {

        var resultList = [];

        angular.forEach(nonMedList, function (item) {

            var obj = {
                "ingredient_id": item.ingId,
                "variant_name": item.varId,
                "ingredient_name": item.ingName,
                "cas_number": item.cas,
                "is_human_animal_src": item.humanAnimalSourced,
                "ingred_standard": item.standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "is_base_calc": item.calcAsBase,
                "is_nanomaterial": item.nanoMaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };
            resultList.push(obj);
        });
        return resultList;
    }

    /**
     * Converts container type to output json
     * @param containerList
     * @returns {Array}
     */
    function containerTypeListToOutput(containerList) {
        var resultList = [];
        angular.forEach(containerList, function (item) {

            var obj = {
                "container_type": item.containerType,
                "package_size": item.packageSize,
                "shelf_life_years": item.shelfLifeYears,
                "shelf_life_months": item.shelfLifeMonths,
                "temperature_min": item.tempMin,
                "temperature_max": item.tempMax
            };

            resultList.push(obj);
        });
        return resultList;
    }

    /**
     * @ngdoc Maps material records to output json
     * @param list
     * @returns {Array}
     */
    function materialListToOutput(list) {
        var resultList = [];
        angular.forEach(list, function (item) {
            var obj = {
                "ingredient_id": item.ingredientId,
                "ingredient_name": item.ingredientName,
                "cas_number": item.cas,
                "ingred_standard": item.ingredientStandard,
                "in_final_container": item.inFinalContainer
            };
            resultList.push(obj);
        });
        return resultList;
    };

    /**
     * converts route of admin to output json format
     * @param list
     * @returns {Array}
     */
    function routeAdminToOutput(list) {
        var resultList = [];
        angular.forEach(list, function (item) {
            var obj = {
                "roa": item.roa,
                "roa_other": item.otherRoaDetails
            };
            resultList.push(obj);

        });
        return resultList
    }

    /**
     * Country of origin list to output
     * @param list
     * @returns {Array}
     */
    function formulationCountryListToOutput(list) {

        var resultList = []
        angular.forEach(list, function (item) {

            var obj = {
                "country_origin": item.name
            };

            resultList.push(obj);
        });
        return resultList;
    }

    function repContactToOutput(contactList) {
        var resultList = [];
        angular.forEach(contactList, function (item) {
            var obj = {};
            obj.amend = item.amend;
            obj.rep_contact_role = item.repRole; //TODO XML needs to be updated!
            obj.rep_contact_details={};
            obj.rep_contact_details.salutation = item.salutation;
            obj.rep_contact_details.given_name = item.givenName;
            obj.rep_contact_details.initials = item.initials;
            obj.rep_contact_details.surname = item.surname;
            obj.rep_contact_details.job_title = item.title;
            obj.rep_contact_details.language_correspondance = item.language;
            obj.rep_contact_details.phone_num = item.phone;
            obj.rep_contact_details.phone_ext = item.phoneExt;
            obj.rep_contact_details.fax_num = item.fax;
            obj.rep_contact_details.email = item.email;
            resultList.push(obj);
        });
        return resultList;
    }

    /***
     * Converts the therapeutic classification to output format
     * @param jsonObj
     * @returns {Array}
     */
    function therapeuticClassToOutput(jsonObj) {

        var resultList = [];
        for (var i = 0; i < jsonObj.length; i++) {
            //TODO save the ids??
            resultList.push(jsonObj[i].name);
        }
        return (resultList);
    };
    function scheduleAToOutput(jsonObj) {
        var result = createEmptyScheduleAForOutput();
        result.din_number = jsonObj.drugIdNumber;
        var disorderList = jsonObj.diseaseDisorderList
        for (var i = 0; i < disorderList.length; i++) {
            switch (disorderList[i].name) {
                case "acute-alcohol":
                    result.acute_alcohol = disorderList[i].value===true ?'Y':'N';
                    break;
                case "acute-anxiety":
                    result.acute_anxiety = disorderList[i].value===true ?'Y':'N';
                    break;
                case "acute-infectious":
                    result.acute_infectious = disorderList[i].value===true ?'Y':'N';
                    break;
                case "acute-inflammatory":
                    result.acute_inflammatory = disorderList[i].value===true ?'Y':'N';
                    break;
                case "acute-psychotic":
                    result.acute_psychotic = disorderList[i].value===true ?'Y':'N';
                    break;
                case "addiction":
                    result.addiction = disorderList[i].value===true ?'Y':'N';
                    break;
                case "ateriosclerosis":
                    result.ateriosclerosis = disorderList[i].value===true ?'Y':'N';
                    break;
                case "appendicitis":
                    result.appendicitis = disorderList[i].value===true ?'Y':'N';
                    break;
                case "asthma":
                    result.asthma = disorderList[i].value===true ?'Y':'N';
                    break;
                case "cancer":
                    result.cancer = disorderList[i].value===true ?'Y':'N';
                    break;
                case "congest-heart-fail":
                    result.congest_heart_fail = disorderList[i].value===true ?'Y':'N';
                    break;
                case "convulsions":
                    result.convulsions = disorderList[i].value===true ?'Y':'N';
                    break;
                case "dementia":
                    result.dementia = disorderList[i].value===true ?'Y':'N';
                    break;
                case "depression":
                    result.depression = disorderList[i].value===true ?'Y':'N';
                    break;
                case "diabetes":
                    result.diabetes = disorderList[i].value===true ?'Y':'N';
                    break;

                case "gangrene":
                    result.gangrene = disorderList[i].value===true ?'Y':'N';
                    break;
                case "glaucoma":
                    result.glaucoma = disorderList[i].value===true ?'Y':'N';
                    break;

                case "haematologic-bleeding":
                    result.haematologic_bleeding = disorderList[i].value===true ?'Y':'N';
                    break;

                case "hepatitis":
                    result.hepatitis = disorderList[i].value===true ?'Y':'N';
                    break;

                case "hypertension":
                    result.hypertension = disorderList[i].value===true ?'Y':'N';
                    break;

                case "nausea-pregnancy":
                    result.nausea_pregnancy = disorderList[i].value===true ?'Y':'N';
                    break;

                case "obesity":
                    result.obesity = disorderList[i].value===true ?'Y':'N';
                    break;

                case "rheumatic-fever":
                    result.rheumatic_fever = disorderList[i].value===true ?'Y':'N';
                    break;

                case "septicemia":
                    result.septicemia = disorderList[i].value===true ?'Y':'N';
                    break;

                case "sex-transmit-disease":
                    result.sex_transmit_disease = disorderList[i].value===true ?'Y':'N';
                    break;

                case "strangulated-hernia":
                    result.strangulated_hernia = disorderList[i].value===true ?'Y':'N';
                    break;

                case "thrombotic-embolic-disorder":
                    result.thrombotic_embolic_disorder = disorderList[i].value===true ?'Y':'N';
                    break;
                case "thyroid-disease":
                    result.thyroid_disease = disorderList[i].value===true ?'Y':'N';
                    break;

                case "ulcer-gastro":
                    result.ulcer_gastro = disorderList[i].value===true ?'Y':'N';
                    break;

            }
        }
        result.sched_a_claims_ind_details = jsonObj.scheduleAClaimsIndDetails;
        return (result);
    }

    /**
     * Creates the empty output data structure for schedule A
     * @returns json Object
     */
    function createEmptyScheduleAForOutput() {
        var result = {};
        var noValue = 'N';
        //enforcing order for output
        result.din_number = "";
        result.acute_alcohol = noValue;
        result.acute_anxiety = noValue;
        result.acute_infectious = noValue;
        result.acute_inflammatory = noValue;
        result.acute_psychotic = noValue;
        result.addiction = noValue;
        result.ateriosclerosis = noValue;
        result.appendicitis = noValue;
        result.asthma = noValue;
        result.cancer = noValue;
        result.congest_heart_fail = noValue;
        result.convulsions = noValue;
        result.dementia = noValue;
        result.depression = noValue;
        result.diabetes = noValue;
        result.gangrene = noValue;
        result.glaucoma = noValue;
        result.haematologic_bleeding = noValue;
        result.hepatitis = noValue;
        result.hypertension = noValue;
        result.nausea_pregnancy = noValue;
        result.obesity = noValue;
        result.rheumatic_fever = noValue;
        result.septicemia = noValue;
        result.sex_transmit_disease = noValue;
        result.strangulated_hernia = noValue;
        result.thrombotic_embolic_disorder = noValue;
        result.thyroid_disease = noValue;
        result.ulcer_gastro = noValue;
        result.sched_a_claims_ind_details = "";
        return (result);
    }


    function getAppendiceData(appendices) {
        var result = {};
        if (!appendices.ingredientList) return result;
        var appendixArray = appendices.ingredientList;
        for (var i = 0; i < appendixArray.length; i++) {
            var rec = {};
            rec[ing.name] = ing.id;
            result.push(rec);
        }
        return result;
    }

    function getAnimalIngredients(formulations){
        var yesValue= 'Y';
        var allAnimalSourcedNames=[];
        var uniqueList={};
        for(var i=0;i<formulations.length;i++){
            //Step 1 get active ingredients
            var oneFormulation=formulations[i];
            for(var j=0;j<(oneFormulation.activeIngList.length); j++){
                var oneActive=oneFormulation.activeIngList[j];
                if(oneActive.humanAnimalSourced===yesValue){
                    allAnimalSourcedNames.push(oneActive.ingName);
                }
            }
            //step 2 get nmi flagged
            for(var j=0;j<(oneFormulation.nMedIngList.length); j++){
                var oneActive=oneFormulation.nMedIngList[j];
                if(oneActive.humanAnimalSourced===yesValue){
                    allAnimalSourcedNames.push(oneActive.ingName);
                }
            }
            //step 3  all materials
            for(var j=0;j<(oneFormulation.animalHumanMaterials.length); j++){
                var oneActive=oneFormulation.animalHumanMaterials[j];
                    allAnimalSourcedNames.push(oneActive.ingredientName);
            }
        }
        uniqueList=getUniqueList(allAnimalSourcedNames);
        return (uniqueList);
    }

    /**
     * Create a list of missing appendices
     * @param appendiceList
     * @param ingredientList
     */
    function getMissingAppendices(appendiceList,ingredientJsonList) {
        var missingList = [];
        for (var i = 0; i < ingredientJsonList.length; i++) {
                if(!appendiceList.hasOwnProperty(ingredientJsonList[i])){
                    missingList.push(ingredientJsonList[i]);
                }
        }
        return missingList;
    }


    function getUniqueList(arr){
            var u = {}, a = [];
            for(var i = 0, l = arr.length; i < l; ++i){
                if(!u.hasOwnProperty(arr[i])) {
                    a.push(arr[i]);
                    u[arr[i]] = 1;
                }
            }
            return a;
    }

    function getDefaultSchedA() {

        var schedA = {};
        schedA.drugIdNumber = "";
        schedA.scheduleAClaimsIndDetails = "";
        schedA.diseaseDisorderList = getDefaultDiseaseDisorderList();
        return schedA;
    }

    /**
     * Gets an empty disease disorder list with values set to No
     * @returns {*[]}
     */
    function getDefaultDiseaseDisorderList() {
        var noValue = false;
        return [
            {name: "acute-alcohol", label: "ACUTEALCOHOL", value: noValue},
            {name: "acute-anxiety", label: "ACUTEANXIETY", value: noValue},
            {name: "acute-infectious", label: "ACUTERESP", value: noValue},
            {name: "acute-inflammatory", label: "ACUTEINFLAM", value: noValue},
            {name: "acute-psychotic", label: "ACUTEPSYCHOTIC", value: noValue},
            {name: "addiction", label: "ADDICTION", value: noValue},
            {name: "ateriosclerosis", label: "ATERIOSCLEROSIS", value: noValue},
            {name: "appendicitis", label: "APPENDICITIS", value: noValue},
            {name: "asthma", label: "ASTHMA", value: noValue},
            {name: "cancer", label: "CANCER", value: noValue},
            {name: "congest-heart-fail", label: "HEARTCONGEST", value: noValue},
            {name: "convulsions", label: "CONVULSIONS", value: noValue},
            {name: "dementia", label: "DEMENTIA", value: noValue},
            {name: "depression", label: "DEPRESSION", value: noValue},
            {name: "diabetes", label: "DIABETES", value: noValue},
            {name: "gangrene", label: "GANGRENE", value: noValue},
            {name: "glaucoma", label: "GLAUCOMA", value: noValue},
            {name: "haematologic-bleeding", label: "BLEEDINGDISORDERS", value: noValue},
            {name: "hepatitis", label: "HEPATITIS", value: noValue},
            {name: "hypertension", label: "HYPERTENSION", value: noValue},
            {name: "nausea-pregnancy", label: "NAUSEAPREG", value: noValue},
            {name: "obesity", label: "OBESITY", value: noValue},
            {name: "rheumatic-fever", label: "RHEUMATICFEVER", value: noValue},
            {name: "septicemia", label: "SEPTICEMIA", value: noValue},
            {name: "sex-transmit-disease", label: "SEXDISEASE", value: noValue},
            {name: "strangulated-hernia", label: "STRANGHERNIA", value: noValue},
            {name: "thrombotic-embolic-disorder", label: "THROMBOTICDISORDER", value: noValue},
            {name: "thyroid-disease", label: "THYROIDDISEASE", value: noValue},
            {name: "ulcer-gastro", label: "UCLERGASTRO", value: noValue},
        ];

    }

    /*
     * Returns an empty list of drug uses
     *
     */
    function getDefaultDrugUseList() {
        var noVal = false;
        var drugUseList = [
            {"name": "human", "label": "HUMAN", "value": noVal},
            {"name": "radio-pharmaceutical", "label": "RADIOPHARM", "value": noVal},
            {"name": "veterinary", "label": "VETERINARY", "value": noVal},
            {"name": "disinfectant", "label": "DISINFECTANT", "value": noVal}
        ];
        return drugUseList;
    }

    /***
     * Loads the drug use data into a checkbox list format;
     * @param info
     * @returns {*}
     */
    function loadDrugUseValues(info) {
        var drugList = getDefaultDrugUseList();
        for (var i = 0; i < drugList; i++) {
            var rec = drugList[i];
            switch (rec.name) {
                case "human":
                    rec.value = info.human_drug_use === 'Y'
                    break;
                case "radio-pharmaceutical":
                    rec.value = info.radiopharm_drug_use === 'Y'
                    break;
                case "disinfectant":
                    rec.value = info.disinfectant_drug_use === 'Y'
                    break;
                case "veterinary":
                    rec.value = info.vet_drug_use === 'Y'
                    break;
            }
        }
        return (drugList);
    }

    /**
     * Adds the drug use properties to the output JSON
     * @param drugUseArray
     * @param outputJson
     */
    function drugUseValuesToOutput(drugUseArray,outputJson){

        for(var i=0;i<drugUseArray.length;i++){
            var rec=drugUseArray[i];

            switch (rec.name) {
                case "human":
                    outputJson.human_drug_use=rec.value === true ?'Y':'N';
                    break;
                case "radio-pharmaceutical":
                    outputJson.radiopharm_drug_use=rec.value === true ?'Y':'N';
                    break;
                case "disinfectant":
                    outputJson.disinfectant_drug_use=rec.value === true ?'Y':'N';
                    break;
                case "veterinary":
                    outputJson.vet_drug_use=rec.value === true ?'Y':'N';
                    break;
            }
        }


    }



})();
