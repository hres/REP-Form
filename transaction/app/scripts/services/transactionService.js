/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionService', ['dataLists', 'services'])
})();


(function () {
    'use strict';
    angular
        .module('transactionService')
        .factory('TransactionService', TransactionService);

    TransactionService.$inject = ['$filter', 'getCountryAndProvinces', 'getContactLists', 'TransactionLists'];

    function TransactionService($filter, getCountryAndProvinces, getContactLists, TransactionLists) {
        function TransactionService() {
            //construction logic
            var defaultTransactionData = {
                dataChecksum: "",
                // enrolmentVersion: "0.0",
                dateSaved: "",
                //applicationType: "NEW",
                softwareVersion: "1.0.0",
                isEctd: "Y",
                ectd: {
                    companyId: "",
                    dossierId: "",
                    dossierName: "",
                    lifecycleRecord: []
                },
                isSolicited: "",
                solicitedRequester: "",
                projectManager1: "",
                projectManager2: "",
                isActivityChanges: "Y",
                // sameCompany: "N",
                companyName: "",
                // sameAddress: "N", //this may no longer be needed
                activityAddress: _createAddressModel(),
                sameContact: false,
                activityContact: _createContactModel()
                // regulatorySubmissionContact: [],
            };
            angular.extend(this._default, defaultTransactionData);
            this.rootTag = "TRANSACTION_ENROL";
            this.currSequence = 0;
        }

        TransactionService.prototype = {
            _default: {},
            //TODO update

            getRootTag: function () {

                return ("TRANSACTION_ENROL")
            },
            /**
             * ngDoc method- mapping from the transaction file json object to the internal representation
             * @param jsonObj the json object generated from the file
             */
            transformFromFileObj: function (jsonObj) {

                var transactionInfo = this.getTransactionInfo(jsonObj[this.rootTag]);
                this._default = {};
                this._default = transactionInfo;
            },
            //TODO transaction relevant
            /**
             * @ngdoc transforms the object model to the compatible file JSON objecct
             * @param jsonObj
             * @returns json object compatible with the xml schema
             * */
            transformToFileObj: function (jsonObj) {
                //transform back to needed
                var today = _getToday();
                var resultJson = {
                    TRANSACTION_ENROL: {
                        template_type: "PHARMA",
                        date_saved: today,
                        software_version: "1.0.0",
                        data_checksum: jsonObj.dataChecksum,
                        is_ectd: jsonObj.isEctd
                    }
                };
                var ectd = this._transformEctdToFile(jsonObj.ectd);
                resultJson.TRANSACTION_ENROL.ectd = ectd;
                resultJson.TRANSACTION_ENROL.is_solicited = jsonObj.isSolicited;
                resultJson.TRANSACTION_ENROL.solicited_requester = "";
                if (jsonObj.solicitedRequester) {
                    resultJson.TRANSACTION_ENROL.solicited_requester = {
                        _label_en: jsonObj.solicitedRequester.en,
                        _label_fr: jsonObj.solicitedRequester.en,
                        __text: jsonObj.solicitedRequester.id
                    }
                }
                resultJson.TRANSACTION_ENROL.regulatory_project_manager1 = jsonObj.projectManager1;
                resultJson.TRANSACTION_ENROL.regulatory_project_manager2 = jsonObj.projectManager2;
                resultJson.TRANSACTION_ENROL.is_activity_changes = jsonObj.isActivityChanges;
                //resultJson.TRANSACTION_ENROL.same_regulatory_company = jsonObj.sameCompany === true ? 'Y' : 'N';
                resultJson.TRANSACTION_ENROL.company_name = jsonObj.companyName;
                /* resultJson.TRANSACTION_ENROL.same_regulatory_address = jsonObj.sameAddress === true ? 'Y' : 'N'; //this may no longer be needed*/
                resultJson.TRANSACTION_ENROL.regulatory_activity_address = _mapAddressToOutput(jsonObj.activityAddress);
                /* resultJson.TRANSACTION_ENROL.same_regulatory_contact = jsonObj.sameCompany === true ? 'Y' : 'N'; //this may no longer be needed*/
                resultJson.TRANSACTION_ENROL.regulatory_activity_contact = _mapContactToOutput(jsonObj.activityContact);
                resultJson.TRANSACTION_ENROL.same_regulatory_contact = jsonObj.sameContact === true ? 'Y' : 'N'; //this may no longer be needed
                return (resultJson);
            },


            /**
             *
             * @param jsonObj the json object to convert
             * @returns {{}}
             * @private
             */
            _transformEctdToFile: function (jsonObj) {

                var ectd = {};
                ectd.company_id = jsonObj.companyId;
                ectd.dossier_id = jsonObj.dossierId;
                ectd.dossier_name = jsonObj.dossierName;
                ectd.lifecycle_record = this._mapLifecycleListToOutput(jsonObj.lifecycleRecord);
                return (ectd);
            },
            _transformEctdFromFile: function (model, jsonObj) {
                model.ectd = _getEmptyEctdSection();
                if (model.isEctd) {
                    model.ectd.companyId = jsonObj.company_id;
                    model.ectd.dossierId = jsonObj.dossier_id;
                    model.ectd.dossierName = jsonObj.dossier_name;
                    model.ectd.lifecycleRecord = this._mapLifecycleList(jsonObj.lifecycle_record);
                }
            },

            getModelInfo: function () {
                return this._default;
            },
            /**
             * @ngdoc method- transforms the file json to a model object
             */
            getTransactionInfo: function (jsonObj) {
                if (!jsonObj) {
                    return this._default;
                }
                var model = _getEmptyTransactionModel();
                model.dateSaved = jsonObj.date_saved;

                model.dataChecksum = jsonObj.data_checksum;
                model.isEctd = jsonObj.is_ectd;
                model.isSolicited = jsonObj.is_solicited;
                model.solicitedRequester = "";
                if (jsonObj.solicited_requester) {
                    getContactLists.getInternalContacts().then(function(data) {
                        model.solicitedRequester = $filter('filter')(data, {id: jsonObj.solicited_requester.__text})[0];
                    })
                }
                model.projectManager1 = jsonObj.regulatory_project_manager1;
                model.projectManager2 = jsonObj.regulatory_project_manager2;
                model.isActivityChanges = jsonObj.is_activity_changes;
                //model.sameCompany = jsonObj.same_regulatory_company === 'Y';
                model.companyName = jsonObj.company_name;
                //model.sameAddress = jsonObj.same_regulatory_address === 'Y';
                //reg address
                model.activityContact = _transformContactFromFileObj(jsonObj.regulatory_activity_contact);
                model.sameContact = jsonObj.same_regulatory_contact === 'Y';
                model.activityAddress = _transformAddressFromFileObj($filter, getCountryAndProvinces, jsonObj.regulatory_activity_address);
                this._transformEctdFromFile(model, jsonObj.ectd);
                return model;
            },
            getNewTransaction: function (isEctd) {
                var model = _createLifeCycleModel();
                var sequenceNum = this.getNextSequenceNumber(); //always get it
                if (isEctd) {
                    model.sequence = sequenceNum;
                } else {
                    model.sequence = "";
                }
                return model;
            },
            _setSequenceNumber: function (value) {
                if (!value)return;
                var converted = parseInt(value);
                if (converted > this.currSequence) {
                    this.currSequence = converted;
                }
            },
            getNextSequenceNumber: function () {

                var seqText = "" + this.currSequence;
                var pad = 4 - seqText.length;
                var padText = "";
                for (var i = 0; i < pad; i++) {
                    padText = padText + "0";
                }
                seqText = padText + seqText;
                //starts at sequence zero so update after selection
                this.currSequence++;
                return (seqText);
            },
            deprecateSequenceNumber: function () {
                this.currSequence--;
            },
            _mapLifecycleList: function (jsonObj) {
                var result = [];
                if (!jsonObj) return result;
                if (!(jsonObj instanceof Array)) {
                    //make it an array, case there is only one record
                    jsonObj = [jsonObj]
                }
                for (var i = 0; i < jsonObj.length; i++) {
                    var record = _transformLifecycleRecFromFileObj(jsonObj[i],$filter,TransactionLists);

                    result.push(record);
                }
                this._setSequenceNumber(jsonObj.length);
                return result
            },
            _mapLifecycleListToOutput: function (jsonObj) {
                var result = [];
                if (!jsonObj) return result;
                if (!(jsonObj instanceof Array)) {
                    //make it an array, case there is only one record
                    jsonObj = [jsonObj]
                }


                for (var i = 0; i < jsonObj.length; i++) {
                    var record = _mapLifecycleRecToOutput(jsonObj[i]);
                    if (jsonObj.length == 1) {
                        return (record);
                    }
                    result.push(record);
                }
                return result
            },

            resetEctdSection: function () {

                if (this._default.hasOwnProperty('ectd')) {

                    this._default.ectd.companyId = "";
                    this._default.ectd.dossierId = "";
                    this._default.ectd.dossierName = "";

                    if (this._default.ectd.lifecycleRecord && this._default.ectd.lifecycleRecord > 0) {
                        this._default.ectd.lifecycleRecord = [this._default.ectd.lifecycleRecord[0]];
                    }
                    //this._default.ectd = _getEmptyEctdSection();
                }
            }
        };
        // Return a reference to the object
        return TransactionService;
    }

    /**
     * TODO dprecated Maps the file json object to the internal data model of the REP contacts
     * @param jsonObj
     * @returns an array of contacts. Empty if there are none
     * @private
     */
    function _mapRegulatoryContactList(jsonObj) {
        var result = [];
        if (!jsonObj) return list;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }

        for (var i = 0; i < jsonObj.length; i++) {
            result.push(_transformRepContactFromFileObj(jsonObj[i]));
        }
        return (result)
    }


    /**
     * @ngdoc method Maps a lifecycle record file object to the internal data model
     * @param lifecycleObj- the json file object to map
     * @returns {jsonObj}
     * @private
     */
    function _transformLifecycleRecFromFileObj(lifecycleObj, $filter,TransactionLists) {
        var lifecycleRec = _createLifeCycleModel();
        lifecycleRec.sequence = lifecycleObj.sequence_number;
        lifecycleRec.dateFiled = lifecycleObj.date_filed;
        lifecycleRec.controlNumber = lifecycleObj.control_number;

        lifecycleRec.activityType = "";
        if (lifecycleObj.sequence_activity_type) {
            lifecycleRec.activityType = $filter('filter')(TransactionLists.getActivityTypes(), {id: lifecycleObj.sequence_activity_type.__text})[0];
            lifecycleRec.activityTypeDisplay=lifecycleRec.activityType.id;
        }
        lifecycleRec.descriptionValue = lifecycleObj.sequence_description_value;
        lifecycleRec.startDate = lifecycleObj.sequence_from_date;
        lifecycleRec.endDate = lifecycleObj.sequence_to_date;
        lifecycleRec.details = lifecycleObj.sequence_details;
        lifecycleRec.version = lifecycleObj.sequence_version;
        lifecycleRec.year = lifecycleObj.sequence_year;
        lifecycleRec.sequenceConcat = lifecycleObj.sequence_concat;
        return (lifecycleRec);
    }


    function _mapLifecycleRecToOutput(lifecycleObj) {
        var lifecycleRec = {};
        lifecycleRec.sequence_number = lifecycleObj.sequence;
        lifecycleRec.date_filed = lifecycleObj.dateFiled;
        lifecycleRec.control_number = lifecycleObj.controlNumber;
        lifecycleRec.sequence_activity_type = "";
        if (lifecycleObj.activityType) {
            lifecycleRec.sequence_activity_type = {
                _label_en: lifecycleObj.activityType.en,
                _label_fr: lifecycleObj.activityType.fr,
                __text: lifecycleObj.activityType.id
            }
        }

        lifecycleRec.sequence_description_value = lifecycleObj.descriptionValue;
        lifecycleRec.sequence_from_date = lifecycleObj.startDate;
        lifecycleRec.sequence_to_date = lifecycleObj.endDate;
        lifecycleRec.sequence_details = lifecycleObj.details;
        lifecycleRec.sequence_version = lifecycleObj.version;
        lifecycleRec.sequence_year = lifecycleObj.year;
        lifecycleRec.sequence_concat = lifecycleObj.sequenceConcat;
        return (lifecycleRec);
    }


    function _getEmptyEctdSection() {
        var ectd = {};
        ectd.companyId = "";
        ectd.dossierId = "";
        ectd.dossierName = "";
        ectd.lifecycleRecord = [];
        return ectd;
    }


    function _transformRepContactFromFileObj(repObj) {

        var repContact = _transformContactFromFileObj(repObj.rep_submission_contact);
        repContact.repRole = repObj.rep_submission_contact_role;
    }

    //TODO deprecated
    function _mapRepContactToOutput(repObj) {
        var repContact = {};
        repContact.rep_submission_contact_role = repObj.repRole;
        //deflatten the object
        repContact.rep_submission_contact = _mapContactToOutput(repObj);
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

    function _mapAddressToOutput(addressObj) {

        var address = {};
        address.street_address = addressObj.street;
        address.city = addressObj.city;
        address.province_lov = addressObj.stateList;
        address.province_text = addressObj.stateText;
        address.country = "";
        if (addressObj.country) {
            address.country =
            {
                _label_en: addressObj.country.en,
                _label_fr: addressObj.country.fr,
                __text: addressObj.country.id
            }
        }
        address.postal_code = addressObj.postalCode;
        return (address);
    }

    function _transformAddressFromFileObj($filter, getCountryAndProvinces, addressObj) {
        var address = {};
        address.street = addressObj.street_address;
        address.city = addressObj.city;
        address.stateList = addressObj.province_lov;
        address.stateText = addressObj.province_text;
        address.country = "";
        if (addressObj.country.__text) {
            address.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: addressObj.country.__text})[0];
            address.countryDisplay = addressObj.country.id;
        }

        address.postalCode = addressObj.postal_code;
        return (address);
    }

    function _createLifeCycleModel() {
        var defaultRecord = {
            "sequence": "0000",
            "dateFiled": "",
            "controlNumber": "",
            "activityType": "",
            activityTypeDisplay: "",
            "descriptionValue": "",
            "startDate": "",
            "endDate": "",
            "details": "",
            "version": "",
            "sequenceConcat": ""
        };
        //TODO get next sequence number
        return defaultRecord;
    }

    //TODO make a standard service
    function _createAddressModel() {
        return (
        {
            street: "",
            city: "",
            stateList: "",
            stateText: "",
            country: {"id": "", "en": "", "fr": ""},
            countryDisplay: "",
            "postalCode": ""
        }
        )
    }

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

    function _getToday() {
        var d = new Date();
        var isoDate = d.getFullYear() + '-'
            + pad(d.getMonth() + 1) + '-'
            + pad(d.getDate());
        return (isoDate);
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
    }
    //todo deprecated
    function _createRepContact() {

        var contact = _createContactModel();
        contact.repRole = "";
        return contact
    }

    function _getEmptyTransactionModel() {
        var defaultTransactionData = {
            dataChecksum: "",
            dateSaved: "",
            softwareVersion: "1.0.0",
            isEctd: "Y",
            ectd: {
                companyId: "",
                dossierId: "",
                dossierName: "",
                lifecycleRecord: []
            },
            isSolicited: "",
            solicitedRequester: "",
            projectManager1: "",
            projectManager2: "",
            isActivityChanges: "Y",
            companyName: "",
            activityAddress: _createAddressModel(),
            sameContact: false,
            activityContact: _createContactModel()
        };
        return defaultTransactionData;
    }

})();
