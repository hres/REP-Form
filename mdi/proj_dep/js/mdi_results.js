const limit = 25;
const termsTag = "#terms";
const EMPTY_RESULT = ""; //in case need to add dash for empty cell (accessibility)
const MAX_RESULTS=3000;
$(document).ready(() => {
    initTableWet();
});

// This must be a hyperlink
$('#linkExcel').on('click', function (event) {
    ExportTableToCSV.apply(this, [$('#results-table'), 'mdi_result.csv']);
});

/**
 * Creates the url for the search functionality
 * @returns {string}
 */
function getURL() {
    var q = getQueryTermsFromUrl();
    var url = "";
    var term_query = "";
    //_uiSetTermsDisplay(q);
    if (q) {
        term_query = _constructURLFromTerms(q);
    } else {
        //TODO any cleanup
    }
    //url="https://rest.hres.ca/mdi/mdi_search?select=incident.incident_id&search=eq.recall&limit=1300";//TODO Temp
    url = API_URL + "?" + (term_query) + "&limit="+MAX_RESULTS;

    return url;
}

/**
 * Sets the terms UI with the terms values
 * @param q
 * @private
 */
function _uiSetTermsDisplay(q) {
    if (!q) return;
    $("termsTag").text(q.join(" "));
}

function getQueryTermsFromUrl() {
    var q;
    var queryObj = {};
    var search = window.location.search.substr(1);
    // search-decodeURIComponent(search);

    var queries = search.split("&");
    queries.forEach((query) => {

        if (query.indexOf("=") > -1) {
            var qc = query.split("=");
            queryObj[qc[0]] = decodeURIComponent(qc[1]);
        }
    });
    //queryObj=$.trim(queryObj);
    if (queryObj.hasOwnProperty("q")) q = (queryObj.q).split("]");
    //if (queryObj.hasOwnProperty("page") && !isNaN(queryObj.page)) page = parseInt(queryObj.page) - 1;
    //remove brackets
    if (!q) return "";
    q = _collectTermTypes(q);
    //TODO delete?
    /* for(let i=0;i<q.length;i++){
         let _q=q[i];
         if (_q.indexOf("[") > -1 || _q.indexOf("]") > -1 ||q.length==0){
             q.splice(q.indexOf(_q), 1);
             i=i-1; //dont increment
         }
     }*/
    return q;
}

/***
 * Categorizes the term types. Allows to construct query
 * @param termArray
 * @returns {string}
 * @private
 */
function _collectTermTypes(termArray) {
    if (!termArray) return "";
    var result = {};
    //TODO make into a map? or maps for each type
    result.company = [];
    result.type = [];
    result.device = [];
    result.none = [];
    for (var i = 0; i < termArray.length; i++) {
        var terms = (termArray[i]).split("[");
        if (terms && terms.length > 1) {
            var value = $.trim(terms[0]);
            switch ($.trim(terms[1])) {
                case _MDI_DEVICE_TYPE:
                    //console.log("device");
                    result.device.push(value);
                    break;
                case _MDI_COMPANY_TYPE:
                    //console.log("company");
                    result.company.push(value);
                    break;
                case _MDI_REPORT_TYPE:
                   // console.log("type");
                    result.type.push(value);
                    break;
            }
        } else {
            if (terms.isPrototypeOf(Array) && terms[0].length) {
                result.none.push(terms[0]);
                //console.log("none")
            }
        }
    }
    //console.log(result);
    return result;
}

/**
 * "columnDefs": [
 { "width": "5%"},{ "width": "15%"},{ "width": "15%"},{ "width": "15%"},{ "width": "5%"},{ "width": "10%"},{ "width": "10%"},{ "width": "25%"}],
 */
