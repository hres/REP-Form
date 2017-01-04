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
        .factory('DossierService', DossierService);
    DossierService.$inject = ['DossierLists', '$translate'];
    function DossierService(DossierLists, $translate) {
        var yesValue = 'Y';
        var noValue = 'N';

        // Define the DossierService objecy
        function DossierService() {
        }

        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }


        DossierService.prototype = {

            _default: {
                dossierID: "",
                companyID: "",
                relatedDossierID: "",
                enrolmentVersion: "0.00",
                dateSaved: "",
                applicationType: "NEW",
                softwareVersion: "1.0.0",
                dataChecksum: "",
                dossierType: "",
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

                if (!info['DOSSIER_ENROL'])
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
                    dossierType: info.dossier_type,
                    productName: info.brand_name,
                    properName: info.common_name,
                    isRefProducts: info.is_ref_products,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: loadDrugUseValues(info),
                        isScheduleA: info.is_sched_a === 'Y',
                        therapeutic: getTherapeuticList(info.therapeutic_class_list.therapeutic_class),
                        canRefProducts: getCanRefProductList(info.ref_product_list.cdn_ref_product),//grid
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
            baseDossier.enrolment_version = jsonObj.enrolmentVersion;
            baseDossier.date_saved = jsonObj.dateSaved;
            baseDossier.application_type = jsonObj.applicationType;
            baseDossier.software_version = "1.0.0"; //TODO: hard code or make a function, should be centrally available
            baseDossier.data_checksum = "";
            if (jsonObj.contactList) { //TODO skip if empty list?
                baseDossier.contact_record = repContactToOutput(jsonObj.contactList);
            }
            baseDossier.dossier_type = jsonObj.dossierType;
            baseDossier.brand_name = jsonObj.productName;
            baseDossier.common_name = jsonObj.properName;
            baseDossier.third_party_signed = jsonObj.drugProduct.thirdPartySigned === true ? 'Y' : 'N';
            baseDossier.is_ref_products = jsonObj.isRefProducts;
            baseDossier.ref_product_list = {};
            //  baseDossier.ref_product_list.amend_record = "N" //TODO implement this functionality?
            //initialize values and order
            baseDossier.human_drug_use = 'N';
            baseDossier.radiopharm_drug_use = 'N';
            baseDossier.vet_drug_use = 'N';
            baseDossier.disinfectant_drug_use = 'N';
            drugUseValuesToOutput(jsonObj.drugProduct.drugUseList, baseDossier);
            baseDossier.therapeutic_class_list = {};
            baseDossier.is_sched_a = jsonObj.drugProduct.isScheduleA === true ? 'Y' : 'N';
            if (jsonObj.drugProduct.therapeutic && jsonObj.drugProduct.therapeutic.length > 0) {
                baseDossier.therapeutic_class_list.therapeutic_class = therapeuticClassToOutput(jsonObj.drugProduct.therapeutic);
            }

            if (jsonObj.drugProduct.canRefProducts && jsonObj.drugProduct.canRefProducts.length > 0) {
                baseDossier.ref_product_list.cdn_ref_product = canRefProductListToOutput(jsonObj.drugProduct.canRefProducts)
            }
            if (jsonObj.drugProduct.isScheduleA) {
                baseDossier.schedule_a_group = scheduleAToOutput(jsonObj.drugProduct.scheduleAGroup);
            }
            if (jsonObj.drugProduct) {
                var appendix4 = appendix4IngredientListToOutput(jsonObj.drugProduct.appendixFourList);
                if (appendix4) {
                    baseDossier.appendix4_group = appendix4;
                }
                var formulations = formulationListToOutput(jsonObj.drugProduct.formulations);
                baseDossier.formulation_group = {};
                if (formulations) {
                    baseDossier.formulation_group.formulation_details = formulations;
                }
            }
            //forgot to add root tag!
            return {DOSSIER_ENROL: baseDossier};

        };


        DossierService.prototype.getMissingAppendix4 = function (dossierModel) {
            var missingAppendices = [];
            var extraAppendices = [];
            var results = {};

            if (!dossierModel || !dossierModel.drugProduct) {
                return missingAppendices;
            }
            // Step 1 Get all the appendices that exist
            var appendices = getAppendiceData(dossierModel.drugProduct.appendixFourList);
            //Step 2 get a unique list of ingredients
            var ingredients = getAnimalIngredients(dossierModel.drugProduct.formulations);
            //Step 3 Compare. Determine if there are missing ingredients
            missingAppendices = getMissingAppendices(appendices, ingredients);
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

        //return the Dossier Service object
        return DossierService;


        //###############INTERNAL FUNCTIONS start here##################################

        function getContactList(contacts) {

            var list = [];

            if (angular.isDefined(contacts)) {

                for (var i = 0; i < contacts.length; i++) {
                    var contact = {};
                    contact.amend = contacts[i].amend_record === 'Y';
                    contact.repRole = contacts[i].rep_contact_role;
                    contact.salutation = contacts[i].rep_contact_details.salutation;
                    contact.givenName = contacts[i].rep_contact_details.given_name;
                    contact.surname = contacts[i].rep_contact_details.surname;
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
        }

        /**
         * Get diseaseDisorderList
         * @param info
         * @param diseaseList
         * @returns {*}
         */
        function getDiseaseDisorderList(info, diseaseList) {

            if (!info || !diseaseList) return;
            for (var i = 0; i < diseaseList.length; i++) {
                var checkboxRec = diseaseList[i];
                switch (checkboxRec.name) {
                    case "acute-alcohol":
                        checkboxRec.value = info.acute_alcohol === 'Y';
                        break;
                    case "acute-anxiety":
                        checkboxRec.value = info.acute_anxiety === 'Y';
                        break;
                    case "acute-infectious":
                        checkboxRec.value = info.acute_infectious === 'Y';
                        break;
                    case "acute-inflammatory":
                        checkboxRec.value = info.acute_inflammatory === 'Y';
                        break;
                    case "acute-psychotic":
                        checkboxRec.value = info.acute_psychotic === 'Y';
                        break;
                    case "addiction":
                        checkboxRec.value = info.addiction === 'Y';
                        break;
                    case "ateriosclerosis":
                        checkboxRec.value = info.ateriosclerosis === 'Y';
                        break;
                    case "appendicitis":
                        checkboxRec.value = info.appendicitis === 'Y';
                        break;
                    case "asthma":
                        checkboxRec.value = info.asthma === 'Y';
                        break;

                    case "cancer":
                        checkboxRec.value = info.cancer === 'Y';
                        break;
                    case "congest-heart-fail":
                        checkboxRec.value = info.congest_heart_fail === 'Y';
                        break;
                    case "convulsions":
                        checkboxRec.value = info.convulsions === 'Y';
                        break;

                    case "dementia":
                        checkboxRec.value = info.dementia === 'Y';
                        break;

                    case "depression":
                        checkboxRec.value = info.depression === 'Y';
                        break;

                    case "diabetes":
                        checkboxRec.value = info.diabetes === 'Y';
                        break;

                    case "gangrene":
                        checkboxRec.value = info.gangrene === 'Y';
                        break;

                    case "glaucoma":
                        checkboxRec.value = info.glaucoma === 'Y';
                        break;

                    case "haematologic-bleeding":
                        checkboxRec.value = info.haematologic_bleeding === 'Y';
                        break;

                    case "hepatitis":
                        checkboxRec.value = info.hepatitis === 'Y';
                        break;

                    case "hypertension":
                        checkboxRec.value = info.hypertension === 'Y';
                        break;

                    case "nausea-pregnancy":
                        checkboxRec.value = info.nausea_pregnancy === 'Y';
                        break;

                    case "obesity":
                        checkboxRec.value = info.obesity === 'Y';
                        break;
                    case "rheumatic-fever":
                        checkboxRec.value = info.rheumatic_fever === 'Y';
                        break;
                    case "septicemia":
                        checkboxRec.value = info.septicemia === 'Y';
                        break;
                    case "sex-transmit-disease":
                        checkboxRec.value = info.sex_transmit_disease === 'Y';
                        break;
                    case "strangulated-hernia":
                        checkboxRec.value = info.strangulated_hernia === 'Y';
                        break;
                    case "thrombotic-embolic-disorder":
                        checkboxRec.value = info.thrombotic_embolic_disorder === 'Y';
                        break;
                    case "thyroid-disease":
                        checkboxRec.value = info.thyroid_disease === 'Y';
                        break;
                    case "ulcer-gastro":
                        checkboxRec.value = info.ulcer_gastro === 'Y';
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
                        "id": "" + i + 1,
                        "name": input[i]
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
                if (!(info instanceof Array)) {
                    //make it an array, case there is only one
                    info = [info]
                }

                for (var i = 0; i < info.length; i++) {
                    var product = {};
                    product.brandName = info[i].brand_name;
                    product.medIngredient = info[i].medicinal_ingredient;
                    var concatDoseForm = "";
                    if (!info[i].dosage_form || info[i].dosage_form === DossierLists.getOtherValue()) {
                        concatDoseForm = info[i].dosage_form;
                    } else {
                        concatDoseForm = DossierLists.getDosageFormPrefix() + info[i].dosage_form;
                    }
                    product.dosageForm = concatDoseForm;
                    product.dosageFormOther = info[i].dosage_form_other;
                    product.strengths = Number(info[i].strengths);
                    product.units = info[i].units;
                    product.per = info[i].per;
                    product.companyName = info[i].company_name;

                    list.push(product);
                }
            }

            // console.log('getCanRefProductList : ' + JSON.stringify(list));


            return list;


        }


        function getAppendix4IngredientList(info) { //info = dossier.appendixFour.ingredientList
            var list = [];
            //TODO externalize
            var getCountries = function (input) {
                var list = [];

                for (var i = 0; i < input.length; i++) {
                    list.push({
                        "id": (i + 1),
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
                    ing.humanSourced = info[i].human_sourced === 'Y';
                    ing.animalSourced = info[i].animal_sourced === 'Y';
                    var tissues = info[i].tissues_fluids_section;
                    var srcAnimal = info[i].animal_sourced_section;

                    if (tissues) {

                        ing.tissuesFluidsOrigin = {};
                        // ing.tissuesFluidsOrigin.tissuesList = [];
                        ing.tissuesFluidsOrigin.tissuesList = _getTissuesFluidsModel(tissues)
                        //"ap4RecCtrl.model.tissuesFluidsOrigin.tissuesList
                    }
                    if (srcAnimal) {
                        ing.sourceAnimalDetails = createEmptyAnimalSourceModel();
                        ing.sourceAnimalDetails.isCellLine = info[i].animal_sourced_section.is_cell_line;
                        ing.sourceAnimalDetails.isBiotechDerived = info[i].animal_sourced_section.is_biotech_derived;
                        ing.sourceAnimalDetails.isControlledPop = info[i].animal_sourced_section.is_controlled_pop;
                        ing.sourceAnimalDetails.ageAnimals = info[i].animal_sourced_section.animal_age;
                        //var animalSrcObj=info[i].sourceAnimalDetails;
                        var animalTypeList = info[i].animal_sourced_section.animal_src_record;
                        for (var srcCount = 0; srcCount < animalTypeList.length; srcCount++) { //TODO function?
                            var oneRec = animalTypeList[srcCount];
                            var animalRecord = {};
                            animalRecord.animalType = oneRec.animal_type;
                            animalRecord.animalDetail = oneRec.animal_detail;
                            ing.sourceAnimalDetails.animalSrcList.push(animalRecord);
                        }
                        ing.sourceAnimalDetails.countryList = getCountries(info[i].animal_sourced_section.country_origin_list.country_origin)
                    }


                    list.push(ing);
                }
            }

            return list;

        }

        /**
         * Returns an empty animal source internal model
         */
        function getEmptyAnimalSourceModel() {

            var emptyAnimalSource = {};
            emptyAnimalSource.animalSrcList = [];
            emptyAnimalSource.isCellLine = "";
            emptyAnimalSource.isBiotechDerived = "";
            emptyAnimalSource.isControlledPop = "";
            emptyAnimalSource.ageAnimals = "";
            emptyAnimalSource.countryList = [];
            return emptyAnimalSource;
        }

        function getFormulationList(list) {

            var formulationList = [];
            if (!list || list.length === 0)
                return formulationList;
            if (!(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list]
            }
            angular.forEach(list, function (item) {

                //static fields
                var obj = {
                    "formulationId": item.formulation_id,
                    "formulationName": item.formulation_name,
                };
                if (!item.dosage_form_group.dosage_form || item.dosage_form_group.dosage_form === DossierLists.getOtherValue()) {
                    obj.dosageForm = item.dosage_form_group.dosage_form;
                } else {
                    obj.dosageForm = DossierLists.getDosageFormPrefix() + item.dosage_form_group.dosage_form;
                }
                obj.dosageFormOther = item.dosage_form_group.dosage_form_other;
                if (item.nonmedicinal_ingredient) {
                    obj.nMedIngList = getNonMedIngList(item.nonmedicinal_ingredient);
                }
                if (item.active_ingredient) {
                    obj.activeIngList = getActiveIngList(item.active_ingredient);
                }
                //container_group is static but do a check to be safe
                if (item.container_group && item.container_group.container_details) {
                    obj.containerTypes = getContainerTypeList(item.container_group.container_details);
                }
                if (item.material_ingredient) {
                    obj.animalHumanMaterials = getMaterialList(item.material_ingredient);
                }
                if (item.roa_group && item.roa_group.roa_details) {
                    obj.routeAdmins = getRouteAdminList(item.roa_group.roa_details);
                }
                if (item.country_group && item.country_group.country_manufacturer) {
                    obj.countryList = getFormulationCountryList(item.country_group.country_manufacturer);
                }
                formulationList.push(obj);
            });

            return formulationList;

        }

        function getActiveIngList(list) {

            var resultList = [];
            if (!(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list]
            }
            angular.forEach(list, function (item) {

                var obj = {
                    "ingId": item.ingredient_id,
                    "ingLabel": item.ingredient_name,
                    "newIngred": "N",
                    "cas": item.cas_number,
                    "humanAnimalSourced": item.is_human_animal_src,
                    "standard": item.ingred_standard,
                    "strength": Number(item.strength),
                    "per": item.per,
                    "units": item.units,
                    "calcAsBase": item.is_base_calc,
                    "nanoMaterial": item.is_nanomaterial,
                    "nanoMaterialOther": item.nanomaterial_details
                };
                if (!obj.ingId) {
                    obj.newIngred = 'Y'
                }
                resultList.push(obj);

            });

            return resultList;

        }


        function getNonMedIngList(list) {

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
                    "strength": Number(item.strength),
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


        function getContainerTypeList(list) {

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
        }

        function getRouteAdminList(list) {

            if (!(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list]
            }

            var resultList = [];

            var _id = 0;

            angular.forEach(list, function (item) {
                var newRoa = ""
                if (item.roa === DossierLists.getOtherValue() || !item.roa) {
                    newRoa = item.roa;
                } else {
                    newRoa = DossierLists.getRoaPrefix() + item.roa;
                }
                _id = _id + 1;
                var obj = {
                    "id": _id,
                    "roa": newRoa,
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

        //TODO get rid of, Angular filter for this
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

                    var splitArray = (info[i].dosageForm).split(DossierLists.getDosageFormPrefix()); //needed to remove the internal uniqueness
                    var newDosage = splitArray[splitArray.length - 1];
                    product.dosage_form = info[i].dosageForm;
                    product.dosage_form_other = info[i].dosageFormOther;
                    product.strengths = info[i].strengths;
                    product.units = info[i].units;
                    // product["units"]={"_version":"ff","__text":"eewe"}; this is how to attribute
                    product.per = info[i].per;
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

                //output all the tissues and fluids
                if (info[i].tissuesFluidsOrigin) {
                    ing.tissues_fluids_section = {};

                    for (var b = 0; b < info[i].tissuesFluidsOrigin.tissuesList.length; b++) {
                        var fluidsRec = {};
                        switch (info[i].tissuesFluidsOrigin.tissuesList[b].systemType) {
                            case   DossierLists.getNervousSystemValue():
                                ing.tissues_fluids_section.nervous_system = _nervousSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;

                            case   DossierLists.getDigestiveSystemValue():
                                ing.tissues_fluids_section.digestive_system = _digestiveSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getImmuneSystemValue():
                                ing.tissues_fluids_section.immune_system = _immuneSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getSkinSystemValue():
                                ing.tissues_fluids_section.skin_system = _skinSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;

                                break;
                            case   DossierLists.getMuscleSystemValue():
                                ing.tissues_fluids_section.musculo_system = _muscleSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getOtherTissuesSystemValue():
                                ing.tissues_fluids_section.other_system = _otherSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getReproductiveSystemValue():
                                ing.tissues_fluids_section.reproductive_system = _reproductiveSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getCardioSystemValue():
                                ing.tissues_fluids_section.cardio_system = _cardioSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                        }

                    }


                }

                if (info[i].sourceAnimalDetails) {
                    ing.animal_sourced_section = createEmptyAnimalSourceForOutput();
                    //get the static values
                    ing.animal_sourced_section.is_cell_line = info[i].sourceAnimalDetails.isCellLine;
                    ing.animal_sourced_section.is_biotech_derived = info[i].sourceAnimalDetails.isBiotechDerived;
                    ing.animal_sourced_section.is_controlled_pop = info[i].sourceAnimalDetails.isControlledPop;
                    ing.animal_sourced_section.animal_age = info[i].sourceAnimalDetails.ageAnimals;
                    //step 2 get all the animal sourcees
                    var animalSrcObj = info[i].sourceAnimalDetails;
                    for (var srcCount = 0; srcCount < animalSrcObj.animalSrcList.length; srcCount++) {
                        var oneRec = animalSrcObj.animalSrcList[srcCount];
                        var srcRecordOut = {};
                        srcRecordOut.animal_type = oneRec.animalType;
                        srcRecordOut.animal_detail = oneRec.animalDetail;
                        ing.animal_sourced_section.animal_src_record.push(srcRecordOut);
                    }
                    //step 3 get all the countries
                    var countries = info[i].sourceAnimalDetails.countryList;
                    for (var v = 0; v < countries.length; v++) {
                        var countryRecord = {};
                        countryRecord.country_with_unknown = countries[v].name;
                        countryRecord.unknown_country_details = countries[v].unknownCountryDetails;
                        ing.animal_sourced_section.country_origin_list.country_origin.push(countryRecord);
                    }
                }
                appendices.push(ing);
            }


            return appendices;

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
                    "formulation_id": item.formulationId
                };
                //dosage_form_group, static value
                obj.dosage_form_group = {};
                var splitArray = (item.dosageForm).split(DossierLists.getDosageFormPrefix()); //needed to remove the internal uniqueness
                var newDosage = splitArray[splitArray.length - 1];
                obj.dosage_form_group.dosage_form = newDosage;
                obj.dosage_form_group.dosage_form_other = item.dosageFormOther;
                obj.roa_group = {};
                if (item.routeAdmins && item.routeAdmins.length > 0) {
                    obj.roa_group.roa_details = routeAdminToOutput(item.routeAdmins);
                }
                obj.container_group = {};
                if (item.containerTypes && item.containerTypes.length > 0) {
                    obj.container_group.container_details = containerTypeListToOutput(item.containerTypes);
                }
                obj.country_group = {};
                if (item.countryList && item.countryList.length > 0) {
                    obj.country_group.country_manufacturer = formulationCountryListToOutput(item.countryList);
                }
                if (item.activeIngList && item.activeIngList.length > 0) {
                    obj.active_ingredient = activeListToOutput(item.activeIngList);
                }
                if (item.nMedIngList && item.nMedIngList.length > 0) {
                    obj.nonmedicinal_ingredient = nonMedIngListToOutput(item.nMedIngList);
                }
                if (item.animalHumanMaterials && item.animalHumanMaterials.length > 0) {
                    obj.material_ingredient = materialListToOutput(item.animalHumanMaterials);
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
                    "ingredient_name": item.ingLabel,
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
        }

        /**
         * converts route of admin to output json format
         * @param list
         * @returns {Array}
         */
        function routeAdminToOutput(list) {
            var resultList = [];
            angular.forEach(list, function (item) {
                var splitArray = (item.roa).split(DossierLists.getRoaPrefix()); //needed to remove the internal uniqueness
                var newRoa = splitArray[splitArray.length - 1];
                var obj = {
                    "roa": newRoa,
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

            var resultList = [];
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
                obj.rep_contact_details = {};
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
        }

        function scheduleAToOutput(jsonObj) {
            var result = createEmptyScheduleAForOutput();
            result.din_number = jsonObj.drugIdNumber;
            var disorderList = jsonObj.diseaseDisorderList;
            for (var i = 0; i < disorderList.length; i++) {
                switch (disorderList[i].name) {
                    case "acute-alcohol":
                        result.acute_alcohol = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "acute-anxiety":
                        result.acute_anxiety = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "acute-infectious":
                        result.acute_infectious = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "acute-inflammatory":
                        result.acute_inflammatory = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "acute-psychotic":
                        result.acute_psychotic = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "addiction":
                        result.addiction = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "ateriosclerosis":
                        result.ateriosclerosis = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "appendicitis":
                        result.appendicitis = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "asthma":
                        result.asthma = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "cancer":
                        result.cancer = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "congest-heart-fail":
                        result.congest_heart_fail = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "convulsions":
                        result.convulsions = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "dementia":
                        result.dementia = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "depression":
                        result.depression = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "diabetes":
                        result.diabetes = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "gangrene":
                        result.gangrene = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "glaucoma":
                        result.glaucoma = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "haematologic-bleeding":
                        result.haematologic_bleeding = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "hepatitis":
                        result.hepatitis = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "hypertension":
                        result.hypertension = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "nausea-pregnancy":
                        result.nausea_pregnancy = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "obesity":
                        result.obesity = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "rheumatic-fever":
                        result.rheumatic_fever = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "septicemia":
                        result.septicemia = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "sex-transmit-disease":
                        result.sex_transmit_disease = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "strangulated-hernia":
                        result.strangulated_hernia = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "thrombotic-embolic-disorder":
                        result.thrombotic_embolic_disorder = disorderList[i].value === true ? 'Y' : 'N';
                        break;
                    case "thyroid-disease":
                        result.thyroid_disease = disorderList[i].value === true ? 'Y' : 'N';
                        break;

                    case "ulcer-gastro":
                        result.ulcer_gastro = disorderList[i].value === true ? 'Y' : 'N';
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
            if (!appendices) return result;

            for (var i = 0; i < appendices.length; i++) {
                var appendix = appendices[i];
                // var rec = {};
                result[appendix.ingredientName] = (i + 1);
                //result.push(rec);
            }
            return result;
        }

        function getAnimalIngredients(formulations) {
            var yesValue = 'Y';
            var allAnimalSourcedNames = [];
            var uniqueList = {};
            for (var i = 0; i < formulations.length; i++) {
                //Step 1 get active ingredients
                var oneFormulation = formulations[i];
                if (oneFormulation.activeIngList) {
                    for (var j = 0; j < (oneFormulation.activeIngList.length); j++) {
                        var oneActive = oneFormulation.activeIngList[j];
                        if (oneActive.humanAnimalSourced === yesValue) {
                            allAnimalSourcedNames.push(oneActive.ingLabel);
                        }
                    }
                }
                //step 2 get nmi flagged
                if (oneFormulation.nMedIngList) {
                    for (var j = 0; j < (oneFormulation.nMedIngList.length); j++) {
                        var oneActive = oneFormulation.nMedIngList[j];
                        if (oneActive.humanAnimalSourced === yesValue) {
                            allAnimalSourcedNames.push(oneActive.ingName);
                        }
                    }
                }
                //step 3  all materials
                if (oneFormulation.animalHumanMaterials) {
                    for (var j = 0; j < (oneFormulation.animalHumanMaterials.length); j++) {
                        var oneActive = oneFormulation.animalHumanMaterials[j];
                        allAnimalSourcedNames.push(oneActive.ingredientName);
                    }
                }
            }
            uniqueList = getUniqueList(allAnimalSourcedNames);
            return (uniqueList);
        }

        /**
         * Create a list of missing appendices
         * @param appendiceList
         * @param ingredientJsonList
         */
        function getMissingAppendices(appendiceList, ingredientJsonList) {
            var missingList = [];
            for (var i = 0; i < ingredientJsonList.length; i++) {
                if (!appendiceList.hasOwnProperty(ingredientJsonList[i])) {
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
                    extraList.push(keys[i]);
                }
            }

            return extraList;
        }

        function getUniqueList(arr) {
            var u = {}, a = [];
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (!u.hasOwnProperty(arr[i])) {
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
            var noModelValue = false;
            return [
                {name: "acute-alcohol", label: "ACUTEALCOHOL", value: noModelValue},
                {name: "acute-anxiety", label: "ACUTEANXIETY", value: noModelValue},
                {name: "acute-infectious", label: "ACUTERESP", value: noModelValue},
                {name: "acute-inflammatory", label: "ACUTEINFLAM", value: noModelValue},
                {name: "acute-psychotic", label: "ACUTEPSYCHOTIC", value: noModelValue},
                {name: "addiction", label: "ADDICTION", value: noModelValue},
                {name: "ateriosclerosis", label: "ATERIOSCLEROSIS", value: noModelValue},
                {name: "appendicitis", label: "APPENDICITIS", value: noModelValue},
                {name: "asthma", label: "ASTHMA", value: noModelValue},
                {name: "cancer", label: "CANCER", value: noModelValue},
                {name: "congest-heart-fail", label: "HEARTCONGEST", value: noModelValue},
                {name: "convulsions", label: "CONVULSIONS", value: noModelValue},
                {name: "dementia", label: "DEMENTIA", value: noModelValue},
                {name: "depression", label: "DEPRESSION", value: noModelValue},
                {name: "diabetes", label: "DIABETES", value: noModelValue},
                {name: "gangrene", label: "GANGRENE", value: noModelValue},
                {name: "glaucoma", label: "GLAUCOMA", value: noModelValue},
                {name: "haematologic-bleeding", label: "BLEEDINGDISORDERS", value: noModelValue},
                {name: "hepatitis", label: "HEPATITIS", value: noModelValue},
                {name: "hypertension", label: "HYPERTENSION", value: noModelValue},
                {name: "nausea-pregnancy", label: "NAUSEAPREG", value: noModelValue},
                {name: "obesity", label: "OBESITY", value: noModelValue},
                {name: "rheumatic-fever", label: "RHEUMATICFEVER", value: noModelValue},
                {name: "septicemia", label: "SEPTICEMIA", value: noModelValue},
                {name: "sex-transmit-disease", label: "SEXDISEASE", value: noModelValue},
                {name: "strangulated-hernia", label: "STRANGHERNIA", value: noModelValue},
                {name: "thrombotic-embolic-disorder", label: "THROMBOTICDISORDER", value: noModelValue},
                {name: "thyroid-disease", label: "THYROIDDISEASE", value: noModelValue},
                {name: "ulcer-gastro", label: "UCLERGASTRO", value: noModelValue}
            ];

        }

        /*
         * Returns an empty list of drug uses
         *
         */
        function getDefaultDrugUseList() {
            var noModelValue = false;
            var drugUseList = [
                {"name": "human", "label": "HUMAN", "value": noModelValue},
                {"name": "radio-pharmaceutical", "label": "RADIOPHARM", "value": noModelValue},
                {"name": "veterinary", "label": "VETERINARY", "value": noModelValue},
                {"name": "disinfectant", "label": "DISINFECTANT", "value": noModelValue}
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
        function drugUseValuesToOutput(drugUseArray, outputJson) {

            for (var i = 0; i < drugUseArray.length; i++) {
                var rec = drugUseArray[i];

                switch (rec.name) {
                    case "human":
                        outputJson.human_drug_use = rec.value === true ? 'Y' : 'N';
                        break;
                    case "radio-pharmaceutical":
                        outputJson.radiopharm_drug_use = rec.value === true ? 'Y' : 'N';
                        break;
                    case "disinfectant":
                        outputJson.disinfectant_drug_use = rec.value === true ? 'Y' : 'N';
                        break;
                    case "veterinary":
                        outputJson.vet_drug_use = rec.value === true ? 'Y' : 'N';
                        break;
                }
            }

        }


        /**
         * Creates an animal sourced emptt json record for file write
         * @returns {{}}
         */
        function createEmptyAnimalSourceForOutput() {
            var record = {};
            record.animal_src_record = [];
            record.is_controlled_pop = "";
            record.is_biotech_derived = "";
            record.is_cell_line = "";
            record.animal_age = ""; //TODO number is this a problem?
            record.country_origin_list = {};
            record.country_origin_list.country_origin = [];
            return record;
        }

        function createEmptyAnimalSourceModel() {
            var record = {};
            record.animalSrcList = [];
            record.isCellLine = "";
            record.isBiotechDerived = "";
            record.isControlledPop = "";
            record.ageAnimals = "";
            record.countryList = [];
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
            record.hypothalamus = false;
            record.retina = false;
            record.spinalCord = false;
            record.trigeminal = false;
            record.otherNervous = false;
            record.otherDetails = "";
            return record;
        }

        /**
         * Creates an internal model for Tissues and Fluids:Digestive System
         * @returns {{}}
         * @private
         */
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
            record.brain = noValue;
            record.brain_stem = noValue;
            record.cerebellum = noValue;
            record.cerebrospinal_fluid = noValue;
            record.dorsal_root_ganglia = noValue;
            record.dura_mater = noValue;
            record.hypothalamus = noValue;
            record.retina_optic = noValue;
            record.spinal_cord = noValue;
            record.trigerminal_ganglia = noValue;
            record.other_nervous = noValue;
            record.other_nervous_details = "";
            return record;
        }

        function _createEmptyDigestiveSystemforOutput() {
            var record = {};
            record.appendix = noValue;
            record.bile = noValue;
            record.distal_ileum = noValue;
            record.large_intestine = noValue;
            record.saliva_salivary = noValue;
            record.small_intestine = noValue;
            record.stomach = noValue;
            record.other_digestive = noValue;
            record.other_digestive_details = "";
            return record;
        }

        function _createEmptyMuscleSystemforOutput() {
            var record = {};
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
            record.milk_products = noValue;
            record.kidney = noValue;
            record.colostrum = noValue;
            record.mammary_glands = noValue;
            record.ovaries = noValue;
            record.placenta = noValue;
            record.placental_fluid = noValue;
            record.semen = noValue;
            record.testes = noValue;
            record.urine = noValue;
            record.other_reproductive = noValue;
            record.other_reproductive_details = "";
            return record;
        }

        function _createEmptyCardioSystemforOutput() {
            var record = {};
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

        /* function _createEmptyMuscleSystemforOutput() {
         var record = {};

         record.abdomen = noValue;
         record.skull = noValue;
         record.bones = noValue;
         record.collagen = noValue;
         record.tendons_ligaments = noValue;
         record.vertebral_column = noValue;
         record.other_musculo_skeletal = noValue;
         record.other_musculo_skeletal_details = "";
         return record;
         }*/

        function _createEmptyOtherSystemforOutput() {
            var record = {};
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

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Nervous System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _nervousSystemToOutput(jsonObj) {

            var record = _createEmptyNervousSystemforOutput();
            record.brain = jsonObj.brain === true ? yesValue : noValue;
            record.brain_stem = jsonObj.brainStem === true ? yesValue : noValue;
            record.cerebellum = jsonObj.cerebellum === true ? yesValue : noValue;
            record.cerebrospinal_fluid = jsonObj.ceroFluid === true ? yesValue : noValue;
            record.dorsal_root_ganglia = jsonObj.dorsalRoot === true ? yesValue : noValue;
            record.dura_mater = jsonObj.duraMater === true ? yesValue : noValue;
            record.hypothalamus = jsonObj.hypothalamus === true ? yesValue : noValue;
            record.retina_optic = jsonObj.retina === true ? yesValue : noValue;
            record.spinal_cord = jsonObj.spinalCord === true ? yesValue : noValue;
            record.trigerminal_ganglia = jsonObj.trigeminal === true ? yesValue : noValue;
            record.other_nervous = jsonObj.otherNervous === true ? yesValue : noValue;
            record.other_nervous_details = jsonObj.otherDetails;
            return record;
        }


        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Digestive System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _digestiveSystemToOutput(jsonObj) {
            var record = _createEmptyDigestiveSystemforOutput();
            record.appendix = jsonObj.appendix === true ? yesValue : noValue;
            record.bile = jsonObj.bile === true ? yesValue : noValue;
            record.distal_ileum = jsonObj.distalIleum === true ? yesValue : noValue;
            record.large_intestine = jsonObj.largeIntestine === true ? yesValue : noValue;
            record.saliva_salivary = jsonObj.salivaSalivary === true ? yesValue : noValue;
            record.small_intestine = jsonObj.smallIntestine === true ? yesValue : noValue;
            record.stomach = jsonObj.stomach === true ? yesValue : noValue;
            record.other_digestive = jsonObj.otherDigestive === true ? yesValue : noValue;
            record.other_digestive_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Muscle System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _muscleSystemToOutput(jsonObj) {
            var record = _createEmptyMuscleSystemforOutput();
            record.abdomen = jsonObj.abdomen === true ? yesValue : noValue;
            record.skull = jsonObj.skull === true ? yesValue : noValue;
            record.bones = jsonObj.bones === true ? yesValue : noValue;
            record.collagen = jsonObj.collagen === true ? yesValue : noValue;
            record.tendons_ligaments = jsonObj.tendonsLigaments === true ? yesValue : noValue;
            record.vertebral_column = jsonObj.vertebralColumn === true ? yesValue : noValue;
            record.muscle = jsonObj.muscle === true ? yesValue : noValue;
            record.other_musculo_skeletal = jsonObj.otherMuscle === true ? yesValue : noValue;
            record.other_musculo_skeletal_details = jsonObj.otherDetails;
            return record;

        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Muscle System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _reproductiveSystemToOutput(jsonObj) {
            var record = _createEmptyReproductiveSystemforOutput();
            record.milk_products = jsonObj.milkProducts === true ? yesValue : noValue;
            record.kidney = jsonObj.kidney === true ? yesValue : noValue;
            record.colostrum = jsonObj.colostrum === true ? yesValue : noValue;
            record.mammary_glands = jsonObj.mammaryGlands === true ? yesValue : noValue;
            record.ovaries = jsonObj.ovaries === true ? yesValue : noValue;
            record.placenta = jsonObj.placenta === true ? yesValue : noValue;
            record.placental_fluid = jsonObj.placentalFluid === true ? yesValue : noValue;
            record.semen = jsonObj.semen === true ? yesValue : noValue;
            record.testes = jsonObj.testes === true ? yesValue : noValue;
            record.urine = jsonObj.urine === true ? yesValue : noValue;
            record.other_reproductive = jsonObj.otherReproductive === true ? yesValue : noValue;
            record.other_reproductive_details = jsonObj.otherDetails;
            return record;

        }


        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Cardio System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _cardioSystemToOutput(jsonObj) {
            var record = _createEmptyCardioSystemforOutput();
            record.heart_pericardium = jsonObj.heartPericardium === true ? yesValue : noValue;
            record.lung = jsonObj.lung === true ? yesValue : noValue;
            record.nasal_fluid = jsonObj.nasalFluid === true ? yesValue : noValue;
            record.trachea = jsonObj.trachea === true ? yesValue : noValue;
            record.other_cardio_respiratory = jsonObj.otherCardio === true ? yesValue : noValue;
            record.other_cardio_respiratory_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:immune System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _immuneSystemToOutput(jsonObj) {
            var record = _createEmptyImmuneSystemforOutput();
            record.lymph_nodes = jsonObj.lymphNodes === true ? yesValue : noValue;
            record.spleen = jsonObj.spleen === true ? yesValue : noValue;
            record.thymus = jsonObj.thymus === true ? yesValue : noValue;
            record.tonsils = jsonObj.tonsils === true ? yesValue : noValue;
            record.other_immune = jsonObj.otherImmune === true ? yesValue : noValue;
            record.other_immune_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Other System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _otherSystemToOutput(jsonObj) {
            var record = _createEmptyOtherSystemforOutput();
            record.adipose = jsonObj.adipose === true ? yesValue : noValue;
            record.ascites = jsonObj.ascites === true ? yesValue : noValue;
            record.antler_velvet = jsonObj.antlerVelvet === true ? yesValue : noValue;
            record.serum = jsonObj.serum === true ? yesValue : noValue;
            record.whole_blood = jsonObj.wholeBlood === true ? yesValue : noValue;
            record.plasma = jsonObj.plasma === true ? yesValue : noValue;
            record.embryonic_tissue = jsonObj.embryonicTissue === true ? yesValue : noValue;
            record.fetal_tissue = jsonObj.fetalTissue === true ? yesValue : noValue;
            record.bone_marrow = jsonObj.boneMarrow === true ? yesValue : noValue;
            record.eyes_cornea = jsonObj.eyesCornea === true ? yesValue : noValue;
            record.gall_bladder = jsonObj.gallBladder === true ? yesValue : noValue;
            record.other_fluids_tissues = jsonObj.otherFluids === true ? yesValue : noValue;
            record.other_fluids_tissues_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Skin and Glandular System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _skinSystemToOutput(jsonObj) {
            var record = _createEmptySkinSystemforOutput();
            record.adrenal_gland = jsonObj.adrenalGland === true ? yesValue : noValue;
            record.hair_hooves_feathers = jsonObj.hairHoovesFeathers === true ? yesValue : noValue;
            record.liver = jsonObj.liver === true ? yesValue : noValue;
            record.pancreas = jsonObj.pancreas === true ? yesValue : noValue;
            record.pituitary = jsonObj.pituitary === true ? yesValue : noValue;
            record.skin_hides = jsonObj.skinHides === true ? yesValue : noValue;
            record.thyroid_parathyroid = jsonObj.thyroidParathyroid === true ? yesValue : noValue;
            record.other_skin_glandular = jsonObj.otherSkin === true ? yesValue : noValue;
            record.other_skin_glandular_details = jsonObj.otherDetails;
            return record;
        }

        function _createEmptyTissuesSystemRecord() {

            return ({"id": "", "systemType": "", detailsConcat: "", system: {}, otherDetails: ""});
        }

        /**
         * Creates the internal model for the Dossier tissues and fluids
         * @param json
         * @private
         */
        function _getTissuesFluidsModel(json) {
            //var item = _createEmptyTissuesSystemRecord();
            var result = [];
            var index = 1;
            if (angular.isUndefined(json)) return result;
            //done alpha
            if (json.cardio_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getCardioSystemValue();
                record.system = _getCardioModel(json.cardio_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.digestive_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getDigestiveSystemValue();
                record.system = _getDigestiveModel(json.digestive_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.immune_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getImmuneSystemValue();
                record.system = _getImmuneModel(json.immune_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }

            if (json.musculo_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getMuscleSystemValue();
                record.system = _getMuscleSystemModel(json.musculo_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.nervous_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getNervousSystemValue();
                record.system = _getNervousModel(json.nervous_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.other_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getOtherTissuesSystemValue();
                record.system = _getOtherSystemModel(json.other_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);

            }
            if (json.reproductive_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getReproductiveSystemValue();
                record.system = _getReproductiveModel(json.reproductive_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.skin_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getSkinSystemValue();
                record.system = _getSkinModel(json.skin_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            return result;
        }

        function _getCardioModel(json) {
            var model = _createEmptyCardioSystemModel();
            model.heartPericardium = json.heart_pericardium === yesValue;
            model.lung = json.lung === yesValue;
            model.nasalFluid = json.nasal_fluid === yesValue;
            model.trachea = json.trachea === yesValue;
            model.otherCardio = json.other_cardio_respiratory === yesValue;
            model.otherDetails = json.other_cardio_respiratory_details;
            return model;
        }

        function _getNervousModel(json) {
            var model = _createEmptyNervousSystemModel();
            model.brain = json.brain === yesValue;
            model.brainStem = json.brain_stem === yesValue;
            model.cerebellum = json.cerebellum === yesValue;
            model.ceroFluid = json.cerebrospinal_fluid === yesValue;
            model.dorsalRoot = json.dorsal_root_ganglia === yesValue;
            model.duraMater = json.dura_mater === yesValue;
            model.hypothalamus = json.hypothalamus === yesValue;
            model.retina = json.retina_optic === yesValue;
            model.spinalCord = json.spinal_cord === yesValue;
            model.trigeminal = json.trigerminal_ganglia === yesValue;
            model.otherNervous = json.other_nervous === yesValue;
            model.otherDetails = json.other_nervous_details;
            return model;
        }

        function _getReproductiveModel(json) {
            var model = _createEmptyReproductiveSystemModel();
            model.milkProducts = json.milk_products === yesValue;
            model.kidney = json.kidney === yesValue;
            model.colostrum = json.colostrum === yesValue;
            model.mammaryGlands = json.mammary_glands === yesValue;
            model.ovaries = json.ovaries === yesValue;
            model.placenta = json.placenta === yesValue;
            model.placentalFluid = json.placental_fluid === yesValue;
            model.semen = json.semen === yesValue;
            model.testes = json.testes === yesValue;
            model.urine = json.urine === yesValue;
            model.otherReproductive = json.other_reproductive === yesValue;
            model.otherDetails = json.other_reproductive_details;
            return model;
        }

        function _getSkinModel(json) {
            var model = _createEmptySkinSystemModel();
            model.adrenalGland = json.adrenal_gland === yesValue;
            model.hairHoovesFeathers = json.hair_hooves_feathers === yesValue;
            model.liver = json.liver === yesValue;
            model.pancreas = json.pancreas === yesValue;
            model.pituitary = json.pituitary === yesValue;
            model.skinHides = json.skin_hides === yesValue;
            model.thyroidParathyroid = json.thyroid_parathyroid === yesValue;
            model.otherSkin = json.other_skin_glandular === yesValue;
            model.otherDetails = json.other_skin_glandular_details;
            return model;
        }


        function _getImmuneModel(json) {
            var model = _createEmptyImmuneSystemModel();
            model.lymphNodes = json.lymph_nodes === yesValue;
            model.spleen = json.spleen === yesValue;
            model.thymus = json.thymus === yesValue;
            model.tonsils = json.tonsils === yesValue;
            model.otherImmune = json.other_immune === yesValue;
            model.otherDetails = json.other_immune_details;
            return model;
        }

        function _getDigestiveModel(json) {
            var model = _createEmptyDigestiveSystemModel();
            model.appendix = json.appendix === yesValue;
            model.bile = json.bile === yesValue;
            model.distalIleum = json.distal_ileum === yesValue;
            model.largeIntestine = json.large_intestine === yesValue;
            model.salivaSalivary = json.saliva_salivary === yesValue;
            model.smallIntestine = json.small_intestine === yesValue;
            model.stomach = json.stomach === yesValue;
            model.otherDigestive = json.other_digestive === yesValue;
            model.otherDetails = json.other_digestive_details;
            return model;
        }

        function _getOtherSystemModel(json) {
            var model = _createEmptyOtherSystemModel();
            model.adipose = json.adipose === yesValue;
            model.ascites = json.ascites === yesValue;
            model.antlerVelvet = json.antler_velvet === yesValue;
            model.serum = json.serum === yesValue;
            model.wholeBlood = json.whole_blood === yesValue;
            model.plasma = json.plasma === yesValue;
            model.embryonicTissue = json.embryonic_tissue === yesValue;
            model.fetalTissue = json.fetal_tissue === yesValue;
            model.boneMarrow = json.bone_marrow === yesValue;
            model.eyesCornea = json.eyes_cornea === yesValue;
            model.gallBladder = json.gall_bladder === yesValue;
            model.otherFluids = json.other_fluids_tissues === yesValue;
            model.otherDetails = json.other_fluids_tissues_details;
            return model;
        }

        function _getMuscleSystemModel(json) {
            var model = _createEmptyMuscleSystemModel();
            model.abdomen = json.abdomen === yesValue;
            model.skull = json.skull === yesValue;
            model.bones = json.bones === yesValue;
            model.collagen = json.collagen === yesValue;
            model.tendonsLigaments = json.tendons_ligaments === yesValue;
            model.vertebralColumn = json.vertebral_column === yesValue;
            model.muscle = json.muscle === yesValue;
            model.otherMuscle = json.other_musculo_skeletal === yesValue;
            model.otherDetails = json.other_musculo_skeletal_details;
            return model;
        }


        function _getConcatTissues(json) {
            var labelLookup = DossierLists.getTissuesFluidsLabels();
            var result = "";
            var markupBreak = "<br>"
            if (angular.isUndefined(json)) return result;
            var keys = Object.keys(json);
            for (var i = 0; i < keys.length; i++) {
                var val = json[keys[i]];
                if (val) {
                    var alias = labelLookup[keys[i]];
                    if (alias) { //this will filter out the other
                        var currentLang = $translate.proposedLanguage() || $translate.use();
                        var translateText = $translate.instant(alias, "", '', currentLang);
                        result = result + translateText + markupBreak;
                    }
                }
            }
            if (keys.length > 0) {
                result = result.substring(0, (result.length - markupBreak.length))
            }
            return result;
        }

    }


})();
