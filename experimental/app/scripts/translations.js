angular.module("translations", []).config(["$translateProvider", function($translateProvider) {
$translateProvider.translations("en", {
  "DOSSIER_ENROL":"Dossier Enrol Form",
    "job_title":"Job Title",
    "language_correspondance":"Language of Correspondence",
    "en":"English",
    "fr":"French",
    "contact_record": "Contact Record",
    "E":"Edited",
    "A": "Record Added",
    "N": "New / Added",
    "D":"Deleted",
    "company_id":"Company Id",
    "formulation_details":"Formulation Record",
    "enrolment_version": "Enrolment Version",
    "appendix4_group": "Animal/ human sourced record"
});

}]);
