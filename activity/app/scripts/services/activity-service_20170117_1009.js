/**
 * Created by dkilty on 8/25/2016.
 */
/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';
    angular
        .module('activityService', ['hpfbConstants','activityLists'])
})();

(function () {
    'use strict';
    angular
        .module('activityService')
        .factory('ActivityService', ActivityService);
    ActivityService.$inject = ['YES', 'NO','ActivityListFactory','$filter'];
    function ActivityService(YES, NO,ActivityListFactory, $filter) {

        function ActivityService() {
            //construction logic
            var defaultActivityData = {
                "companyId": "",
                "dstsControlNumber": "",
                "enrolmentVersion": "",
                "dateSaved": "",
                "applicationType": "NEW",
                "softwareVersion": "1.0.0",
                "dataChecksum": "",
                "dossierIdPrefix": "HC6-024-",
                "dossierId": "",
                "regActivityLead": "",
                "regActivityType": "",
                "feeClass": "",
                "reasonFiling": "",
                "isThirdParty": "",
                "isAdminSub": "",
                "relatedActivity": {},
                "contactRecord": []
            };
            defaultActivityData.rationaleTypes = _createRationalTypes();
            defaultActivityData.notifiableChangeTypes = _createNotifiableChangeTypes();
            defaultActivityData.relatedActivity = _getEmptyActivity();
            angular.extend(this._default, defaultActivityData);
            this.rootTag = "ACTIVITY_ENROL";
            this.activityId = 0;
        }

        ActivityService.prototype = {
            _default: {},
            SANDS: ActivityListFactory.getSANDSRaTypeValue(),
            SNDS: ActivityListFactory.getSNDSTypeValue(),
            NC:  ActivityListFactory.getNCTypeValue(),
            VNC: "VNC",
            BIOLOGIC: ActivityListFactory.getBiologicalLeadValue(),
            DIN: ActivityListFactory.getDINTypeValue()

        };


        ActivityService.prototype.getRootTag = function () {
            return (this.rootTag)
        };

        /**
         * @ngdoc transforms the object model to the compatible file JSON objecct base transform call!!
         * @param jsonObj
         * @returns (json) object compatible with the xml schema
         * */
        ActivityService.prototype.transformToFileObj = function (jsonObj) {
            var activity = {
                ACTIVITY_ENROL: {
                    template_type: "PHARMA",
                    company_id: jsonObj.companyId,
                    dsts_control_number: jsonObj.dstsControlNumber,
                    enrolment_version: jsonObj.enrolmentVersion,
                    date_saved: jsonObj.dateSaved,
                    application_type: jsonObj.applicationType,
                    software_version: jsonObj.softwareVersion,
                    data_checksum: jsonObj.dataChecksum,
                    dossier_id_prefix: jsonObj.dossierIdPrefix,
                    dossier_id: jsonObj.dossierId,
                    dossier_id_concat: "",
                    reg_activity_lead: jsonObj.regActivityLead,
                    reg_activity_type: "",
                    fee_class: jsonObj.feeClass,
                    reason_filing: jsonObj.reasonFiling,
                    is_third_party: jsonObj.isThirdParty,
                    is_admin_submission: jsonObj.isAdminSub,
                    notifiable_change_types: {},
                    rationale_types: {}
                }
            };
            if(jsonObj.regActivityType) {
                activity[this.rootTag].reg_activity_type = {
                    _label_en: jsonObj.regActivityType.en,
                    _label_fr: jsonObj.regActivityType.fr,
                    __text: jsonObj.regActivityType.id
                };
            }
            activity[this.rootTag].notifiable_change_types = _mapNotifiableChangeTypesToOutput(jsonObj.notifiableChangeTypes);
            activity[this.rootTag].rationale_types = _mapRationaleTypeToOutput(jsonObj.rationaleTypes);
            if (jsonObj.isAdminSub === YES) {
                activity[this.rootTag].related_activity = this.tranformRelatedActivityToFileObj(jsonObj.relatedActivity);
            }
            /* if (relatedActList && relatedActList.length > 0) {
             //the checksum doesn't like empty tags of format <tag/> and this is optional in the schema
             activity[this.rootTag].related_activity = relatedActList;
             }*/
            activity[this.rootTag].contact_record = this.transformContactListToFileObj(jsonObj.contactRecord);
            //do other stuff
            if (jsonObj.dossierId) {
                activity[this.rootTag].dossier_id_concat = (jsonObj.dossierIdPrefix + jsonObj.dossierId);
            } else {
                //if there is no id value just make this empty
                activity[this.rootTag].dossier_id_concat = "";
            }


            return activity;

        };

        ActivityService.prototype.mapContactList = function (jsonObj) {

            return _mapRegulatoryContactList(jsonObj);

        };
        ActivityService.prototype.transformContactListToFileObj = function (jsonObj) {
            return _transformRegulatoryContactListToFileObj(jsonObj);
        };

        //TODO obsolete?
        ActivityService.prototype.tranformRelatedActivityToFileObj = function (jsonObj) {

            var activity = {};
            activity.sponsor_name = jsonObj.sponsorName;
            activity.date_cleared = "";
            var dateCleared = jsonObj.dateCleared;
            var month = "";
            var day = "";
            if (dateCleared) {
                month = dateCleared.getMonth() + 1;
                day = dateCleared.getDate();
                if (month < 10) {
                    //todo hack
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }

                activity.date_cleared = dateCleared.getFullYear() + '-' + (month) + '-' + day;
            }

            activity.reg_activity_type = "";

            activity.reg_activity_type = {
                _label_en:  jsonObj.regActivityType.en,
                _label_fr:   jsonObj.regActivityType.fr,
                __text:   jsonObj.regActivityType.id
            };
            console.log(activity.reg_activity_type);
            console.log("the id "+jsonObj.regActivityType.id);

            activity.control_number = jsonObj.controlNumber;
            activity.license_agreement = jsonObj.licenseAgree;
            activity.din_transfer = jsonObj.dinTransfer === true ? YES : NO;
            activity.not_lasa = jsonObj.notLasa === true ? YES : NO;
            return activity;

        };
        ActivityService.prototype.getModelInfo = function () {
            return this._default;
        };
        /**
         * @ngdoc method- transforms the file json to a model object
         */
        ActivityService.prototype.getActivityInfo = function (jsonObj) {
            if (!jsonObj) {
                return this._default;
            }
            var model = {};
            model.companyId = jsonObj.company_id;
            model.dstsControlNumber = jsonObj.dsts_control_number;
            model.enrolmentVersion = jsonObj.enrolment_version;
            model.dateSaved = jsonObj.date_saved;
            model.applicationType = jsonObj.application_type;
            model.softwareVersion = jsonObj.software_version;
            model.dataChecksum = jsonObj.software_version;
            model.dossierIdPrefix = jsonObj.dossier_id_prefix;
            model.dossierId = jsonObj.dossier_id;
            model.regActivityLead = jsonObj.reg_activity_lead;
            model.regActivityType = jsonObj.reg_activity_type;
            model.feeClass = jsonObj.fee_class;
            model.reasonFiling = jsonObj.reason_filing;
            model.isThirdParty = jsonObj.is_third_party;
            model.isAdminSub = jsonObj.is_admin_submission;

            model.notifiableChangeTypes = _transformNotifiableChangeTypeFromFileObj(jsonObj.notifiable_change_types);
            model.rationaleTypes = _transformRationaleTypeFromFileObj(jsonObj.rationale_types);
            model.relatedActivity = {};

            var repContacts = {contactRecord: []};

            if (jsonObj.related_activity) {
                model.relatedActivity = this.transformRelatedRegActivityFromFileObj(jsonObj.related_activity);
            }

            if (jsonObj.contact_record) {
                repContacts.contactRecord = this.mapContactList(jsonObj.contact_record)
            }
            return angular.merge(model, repContacts);
        };

        ActivityService.prototype.resetRationale = function () {
            this._default.rationaleTypes = _createRationalTypes();
        };
        ActivityService.prototype.resetNotifiableChanges = function () {
            this._default.notifiableChangeTypes = _createNotifiableChangeTypes();
        };

        /**
         * ngDoc method- mapping from the transaction file json object to the internal representation
         * @param jsonObj the json object generated from the file
         */
        ActivityService.prototype.transformFromFileObj = function (jsonObj) {
            var activityInfo = this.getActivityInfo(jsonObj[this.rootTag]);
            //get rid of previous default if it exists
            this._default = activityInfo;
        };

        ActivityService.prototype.getNewActivity = function () {
            var activity = {
                activityId: this.getNextActivityId(),
                "regActivityType": "",
                "dateCleared": "",
                "dstsControlNumber": "",
                "dossierId": "",
                "manufacturerName": "",
                "reasonFiling": "",
                "assocDins": []
            };
            return activity;
        };

        /**
         * Get the activity list. Small so not in a separate service
         * @param isPilot
         * @returns {string[]}
         */
       /* ActivityService.prototype.getActivityLeadList = function (isPilot) {

            var leadList = [
                this.BIOLOGIC,
                "CHP",
                "DMF",
                "PHARMA",
                "PMVIGILANCE"
                /!*
                 B14-20160301-09	Pharmaceutical
                 B14-20160301-02	Biological
                 B14-20160301-10	Post-Market Pharmacovigilance
                 B14-20160301-07	Drug Master File

                 *!/


            ];

            if (!isPilot) { //if pilot do not show these values
                leadList.push("MD", "VET", "UNASSIGNED");
            }
            return leadList;

        };*/


        ActivityService.prototype.isNotifiableChange = function (value) {
            if (!value) return false;
            if (value === this.VNC || value === this.NC) {
                return true;
            }
            return false;
        };
        ActivityService.prototype.isRationale = function (activity, lead) {

            if (!activity) return false;
            if (activity === this.SANDS || activity === this.SNDS) {
                return true;
            }
            if (activity === this.DIN && lead === this.BIOLOGIC) {
                return true;
            }
            return false;
        };

      /*  ActivityService.prototype.getActivityTypeList = function (isPilot) {

            var activityList = [
                "CTA",
                "CTAA",
                "NDS",
                this.SNDS,
                "ANDS",
                this.SANDS,
                this.NC,
                this.DIN,
                "PDC",
                "ADMIN"
            ];


            if (!isPilot) {
                activityList.push(
                    "VIND",
                    "VINDAM",
                    "VNDS",
                    "VANDS",
                    "VSANDS",
                    this.VNC,
                    "VDIN")
            }
            return activityList;
        };*/

        ActivityService.prototype.updateActivityId = function (value) {
            if (isNaN(value)) return;
            if (value > this.activityId) {
                this.activityId = value;
            }
        };
        ActivityService.prototype.getNextActivityId = function () {
            this.activityId = this.activityId + 1;
            return (this.activityId);
        };
        ActivityService.prototype.resetActivityId = function (value) {
            if (!value) {
                this.activityId = 0;
            } else {
                this.activityId = value;
            }
        };

        ActivityService.prototype.getEmptyRelatedActivity = function () {
            return _getEmptyActivity();
        };
        /**
         * Creates the internal model for Related Activity on a file load
         * @param jsonObj
         */
        ActivityService.prototype.transformRelatedRegActivityFromFileObj = function (jsonObj) {
            var relatedActivity = this.getEmptyRelatedActivity();
            relatedActivity.sponsorName = jsonObj.sponsor_name;
            relatedActivity.dateCleared = "";
            if (jsonObj.date_cleared) {
                relatedActivity.dateCleared = _parseDate(jsonObj.date_cleared);
            }
            //relatedActivity.regActivityType = jsonObj.reg_activity_type;
            relatedActivity.regActivityType  = $filter('filter')(ActivityListFactory.getRaTypeList(), {id:  jsonObj.reg_activity_type.__text})[0];


            relatedActivity.controlNumber = Number(jsonObj.control_number);
            relatedActivity.licenseAgree = jsonObj.license_agreement;
            relatedActivity.dinTransfer = jsonObj.din_transfer === YES;
            relatedActivity.notLasa = jsonObj.not_lasa === YES;
            return relatedActivity;
        };

        // Return a reference to the object
        return ActivityService;
    }//end of ActivityService Object definition

    /**
     * transforms from a file object
     * @param jsonObj
     * @returns (array) of contacts. Empty if there are none
     * @private
     */
    function _mapRegulatoryContactList(jsonObj) {
        var result = [];
        if (!jsonObj) return result;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }

        for (var i = 0; i < jsonObj.length; i++) {
            result.push(_transformRepContactFromFileObj(jsonObj[i]));
        }
        return (result)
    }

    function _transformRegulatoryContactListToFileObj(jsonObj) {
        var result = [];
        if (!jsonObj) return result;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }

        for (var i = 0; i < jsonObj.length; i++) {
            result.push(_mapRepContactToOutput(jsonObj[i]));
        }
        return (result)


    }


    function _transformRepContactFromFileObj(repObj) {

        var repContact = _transformContactFromFileObj(repObj.rep_contact_details);
        repContact.repRole = repObj.rep_contact_role;
        repContact.amend = repObj.amend_record === 'Y';
        return (repContact);
    }

    function _mapRepContactToOutput(repObj) {
        var repContact = {};
        repContact.rep_contact_role = repObj.repRole;
        repContact.amend_record = repObj.amend === true ? 'Y' : 'N';
        //deflatten the object
        repContact.rep_contact_details = _mapContactToOutput(repObj);
        return repContact;
    }

    function _transformContactFromFileObj(contactObj) {
        var contact = {};
        if (!contactObj) {
            console.error("There is no contact object");
            return contact;
        }
        contact.salutation = contactObj.salutation;
        contact.givenName = contactObj.given_name;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.title = contactObj.job_title;
        contact.language = contactObj.language_correspondance;
        contact.phone = contactObj.phone_num;
        contact.phoneExt = contactObj.phone_ext;
        contact.fax = contactObj.fax_num;
        contact.email = contactObj.email;
        return contact;
    }


    function _mapContactToOutput(contactObj) {

        var contact = {};
        contact.salutation = contactObj.salutation;
        contact.given_name = contactObj.givenName;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.job_title = contactObj.title;
        contact.language_correspondance = contactObj.language;
        contact.phone_num = contactObj.phone;
        contact.phone_ext = contactObj.phoneExt;
        contact.fax_num = contactObj.fax;
        contact.email = contactObj.email;
        return contact;
    }


    //TODO make a standard service

    /* function _createContactModel() {
        var contact = {};

        contact.salutation = "";
        contact.givenName = "";
        contact.initials = "";
        contact.surname = "";
        contact.jobTitle = "";
        contact.languageCorrespondance = "";
        contact.phoneNum = "";
        contact.phoneExt = "";
        contact.fax = "";
        contact.email = "";
        return contact;
     }*/

    //todo deprecated


    function _createRationalTypes() {
        return {
            /*  "rationaleTypes": {*/
            "newRoa": false,
            "newClaims": false,
            "changeFormulation": false,
            "changeDrugSubstance": false,
            "replaceSterility": false,
            "confirmitoryStudies": false,
            "otherRationale": false,
            "otherRationaleDetails": ""
            /* }*/
        };
    }

    function _createNotifiableChangeTypes() {
        return {
            ///"notifiableChangeTypes": {
            "textLabelChange": false,
            "drugSubstanceChange": false,
            "formulationChange": false,
            "specificationChange": false,
            "expiryStorageChange": false,
            "manufactMethodChange": false,
            "manufactSiteChange": false,
            "containerSizeChange": false,
            "packagingSpecChange": false,
            "packagingMaterialsChange": false,
            "otherChangeDetails": ""
            //}
        };
    }

    /**
     * @ngdoc converts notifable change data object to a file object
     * @param jsonObj - the data object to convert
     * @returns {json} representing the file object for a notifiable change
     * @private
     */
    function _mapNotifiableChangeTypesToOutput(jsonObj) {
        if (!jsonObj) return null;
        return {
            "text_label_change": jsonObj.textLabelChange === true ? 'Y' : 'N',
            "drug_substance_change": jsonObj.drugSubstanceChange === true ? 'Y' : 'N',
            "formulation_change": jsonObj.formulationChange === true ? 'Y' : 'N',
            "specification_change": jsonObj.specificationChange === true ? 'Y' : 'N',
            "expiry_storage_change": jsonObj.expiryStorageChange === true ? 'Y' : 'N',
            "manufact_method_change": jsonObj.manufactMethodChange === true ? 'Y' : 'N',
            "manufact_site_change": jsonObj.manufactSiteChange === true ? 'Y' : 'N',
            "container_size_change": jsonObj.containerSizeChange === true ? 'Y' : 'N',
            "packaging_spec_change": jsonObj.packagingSpecChange === true ? 'Y' : 'N',
            "packaging_materials_change": jsonObj.packagingMaterialsChange === true ? 'Y' : 'N',
            "other_change_details": jsonObj.otherChangeDetails
        };
    }

    /**
     * @ngdoc method transforms a file json object to a data object
     * @param jsonObj - the file json object to convert
     * @returns {json} converted json object
     * @private
     */
    function _transformNotifiableChangeTypeFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        return {
            "textLabelChange": jsonObj.text_label_change === 'Y',
            "drugSubstanceChange": jsonObj.drug_substance_change === 'Y',
            "formulationChange": jsonObj.formulation_change === 'Y',
            "specificationChange": jsonObj.specification_change === 'Y',
            "expiryStorageChange": jsonObj.expiry_storage_change === 'Y',
            "manufactMethodChange": jsonObj.manufact_method_change === 'Y',
            "manufactSiteChange": jsonObj.manufact_site_change === 'Y',
            "containerSizeChange": jsonObj.container_size_change === 'Y',
            "packagingSpecChange": jsonObj.packaging_spec_change === 'Y',
            "packagingMaterialsChange": jsonObj.packaging_materials_change === 'Y',
            "otherChangeDetails": jsonObj.other_change_details
        };
    }


    function _transformRationaleTypeFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        return {
            "newRoa": jsonObj.new_roa === 'Y',
            "newClaims": jsonObj.new_claims === 'Y',
            "changeFormulation": jsonObj.change_formulation === 'Y',
            "changeDrugSubstance": jsonObj.change_drug_substance === 'Y',
            "replaceSterility": jsonObj.replace_sterility === 'Y',
            "confirmitoryStudies": jsonObj.confirmitory_studies === 'Y',
            "otherRationale": jsonObj.other_rationale === 'Y',
            "otherRationaleDetails": jsonObj.other_rationale_details
        };
    }

    function _mapRationaleTypeToOutput(jsonObj) {
        if (!jsonObj) return null;
        return {
            "new_roa": jsonObj.newRoa === true ? 'Y' : 'N',
            "new_claims": jsonObj.newClaims === true ? 'Y' : 'N',
            "change_formulation": jsonObj.changeFormulation === true ? 'Y' : 'N',
            "change_drug_substance": jsonObj.changeDrugSubstance === true ? 'Y' : 'N',
            "replace_sterility": jsonObj.replaceSterility === true ? 'Y' : 'N',
            "confirmitory_studies": jsonObj.confirmitoryStudies === true ? 'Y' : 'N',
            "other_rationale": jsonObj.otherRationale === true ? 'Y' : 'N',
            "other_rationale_details": jsonObj.otherRationaleDetails
        };
    }

    //TODO delete
    /*  function _mapRelatedRegActivityToOutput(jsonObj) {
        if (!jsonObj) return null;
        var regActivityType = {
            "activity_id": jsonObj.activityId,
            "amend_record": jsonObj.amendRecord === true ? 'Y' : 'N',
            "reg_activity_type": jsonObj.regActivityType,
            "date_cleared": "",

            "control_number": jsonObj.dstsControlNumber,
            "dossier_id": jsonObj.dossierId,
            "manufacturer_name": jsonObj.manufacturerName,
            "reason_filing": jsonObj.reasonFiling,
            "assoc_dins": []
        };
        var dateCleared = jsonObj.dateCleared;
        var month = "";
        var day = "";
        if (dateCleared) {
     month = dateCleared.getMonth() + 1;
     day = dateCleared.getDate();
            if (month < 10) {
                //todo hack
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
     regActivityType.date_cleared = dateCleared.getFullYear() + '-' + (month) + '-' + day;
        }
        var dins = _mapRelatedDinsToOutput(jsonObj.assocDins);
        if (dins && dins.length > 0) {
            regActivityType.assoc_dins = dins;
        } else {
            regActivityType.assoc_dins = "";
        }
        return regActivityType;
     }*/


    /* function _transformRelatedDinsListFromFileObj(jsonObj) {
        var result = [];
        if (!jsonObj) return result;

        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }
        result = [];
        for (var i = 0; i < jsonObj.length; i++) {
            result.push({"dinNumber": jsonObj[i].din_number});
        }
        return result;
     }*/

    /* function _mapRelatedDinsToOutput(jsonObj) {
        var result = "";
        if (!jsonObj) return result;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }
        result = [];
        for (var i = 0; i < jsonObj.length; i++) {
            result.push({"din_number": jsonObj[i].dinNumber});
        }

        return result;
     }*/

    function _parseDate(value) {
        var dateArray = value.split('-');
        if (dateArray.length != 3) {
            console.error(("_parseDate error not 3 parts"))
        }
        var aDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return aDate;
    }

    function _getEmptyActivity() {

        return (
        {
            "sponsorName": "",
            "dateCleared": "",
            "regActivityType": "",
            "controlNumber": "",
            "licenseAgree": "",
            "dinTransfer": "",
            "notLasa": false
        }
        );
    }

})();

