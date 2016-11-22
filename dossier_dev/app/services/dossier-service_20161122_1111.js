/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('dossierService', [
            'dossierDataLists'
        ]);
})();


(function () {
    'use strict';
    angular
        .module('dossierService')
        .factory('DossierService', DossierService)
    DossierService.$inject = ['DossierLists'];
    function DossierService(DossierLists) {
        // Define the DossierService function
        function DossierService() {}

        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }


        DossierService.prototype = {

            _default: {
                dossierID: "",
                companyID:"",
                relatedDossierID: "",
                enrolmentVersion: "0.00",
                dateSaved: "",
                applicationType: "NEW",
                softwareVersion: "1.0.0",
                dataChecksum: "",
                productName: "",
                properName: "",
                isRefProducts: "",
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
                    companyID: info.company_id,
                    relatedDossierID: info.related_dossier_id,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type,
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    productName: info.brand_name,
                    properName: info.common_name,
                    isRefProducts: info.is_ref_products,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: loadDrugUseValues(info),
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
                //dossierModel.drugProduct.drugUseList=loadDrugUseValues(info);

                if (info.schedule_a_group) {
                    dossierModel.drugProduct.scheduleAGroup.drugIdNumber = info.schedule_a_group.din_number;
                    dossierModel.drugProduct.scheduleAGroup.scheduleAClaimsIndDetails = info.schedule_a_group.sched_a_claims_ind_details;
                    getDiseaseDisorderList(info.schedule_a_group, dossierModel.drugProduct.scheduleAGroup.diseaseDisorderList);
                }

                return dossierModel;

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
            baseDossier.company_id = jsonObj.companyID; //TODO missing from internal model
            baseDossier.dossier_id = jsonObj.dossierID; //TODO missing from  internal model and XML! Net New
            baseDossier.related_dossier_id = jsonObj.relatedDossierID; //TODO missing from nodel
            baseDossier.enrolment_version=jsonObj.enrolmentVersion;
            baseDossier.date_saved = jsonObj.dateSaved;
            baseDossier.application_type = jsonObj.applicationType;
            baseDossier.software_version = "1.0.0"; //TODO: hard code or make a function, should be centrally available
            baseDossier.data_checksum = "";
            if (jsonObj.contactList) { //TODO skip if empty list?
                baseDossier.contact_record = repContactToOutput(jsonObj.contactList);
            }
            baseDossier.brand_name = jsonObj.productName;
            baseDossier.common_name = jsonObj.properName;
            baseDossier.third_party_signed = jsonObj.drugProduct.thirdPartySigned===true ?'Y':'N';
            baseDossier.is_ref_products = jsonObj.isRefProducts;
            baseDossier.ref_product_list = {};
            //  baseDossier.ref_product_list.amend_record = "N" //TODO implement this functionality?
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
                var appendix4 = appendix4IngredientListToOutput(jsonObj.drugProduct.appendixFourList)
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
        /* DossierService.prototype.isAppendixesComplete = function () {
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
         }*/
        // Return a reference to the function

        DossierService.prototype.getMissingAppendix4=function(dossierModel){
            var missingAppendices=[];
            var extraAppendices = [];
            var results = {};

            if(!dossierModel || !dossierModel.drugProduct){
                return missingAppendices;
            }
            // Step 1 Get all the appendices that exist
            var appendices=getAppendiceData(dossierModel.drugProduct.appendixFourList);
            //Step 2 get a unique list of ingredients
            var ingredients=getAnimalIngredients(dossierModel.drugProduct.formulations)
            //Step 3 Compare. Determine if there are missing ingredients
            missingAppendices=getMissingAppendices(appendices,ingredients);
            //step 4 get extra appendices
            extraAppendices = findExtraApppendices(appendices);
            results.missing = missingAppendices;
            results.extra = extraAppendices;
            return results;
        };


        /**
         * Gets an empty disease disorder list with values set to No
         * @returns {*[]}
         */
        DossierService.prototype.getDefaultDiseaseDisorderList = function () {
            return getDefaultDiseaseDisorderList();

        };

        DossierService.prototype.getDefaultNervousSystem = function () {
            return _createEmptyNervousSystemModel();

        };
        DossierService.prototype.getDefaultImmuneSystem = function () {
            return _createEmptyImmuneSystemModel();

        };
        DossierService.prototype.getDefaultDigestiveSystem = function () {
            return _createEmptyDigestiveSystemModel();

        };
        DossierService.prototype.getDefaultMuscleSystem = function () {
            return _createEmptyMuscleSystemModel();

        };
        DossierService.prototype.getDefaultOtherSystem = function () {
            return _createEmptyOtherSystemModel();

        };
        DossierService.prototype.getDefaultReproductiveSystem = function () {
            return _createEmptyReproductiveSystemModel();

        };
        DossierService.prototype.getDefaultCardioSystem = function () {
            return _createEmptyCardioSystemModel();

        };
        DossierService.prototype.getDefaultSkinSystem = function () {
            return _createEmptySkinSystemModel();

        };

        /**
         * Gets an empty Schedule A Object
         * @returns {*}
         */
        DossierService.prototype.getDefaultScheduleA = function () {
            return (getDefaultSchedA());
        };

        DossierService.prototype.getRootTagName = function () {
            return ("DOSSIER_ENROL");
        };


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
                contact.phoneExt = contacts[i].rep_contact_details.phone_ext;
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
                    "id":(i+1),
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

                if(tissues){
                    var tissuesList = tissues.tissues_fluids_record;
                    ing.tissuesFluidsOrigin = {}
                    ing.tissuesFluidsOrigin.tissuesList = [];

                    /*  if (!(tissuesList instanceof Array)) {
                        //make it an array, case there is only one
                        tissuesList = [tissuesList]
                    }
                    //tissues
                    for (var tissCount = 0; tissCount < tissuesList.length; tissCount++) {
                        var rec = {};
                        rec.id = tissuesList[tissCount].tf_id;
                        rec.systemType = tissuesList[tissCount].system_type;
                        rec.systemDetails = tissuesList[tissCount].system_details;
                        rec.otherDetails = tissuesList[tissCount].system_other_details;
                        ing.tissuesFluidsOrigin.tissuesList.push(rec);
                     }*/
                }
                if (srcAnimal) {
                ing.sourceAnimalDetails =createEmptyAnimalSourceModel()
                        ing.sourceAnimalDetails.isCellLine=  info[i].animal_sourced_section.is_cell_line;
                        ing.sourceAnimalDetails.isBiotechDerived=  info[i].animal_sourced_section.is_biotech_derived;
                        ing.sourceAnimalDetails.isControlledPop=  info[i].animal_sourced_section.is_controlled_pop;
                        ing.sourceAnimalDetails.ageAnimals=  info[i].animal_sourced_section.animal_age;
                        //var animalSrcObj=info[i].sourceAnimalDetails;
                        var animalTypeList=info[i].animal_sourced_section.animal_src_record;
                    for (var srcCount = 0; srcCount < animalTypeList.length; srcCount++) { //TODO function?
                            var oneRec = animalTypeList[srcCount];
                            var animalRecord = {}
                            animalRecord.animalType = oneRec.animal_type;
                            animalRecord.animalDetail = oneRec.animal_detail;
                            ing.sourceAnimalDetails.animalSrcList.push(animalRecord);
                        }
                        ing.sourceAnimalDetails.countryList=getCountries(info[i].animal_sourced_section.country_origin_list.country_origin)
                }


                list.push(ing);
            }
        }

        return list;

    }

    /**
     * Returns an empty animal source internal model
     */
    function getEmptyAnimalSourceModel(){

        var emptyAnimalSource={};
        emptyAnimalSource.animalSrcList=[];
        emptyAnimalSource.isCellLine="";
        emptyAnimalSource.isBiotechDerived="";
        emptyAnimalSource.isControlledPop="";
        emptyAnimalSource.ageAnimals="";
        emptyAnimalSource.countryList=[];
        return emptyAnimalSource;
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
                obj.containerTypes = getContainerTypeList(item.container_group.container_details);
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
            var oneRecord = {};
            ing.ingredient_id = info[i].id;
            ing.ingredient_name = info[i].ingredientName;
            ing.animal_sourced = info[i].animalSourced === true ? 'Y' : 'N';
            ing.human_sourced = info[i].humanSourced === true ? 'Y' : 'N';
            if (info[i].tissuesFluidsOrigin) {
                ing.tissues_fluids_section = {};

                for (var b = 0; b < info[i].tissuesFluidsOrigin.tissuesList.length; b++) {
                    var fluidsRec = {};
                    switch (info[i].tissuesFluidsOrigin.tissuesList[b].systemType) {
                        case 'NERVOUS_SYSTEM':
                            ing.tissues_fluids_section.nervous_sytem = _nervousSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                            break;

                    }

                }

                /* ing.tissues_fluids_section.tissues_fluids_record = [];
                for (var b = 0; b < info[i].tissuesFluidsOrigin.tissuesList.length; b++) {
                    var oneRec = info[i].tissuesFluidsOrigin.tissuesList[b];
                    var tissueRecord = {tf_id: "", system_type: "", system_details: "", system_other_details: ""};
                    tissueRecord.tf_id = oneRec.id;
                    tissueRecord.system_type = oneRec.systemType;
                    tissueRecord.system_details = oneRec.systemDetails;
                    tissueRecord.system_other_details = oneRec.otherDetails;
                    ing.tissues_fluids_section.tissues_fluids_record.push(tissueRecord);
                 }*/

            }

            if (info[i].sourceAnimalDetails) {
                ing.animal_sourced_section = createEmptyAnimalSourceForOutput();
                //get the static values
                ing.animal_sourced_section.is_cell_line=info[i].sourceAnimalDetails.isCellLine;
                ing.animal_sourced_section.is_biotech_derived=info[i].sourceAnimalDetails.isBiotechDerived;
                ing.animal_sourced_section.is_controlled_pop=info[i].sourceAnimalDetails.isControlledPop;
                ing.animal_sourced_section.animal_age=info[i].sourceAnimalDetails.ageAnimals;
                //step 2 get all the animal sourcees
                var animalSrcObj=info[i].sourceAnimalDetails;
                for(var srcCount=0;srcCount<animalSrcObj.animalSrcList.length;srcCount++){
                    var oneRec=animalSrcObj.animalSrcList[srcCount];
                    var srcRecordOut={}
                     srcRecordOut.animal_type= oneRec.animalType;
                    srcRecordOut.animal_detail=oneRec.animalDetail;
                    ing.animal_sourced_section.animal_src_record.push(srcRecordOut);
                }
                //step 3 get all the countries
                var countries = info[i].sourceAnimalDetails.countryList;
                for (var v = 0; v < countries.length; v++) {
                    var countryRecord={};
                    countryRecord.country_with_unknown=countries[v].name;
                    countryRecord.unknown_country_details=countries[v].unknownCountryDetails;
                    ing.animal_sourced_section.country_origin_list.country_origin.push(countryRecord);
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
                obj.country_group.country_manufacturer=formulationCountryListToOutput(item.countryList);
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
                "ingred_standard": item.standard,
                "is_human_animal_src": item.humanAnimalSourced,
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
     * Convertes nonMedicinal Ingredient to a the output json object
     * @param nonMedList
     * @returns {Array}
     */
    function nonMedIngListToOutput(nonMedList) {

        var resultList = [];

        angular.forEach(nonMedList, function (item) {

            var obj = {
                "ingredient_id": item.ingId,
                "ingredient_name": item.ingName,
                "cas_number": item.cas,
                "ingred_standard": item.standard,
                "is_human_animal_src": item.humanAnimalSourced,
                "variant_name": item.varId,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "is_base_calc": item.calcAsBase,
                "is_nanomaterial": item.nanoMaterial,
                "nanomaterial_details": item.nanoMaterialOther
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
            resultList.push(item.name);
        });
        return resultList;
    }

    function repContactToOutput(contactList) {
        var resultList = [];
        angular.forEach(contactList, function (item) {
            var obj = {};
            obj.amend_record = item.amend ? 'Y' : 'N';
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

    /**
     * Make list of json objects for appendix data
     * @param appendices
     * @returns {{}}
     */
    function getAppendiceData(appendices) {
        var result = {};
        if (!appendices ) return result;

        for (var i = 0; i < appendices.length; i++) {
            var appendix=appendices[i];
           // var rec = {};
            result[appendix.ingredientName] = (i + 1);
            //result.push(rec);
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
            if(oneFormulation.activeIngList) {
                for (var j = 0; j < (oneFormulation.activeIngList.length); j++) {
                    var oneActive = oneFormulation.activeIngList[j];
                    if (oneActive.humanAnimalSourced === yesValue) {
                        allAnimalSourcedNames.push(oneActive.ingName);
                    }
                }
            }
            //step 2 get nmi flagged
            if(oneFormulation.nMedIngList){
                for (var j = 0; j < (oneFormulation.nMedIngList.length); j++) {
                    var oneActive = oneFormulation.nMedIngList[j];
                    if (oneActive.humanAnimalSourced === yesValue) {
                        allAnimalSourcedNames.push(oneActive.ingName);
                    }
                }
            }
            //step 3  all materials
            if(oneFormulation.animalHumanMaterials) {
                for (var j = 0; j < (oneFormulation.animalHumanMaterials.length); j++) {
                    var oneActive = oneFormulation.animalHumanMaterials[j];
                    allAnimalSourcedNames.push(oneActive.ingredientName);
                }
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
                } else {
                    //make zero if found. any that are not zero are appendices without ingredients
                    appendiceList[ingredientJsonList[i]] = 0;
                }
        }
        return missingList;
    }

    function findExtraApppendices(appendixJson) {
        var extraList = [];
        var keys = Object.keys(appendixJson);
        for (var i = 0; i < keys.length; i++) {
            var val = appendixJson[keys[i]];
            if (val > 0) {
                console.log("This is the key" + keys[i])
                extraList.push(keys[i]);
            }
        }

        return extraList;
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
        for (var i = 0; i < drugList.length; i++) {
            var rec = drugList[i];
            switch (rec.name) {
                case "human":
                    rec.value = info.human_drug_use === 'Y';
                    break;
                case "radio-pharmaceutical":
                    rec.value = info.radiopharm_drug_use === 'Y';
                    break;
                case "disinfectant":
                    rec.value = info.disinfectant_drug_use === 'Y';
                    break;
                case "veterinary":
                    rec.value = info.vet_drug_use === 'Y';
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


    /**
     * Creates an animal sourced emptt json record for file write
     * @returns {{}}
     */
    function createEmptyAnimalSourceForOutput(){
        var record={};
        record.animal_src_record=[];
        record.is_controlled_pop="";
        record.is_biotech_derived="";
        record.is_cell_line="";
        record.animal_age=""; //TODO number is this a problem?
        record.country_origin_list={};
        record.country_origin_list.country_origin=[];
        return record;
    }

    function createEmptyAnimalSourceModel(){
        var record={};
        record.animalSrcList=[];
        record.isCellLine="";
        record.isBiotechDerived="";
        record.isControlledPop="";
        record.ageAnimals="";
        record.countryList=[];
        return record;
    }

    function _createEmptyNervousSystemModel() {
        var record = {};
        record.brain = false;
        record.brainStem = false;
        record.cerebellum = false;
        record.ceroFluid = false;
        record.dorsalRoot = false;
        record.duraMater = false;
        record.hypothalmus = false;
        record.retina = false;
        record.spinalCord = false;
        record.trigeminal = false;
        record.otherNervous = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyDigestiveSystemModel() {
        var record = {};
        record.appendix = false;
        record.bile = false;
        record.distalIleum = false;
        record.largeIntestine = false;
        record.salivaSalivary = false;
        record.smallIntestine = false;
        record.stomach = false;
        record.otherDigestive = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyImmuneSystemModel() {
        var record = {};
        record.lymphNodes = false;
        record.spleen = false;
        record.thymus = false;
        record.tonsils = false;
        record.otherImmune = false;
        record.otherDetails = "";

        return record;
    }

    function _createEmptyMuscleSystemModel() {
        var record = {};
        record.abdomen = false;
        record.skull = false;
        record.bones = false;
        record.collagen = false;
        record.tendonsLigaments = false;
        record.vertebralColumn = false;
        record.muscle = false;
        record.otherMuscle = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyReproductiveSystemModel() {
        var record = {};
        record.milkProducts = false;
        record.kidney = false;
        record.colostrum = false;
        record.mammaryGlands = false;
        record.ovaries = false;
        record.placenta = false;
        record.placentalFluid = false;
        record.semen = false;
        record.testes = false;
        record.urine = false;
        record.otherReproductive = false;
        record.otherDetails = "";

        return record;
    }

    function _createEmptySkinSystemModel() {
        var record = {};
        record.adrenalGland = false;
        record.hairHoovesFeathers = false;
        record.liver = false;
        record.pancreas = false;
        record.pituitary = false;
        record.skinHides = false;
        record.thyroidParathyroid = false;
        record.otherSkin = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyOtherSystemModel() {
        var record = {};
        record.adipose = false;
        record.ascites = false;
        record.antlerVelvet = false;
        record.serum = false;
        record.wholeBlood = false;
        record.plasma = false;
        record.embryonicTissue = false;
        record.fetalTissue = false;
        record.boneMarrow = false;
        record.eyesCornea = false;
        record.gallBladder = false;
        record.otherFluids = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyCardioSystemModel() {
        var record = {};
        record.heartPericardium = false;
        record.lung = false;
        record.nasalFluid = false;
        record.trachea = false;
        record.otherCardio = false;
        record.otherDetails = "";
        return record;
    }

    function _createEmptyNervousSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.brain = noValue;
        record.brain_stem = noValue;
        record.cerebellum = noValue;
        record.cerebrospinal_fluid = noValue;
        record.dorsal_root_ganglia = noValue;
        record.dura_mater = noValue;
        record.hypothalmus = noValue;
        record.retina_optic = noValue;
        record.spinal_cord = noValue;
        record.trigerminal_ganglia = noValue;
        record.other_nervous = noValue;
        record.other_nervous_details = "";
        return record;
    }

    function _createEmptyDigestiveSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.appendix = noValue;
        record.bile = noValue;
        record.distal_ileum = noValue;
        record.large_intestine = noValue;
        record.small_intestine = noValue;
        record.stomach = noValue;
        record.other_digestive = noValue;
        record.other_digestive_details = "";
        return record;
    }

    function _createEmptyMuscleSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.abdomen = noValue;
        record.skull = noValue;
        record.bones = noValue;
        record.collagen = noValue;
        record.tendons_ligaments = noValue;
        record.vertebral_column = noValue;
        record.muscle = noValue;
        record.other_musculo_skeletal = noValue;
        record.other_musculo_skeletal_details = "";
        return record;
    }

    function _createEmptyReproductiveSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.milk_products = noValue;
        record.kidney = noValue;
        record.colostrum = noValue;
        record.mammary_glands = noValue;
        record.ovaries = noValue;
        record.placenta = noValue;
        record.placental_fluid = noValue;
        record.semen = noValue;
        record.urine = noValue;
        record.other_reproductive = noValue;
        record.other_reproductive_details = "";
        return record;
    }

    function _createEmptyCardioSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.heart_pericardium = noValue;
        record.lung = noValue;
        record.nasal_fluid = noValue;
        record.trachea = noValue;
        record.other_cardio_respiratory = noValue;
        record.other_cardio_respiratory_details = "";
        return record;
    }

    function _createEmptyImmuneSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.lymph_nodes = noValue;
        record.spleen = noValue;
        record.thymus = noValue;
        record.tonsils = noValue;
        record.other_immune = noValue;
        record.other_immune_details = "";
        return record;
    }

    function _createEmptySkinSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.adrenal_gland = noValue;
        record.hair_hooves_feathers = noValue;
        record.liver = noValue;
        record.pancreas = noValue;
        record.pituitary = noValue;
        record.skin_hides = noValue;
        record.thyroid_parathyroid = noValue;
        record.other_skin_glandular = noValue;
        record.other_skin_glandular_details = "";
        return record;
    }

    function _createEmptySkinSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.abdomen = noValue;
        record.skull = noValue;
        record.bones = noValue;
        record.collagen = noValue;
        record.tendons_ligaments = noValue;
        record.vertebral_column = noValue;
        record.other_musculo_skeletal = noValue;
        record.other_musculo_skeletal_details = "";
        return record;
    }

    function _createEmptySkinSystemforOutput() {
        var record = {};
        var noValue = 'N';
        record.adipose = noValue;
        record.ascites = noValue;
        record.antler_velvet = noValue;
        record.serum = noValue;
        record.whole_blood = noValue;
        record.plasma = noValue;
        record.embryonic_tissue = noValue;
        record.fetal_tissue = noValue;
        record.bone_marrow = noValue;
        record.eyes_cornea = noValue;
        record.gall_bladder = noValue;
        record.other_fluids_tissues = noValue;
        record.other_fluids_tissues_details = "";
        return record;
    }

    function _nervousSystemToOutput(jsonObj) {
        var record = _createEmptyNervousSystemforOutput();
        record.brain = jsonObj.brain;
        record.brain_stem = jsonObj.brainStem;
        record.cerebellum = jsonObj.cerebellum;
        record.cerebrospinal_fluid = jsonObj.ceroFluid;
        record.dorsal_root_ganglia = jsonObj.dorsalRoot;
        record.dura_mater = jsonObj.duraMater;
        record.hypothalmus = jsonObj.hypothalmus;
        record.retina_optic = jsonObj.retina;
        record.spinal_cord = jsonObj.spinalCord;
        record.trigerminal_ganglia = jsonObj.trigeminal;
        record.other_nervous = jsonObj.otherNervous;
        record.other_nervous_details = jsonObj.otherNervous;
        return record;
    }
})();
