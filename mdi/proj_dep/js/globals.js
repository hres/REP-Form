const API_URL = "https://rest.hres.ca/mdi/mdi_search";
const SPACE_STRING = " ";
var _MDI_DEVICE_TYPE="device";
var _MDI_COMPANY_TYPE="company";
var _MDI_REPORT_TYPE="type";
var  _MDI_OPEN_TYPE="[";
var _MDI_CLOSE_TYPE="]";
var _MDI_RESULTS_PAGE_NAME = "results.html";


$(document).ready(() => {

    if (document.documentElement.lang == "fr"){
        _MDI_DEVICE_TYPE="fr_device";
        _MDI_COMPANY_TYPE="fr_company";
        _MDI_REPORT_TYPE="fr_type";
        _MDI_RESULTS_PAGE_NAME = "results_fr.html"
    }
});