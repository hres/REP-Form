/**
 * Created by dkilty on 8/25/2016.
 */
/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';
    angular
        .module('activityService', [])
})();

(function () {
    'use strict';
    angular
        .module('activityService')
        .factory('ActivityService', ActivityService);

    function ActivityService() {

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
                "notLasa": false,
                "reasonFiling": "",
                "isThirdParty": "",
                "relatedActivity": [],
                "contactRecord": []
            };
            defaultActivityData.rationaleTypes = _createRationalTypes();
            defaultActivityData.notifiableChangeTypes = _createNotifiableChangeTypes();
            angular.extend(this._default, defaultActivityData);

            this.rootTag = "ACTIVITY_ENROL";
            this.currSequence = 0;
        }

        ActivityService.prototype = {
            _default: {}
        };


        ActivityService.prototype.getRootTag = function () {
            return (this.rootTag)
        };

        /**
         * @ngdoc transforms the object model to the compatible file JSON objecct base transform call!!
         * @param jsonObj
         * @returns json object compatible with the xml schema
         * */
        ActivityService.prototype.transformToFileObj = function (jsonObj) {
            var activity = {
                ACTIVITY_ENROL: {
                    company_id: jsonObj.companyId,
                    dsts_control_number: jsonObj.dstsControlNumber,
                    enrolment_version: jsonObj.enrolmentVersion,
                    date_saved: jsonObj.dateSaved,
                    application_type: jsonObj.applicationType,
                    software_version: jsonObj.softwareVersion,
                    data_checksum: jsonObj.dataChecksum,
                    dossier_id_prefix: jsonObj.dossierIdPrefix,
                    dossier_id: jsonObj.dossierId,
                    dossier_id_concat:"",
                    reg_activity_lead: jsonObj.regActivityLead,
                    reg_activity_type: jsonObj.regActivityType,
                    fee_class: jsonObj.feeClass,
                    not_lasa: jsonObj.notLasa == true ? 'Y' : 'N',
                    reason_filing: jsonObj.reasonFiling,
                    is_third_party: jsonObj.isThirdParty ? 'Y' : 'N',
                    notifiable_change_types: {},
                    rationale_types: {},
                }
            };
            activity[this.rootTag].notifiable_change_types = _mapNotifiableChangeTypesToOutput(jsonObj.notifiableChangeTypes);
            activity[this.rootTag].rationale_types = _mapRationaleTypeToOutput(jsonObj.rationaleTypes);

            var relatedActList = this.tranformRelatedActivityToFileObj(jsonObj);
            if (relatedActList && relatedActList.length > 0) {
                //the checksum doesn't like empty tags of format <tag/> and this is optional in the schema
                activity[this.rootTag].related_activity = relatedActList;
            }
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

            var result = _mapRegulatoryContactList(jsonObj);
            return result;
        }
        ActivityService.prototype.transformContactListToFileObj = function (jsonObj) {
            return _transformRegulatoryContactListToFileObj(jsonObj);
        }


        ActivityService.prototype.tranformRelatedActivityToFileObj = function (jsonObj) {
            var activityList = jsonObj.relatedActivity;
            var result = [];
            //should never happpen, defensive!
            if (!(activityList instanceof Array)) {
                //make it an array, case there is only one
                activityList = [activityList]
            }
            for (var i = 0; i < activityList.length; i++) {
                result.push(_mapRelatedRegActivityToOutput(activityList[i]));
            }
            return result;
        }
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
            var model = this._default;
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
            model.notLasa = jsonObj.not_lasa === 'Y';
            model.reasonFiling = jsonObj.reason_filing;
            model.isThirdParty = jsonObj.is_third_party;

            model.notifiableChangeTypes = _transformNotifiableChangeTypeFromFileObj(jsonObj.notifiable_change_types);
            model.rationaleTypes = _transformRationaleTypeFromFileObj(jsonObj.rationale_types);


            var relatedActivities = {relatedActivity: []};
            var repContacts = {contactRecord: []};

            if (jsonObj.related_activity) {
                relatedActivities.relatedActivity = this.getRelatedActivityList(jsonObj.related_activity);
            }
            if (jsonObj.contact_record) {
                repContacts.contactRecord = this.mapContactList(jsonObj.contact_record)
            }
            return angular.extend(model, relatedActivities, repContacts);
        };

        ActivityService.prototype.getRelatedActivityList = function (activityList) {
            var listResult = [];
            if (!activityList) return listResult;
            if (!(activityList instanceof Array)) {
                //make it an array, case there is only one
                activityList = [activityList]
            }
            for (var i = 0; i < activityList.length; i++) {
                listResult.push(_transformRelatedRegActivityFromFileObj(activityList[i]));
            }
            return listResult;
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
            this._default = {};
            angular.extend(this._default, activityInfo)
        };

        ActivityService.prototype.getNewActivity = function () {
            var activity = {
                activityId: "1",
                "regActivityType": "",
                "dateCleared": "",
                "dstsControlNumber": "",
                "dossierId": "",
                "manufacturerName": "",
                "reasonFiling": "",
                "assocDins": {}
            };
            return activity;
        };

        ActivityService.prototype.getActivityLeadList = function (isPilot) {

            var leadList = [
                "BIOLOGIC",
                "CHP",
                "DMF",
                "PHARMA",
                "PMVIGILANCE"
            ];
            if (!isPilot) {
                leadList.push("MD", "VET", "UNASSIGNED");
            }
            return leadList;

        };

        ActivityService.prototype.isNotifiableChange = function (value) {

            if (!value) return false;
            if (value === 'NC' || value === 'VNC') {
                return true;
            }
            return false;
        }

        ActivityService.prototype.getActivityTypeList = function (isPilot) {

            var activityList = [
                "CTA",
                "CTAA",
                "NDS",
                "SNDS",
                "ANDS",
                "SANDS",
                "NC",
                "DIN",
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
                    "VNC",
                    "VDIN")
            }
            return activityList;
        };


        // Return a reference to the object
        return ActivityService;
    }//end of ActivityService Object definition

    /**
     * transforms from a file object
     * @param jsonObj
     * @returns an array of contacts. Empty if there are none
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

    function _createContactModel() {
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
    }

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
     * @returns {jsonobj} representing the file object for a notifiable change
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
     * @param jsonObj- the file json object to convert
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

    function _mapRelatedRegActivityToOutput(jsonObj) {
        if (!jsonObj) return null;
        var regActivityType = {
            "amend_record": jsonObj.amendRecord,
            "reg_activity_type": jsonObj.regActivityType,
            "date_cleared": "",
            "control_number": jsonObj.dstsControlNumber,
            "dossier_id": jsonObj.dossierId,
            "manufacturer_name": jsonObj.manufacturerName,
            "reason_filing": jsonObj.reasonFiling,
            "assoc_dins": {}
        };
        var dateCleared = jsonObj.dateCleared;
        if (dateCleared) {
            var month = dateCleared.getUTCMonth() + 1
            var day = dateCleared.getUTCDate();
            if (month < 10) {
                //todo hack
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            regActivityType.date_cleared = dateCleared.getUTCFullYear() + '-' + (dateCleared.getUTCMonth() + 1) + '-' + dateCleared.getUTCDate();
        }
        var dins = _mapRelatedDinsToOutput(jsonObj.assocDins);
        regActivityType.assoc_dins = dins;
        return regActivityType;
    }

    function _transformRelatedRegActivityFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        var regActivityType = {
            "amendRecord": jsonObj.amend_record,
            "regActivityType": jsonObj.reg_activity_type,
            "dateCleared": "",
            "dstsControlNumber": jsonObj.control_number,
            "dossierId": jsonObj.dossier_id,
            "manufacturerName": jsonObj.manufacturer_name,
            "reasonFiling": jsonObj.reason_filing
        };
        if (jsonObj.date_cleared) {
            regActivityType.dateCleared = _parseDate(jsonObj.date_cleared);
        }
        var dins = _transformRelatedDinsListFromFileObj(jsonObj.assoc_dins);
        regActivityType.assocDins = {};
        if (dins) {
            regActivityType.assocDins = dins; //should always be an array
        }
        return regActivityType;
    }


    function _transformRelatedDinsListFromFileObj(jsonObj) {
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
    }

    function _mapRelatedDinsToOutput(jsonObj) {
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
    }

    function _parseDate(value) {
        var dateArray = value.split('-');
        if (dateArray.length != 3) {
            console.error(("_parseDate error not 3 parts"))
        }
        var aDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return aDate;
    }


})();

