/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate',
            'translations'
        ])
})();

(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    MainController.$inject=['$translate','$filter'];
    function MainController($translate,$filter) {
        var vm = this;
        vm.formType = 'EXT';

        var oldObj={"ACTIVITY_ENROL":{"template_type":"PHARMA","company_id":"","dsts_control_number":"","enrolment_version":"0.2","date_saved":"2017-02-04","application_type":"NEW","software_version":"1.0.0","data_checksum":"","dossier_id_prefix":"HC6-024-","dossier_id":"","dossier_id_concat":"","reg_activity_lead":"","reg_activity_type":{"_label_en":"MPNC (Pre-NC Meeting)","_label_fr":"MPNC (Réunion préalable - PM)","__text":"B02-20160301-046"},"fee_class":"","reason_filing":"","is_third_party":"","is_admin_submission":"","notifiable_change_types":{"text_label_change":"N","drug_substance_change":"N","formulation_change":"N","specification_change":"N","expiry_storage_change":"N","manufact_method_change":"N","manufact_site_change":"N","container_size_change":"N","packaging_spec_change":"N","packaging_materials_change":"N","other_change_details":""},"rationale_types":{"new_roa":"N","new_claims":"N","change_formulation":"N","change_drug_substance":"N","replace_sterility":"N","confirmitory_studies":"N","other_rationale":"N","other_rationale_details":""},"contact_record":[{"foo":"bar"}]}};
        var newObj={"ACTIVITY_ENROL":{"template_type":"PHARMA","hhh":"hhhh","dsts_control_number":"","enrolment_version":"0.2","date_saved":"2017-02-04","application_type":"AMEND","software_version":"1.0.1","data_checksum":"","dossier_id_prefix":"HC6-024-","dossier_id":"","dossier_id_concat":"","reg_activity_lead":"","reg_activity_type":{"_label_en":"MPNC (Pre-NC Meeting)","_label_fr":"MPNC (Réunion préalable - PM)","__text":"B02-20160301-047"},"fee_class":"","reason_filing":"","is_third_party":"","is_admin_submission":"","notifiable_change_types":{"text_label_change":"N","drug_substance_change":"N","formulation_change":"N","specification_change":"N","expiry_storage_change":"N","manufact_method_change":"N","manufact_site_change":"N","container_size_change":"N","packaging_spec_change":"N","packaging_materials_change":"N","other_change_details":""},"rationale_types":{"new_roa":"N","new_claims":"N","change_formulation":"N","change_drug_substance":"N","replace_sterility":"N","confirmitory_studies":"N","other_rationale":"N","other_rationale_details":""},"contact_record":[{"foo":"bar2"}]}}
        //"company_id":"",
        var oldObj2={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj2={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj3={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[{"amend_record":"N","rep_contact_role":"PRIMARY","rep_contact_details":{"salutation":"SALUT_DR","given_name":"asdsadsa","initials":"","surname":"asdasa","job_title":"job title 1","language_correspondance":"en","phone_num":"111-111-1111","phone_ext":"","fax_num":"","email":"fsdfdfsd@asdsadas"}}],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj4={"DOSSIER_ENROL":{"company_id":"23242","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[{"amend_record":"N","rep_contact_role":"PRIMARY","rep_contact_details":{"salutation":"SALUT_DR","given_name":"asdsadsa","initials":"","surname":"asdasa","job_title":"job title 2","language_correspondance":"fr","phone_num":"111-111-1111","phone_ext":"","fax_num":"","email":"fsdfdfsd@asdsadas"}},{}],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj5={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[{"formulation_name":"","formulation_id":1,"dosage_form_group":{"dosage_form_other":""},"roa_group":{},"container_group":{},"country_group":{"country_manufacturer":[{"_label_en":"Aland Islands","_label_fr":"Îles Åland","__text":"ALA"}]},"nonmedicinal_ingredient":[{"ingredient_name":"asdadasdasd","cas_number":"asdasd","ingred_standard":"","is_human_animal_src":"N","variant_name":"","strength":121232131,"per":"","units":{"_label_en":"BLISTER","_label_fr":"Plaquette","__text":"80"},"units_other":"","is_base_calc":"N","is_nanomaterial":{"_label_en":"METAL COLLOIDS","_label_fr":"METAL COLLOIDS","__text":"7"},"nanomaterial_details":""}]}]}}};
        var newObj6={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.3","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[{"amend_record":"N","rep_contact_role":"PRIMARY","rep_contact_details":{"salutation":"SALUT_DR","given_name":"sdfsdf","initials":"","surname":"sdfsd","job_title":"sfsdfds","language_correspondance":"en","phone_num":"111-111-1111","phone_ext":"","fax_num":"","email":"assdasdasdas@addsad"}}],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","appendix4_group":[{"ingredient_id":1,"ingredient_name":"asdsadsa","animal_sourced":"Y","human_sourced":"Y","tissues_fluids_section":{"cardio_system":{"heart_pericardium":"Y","lung":"Y","nasal_fluid":"Y","trachea":"Y","other_cardio_respiratory":"N","other_cardio_respiratory_details":""}},"animal_sourced_section":{"animal_src_record":[{"animal_type":"AVIAN_TYPE","animal_detail":"asdsadsadsaasdsad"},{"animal_type":"CERVIDAE_TYPE","animal_detail":"asdasdasdasds  sad asdsa dsadsad sad sad saasdasd das sadsa dsadasasdas sad asdsad asdsad dsa dsad s"}],"is_controlled_pop":"Y","is_biotech_derived":"Y","is_cell_line":"Y","animal_age":3,"country_origin_list":{"country_origin":[{"country_with_unknown":{"_label_en":"Andorra","_label_fr":"Andorre","__text":"AND"},"unknown_country_details":""},{"country_with_unknown":{"_label_en":"American Samoa","_label_fr":"Samoa Américaines","__text":"ASM"},"unknown_country_details":""}]}}}],"formulation_group":{"formulation_details":[{"formulation_name":"","formulation_id":1,"dosage_form_group":{"dosage_form_other":""},"roa_group":{},"container_group":{},"country_group":{},"active_ingredient":[{"ingredient_id":"(3-CHLOROALLYL)-3,5,7-TRIAZA-1-AZONIAADAMANTANE CHLORIDE","ingredient_name":"(3-CHLOROALLYL)-3,5,7-TRIAZA-1-AZONIAADAMANTANE CHLORIDE","cas_number":"","ingred_standard":"","is_human_animal_src":"Y","strength":3413123,"per":"","units":{"_label_en":"ACT","_label_fr":"Déclenchement","__text":"96"},"is_base_calc":"Y","is_nanomaterial":{"_label_en":"DENDRIMER","_label_fr":"DENDRIMER","__text":"2"},"nanomaterial_details":""}]}]}}};

        var result4=DeepDiff(newObj5,newObj6);
        console.log(result4);
        vm.resultDiff=result4;
        vm.listResults=[];

        for(var g=0;g<result4.length;g++){
            var rec=result4[g];
            console.log("Type of change "+rec.kind);

            //Path rules- always ignore the first element, it is the root
            //if there are more than 2 elements, complex object
            //if number is part of the path, it is an array of objects
            //if it is a number, skip to the last element (leaf)

           // if(rec.kind==='E') {

                var pathString="";
                var indexFound=false;
                var displayRecord={};
                displayRecord.index=0;
                displayRecord.recordName="";
                displayRecord.leaf=[];
                displayRecord.changeType=rec.kind;
                if(rec.path.length>2){
                    //complex object, will there always be an index?
                    for(var i=1;i<rec.path.length;i++){
                        if(angular.isNumber(rec.path[i])){
                            indexFound=true;
                            var existingRecord = $filter('filter')(vm.listResults, {recordName:rec.path[i-1],index:rec.path[i]})[0];
                            if(existingRecord){
                                var leaf={};
                                leaf.name=rec.path[rec.path.length - 1];
                                leaf.type=rec.kind;
                                leaf.original=rec.lhs;
                                leaf.diff=rec.rhs;
                                existingRecord.leaf.push(leaf);
                            }else {
                                displayRecord.recordName = rec.path[i - 1];
                                displayRecord.index=Number(rec.path[i]);
                                var leaf={};
                                leaf.name=rec.path[rec.path.length - 1];
                                leaf.type=rec.kind;
                                leaf.original=rec.lhs;
                                leaf.diff=rec.rhs;
                                displayRecord.leaf.push(leaf);
                                vm.listResults.push(displayRecord);
                            }
                            break;
                        }
                    }
                    //this is not an array
                    if(!indexFound) {
                        var existingRecord = $filter('filter')(vm.listResults, {recordName: rec.path[0], index: 0})[0];
                        if (existingRecord) {
                            var leaf = {};
                            leaf.name = rec.path[rec.path.length - 1];
                            leaf.type = rec.kind;
                            leaf.original = rec.lhs;
                            leaf.diff = rec.rhs;
                            existingRecord.leaf.push(leaf);
                        } else {
                            displayRecord.recordName = rec.path[0];
                            displayRecord.index = 0;
                            var leaf = {};
                            leaf.name = rec.path[rec.path.length - 1];
                            leaf.type = rec.kind;
                            leaf.original = rec.lhs;
                            leaf.diff = rec.rhs;
                            displayRecord.leaf.push(leaf);
                            vm.listResults.push(displayRecord);
                        }
                    }

                }else if (rec.path.length===2){

                    var existingRecord = $filter('filter')(vm.listResults, {recordName:rec.path[0],index:0})[0];
                    if(existingRecord){
                        var leaf={};
                        leaf.name=rec.path[1];
                        leaf.type=rec.kind;
                        leaf.original=rec.lhs;
                        leaf.diff=rec.rhs;
                        existingRecord.leaf.push(leaf);
                    }else {
                        displayRecord.recordName = rec.path[0];
                        var leaf = {};
                        leaf.name = rec.path[1];
                        leaf.type = rec.kind;
                        leaf.original = rec.lhs;
                        leaf.diff = rec.rhs;
                        displayRecord.leaf.push(leaf);
                        vm.listResults.push(displayRecord);
                    };
                }else{
                    console.log("This is an error, only one path????");

                }

                console.log("This is the display Record "+ JSON.stringify(displayRecord))


              //  console.log("path "+ pathString)
                /*$translate('DOSSIER_ENROL').then(function (translation) {
                    console.log("Transllation"+translation);
                    pathString=pathString+" "+translation;
                });*/
               /* console.log("Element "+pathString)
                console.log("Original value: "+rec.lhs);
                console.log("Changed value: "+rec.rhs);
                var temp={};
                temp.tag=pathString;
                temp.original=rec.lhs;
                temp.change=rec.rhs;
                vm.listResults.push(temp)*/
         //   }
           /* if(rec.kind==='A') {
                console.log("Change element "+rec.path[rec.path.length-1]);
                console.log("Type of change " + JSON.stringify(rec.item.kind));
                console.log("Original " + JSON.stringify(rec.item.lhs));
                console.log("Updated " + JSON.stringify(rec.item.rhs));
            }*/
        }





    }
})();
//test
(function () {
    'use strict';
    angular
        .module('activityApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('en');
           // $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);
           // $translateProvider.forceAsyncReload(true); //needed for the custom loader

        }]);
})();