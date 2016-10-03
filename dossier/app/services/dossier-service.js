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
        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }

        DossierService.CanadianPostalCodePattern = function () {

        }

        DossierService.dossier = {
            dossierID: "569522",
            enrolmentVersion: "1.23",
            dateSaved: "1999-01-21",
            applicationType: "New",
            softwareVersion: "1.0",
            dataChecksum: "kjsakdjas",
            drugProduct: {
                thirdPartySigned: false,
                humanDrugUse: false,
                radiopharmDrugUse: false,
                vetDrugUse: false,
                disinfectantDrugUse: false,
                isScheduleA: false,
                scheduleAGroup: {},
                therapeutic: {//grid
                    listItems: [],
                    columnDef: []
                },
                canRefProducts: {},//grid
                formulations: {},//tab + grid +
                appendixFour: {}//tab + grid +

            },
            contactList: []

        };


        DossierService.prototype = {

            _default: {},

            loadFromFile: function (url) {
                var deferred = $q.defer();
                // Fetch the player from Dribbble
                // var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';

                var dossierData = $http.get(url);
                var self = this;

                // When our $http promise resolves
                // Use angular.extend to extend 'this'
                // with the properties of the response
                dossierData.then(function successCallback(response) {
                    // console.log('DossierService success response: ' + JSON.stringify(response));
                    deferred.resolve(response);
                    // angular.extend(self.addressList, self.getAddressList(response.data));
                }, function errorCallback(response) {
                    deffered.reject('There was an error getting data');
                    console.log('DossierService error response: ' + JSON.stringify(response));
                });

                return deferred.promise;
            },

            getDossierInfo: function (info) {

                if (!info)
                    return this._default;

                return {
                    dossierID: info.dossier_id,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type.capitalize(),
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: [
                            {"name": "human", "label": "Human", "value": info.human_drug_use},
                            {"name": "radio-pharmaceutical", "label": "Radiopharmaceutical", "value": info.radiopharm_drug_use},
                            {"name": "veterinary", "label": "Veterinary", "value": info.vet_drug_use},
                            {"name": "disinfectant", "label": "Disinfectant", "value": info.disinfectant_drug_use}
                        ],
                        isScheduleA: info.is_sched_a,
                        scheduleAGroup: {

                            drugIdNumber: info.din_number,
                            scheduleAClaimsIndDetails: info.sched_a_claims_ind_details,
                            diseaseDisorderList: [

                                {name: "acute-alcohol", label: "Acute Alcohol", value: info.acute_alcohol},
                                {name: "acute-anxiety", label: "Acute Anxiety", value: info.acute_anxiety},
                                {name: "acute-infectious", label: "Acute Infectious", value: info.acute_infectious},
                                {name: "acute-inflammatory", label: "Acute Inflammatory", value: info.acute_inflammatory},
                                {name: "acute-psychotic", label: "Acute Psychotic", value: info.acute_psychotic},
                                {name: "addiction", label: "Addiction", value: info.addiction},
                                {name: "ateriosclerosis", label: "Ateriosclerosis", value: info.ateriosclerosis},
                                {name: "appendicitis", label: "Appendicitis", value: info.appendicitis},
                                {name: "asthma", label: "Asthma", value: info.asthma},
                                {name: "cancer", label: "Cancer", value: info.cancer},
                                {name: "congest-heart-fail", label: "Congest Heart Fail", value: info.congest_heart_fail},
                                {name: "convulsions", label: "Convulsions", value: info.convulsions},
                                {name: "dementia", label: "Dementia", value: info.dementia},
                                {name: "depression", label: "Depression", value: info.depression},
                                {name: "diabetes", label: "Diabetes", value: info.diabetes},
                                {name: "gangrene", label: "Gangrene", value: info.gangrene},
                                {name: "glaucoma", label: "Glaucoma", value: info.glaucoma},
                                {name: "haematologic-bleeding", label: "Haematologic Bleeding", value: info.haematologic_bleeding},
                                {name: "hepatitis", label: "Hepatitis", value: info.hepatitis},
                                {name: "hypertension", label: "Hypertension", value: info.hypertension},
                                {name: "nausea-pregnancy", label: "Nausea Pregnancy", value: info.nausea_pregnancy},
                                {name: "obesity", label: "Obesity", value: info.obesity},
                                {name: "rheumatic-fever", label: "Rheumatic Fever", value: info.rheumatic_fever},
                                {name: "septicemia", label: "Septicemia", value: info.septicemia},
                                {name: "sex-transmit-disease", label: "Sex Transmit Disease", value: info.sex_transmit_disease},
                                {name: "strangulated-hernia", label: "Strangulated Hernia", value: info.strangulated_hernia},
                                {name: "thrombotic-embolic-disorder", label: "Thrombotic Embolic Disorder", value: info.thrombotic_embolic_disorder},
                                {name: "thyroid-disease", label: "Thyroid Disease", value: info.thyroid_disease},
                                {name: "ulcer-gastro", label: "Ulcer Gastro", value: info.ulcer_gastro},
                                {name: "other", label: "Other", value: false, hasOtherDetails: true}
                            ]

                        },
                        therapeutic: {//grid
                            classifications : [ //hardcoded cauz missing in the json file
                                {"id":1, "name":"classification1"},
                                {"id":2, "name":"classification2"},
                                {"id":3, "name":"classification3"},
                                {"id":4, "name":"classification4"},
                                {"id":5, "name":"classification5"}
                            ]
                        },
                        canRefProducts: {
                            productList : getCanRefProductList(info.ref_product_list.cdn_ref_product)
                        },//grid
                        formulations: getFormulationList(info.formulation_group.formulation_details),//tab + grid +
                        appendixFour: {
                            ingredientList : getAppendix4IngredientList(info.appendix4_group)
                        }//tab + grid +

                    },
                    contactInfo: { //grid
                        contactList: [],
                        columnDef: []
                    }

                };


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

            },

            getContactList: function (contacts) {
                var list = [];

                if (contacts) {
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = {};
                        contact.contactID = contacts[i].contact_id;
                        contact.amendRecord = contacts[i].amend_record;
                        contact.manufacturer = contacts[i].manufacturer;
                        contact.mailing = contacts[i].mailing;
                        contact.billing = contacts[i].billing;
                        contact.importer = contacts[i].importer;
                        contact.contactRole = contacts[i].dossier_contact_details.rep_contact_role;
                        contact.salutation = contacts[i].dossier_contact_details.salutation;
                        contact.givenName = contacts[i].dossier_contact_details.given_name;
                        contact.initials = contacts[i].dossier_contact_details.initials;
                        contact.surname = contacts[i].dossier_contact_details.surname;
                        contact.title = contacts[i].dossier_contact_details.job_title;
                        contact.language = contacts[i].dossier_contact_details.language_correspondance;
                        contact.phone = contacts[i].dossier_contact_details.phone_num;
                        contact.phoneExt = contacts[i].dossier_contact_details.phone_ext;
                        contact.fax = contacts[i].dossier_contact_details.fax_num;
                        contact.email = contacts[i].dossier_contact_details.email;

                        list.push(contact);
                    }
                }


                return list;

            }
        };

        // Return a reference to the function
        return DossierService;
    }

    function getCanRefProductList (info){
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.medIngredient = info[i].medicinal_ingredient;
                product.dosageForm = info[i].dosage_form;
                product.dosageFormOther = info[i].dosage_form_other;
                product.strengths = info[i].strengths;
                product.companyName = info[i].company_name;

                list.push(product);
            }
        }


        return list;


    }

    function getAppendix4IngredientList (info){
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.id = info[i].ingredient_id;
                ing.name = info[i].ingredient_name;
               // ing.role = info[i].dosage_form;
              // ing.abstractNum = info[i].dosage_form_other;
               // ing.standard = info[i].strengths;
                ing.sourceHuman = info[i].human_sourced === 'Y' ? true:false;
                ing.sourceAnimal = info[i].animal_sourced === 'Y' ? true:false;
                var tissues = info[i].tissues_fluids_section;
                var srcAnimal = info[i].animal_sourced_section;

                ing.tissuesFluidsOrigin = {
                    nervousSystem:{
                        title: "Nervous System", //the legend for checkbox list
                        groupName: "nervous-sys", // the group name for checkboxlist
                        list: [
                            {name: "brain", label: "Brain", value: tissues.brain === 'Y' ? true:false},
                            {name: "brain-stem", label: "Brain Stem", value: tissues.brain_stem === 'Y' ? true:false},
                            {name: "cerebellum", label: "Cerebellum", value: tissues.cerebellum === 'Y' ? true:false},
                            {name: "cerebrospinal-fluid", label: "Cerebrospinal Fluid", value: tissues.cerebrospinal_fluid === 'Y' ? true:false},
                            {name: "dorsal-root-ganglia", label: "Dorsal Root Ganglia", value: tissues.dorsal_root_ganglia === 'Y' ? true:false},
                            {name: "dura-mater", label: "Dura Mater", value: tissues.dura_mater === 'Y' ? true:false},
                            {name: "hypothalmus", label: "hypothalmus", value: tissues.hypothalmus === 'Y' ? true:false},
                            {name: "retina-optic", label: "Retina Optic", value: tissues.retina_optic === 'Y' ? true:false},
                            {name: "spinal-cord", label: "Spinal Cord", value: tissues.spinal_cord === 'Y' ? true:false},
                            {name: "trigerminal-ganglia", label: "Trigerminal Ganglia", value: tissues.trigerminal_ganglia === 'Y' ? true:false},
                            {name: "other-nervous", label: "Other Nervous", value: tissues.other_nervous === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    digestiveSystem:{
                        title: "Digestive System",
                        groupName: "digestive-sys",
                        list: [
                            {name: "appendix", label: "appendix", value:tissues.appendix === 'Y' ? true:false},
                            {name: "bile", label: "bile", value:tissues.bile === 'Y' ? true:false},
                            {name: "distal-ileum", label: "Distal Ileum", value:tissues.distal_ileum === 'Y' ? true:false},
                            {name: "large-intestine", label: "Large Intestine", value:tissues.large_intestine === 'Y' ? true:false},
                            {name: "saliva-salivary", label: "Saliva Salivary", value:tissues.saliva_salivary === 'Y' ? true:false},
                            {name: "small-intestine", label: "Small Intestine", value:tissues.small_intestine === 'Y' ? true:false},
                            {name: "stomach", label: "stomach", value:tissues.stomach === 'Y' ? true:false},
                            {name: "other-digestive", label: "Other Digestive", value:tissues.other_digestive === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    reproductiveSystem:{
                        title: "Reproductive System",
                        groupName: "reproductive-sys",
                        list: [
                            {name: "milk-products", label: "Milk Products", value:tissues.milk_products === 'Y' ? true:false},
                            {name: "kidney", label: "kidney", value:tissues.kidney === 'Y' ? true:false},
                            {name: "colostrum", label: "colostrum", value:tissues.colostrum === 'Y' ? true:false},
                            {name: "mammary-glands", label: "Mammary Glands", value:tissues.mammary_glands === 'Y' ? true:false},
                            {name: "ovaries", label: "ovaries", value:tissues.ovaries === 'Y' ? true:false},
                            {name: "placenta", label: "placenta", value:tissues.placenta === 'Y' ? true:false},
                            {name: "placental-fluid", label: "Placental Fluid", value:tissues.placental_fluid === 'Y' ? true:false},
                            {name: "semen", label: "semen", value:tissues.semen === 'Y' ? true:false},
                            {name: "testes", label: "testes", value:tissues.testes === 'Y' ? true:false},
                            {name: "urine", label: "urine", value:tissues.urine === 'Y' ? true:false},
                            {name: "other-reproductive", label: "Other Reproductive", value:tissues.other_reproductive === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    cardioSystem:{
                        title: "Cardio System",
                        groupName: "cardio-sys",
                        list: [
                            {name: "heart-pericardium", label: "Heart Pericardium", value:tissues.heart_pericardium === 'Y' ? true:false},
                            {name: "lung", label: "lung", value:tissues.lung === 'Y' ? true:false},
                            {name: "nasal-fluid", label: "Nasal Fluid", value:tissues.nasal_fluid === 'Y' ? true:false},
                            {name: "trachea", label: "trachea", value:tissues.trachea === 'Y' ? true:false},
                            {name: "other-cardio-respiratory", label: "Other Cardio Respiratory", value:tissues.other_cardio_respiratory === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    immuneSystem:{
                        title: "Immune System",
                        groupName: "immune-sys",
                        list: [
                            {name: "lymph-nodes", label: "Lymph Nodes", value:tissues.lymph_nodes === 'Y' ? true:false},
                            {name: "spleen", label: "spleen", value:tissues.spleen === 'Y' ? true:false},
                            {name: "thymus", label: "thymus", value:tissues.thymus === 'Y' ? true:false},
                            {name: "tonsils", label: "tonsils", value:tissues.tonsils === 'Y' ? true:false},
                            {name: "other-immune", label: "Other Immune", value:tissues.other_immune === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    skinGlandSystem:{
                        title: "Skin Gland System",
                        groupName: "skin-gland-sys",
                        list: [
                            {name: "adrenal-gland", label: "Adrenal Gland", value:tissues.adrenal_gland === 'Y' ? true:false},
                            {name: "hair-hooves-feathers", label: "Hair Hooves Feathers", value:tissues.hair_hooves_feathers === 'Y' ? true:false},
                            {name: "liver", label: "liver", value:tissues.liver === 'Y' ? true:false},
                            {name: "pancreas", label: "pancreas", value:tissues.pancreas === 'Y' ? true:false},
                            {name: "pituitary", label: "pituitary", value:tissues.pituitary === 'Y' ? true:false},
                            {name: "skin-hides", label: "skinHides", value:tissues.skin_hides === 'Y' ? true:false},
                            {name: "thyroid-parathyroid", label: "Thyroid Parathyroid", value:tissues.thyroid_parathyroid === 'Y' ? true:false},
                            {name: "other-skin-glandular", label: "Other Skin Glandular", value:tissues.other_skin_glandular === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    musculoSkeletalSystem:{
                        title: "Musculo Skeletal System",
                        groupName: "musculo-skeletal-sys",
                        list: [
                            {name: "abdomen", label: "abdomen", value:tissues.abdomen === 'Y' ? true:false},
                            {name: "skull", label: "skull", value:tissues.skull === 'Y' ? true:false},
                            {name: "bones", label: "bones", value:tissues.bones === 'Y' ? true:false},
                            {name: "collagen", label: "collagen", value:tissues.collagen === 'Y' ? true:false},
                            {name: "tendons-ligaments", label: "Tendons Ligaments", value:tissues.tendons_ligaments === 'Y' ? true:false},
                            {name: "vertebral-column", label: "Vertebral Column", value:tissues.vertebral_column === 'Y' ? true:false},
                            {name: "muscle", label: "muscle", value:tissues.muscle === 'Y' ? true:false},
                            {name: "other-musculo-skeletal", label: "Other Musculo Skeletal", value:tissues.other_musculo_skeletal === 'Y' ? true:false, hasOtherDetails:true}
                        ]},
                    otherTissues:{
                        title: "Other Tissues",
                        groupName: "other-tissues",
                        list: [
                            {name: "adipose", label: "adipose", value:tissues.adipose === 'Y' ? true:false},
                            {name: "ascites", label: "ascites", value:tissues.ascites === 'Y' ? true:false},
                            {name: "antler-velvet", label: "Antler Velvet", value:tissues.antler_velvet === 'Y' ? true:false},
                            {name: "serum", label: "serum", value:tissues.serum === 'Y' ? true:false},
                            {name: "whole-blood", label: "Whole Blood", value:tissues.whole_blood === 'Y' ? true:false},
                            {name: "plasma", label: "plasma", value:tissues.plasma === 'Y' ? true:false},
                            {name: "embryonic-tissue", label: "Embryonic Tissue", value:tissues.embryonic_tissue === 'Y' ? true:false},
                            {name: "fetal-tissue", label: "Fetal Tissue", value:tissues.fetal_tissue === 'Y' ? true:false},
                            {name: "bone-marrow", label: "Bone Marrow", value:tissues.bone_marrow === 'Y' ? true:false},
                            {name: "eyes-cornea", label: "Eyes Cornea", value:tissues.eyes_cornea === 'Y' ? true:false},
                            {name: "gall-bladder", label: "Gall Bladder", value:tissues.gall_bladder === 'Y' ? true:false},
                            {name: "other-fluids-tissues", label: "Other Fluids Tissues", value:tissues.other_fluids_tissues === 'Y' ? true:false, hasOtherDetails:true}
                        ]
                    }};
                ing.sourceAnimalDetails = {

                    primateTypeList : [
                        {label : "NONHUMANPRIMATE", type: "text", name : "nhp-type", required : false, value : srcAnimal.nonhuman_primate_type},
                        {label : "AQUATICTYPE", type: "text", name : "aqua-type", required : false, value : srcAnimal.aquatic_type},
                        {label : "AVIANTYPE", type: "text", name : "avian-type", required : false, value : srcAnimal.avian_type},
                        {label : "BOVINETYPE", type: "text", name : "bovine-type", required : false, value : srcAnimal.bovine_type},
                        {label : "CANINETYPE", type: "text", name : "canine-type", required : false, value : srcAnimal.canine_type},
                        {label : "CAPRINETYPE", type: "text", name : "caprine-type", required : false, value : srcAnimal.caprine_type},
                        {label : "CERVIDAETYPE", type: "text", name : "cervidae-type", required : false, value : srcAnimal.cervidae_type},
                        {label : "EQUINETYPE", type: "text", name : "equine-type", required : false, value : srcAnimal.equine_type},
                        {label : "FELINETYPE", type: "text", name : "feline-type", required : false, value : srcAnimal.feline_type},
                        {label : "OVINETYPE", type: "text", name : "ovine-type", required : false, value : srcAnimal.ovine_type},
                        {label : "PORCINETYPE", type: "text", name : "porcine-type", required : false, value : srcAnimal.porcine_type},
                        {label : "RODENTTYPE", type: "text", name : "rodent-type", required : false, value : srcAnimal.rodent_type},
                        {label : "OTHERANIMALTYPE", type: "text", name : "other-animal-type", required : false, value : srcAnimal.other_type},
                        {label : "CONTROLLEDPOP", type: "select", name : "controlled-pop", required : true, value : srcAnimal.is_controlled_pop},
                        {label : "BIOTECHDERIVED", type: "select", name : "biotech-derived", required : true, value : srcAnimal.is_biotech_derived},
                        {label : "CELLLINE", type: "select", name : "cell-line", required : true, value : srcAnimal.is_cell_line},
                        {label : "AGEANIMALS", type: "number", name : "age-animals", required : true, value : srcAnimal.animal_age}/*,
                         {label : "SPECIFY", type: "text", name : "specify", required : false, value : srcAnimal.nonhuman_primate_type}*/
                    ],

                    countryList: []
                };
                list.push(ing);
            }
        }


        return list;


    }

    function getFormulationList(list){

        var formulationList = [];

        angular.forEach(list, function (item) {

            var obj = {
                "formulation": item.formulation_id,
                "formulationName": item.formulation_name,
                "activeIngList": getActiveIngList(item.active_ingredient),
                "nMedIngList": getNonMedIngList(item.nonmedicinal_ingredient),
                "containerTypes": getContainerTypeList(item.container_group.container_details),
                "animalHumanMaterials": getMaterialList(item.material_ingredient),
                "routeAdmins": getRouteAdminList(item.roa_group.roa_details),
                "countryList": getFormulationCountryList(item.country_group.country_manufacturer)

            }

            formulationList.push(obj);


        });

        return formulationList;

    }

    function getActiveIngList(list){

        var array = [];

        angular.forEach(list, function (item) {

            var obj = {
                "ingId": item.ingredient_id,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src === 'Y'? true : false,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc === 'Y'? true : false,
                "nanoMaterial": item.is_nanomaterial === 'Y'? true : false,
                "nanoMaterialOther": item.nanomaterial_details
            };

            array.push(obj);

        });

        return array;

    }

    function getNonMedIngList(list){

        var array = [];

        angular.forEach(list, function (item) {

            var obj = {
                "ingId": item.ingredient_id,
                "varId": item.variant_name,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src === 'Y'? true : false,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc === 'Y'? true : false,
                "nanoMaterial": item.is_nanomaterial === 'Y'? true : false,
                "nanoMaterialOther": item.nanomaterial_details
            };

            array.push(obj);

        });

        return array;

    }

    function getContainerTypeList(list){

        var array = [];

        angular.forEach(list, function (item) {

            var obj = {
                "containerType" : item.container_type,
                "packageSize" : item.package_size,
                "shelfLifeYears": item.shelf_life_years,
                "shelfLifeMonths": item.shelf_life_months,
                "tempMin": item.temperature_min,
                "tempMax": item.temperature_max
            };

            array.push(obj);

        });

        return array;
    }

    function getMaterialList(list){

        var array = [];

        angular.forEach(list, function (item) {


            var obj = {
                "ingredientId": item.ingredient_id,
                "ingredientName": item.ingredient_name,
                "cas": item.cas_number,
                "ingredientStandard": item.ingred_standard,
                "inFinalContainer": item.in_final_container === 'Y'? true : false
            };

            array.push(obj);

        });

        return array;
    }

    function getRouteAdminList(list){

        var array = [];

        var _id = 0;

        angular.forEach(list, function (item) {

            _id = _id+1;
            var obj = {
                "id": _id,
                "roa": item.roa,
                "otherRoaDetails": item.roa_other
            };

            array.push(obj);

        });

        return array;

    }

    function getFormulationCountryList(list){

        var array = [];

        var _id = 0;

        angular.forEach(list, function (item) {

            _id = _id+1;
            var obj = {
                "id": _id,
                "name": item
            };

            array.push(obj);

        });

        return array;

    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };


})();
