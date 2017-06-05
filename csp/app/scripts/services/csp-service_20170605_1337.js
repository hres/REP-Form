/**
 * Created by dkilty on 04/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspService', ['hpfbConstants', 'dataLists', 'cspDataModule']);
})();

(function () {
    'use strict';
    angular
        .module('cspService')
        .factory('CspService', CspService);

    CspService.$inject = ['$filter', 'CANADA', 'NO', 'YES', 'PHARMA_TYPE', 'getCountryAndProvinces', 'cspDataLists'];
    function CspService($filter, CANADA, NO, YES, PHARMA_TYPE, getCountryAndProvinces, cspDataLists) {

        function CspService() {

            var defaultCSPData = this.getEmptyInternalModel();
            this.rootTag = "CERTIFICATE_SUPPLEMENTARY_PROTECTION";
            this.billingType = "BILLING";
            this.applicantType = "APPLICANT";
            angular.extend(this._default, defaultCSPData);
        }


        CspService.prototype._default = {};

        CspService.prototype.getRootTag = function () {
            return (this.rootTag);
        };
        CspService.prototype.getModelInfo = function () {
            return this._default;
        };

        /**
         * Transforms the internal data model to the external data model
         * i.e. creates the data model for file write
         *
         * @param jsonObj
         */
        CspService.prototype.transformToFileObj = function (jsonObj) {
            if (!jsonObj) return null;
            var model = {};
            var rootTag = this.getRootTag();
            model[rootTag] = {};
            model[rootTag] = this.createEmptyExternalModel();

            model[rootTag].template_type = PHARMA_TYPE;
            model[rootTag].enrolment_version = jsonObj.enrolmentVersion;
            model[rootTag].date_saved = $filter('date')(jsonObj.dateSaved, "yyyy-MM-dd");
            model[rootTag].software_version = "1.0.0";
            model[rootTag].data_checksum = "";
            var hcOnly = model[rootTag].health_canada_only;
            var intHcOnly = jsonObj.healthCanadaOnly;
            if (intHcOnly.companyId) {
                hcOnly.company_id = intHcOnly.companyId;
            }
            if (intHcOnly.applicationId) {
                hcOnly.application_id = intHcOnly.applicationId;
            }
            var date = $filter('date')(intHcOnly.dateReceived, "yyyy-MM-dd");
            if (date) {
                hcOnly.date_received = date;
            }
            if (intHcOnly.hcNotes) {
                hcOnly.hc_notes = intHcOnly.hcNotes;
            }
            //application info mapping
            var extInfo = model[rootTag].application_info;
            var intInfo = jsonObj.applicationInfo;
            if (intInfo.controlNumber) {
                extInfo.control_number = intInfo.controlNumber;
            }
            if (intInfo.drugUse) {
                extInfo.drug_use = intInfo.drugUse;
            }
            if (intInfo.timeApplication) {
                extInfo.time_application = intInfo.timeApplication;
            }
            if (intInfo.medicinalIngredient) {
                extInfo.medicinal_ingredient = intInfo.medicinalIngredient;
            }
            if (intInfo.applicantStatement) {
                extInfo.applicant_statement = intInfo.applicantStatement;
            }
            //patent info
            var extPatent = extInfo.patent_info;
            var intPatent = jsonObj.patent;
            if (intPatent.patentNumber) {
                extPatent.patent_number = intPatent.patentNumber;
            }
            date = $filter('date')(intPatent.filingDate, "yyyy-MM-dd");
            if (date) {
                extPatent.filing_date = date;
            }
            date = $filter('date')(intPatent.grantedDate, "yyyy-MM-dd");
            if (date) {
                extPatent.granted_date = date;
            }
            date = $filter('date')(intPatent.expiryDate, "yyyy-MM-dd");
            if (date) {
                extPatent.expiry_date = date;
            }
            var extTimely = model[rootTag].timely_submission_info;
            var intTimely = jsonObj.timelySubmission;
            if (intTimely.submissionStatement) {
                extTimely.timely_submission_statement = intTimely.submissionStatement;
            }
            date = $filter('date')(intTimely.approvalDate, "yyyy-MM-dd");
            if (date) {
                extTimely.marketing_application_date = date;
            }
            //get the marketing country
            if (intTimely.country) {
                extTimely.marketing_country = {
                    _label_en: intTimely.country.en,
                    _label_fr: intTimely.country.fr,
                    __text: intTimely.country.id
                }
            }
            var extPayment = model[rootTag].advanced_payment;
            var intPayment = jsonObj.payment;
            if (intPayment.advancedPaymentType) {
                extPayment.advanced_payment_type = intPayment.advancedPaymentType;
            }
            if (intPayment.advancedPaymentFee) {
                extPayment.advanced_payment_fee = intPayment.advancedPaymentFee;
            }
            extPayment.advanced_payment_ack = intPayment.ackPaymentSubmit === true ? YES : NO;
            var extCertification = model[rootTag].certification;
            var intCertification = jsonObj.certification;
            if (intCertification.givenName) {
                extCertification.given_name = intCertification.givenName;
            }
            if (intCertification.initials) {
                extCertification.initials = intCertification.initials;
            }
            if (intCertification.surname) {
                extCertification.surname = intCertification.surname;
            }
            if (intCertification.title) {
                extCertification.job_title = intCertification.title;
            }
            if (intCertification.dateSigned) {
                extCertification.date_signed = $filter('date')(intCertification.dateSigned, "yyyy-MM-dd");
            }
            //applicant and billing information
            model[rootTag].applicant = this._transformApplicantInfoForOutput(jsonObj.applicant);

            return model;
        };
        /***
         * Transform to the internal data model
         * @param jsonObj
         * @returns {*}
         */
        CspService.prototype.transformFromFileObj = function (inputJsonObj) {
            var resultJson = this.getEmptyInternalModel();
            var jsonObj = inputJsonObj[this.rootTag];
            resultJson.applicant = this._mapApplicantToInternal(jsonObj.applicant);
            //health Canada Only Section
            resultJson.enrolmentVersion = jsonObj.enrolment_version;
            resultJson.dateSaved = (jsonObj.date_saved); //not a date field, no need to parse
            resultJson.healthCanadaOnly.companyId = jsonObj.health_canada_only.company_id;
            resultJson.healthCanadaOnly.dateReceived = _parseDate(jsonObj.health_canada_only.date_received);
            resultJson.healthCanadaOnly.applicationId = jsonObj.health_canada_only.application_id;
            resultJson.healthCanadaOnly.hcNotes = jsonObj.health_canada_only.hc_notes;
            resultJson.patent.patentNumber = jsonObj.application_info.patent_info.patent_number;
            resultJson.patent.filingDate = _parseDate(jsonObj.application_info.patent_info.filing_date);
            resultJson.patent.grantedDate = _parseDate(jsonObj.application_info.patent_info.granted_date);
            resultJson.patent.expiryDate = _parseDate(jsonObj.application_info.patent_info.expiry_date);
            resultJson.applicationInfo.controlNumber = jsonObj.application_info.control_number;
            resultJson.applicationInfo.drugUse = jsonObj.application_info.drug_use;
            resultJson.applicationInfo.timeApplication = jsonObj.application_info.time_application;
            resultJson.applicationInfo.medicinalIngredient = jsonObj.application_info.medicinal_ingredient;
            resultJson.applicationInfo.applicantStatement = jsonObj.application_info.applicant_statement;
            resultJson.timelySubmission.submissionStatement = jsonObj.timely_submission_info.timely_submission_statement;
            resultJson.timelySubmission.approvalDate = _parseDate(jsonObj.timely_submission_info.marketing_application_date);
            if (jsonObj.timely_submission_info.marketing_country) {
                resultJson.timelySubmission.country = $filter('filter')(cspDataLists.getMarketingCountries(), {id: jsonObj.timely_submission_info.marketing_country.__text})[0];
                //resultJson.timelySubmission.country = jsonObj.timely_submission_info.marketing_country;
            }
            //resultJson.timelySubmission.otherCountry = jsonObj.timely_submission_info.marketing_country_eu;
            if (jsonObj.advanced_payment.advanced_payment_fee) {
                resultJson.payment.advancedPaymentFee = Number(jsonObj.advanced_payment.advanced_payment_fee);
            }
            resultJson.payment.advancedPaymentType = jsonObj.advanced_payment.advanced_payment_type;
            resultJson.payment.ackPaymentSubmit = jsonObj.advanced_payment.advanced_payment_ack === YES;
            resultJson.certification.givenName = jsonObj.certification.given_name;
            resultJson.certification.initials = jsonObj.certification.initials;
            resultJson.certification.surname = jsonObj.certification.surname;
            resultJson.certification.title = jsonObj.certification.job_title;
            resultJson.certification.dateSigned = _parseDate(jsonObj.certification.date_signed);

            this._default = resultJson;
            return resultJson;
        };


        CspService.prototype.createApplicantRecord = function (isApplicant) {
            var record = this.createContactRecord();
            record.applicantName = "";
            record.isBillingDifferent = false;
            if (!isApplicant) {
                record.role.applicant = false;
                record.role.billing = true;
            } else {
                record.role.applicant = true;
                record.role.billing = true;
            }

            return record;
        };
        CspService.prototype.createContactRecord = function () {
            var applicant = {};
            applicant.role = {
                applicant: true,
                billing: true
            };
            applicant.contact = {
                salutation: "",
                givenName: "",
                surname: "",
                initials: "",
                title: "",
                phone: "",
                phoneExt: "",
                fax: "",
                email: ""
            };
            applicant.address = {
                street: "",
                city: "",
                stateList: "",
                stateText: "",
                country: {
                    id: "",
                    fr: "",
                    en: ""
                },
                postalCode: ""

            };
            return applicant
        };
        /**
         * Adds an applicant to the model. Determines if it should be a billing applicant
         * and updates the roles as appropiate
         */
        CspService.prototype.addApplicantToModel = function () {
            if (!this._default.applicant) {
                this._default.applicant = [];
            }
            var numberRecords = this._default.applicant.length;
            if (numberRecords === 0) {
                //this should never happen.....
                this._default.applicant.push(this.createApplicantRecord(true));
            } else if (numberRecords == 1) {
                this._default.applicant[0].role.applicant = true;
                this._default.applicant[0].role.billing = false;
                this._default.applicant.push(this.createApplicantRecord(false));
            } else {
                console.warn("Tried to add an applicant when there were 2 records")
            }
        };
        /**
         * Deletes the billing address only. Checks each record for billing role to be true
         */
        CspService.prototype.deleteApplicant = function () {
            if (!this._default.applicant) {
                this._default.applicant = [];
            }
            var numberRecords = this._default.applicant.length;
            if (numberRecords === 0 || numberRecords === 1) {
                //console.warn("Tried to delete applicant when there was only 1 or zero")
                //this case can happen as a record could be doing this blind
                return;
            } else {
                for (var i = 0; i < numberRecords; i++) {
                    var record = this._default.applicant[i];
                    if (record.role.billing === true) {
                        this._default.applicant.splice(i, 1);
                    }
                }
                //update the remaining record to have both the billing and applicant roles
                this._default.applicant[0].role.applicant = true;
                this._default.applicant[0].role.billing = true;
            }
        };
        CspService.prototype.getAdvancedPaymentTypes = function () {
            return ([
                'FINANCIAL',
                'CHEQUE',
                'CREDIT_CARD',
                'CREDIT',
                'WIRE'
            ]);
        };
        CspService.prototype.getDrugUses = function () {
            return ([
                "HUMAN",
                "VETERINARY"
            ]);
        };

        CspService.prototype.getEmptyInternalModel = function () {
            var defaultCSPData = {};
            defaultCSPData.dataChecksum = "";
            defaultCSPData.enrolmentVersion = "0.0";
            defaultCSPData.dateSaved = "";
            defaultCSPData.softwareVersion = "";
            //initial applicant is always Canada
            defaultCSPData.applicant = [this.createApplicantRecord(true,true)];
            var canRecord=$filter('filter')(getCountryAndProvinces.getCountries(), {id: CANADA})[0];
            if(canRecord){
                defaultCSPData.applicant[0].address.country = canRecord;
            }else{
                //TODO getting a race condition with the list load, workaround
                console.warn("race condition with country list");
                defaultCSPData.applicant[0].address.country = {id:CANADA,en:"Canada",fr:"Canada"};
            }
            defaultCSPData.healthCanadaOnly = {};
            defaultCSPData.healthCanadaOnly.companyId = "";
            defaultCSPData.healthCanadaOnly.dateReceived = "";
            defaultCSPData.healthCanadaOnly.applicationId = "";
            defaultCSPData.healthCanadaOnly.hcNotes = "";
            defaultCSPData.patent = {};
            defaultCSPData.patent.patentNumber = "";
            defaultCSPData.patent.filingDate = "";
            defaultCSPData.patent.grantedDate = "";
            defaultCSPData.patent.expiryDate = "";
            defaultCSPData.applicationInfo = {};
            defaultCSPData.applicationInfo.controlNumber = "";
            defaultCSPData.applicationInfo.drugUse = "";
            defaultCSPData.applicationInfo.timeApplication = "";
            defaultCSPData.applicationInfo.medicinalIngredient = "";
            defaultCSPData.applicationInfo.applicantStatement = "";
            defaultCSPData.timelySubmission = {};
            defaultCSPData.timelySubmission.submissionStatement = "";
            defaultCSPData.timelySubmission.approvalDate = "";
            defaultCSPData.timelySubmission.country = "";
            // defaultCSPData.timelySubmission.otherCountry = "";
            defaultCSPData.payment = {};
            defaultCSPData.payment.advancedPaymentFee = null;
            defaultCSPData.payment.advancedPaymentType = "";
            defaultCSPData.payment.ackPaymentSubmit = false;
            defaultCSPData.certification = {};
            defaultCSPData.certification.givenName = "";
            defaultCSPData.certification.initials = "";
            defaultCSPData.certification.surname = "";
            defaultCSPData.certification.title = "";
            defaultCSPData.certification.dateSigned = "";
            return (defaultCSPData);
        };
        CspService.prototype.createEmptyExternalModel = function () {
            var defaultCSPData = {};
            defaultCSPData.template_type = "";
            defaultCSPData.data_checksum = "";
            defaultCSPData.enrolment_version = "";
            defaultCSPData.date_saved = "";
            defaultCSPData.software_version = "";
            defaultCSPData.data_checksum = "";
            defaultCSPData.health_canada_only = {};
            defaultCSPData.applicant = [];
            var hc = defaultCSPData.health_canada_only;
            hc.company_id = "";
            hc.application_id = "";
            hc.date_received = "";
            hc.hc_notes = "";
            defaultCSPData.application_info = {};
            defaultCSPData.application_info.patent_info = {};
            var patent = defaultCSPData.application_info.patent_info;
            patent.patent_number = "";
            patent.filing_date = "";
            patent.granted_date = "";
            patent.expiry_date = "";
            var info = defaultCSPData.application_info;
            info.control_number = "";
            info.drug_use = "";
            info.time_application = "";
            info.medicinal_ingredient = "";
            info.applicant_statement = "";
            defaultCSPData.timely_submission_info = {};
            var timely = defaultCSPData.timely_submission_info;
            timely.timely_submission_statement = "";
            timely.marketing_application_date = "";
            timely.marketing_country = "";
            // timely.marketing_country_eu = "";
            defaultCSPData.advanced_payment = {};
            var payment = defaultCSPData.advanced_payment;
            payment.advanced_payment_type = null;
            payment.advanced_payment_fee = "";
            payment.advanced_payment_ack = NO;

            defaultCSPData.certification = {};
            var cert = defaultCSPData.certification;
            cert.given_name = "";
            cert.initials = "";
            cert.surname = "";
            cert.job_title = "";
            cert.date_signed = "";
            return (defaultCSPData);
        };
        /**
         * Creates an empty applicant record that is meets the XML schema standard
         * @returns {{}}
         */
        CspService.prototype.createExternalApplicantRecord = function () {
            var record = {};
            record.billing_role = NO;
            record.applicant_role = NO;
            record.applicant_name = "";
            record.contact = {};
            record.contact.given_name = "";
            record.contact.initials = "";
            record.contact.surname = "";
            record.contact.job_title = "";
            // record.contact.language_correspondance="";
            record.contact.phone_num = "";
            record.contact.phone_ext = "";
            record.contact.fax_num = "";
            record.contact.email = "";
            record.address = {};
            record.address.street_address = "";
            record.address.city = "";
            record.address.province_lov = "";
            record.address.province_text = "";
            record.address.country = "";
            record.address.postal_code = "";
            return record;
        };
        CspService.prototype._transformApplicantInfoForOutput = function (inputJson) {

            var outputArray = [];
            if (!(inputJson instanceof Array)) {
                inputJson = [inputJson];
            }
            //should never happen error catch
            if (inputJson.length == 0) {
                outputArray.push(this.createExternalApplicantRecord());
                return;
            }
            for (var i = 0; i < inputJson.length; i++) {
                var record = this.createExternalApplicantRecord();
                /*record.role.applicant = externalRecord.applicant_role;
                 record.role.billing = externalRecord.billing_role;*/
                record.billing_role = inputJson[i].role.billing === true ? YES : NO;
                record.applicant_role = inputJson[i].role.applicant === true ? YES : NO;
                if (inputJson[i].applicantName) {
                    record.applicant_name = inputJson[i].applicantName;
                }
                if (inputJson[i].contact.salutation) {
                    record.contact.salutation = inputJson[i].contact.salutation;
                }
                if (inputJson[i].contact.givenName) {
                    record.contact.given_name = inputJson[i].contact.givenName;
                }
                if (inputJson[i].contact.initials) {
                    record.contact.initials = inputJson[i].contact.initials;
                }
                if (inputJson[i].contact.surname) {
                    record.contact.surname = inputJson[i].contact.surname;
                }
                if (inputJson[i].contact.language) {
                    record.contact.language_correspondance = inputJson[i].contact.language;
                }
                if (inputJson[i].contact.title) {
                    record.contact.job_title = inputJson[i].contact.title;
                }
                if (inputJson[i].contact.phone) {
                    record.contact.phone_num = inputJson[i].contact.phone;
                }
                record.contact.phone_ext = inputJson[i].contact.phoneExt;
                if (inputJson[i].contact.fax) {
                    record.contact.fax_num = inputJson[i].contact.fax;
                }
                if (inputJson[i].contact.email) {
                    record.contact.email = inputJson[i].contact.email;
                }
                if (inputJson[i].address.street) {
                    record.address.street_address = inputJson[i].address.street;
                }
                if (inputJson[i].address.city) {
                    record.address.city = inputJson[i].address.city;
                }
                if (inputJson[i].address.stateList) {
                    record.address.province_lov = inputJson[i].address.stateList;
                }
                if (inputJson[i].address.stateText) {
                    record.address.province_text = inputJson[i].address.stateText;
                }

                if (inputJson[i].address.country) {
                    record.address.country = {
                        _label_en: inputJson[i].address.country.en,
                        _label_fr: inputJson[i].address.country.fr,
                        __text: inputJson[i].address.country.id
                    };
                }
                if (inputJson[i].address.postalCode) {
                    record.address.postal_code = inputJson[i].address.postalCode;
                }
                outputArray.push(record);
            }
            return outputArray;
        };

        /**
         * Copies the values from an external Applicant data JSON data model to an internal one
         * i.e. file load scenario
         * @param inputJson
         * @returns {Array}
         * @private
         */
        CspService.prototype._mapApplicantToInternal = function (inputJson) {
            var result = [];
            if (!inputJson) return result; //should never happen

            if (!(inputJson instanceof Array)) {

                inputJson = [inputJson];
            }
            for (var i = 0; i < inputJson.length; i++) {
                var record = this.createApplicantRecord(true);
                var externalRecord = inputJson[i];
                record.role.applicant = externalRecord.applicant_role === YES;
                record.role.billing = externalRecord.billing_role === YES;
                //this is being managed only on the internal data model
                if (record.role.applicant && !record.role.billing) {
                    record.isBillingDifferent = true;
                    record.address.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: CANADA})[0];
                } else if (record.role.billing) {
                    if (externalRecord.address && externalRecord.address.country && externalRecord.address.country.__text) {
                        record.address.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: externalRecord.address.country.__text})[0];
                    } else {
                        //empty record case
                        record.address.country = {id: "", en: "", fr: ""}
                    }
                }else{
                    console.warn("no applicant role, country default")
                    record.address.country = {id: "", en: "", fr: ""}
                }
                record.applicantName = externalRecord.applicant_name;
                record.contact.salutation = externalRecord.contact.salutation;
                record.contact.givenName = externalRecord.contact.given_name;
                record.contact.surname = externalRecord.contact.surname;
                record.contact.initials = externalRecord.contact.initials;
                record.contact.title = externalRecord.contact.job_title;
                record.contact.language = externalRecord.contact.language_correspondance;
                record.contact.phone = externalRecord.contact.phone_num;
                record.contact.phoneExt = externalRecord.contact.phone_ext;
                record.contact.fax = externalRecord.contact.fax_num;
                record.contact.email = externalRecord.contact.email;
                record.address.street = externalRecord.address.street_address;
                record.address.city = externalRecord.address.city;
                record.address.stateList = externalRecord.address.province_lov;
                record.address.stateText = externalRecord.address.province_text;


                record.address.postalCode = externalRecord.address.postal_code;
                result.push(record);
            }
            return result;
        };


        return CspService;
    }

    function _parseDate(value) {
        if (!value) return null;
        var dateArray = value.split('-');
        if (dateArray.length != 3) {
            console.warn("_parseDate error not 3 parts: " + value);
        }
        var aDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return aDate;
    }
})();