function initTableWet() {
    //TODO update initialization?
    window['wb-tables'] = {
        "processing": true,
        "autoWidth": false,
        "columnDefs": [
            {"width": "10%", "targets": 7},
            {"width": "5%", "targets": 4}
        ],
        "ajax": {
            "url": getURL(),
            "dataSrc": '',

            "searching": false,
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, 'All']],
            "cache": true
        },
        'bStateSave': true,
        'columns': [
            {data: 'incident.incident_id'},
            {
                'data': 'incident.trade_name',
                'render': function (data, type, full, meta) {
                    return arrayNameDisplay(data);

                }
            },
            {
                'data': 'incident.company_name',
                'render': function (data, type, full, meta) {
                    return arrayNameDisplay(data);
                }
            },
            {
                'data': 'incident.hazard_severity_code_e',
                'render': function (data, type, full, meta) {
                    return hazardDisplay(data, full);

                }
            },
            {
                'data': 'risk_classification',
                'render': function (data, type, full, meta) {

                    return riskNameDisplay(data, full);
                }
            },
            {
                'data': 'incident_type_e',
                'render': function (data, type, full, meta) {
                    return incidentTypeDisplay(data, full);

                }
            },
            {
                'data': 'incident.problem_detail',
                'render': function (data, type, full, meta) {
                    return problemDetailDisplay(data, full);

                }
            },
            {
                'data': 'incident.receipt_date',
                'render': function (data, type, full, meta) {
                    return '<span>' + trimString(data) + "</span>";

                }
            }
        ]
    }
}

function isEnglish() {
    return document.documentElement.lang === "en"
}

function isFrench() {
    return !isEnglish();
}

/**
 * If data is empty ensures it is replaced with an empty string
 * @param data
 * @returns {*}
 */
function trimString(data) {
    if (!data) return EMPTY_RESULT;
    var result = $.trim(data);
    if (!result) result = "-";
    return result

}

function riskNameDisplay(data, full) {
    //full.incident.device_detail
    //detail.risk_classification
    if (!full.incident || !full.incident.device_detail) {
        return EMPTY_RESULT;
    }
    var displayName = "";
    var devices = full.incident.device_detail;

    for (var i = 0; i < devices.length; i++) {
        displayName += devices[i].risk_classification + "<br>"
    }
    displayName = displayName.substring(0, displayName.length - 4);

    return displayName;
}

function hazardDisplay(data, full) {
    var displayValue = "";
    if (isFrench()) {
        displayValue = full.incident.hazard_severity_code_f;
    } else {
        displayValue = full.incident.hazard_severity_code_e;
    }
    return (trimString(displayValue));
}

function incidentTypeDisplay(data, full) {
    var displayValue = "";
    if (isFrench()) {
        displayValue = full.incident.incident_type_f;
    } else {
        displayValue = full.incident.incident_type_e;
    }
    return (trimString(displayValue));
}

function problemDetailDisplay(data, full) {
    var displayName = "";
    if (!data || data.length == 0) return "";
    if (isFrench()) {
        for (var i = 0; i < data.length; i++) {
            displayName += data[i].desc_f + "<br>"
        }
    } else {
        //todo fix
        for (var i = 0; i < data.length; i++) {
            displayName += data[i].desc_e + "<br>"
        }
    }
    displayName = displayName.substring(0, displayName.length - 4);
    return (trimString(displayName));
}

function arrayNameDisplay(data) {
    var displayName = "";
    if (!data) return EMPTY_RESULT;
    if (!Array.isArray(data)) return $.trim(data)
    for (var i = 0; i < data.length; i++) {
        displayName += data[i] + "<br>"
    }
    displayName = displayName.substring(0, displayName.length - 4);
    return displayName;
}


/**
 {data: 'incident.receipt_date'}
 ,
 *
 * @constructor
 */

function OnFail() {

    console.warn("failed");
}

/**
 * Exports table data to a csv
 * @param $table
 * @param filename
 * @constructor
 */
function ExportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td),tr:has(th)'),
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row), $cols = $row.find('td,th');

            return $cols.map(function (j, col) {
                var $col = $(col), text = $col.text();
                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',
        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    if (window.navigator.msSaveBlob) { // IE 10+
        //alert('IE' + csv);
        window.navigator.msSaveOrOpenBlob(new Blob([csv], {type: "text/plain;charset=utf-8;"}), filename)
    } else {
        $(this).attr({'download': filename, 'href': csvData, 'target': '_blank'});
    }
}

/**
 * Creates the search query. Assumes this is an and situation
 * @param queryObj
 * @private
 */
function _constructURLFromTerms2(queryObj) {
    var q_company = "";
    var q_device = "";
    var q_type = "";
    var result = ""

    if (!queryObj) return "";
    //https://rest.hres.ca/mdi/mdi_search?incident-%3E%3Etrade_name=plfts.CEMENT&incident-%3E%3Ecompany_name=plfts.BIOMET&incident-%3E%3Eincident_type_e=plfts.Voluntary%20problem%20report&limit=20
    if (queryObj.company.length === 1) {
        q_company = "incident->>company_name=plfts." + encodeURIComponent(queryObj.company[0]);
        result = q_company;
    } else if (queryObj.company.length > 1) {
        var base = ("incident->>company_name=and(");
        for (var i = 0; i < queryObj.company.length; i++) {
            var a_company = queryObj.company[i];
            base = base + "plfts." + (a_company) + ",";
        }
        base = (base.substring(0, base.length - 1)) + ")";
        q_company = base;
         result=q_company; //TODO redundant
    }
    if (queryObj.device.length === 1) {
        q_device = "incident->>trade_name=plfts." + encodeURIComponent(queryObj.device[0]);
         result+=("&"+q_device);
    }
    if (queryObj.type.length === 1) {
        q_type = "incident->>incident_type_e=plfts.";
        if (isFrench()) {
            q_type = "incident->>incident_type_f=plfts."
        }
        q_type += encodeURIComponent(queryObj.type[0]);
         result+=("&"+q_type);
    }

   /* var result_array = [];
    if (q_company) result_array.push(q_company);
    if (q_device) result_array.push(q_device);
    if (q_type) result_array.push(q_type);
    if (result_array.length == 1)
        switch (result_array.length) {
            case 0:
                //TODO
                break;
            case 1:
                result=result_array[0];
                break;
            case 2:
                break;

            case 3:
                break;
        }*/

    if (result.indexOf("&") === 0) {
        result = result.substring(1, result.length);
    }
    return result;
}

function _constructURLFromTerms(queryObj) {
    var q_company = "";
    var q_device = "";
    var q_type = "";
    var result = ""

    if (!queryObj) return "";
    //https://rest.hres.ca/mdi/mdi_search?incident-%3E%3Etrade_name=plfts.CEMENT&incident-%3E%3Ecompany_name=plfts.BIOMET&incident-%3E%3Eincident_type_e=plfts.Voluntary%20problem%20report&limit=20
    if (queryObj.company.length === 1) {
        q_company = "incident->>company_name=plfts." + encodeURIComponent(queryObj.company[0]);
        result = q_company;
    } else if (queryObj.company.length > 1) {
        var base = ("incident->>company_name=and(");

        for (var i = 0; i < queryObj.company.length; i++) {
            var a_company = queryObj.company[i];
            base = base + "plfts." + (a_company) + ",";
        }
        base = (base.substring(0, base.length - 1)) + ")";
        q_company = base;
        result = q_company; //TODO redundant
    }
    if (queryObj.device.length === 1) {
        q_device = "incident->>trade_name=plfts." + encodeURIComponent(queryObj.device[0]);
        result += ("&" + q_device);
    }
    if (queryObj.type.length === 1) {
        q_type = "incident->>incident_type_e=plfts.";
        if (isFrench()) {
            q_type = "incident->>incident_type_f=plfts."
        }
        q_type += encodeURIComponent(queryObj.type[0]);
        result += ("&" + q_type);
    }

    if (result.indexOf("&") === 0) {
        result = result.substring(1, result.length);
    }
    return result;
}
