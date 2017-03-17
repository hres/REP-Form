angular.module("translations", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("en", {
  "CITY": "City",
  "COUNTRY": "Country",
  "PROVINCE": "Province",
  "POSTAL": "Postal Code",
  "PROVSTATE": "Province or State",
  "STATE": "State",
  "STREET": "Street Address",
  "ZIP": "Zip Code",
  "COMPANY": "Company",
  "ADD_ADDRESS": "Add Address",
  "CITY_TOWN": "City or Town",
  "SAVE_ADDR": "Save Address",
  "DELETE_ADDR": "Delete Address",
  "ADDR_INFO": "Address Information",
  "ADDR_DETAILS": "Address Details",
  "ADDR_ROLE_LEGEND": "Select one or more roles for this company",
  "PRODUCTS_IMPORTED": "Imported Products",
  "PRODUCT_TYPES":"Products imported by this Company",
  "ALL_PRODUCTS": "All Products",
  "SELECTED_PRODUCTS":"Some Products",
  "IDENTIFY_PRODUCTS": "Provide the Dossier Identifiers for the products that are imported by this Company",
  "ADD_DOSSIER_ID":"Add Dossier Id",
  "IMPORTER_NONCDN":"Please ensure you indicate a Canadian Importer"
});

$translateProvider.translations("fr", {
  "CITY": "Ville",
  "COUNTRY": "Pays",
  "PROVINCE": "Province",
  "POSTAL": "Code postal",
  "PROVSTATE": "Province ou état",
  "STATE": "Etat",
  "STREET": "Rue",
  "ZIP": "Zip Code",
  "COMPANY": "Compagnie",
  "ADD_ADDRESS": "Ajouter Addresse",
  "CITY_TOWN": "Ville",
  "SAVE_ADDR": "Save Address",
  "DELETE_ADDR": "Supprimer Addresse",
  "ADDR_INFO": "Informations d'adresses",
  "ADDR_DETAILS": "Détails de l'adresse",
  "ADDR_ROLE_LEGEND": "fr_Select one or more roles for this company",
  "IMPORTER_NONCDN":"There should be a Canadian Importer when the Manufacturer / Sponsor is not a Canadian Address"

});

$translateProvider.translations("en", {
  "APPL_STATUS": "Application Status",
  "ENROL_VERSION": "Enrolment Version",
  "DATE_SAVED": "Date Last Saved",
  "AMEND_ENROL":  "Amend Enrolment",
  "AMEND_MSG":"Edit records to be amended below."
});

$translateProvider.translations("fr", {
  "APPL_STATUS": "fr_Application Status",
  "ENROL_VERSION": "fr_Enrolment Version",
  "DATE_SAVED": "fr_Date Last Saved",
  "AMEND_ENROL": "fr_Amend Enrolment",
  "AMEND_MSG":"fr_Edit records to be amended below."
});

$translateProvider.translations("en", {
  "FIRST_NAME": "First Name",
  "LAST_NAME": "Last Name",
  "INITIALS": "Initials",
  "LANGUAGE_CORRESPONDENCE": "Language of Correspondance",
  "JOB_TITLE": "Job Title",
  "SALUTATION": "Salutation",
  "SALUT_MR": "Mr.",
  "SALUT_MS": "Ms.",
  "SALUT_DR": "Dr.",
  "SALUT_MRS": "Mrs.",
  "ROLE_PRIMARY": "Primary",
  "ROLE_SECONDARY": "Alternate",
  "EMAIL":  "Email",
  "FAX_NUMBER": "Fax Number",
  "PHONE_EXT": "Phone Extension",
  "ROLES": "Roles",
  "PHONE_NUMBER": "Phone Number",
  "CONTACT_INFO": "Company Representative Information",
  "AMEND": "Amend",
  "REP_CONTACT":  "REP Contact",
  "ONE_ROLE": "Role",
  "CONTACT_DETAILS": "Company Representative Details",
  "ADD_CONTACT": "Add REP Contact",
  "CONTACT_ROLE_LEGEND": "Select one or more roles for this company representative",
  "ADD_REPRES": "Add Company Representative",
  "DELETE_REPRES": "Delete Company Rep.",
  "SAVE_REPRES": "Save Company Rep."
});

$translateProvider.translations("fr", {
  "FIRST_NAME": "Prénom",
  "LAST_NAME": "Nom",
  "INITIALS": "Initials",
  "LANGUAGE_CORRESPONDENCE": "Langue de Correspondance",
  "JOB_TITLE": "Job Title",
  "SALUTATION": "Titre de civilité",
  "SALUT_MR": "M.",
  "SALUT_MS": "Mme",
  "SALUT_DR": "Dr.",
  "SALUT_MRS": "Mlle",
  "ROLE_PRIMARY": "Primaire",
  "ROLE_SECONDARY": "Alterner",
  "EMAIL": "Courriel",
  "FAX_NUMBER": "Numéro de télécopieur",
  "PHONE_EXT": "Numéro de poste",
  "ADDR_ROLES":"fr_Roles",
  "PHONE_NUMBER": "Numéro de téléphone",
  "CONTACT_INFO": "fr_Company Representative Information",
  "AMEND": "fr_Amend",
  "REP_CONTACT":  "fr_REP Contact",
  "ONE_ROLE": "fr_Role",
  "CONTACT_DETAILS": "fr_Company Representative Details",
  "ADD_CONTACT": "fr_Add REP Contact",
  "CONTACT_ROLE_LEGEND": "fr_Select one or more roles for this company representative"
});

$translateProvider.translations("en", {
  "SELECT_LOAD": "Select a file to load",
  "MSG_SUCCESS_LOAD": "The file was loaded successfully",
  "MSG_ERR_JSONPARSE": "Error: there was an error parsing the working file.",
  "MSG_ERR_XMLPARSE": "Error: there was an error parsing the draft XML file.",
  "MSG_ERR_FILE_LOAD": "Error: there was a problem loading the file.",
  "MSG_ERR_FILE_TYPE": "Error: An invalid file type was selected.",
  "MSG_ERR_FORM_TYPE": "Error: the wrong form type was selected for this form.",
  "MSG_ERR_CHECKSUM_FAIL": "Error: the checksum in the file does not match the calculated checksum"
});

$translateProvider.translations("fr", {
  "SELECT_LOAD": "fr_Select a data file to load",
  "MSG_SUCCESS_LOAD": "fr_The file was loaded successfully",
  "MSG_ERR_JSONPARSE": "fr_Error: there was an error parsing the working file.",
  "MSG_ERR_XMLPARSE": "fr_Error: there was an error parsing the draft XML file.",
  "MSG_ERR_FILE_LOAD": "fr_Error: there was a problem loading the file.",
  "MSG_ERR_FILE_TYPE": "fr_Error: An invalid file type was selected.",
  "MSG_ERR_FORM_TYPE": "fr_Error: the wrong form type was selected for this form.",
  "MSG_ERR_CHECKSUM_FAIL": "fr_Error: the checksum in the file does not match the calculated checksum"
});

$translateProvider.translations("en", {
  "Y": "Yes",
  "N": "No",
  "DELETEROW": "Delete Row",
  "SELECTEDROW": "Selected Row",
  "REQUIRED": "(required)",
  "ROLES_SELECT": "Select one or more roles for this record",
  "NEW": "New",
  "AMEND": "Amend",
  "APPROVED": "Approved",
  "CLICK_TOGGLE": "Click to toggle the collapse or expand details for this address.",
  "AMEND_RECORD": "Amend Record",
  "en": "English",
  "fr": "French",
  "DISCARD_CHANGES": "Discard Changes",
  "REP_ALT": "Alternate REP contact",
  "REP_PRIM": "Primary REP contact",
  "MAILING": "Regulatory Mailing / Annual Contact",
  "BILLING": "Billing Address",
  "MANUFACT": "Manufacturer / Sponsor Mailing Address",
  "IMPORTER": "Canadian Importer Mailing Address",
  "APPROVE_FINAL": "Approve Final XML",
  "SAVE_DRAFT": "Save Draft for Filing",
  "PRIMARY": "Primary",
  "SECONDARY": "Alternate",
  "TOGGLE_EXPAND": "Click to toggle collapse or expand details of row",
  "SAVE_WORK": "Save Working Copy",
  "CONTROL_NUMBER": "Control Number",
  "REP_CONTACT_INFO": "REP Contact Information",
  "SAVE_CONTACT":"Save Contact",
  "DELETE_CONTACT":"Delete Contact",
  "COMPANY_ID": "Company Id",
  "DOSSIER_ID": "Dossier Id",
  "ERRORS":"Errors",
  "UNKNOWN": "Unknown",
  "BIOLOGIC": "Biologic",
  "PHARMACEUTICAL": "Pharmaceutical",
  "HELP_FILE_LOAD": "File Load Instructions",
  "HELP_ACTIVITY_MAIN": "Activity Instructions",
  "HELP_ACTIVITY_REP": "REP Contact Instructions",
  "CALENDAR": "Pick date from calendar",
  "HIDE_CALENDAR": "Hide Calendar (escape key)",
  "OTHER": "Other",
  "HELP_REP_CONTACT": "REP Contact Instructions",
  "OTHER_UNITS": "Units other details",
  "COMPANY_NOABBREV":"Company Name (Full legal name - no abbreviations)",
  "COPY":"Copy",
  "DELETE":"Delete",
  "SAVE_WORKING":"Save Working Copy"
});

$translateProvider.translations("fr", {
  "Y": "Oui",
  "N": "Non",
  "DELETEROW": "fr_Delete Row",
  "SELECTEDROW": "Selected Row",
  "REQUIRED": "(requis)",
  "ROLES_SELECT": "fr_Select one or more roles for this record",
  "NEW": "fr_New",
  "AMEND": "fr_Amend",
  "APPROVED": "fr_Approved",
  "CLICK_TOGGLE": "fr_Click to toggle the collapse or expand details for this address.",
  "AMEND_RECORD": "fr_Amend Record",
  "en": "Anglais",
  "fr": "Français",
  "DISCARD_CHANGES": "fr_Discard Changes",
  "REP_ALT": "fr_Alternate REP contact",
  "REP_PRIM": "fr_Primary REP contact",
  "MAILING": "Contact pour le courrier réglementaire",
  "BILLING": "fr_Billing",
  "MANUFACT": "fr_Manufacturer",
  "IMPORTER": "Importateur canadien",
  "APPROVE_FINAL": "fr_Approve Final XML",
  "PRIMARY": "fr_Primary",
  "SECONDARY": "fr_Alternate",
  "TOGGLE_EXPAND": "fr_Click to toggle collapse or expand details of row",
  "SAVE_DRAFT": "fr_Save Draft for filing",
  "CONTROL_NUMBER": "fr_Control Number",
  "REP_CONTACT_INFO": "fr_Main Contact Information",
  "SAVE_CONTACT": "fr_Save Contact",
  "DELETE_CONTACT": "fr_Delete Contact",
  "COMPANY_ID": "fr_Company Id",
  "DOSSIER_ID": "fr_Dossier Id",
  "ERRORS": "Erreurs",
  "UNKNOWN": "Inconnu",
  "BIOLOGIC": "fr_Biologic",
  "PHARMACEUTICAL": "fr_Pharmaceutical",
  "HELP_FILE_LOAD": "fr_File Load Instructions",
  "HELP_ACTIVITY_MAIN": "fr_Activity Instructions",
  "HELP_ACTIVITY_REP": "fr_REP Contact Instructions",
  "CALENDAR": "fr_Pick date from calendar",
  "HIDE_CALENDAR": "fr_Hide Calendar (escape key)",
  "OTHER": "Autre",
  "HELP_REP_CONTACT": "fr_REP Contact Instructions",
  "OTHER_UNITS": "fr_Units other details",
  "COMPANY_NOABBREV":"fr_Company Name (Full legal name - no abbreviations)",
  "COPY":"fr_Copy",
  "DELETE":"fr_Delete",
  "SAVE_WORKING":"fr_Save Working Copy"
});

$translateProvider.translations("en", {
  "MSG_ERR_MAND": "This field is required",
  "MSG_ERR_EMAIL_FORMAT": "Please enter a valid email address.",
  "MSG_ERR_ROLE": "Please select at least one role",
  "MSG_ERR_CONTACT_NUM": "All the roles have to be used for the contacts",
  "MSG_ERR_PHONE_FORMAT": "Please specify a valid phone number",
  "MSG_ERR_ALLROLE": "The roles of manufacturer, mailing, billing, and primary REP contact  have not all been selected among the list of contacts",
  "MSG_ERR_ADDRESSSROLE": "The roles of manufacturer, mailing, and billing have not all been selected among the list of addresses",
  "MSG_ERR_POSTAL": "Please specify a valid postal code.",
  "MSG_ERR_ZIP": "Please specify a valid zip code.",
  "MSG_ERR_DATE_FORMAT": "The date format is incorrect.",
  "MAILING_SEL": "Mailing Role already Selected",
  "MANUFACT_SEL": "Manufacturer Role already Selected",
  "MAIL_SEL": "Mailing Role already Selected",
  "BILLING_SEL": "Billing Role already Selected",
  "IMPORTER_SEL": "Importer Role already Selected",
  "REPPRIM_SEL": "REP Primary Role already Selected",
  "REPALT_SEL": "REP Alternate Role already Selected",
  "MSG_LENGTH_MIN5": "Please enter at least 5 characters",
  "MSG_LENGTH_6": "Please enter 6 characters.",
  "MSG_LENGTH_6NUM": "Please enter 6 digits.",
  "MSG_LENGTH_8NUM": "Please enter 8 digits.",
  "MSG_LENGTH_7": "Please enter 7 characters.",
  "MSG_LENGTH_7NUM": "Please enter 7 digits.",
  "MSG_ERR_ONE_REP": "At least one contact is required.",
  "MSG_ERR_ONE_LIFE_REC": "One lifecycle record is required.",
  "MSG_ERR_RATIONALE_SEL": "Please select at least one rationale.",
  "MSG_ERR_NOTIF_SEL": "Please select at least one notifiable change."
});

$translateProvider.translations("fr", {
  "MSG_ERR_MAND": "Ce champ est obligatoire.",
  "MSG_ERR_EMAIL_FORMAT": "Veuillez fournir une adresse électronique valide.",
  "MSG_ERR_CONTACT_NUM": "fr_All the roles have to be used for the company contacts",
  "MSG_ERR_PHONE_FORMAT": "fr_Please specify a valid phone number",
  "MSG_ERR_ALLROLE": "fr_Across the contact records, the roles of manufacturer, mailing, billing, and REP primary contact must be selected",
  "MSG_ERR_ADDRESSSROLE": "fr_The roles of manufacturer, mailing, and billing have not all been selected among the list of addresses",
  "MSG_ERR_POSTAL": "fr_Please specify a valid postal code.",
  "MSG_ERR_ZIP": "fr_Please specify a valid zip code.",
  "MSG_ERR_DATE_FORMAT": "fr_The date format is incorrect.",
  "MANUFACT_SEL": "fr_Manufacturer Role already Selected",
  "MAIL_SEL": "fr_Mailing Role already Selected",
  "BILLING_SEL": "fr_Billing Role already Selected",
  "IMPORTER_SEL": "fr_Importer Role already Selected",
  "REPPRIM_SEL": "fr_REP Primary Role already Selected",
  "REPALT_SEL": "fr_REP Alternate Role already Selected",
  "MSG_LENGTH_MIN5": "fr_Please enter at least 5 digits",
  "MSG_LENGTH_6": "fr_Please enter 6 characters.",
  "MSG_LENGTH_6NUM": "fr_Please enter 6 digits.",
  "MSG_LENGTH_8NUM": "fr_Please enter 8 digits.",
  "MSG_LENGTH_7": "fr_Please enter 7 characters.",
  "MSG_LENGTH_7NUM": "fr_Please enter 7 digits.",
  "MSG_ERR_ONE_REP": "fr_At least one contact is required.",
  "MSG_ERR_ONE_LIFE_REC": "fr_One lifecycle record is required.",
  "MSG_ERR_RATIONALE_SEL": "fr_Please select at least one rationale.",
  "MSG_ERR_NOTIF_SEL": "fr_Please select at least one notifiable change."
}
);

$translateProvider.translations("en", {
"AB":"Alberta",
"BC":"British Columbia",
"MB":"Manitoba",
"NB":"New Brunswick",
"NL":"Newfoundland and Labrador",
"NT":"Northwest Territories",
"NS":"Nova Scotia",
"NU":"Nunavut",
"ON":"Ontario",
"PE":"Prince Edward Island",
"QC":"Quebec",
"SK":"Saskatchewan",
"YT":"Yukon",
"AL":"Alabama",
"AK":"Alaska",
"AZ":"Arizona",
"AR":"Arkansas",
"CA":"California",
"CO":"Colorado",
"CT":"Connecticut",
"DE":"Delaware",
"DC":"District of Columbia",
"FL":"Florida",
"GA":"Georgia",
"HI":"Hawaii",
"ID":"Idaho",
"IL":"Illinois",
"IN":"Indiana",
"IA":"Iowa",
"KS":"Kansas",
"KY":"Kentucky",
"LA":"Louisiana",
"ME":"Maine",
"MD":"Maryland",
"MA":"Massachusetts",
"MI":"Michigan",
"MN":"Minnesota",
"MS":"Mississippi",
"MO":"Missouri",
"MT":"Montana",
"NE":"Nebraska",
"NV":"Nevada",
"NH":"New Hampshire",
"NJ":"New Jersey",
"NM":"New Mexico",
"NY":"New York",
"NC":"North Carolina",
"ND":"North Dakota",
"OH":"Ohio",
"OK":"Oklahoma",
"OR":"Oregon",
"PA":"Pennsylvania",
"RI":"Rhode Island",
"SC":"South Carolina",
"SD":"South Dakota",
"TN":"Tennessee",
"TX":"Texas",
"UT":"Utah",
"VT":"Vermont",
"VA":"Virginia",
"WA":"Washington",
"WV":"West Virginia",
"WI":"Wisconsin",
"WY":"Wyoming"
}

);

$translateProvider.translations("fr", {
"AB":"Alberta",
"BC":"Colombie-Britannique",
"PE":"Île-du-Prince-Édouard",
"MB":"Manitoba",
"NB":"Nouveau-Brunswick",
"NS":"Nouvelle-Écosse",
"NU":"Nunavut",
"ON":"Ontario",
"QC":"Québec",
"SK":"Saskatchewan",
"NL":"Terre-Neuve et Labrador",
"NT":"Territoires du Nord-Ouest",
"YT":"Yukon",
"AL":"Alabama",
"AK":"Alaska",
"AZ":"Arizona",
"AR":"Arkansas",
"CA":"Californie",
"NC":"Caroline du nord",
"SC":"Caroline du sud",
"CO":"Colorado",
"CT":"Connecticut",
"ND":"Dakota du nord",
"SD":"Dakota du sud",
"DE":"Delaware",
"DC":"District de Columbia",
"FL":"Floride",
"GA":"Géorgie",
"HI":"Hawaii",
"ID":"Idaho",
"IL":"Illinois",
"IN":"Indiana",
"IA":"Iowa",
"KS":"Kansas",
"KY":"Kentucky",
"NY":"L'état de New York",
"WA":"L'état de washington",
"LA":"Louisiane",
"ME":"Maine",
"MD":"Maryland",
"MA":"Massachusetts",
"MI":"Michigan",
"MN":"Minnesota",
"MS":"Mississippi",
"MO":"Missouri",
"MT":"Montana",
"NE":"Nebraska",
"NV":"Nevada",
"NH":"New Hampshire",
"NJ":"New Jersey",
"NM":"Nouveau-mexique",
"OH":"Ohio",
"OK":"Oklahoma",
"OR":"Oregon",
"PA":"Pennsylvanie",
"RI":"Rhode Island",
"TN":"Tennessee",
"TX":"Texas",
"UT":"Utah",
"VT":"Vermont",
"VA":"Virginie",
"WV":"Virginie-occidentale",
"WI":"Wisconsin",
"WY":"Wyoming"
});

$translateProvider.translations("en", {
  "ADD_TRANSACTION": "Add Record",
  "SEQUENCE_NUM": "Sequence Number",
  "DATE_SUBMITTED": "Date Submitted (YYYY-MM-DD)",
  "SEQUENCE_DESCRIPT": "Sequence Description",
  "IS_ACTCHANGES": "Same as Regulatory Activity Contact for this Submission?",
  "COMPANY_ID": "Company ID",
  "DOSSIER_ID": "Dossier ID",
  "DOSSIER_NAME": "Dossier Name",
  "IS_ECTD": "Is this an eCTD transaction?",
  "IS_SOLICITED": "Is this solicited information?",
  "SOLICITED_RQ": "Requester of Solicited Information",
  "SOLICITED_RQ_OTHER": "Other Requester Details",
  "REP_CONTACT_INFO": "Main Contact Information",
  "PROJ_MANAGER_NAME": "Name of Regulatory Project Manager, if known",
  "DATED": "Dated (YYYY-MM-DD)",
  "START_DATE": "Start Date (YYYY-MM-DD)",
  "END_DATE": "End Date (YYYY-MM-DD)",
  "REG_ACTIVITY": "Regulatory Activity",
  "REG_ACTIVITY_TYPE": "Regulatory Activity Type",
  "SEQUENCE_TYPE": "Sequence Description",
  "VERSION_NO": "Version No.",
  "BRIEF_DESC": "Brief Description",
  "ADMINISTRATIVE": "Administrative",
  "BENEFIT_RISK_ASSESS": "Benefit Risk Assessment",
  "CANCEL_LETTER": "Cancellation Letter",
  "CHANGE_TO_DIN": "Change to DIN",
  "COMMENTS_NOC": "Comments on Notice of Decision",
  "COMMENTS_SUMMARY_BASIS": "Comments on Summary Basis of Decision",
  "DIN_DISCONTINUED": "DIN Discontinued",
  "DRUG_NOTIF_FORM": "Drug Notification Form",
  "FOR_PERIOD": "For Period",
  "INITIAL": "INITIAL",
  "MEETING_MINUTES": "Minutes of Meeting",
  "NOTIFICATION_CHANGE": "Notification of Change in benefit-risk profile",
  "PANDEMIC_APPL": "Pandemic Application",
  "POST_CLEARANCE_DATA": "Post Clearance Data",
  "POST_MARKET_SURV": "Post Marketing Surveillance",
  "POST_NOC_CHANGE": "Post NOC Change",
  "POST_AUTH_DIV1_CHANGE": "Post-Authorization Division 1 Change",
  "PRESUB_MEETING_PKG": "Presubmission Meeting Package",
  "PRIORITY_REVIEW_RQ": "Priority Review Request",
  "PRISTINE_PM": "Pristine PM",
  "PRISTINE_PM_2LANG": "Pristine PM - Second Language",
  "ADVISEMENT_LETTER_RESPONSE": "Response to Advisement Letter ",
  "CLIN_CLARIF_RESPONSE": "Response to Clinical Clarification Request ",
  "EMAIL_RQ_RESPONSE": "Response to e-mail Request ",
  "LABEL_CLARIF_RESPONSE": "Response to Labeling Clarification Request",
  "MHPD_RQ_RESPONSE": "Response to MHPD Requests",
  "NOC_RESPONSE": "Response to NOC/c-QN",
  "NOD_RESPONSE": "Response to NOD",
  "NON_RESPONSE": "Response to NON",
  "NOL_RESPONSE": "Response to NOL",
  "PROCESSING_CLARIF_RESPONSE": "Response to Processing Clarification Request",
  "QUAL_CLIN_CLARIF_RESPONSE": "Response to Quality and Clinical Clarification Request",
  "QUAL_CLARIF_RESPONSE": "Response to Quality Clarification Request",
  "SCREENING_ACCEPT_RESPONSE": "Response to Screening Acceptance Letter",
  "SCREENING_CLARIF_RESPONSE": "Response to Screening Clarification Request",
  "SDN_RESPONSE": "Response to SDN",
  "PHONE_RQ_RESPONSE": "Response to Telephone Request",
  "RISK_COMMUN_DOC": "Risk communication document",
  "RMP_VERSION_DATE": "RMP version",
  "SIGNAL_WORK_UP": "Signal Work Up",
  "UNSOLICITED_DATA": "Unsolicited Data",
  "YEAR_LIST_OF_CHANGE": "Year, list of change number (for example: 2012, 15, 19a,….)",
  "BE_CLARIF_RESPONSE": "Response to BE Clarification Request",
  "LIFECYCLE_TITLE": "Lifecycle Management Table",
  "REG_CONTACT_THIS": "Regulatory Activity Contact for THIS transaction",
  "REG_ACT_CONTACT": "Regulatory Activity Contact",
  "TRANSACTION_HDING": "Regulatory Transaction Enrolment",
  "LOAD_TRANSACTION": "Load a Regulatory Transaction Enrolment File",
  "COMPANY_INFO": "A. Company Information",
  "ADDRESS_INFO": "B. Address Information",
  "COMPANY_REP_THIS": "C. Company Representative",
  "GENERATE_FINAL": "Generate Final XML",
  "CONTACT_SAME": "I confirm that the above regulatory activity contact information is  valid.",
  "YEAR_CHANGE": "Year of the change",
  "REG_ACTIVITY_INSTRUCT":"Regulatory Activity Contact Instructions",
  "SAVE_INSTRUCT": "Transaction File Save Instructions"
});

$translateProvider.translations("fr", {
  "ADD_TRANSACTION": "fr_Add Record",
  "SEQUENCE_NUM": "fr_Sequence Number",
  "DATE_SUBMITTED": "fr_Date Submitted",
  "SEQUENCE_DESCRIPT": "fr_Sequence Description",
  "IS_ACTCHANGES": "fr_Same as Regulatory Activity Contact for this Submission?",
  "PROJ_MANAGER_NAME": "fr_Name of Regulatory Project Manager, if known",
  "COMPANY_ID": "fr_Company Id",
  "DOSSIER_ID": "fr_Dossier Id",
  "DOSSIER_NAME": "fr_Dossier Name",
  "IS_ECTD": "fr_Is this an eCTD transaction?",
  "IS_SOLICITED": "fr_Is this solicited information",
  "SOLICITED_RQ": "fr_Requester of Solicited Information",
  "SOLICITED_RQ_OTHER": "fr_Other Requester Details",
  "REP_CONTACT_INFO": "Main Contact Information",
  "DATED": "fr_Dated",
  "START_DATE": "fr_Start Date",
  "END_DATE": "fr_End Date",
  "REG_ACTIVITY": "fr_Regulatory Activity",
  "REG_ACTIVITY_TYPE": "fr_Regulatory Activity Type",
  "SEQUENCE_TYPE": "fr_Sequence Description",
  "VERSION_NO": "fr_Version No.",
  "BRIEF_DESC": "fr_Brief Description",
  "ADMINISTRATIVE": "fr_Administrative",
  "BENEFIT_RISK_ASSESS": "fr_Benefit Risk Assessment",
  "CANCEL_LETTER": "fr_Cancellation Letter",
  "CHANGE_TO_DIN": "fr_Change to DIN",
  "COMMENTS_NOC": "fr_Comments on Notice of Decision",
  "COMMENTS_SUMMARY_BASIS": "fr_Comments on Summary Basis of Decision",
  "DIN_DISCONTINUED": "fr_DIN Discontinued",
  "DRUG_NOTIF_FORM": "fr_Drug Notification Form",
  "FOR_PERIOD": "fr_For Period",
  "INITIAL": "fr_INITIAL",
  "MEETING_MINUTES": "fr_Minutes of Meeting",
  "NOTIFICATION_CHANGE": "fr_Notification of Change in benefit-risk profile",
  "PANDEMIC_APPL": "fr_Pandemic Application",
  "POST_CLEARANCE_DATA": "fr_Post Clearance Data",
  "POST_MARKET_SURV": "fr_Post Marketing Surveillance",
  "POST_NOC_CHANGE": "fr_Post NOC Change",
  "POST_AUTH_DIV1_CHANGE": "fr_Post-Authorization Division 1 Change",
  "PRESUB_MEETING_PKG": "fr_Presubmission Meeting Package",
  "PRIORITY_REVIEW_RQ": "fr_Priority Review Request",
  "PRISTINE_PM": "fr_Pristine PM",
  "PRISTINE_PM_2LANG": "fr_Pristine PM - Second Language",
  "ADVISEMENT_LETTER_RESPONSE": "fr_Response to Advisement Letter ",
  "CLIN_CLARIF_RESPONSE": "fr_Response to Clinical Clarification Request ",
  "EMAIL_RQ_RESPONSE": "fr_Response to e-mail Request ",
  "LABEL_CLARIF_RESPONSE": "fr_Response to Labeling Clarification Request",
  "MHPD_RQ_RESPONSE": "fr_Response to MHPD Requests",
  "NOC_RESPONSE": "fr_Response to NOC/c-QN",
  "NOD_RESPONSE": "fr_Response to NOD",
  "NON_RESPONSE": "fr_Response to NON",
  "PROCESSING_CLARIF_RESPONSE": "fr_Response to Processing Clarification Request",
  "QUAL_CLIN_CLARIF_RESPONSE": "fr_Response to Quality and Clinical Clarification Request",
  "QUAL_CLARIF_RESPONSE": "fr_Response to Quality Clarification Request",
  "SCREENING_ACCEPT_RESPONSE": "fr_Response to Screening Acceptance Letter",
  "SCREENING_CLARIF_RESPONSE": "fr_Response to Screening Clarification Request",
  "SDN_RESPONSE": "fr_Response to SDN",
  "PHONE_RQ_RESPONSE": "fr_Response to Telephone Request",
  "RISK_COMMUN_DOC": "fr_Risk communication document",
  "RMP_VERSION_DATE": "fr_RMP version",
  "SIGNAL_WORK_UP": "fr_Signal Work Up",
  "UNSOLICITED_DATA": "fr_Unsolicited Data",
  "YEAR_LIST_OF_CHANGE": "fr_Year, list of change number (for example: 2012, 15, 19a,….)",
  "BE_CLARIF_RESPONSE": "fr_Response to BE Clarification Request",
  "LIFECYCLE_TITLE": "fr_Lifecycle Management Table",
  "REG_CONTACT_THIS": "fr_Regulatory Activity Contact for THIS transaction",
  "REG_ACT_CONTACT": "fr_Regulatory Activity Contact",
  "TRANSACTION_HDING": "fr_Regulatory Transaction Enrolment",
  "LOAD_TRANSACTION": "fr_Load a Regulatory Transaction Enrolment File",
  "GENERATE_FINAL": "fr_Generate Final XML",
  "CONTACT_SAME": "fr_I confirm that the above regulatory activity contact information is  valid.",
  "YEAR_CHANGE": "fr_Year of change",
  "COMPANY_INFO": "A. Company Information",
  "ADDRESS_INFO": "B. Address Information",
  "COMPANY_REP_THIS": "C. Company Representative",
  "REG_ACTIVITY_INSTRUCT":"fr_Regulatory Activity Contact Instructions",
  "SAVE_INSTRUCT": "fr_Transaction File Save Instructions"
});
}]);
