"use strict";

const AUTOCOMPLETE_URL = API_URL;
const AUTOCOMPLETE_QUERY_LIMIT = 50;
const MAX_AUTOCOMPLETE_LIST = 8;
const illegal = ["of", "&", "and", "?", "!", "or", "+", "-", "no."];
const LUCENE_IMPLICIT = "<implicit>";
const SEARCH_BOX_ID = "#search";
;

//https://rest.hres.ca/mdi/mdi_search?select=incident.incident_id&search=fts.hip&limit=30
$(document).ready(() => {

    autocompleteInit()
});


/**
 * Create the autocomplete url based on the terms the user adds
 * Examples
 https://rest.hres.ca/mdi/mdi_search?or=(incident-%3E%3Ecompany_name.plfts.Johnson%20,incident-%3E%3Eincident_type_e.fts.recall)&limit=15
 https://rest.hres.ca/mdi/mdi_search?or=(or(incident-%3E%3Ecompany_name.fts.we,incident-%3E%3Etrade_name.fts.we),incident-%3E%3Eincident_type_e.fts.recall)&limit=100
 * @param term
 * @returns {string}
 */
function getTermQuery(term) {
    var type_query = "incident-%3E%3Eincident_type_e.plfts.";
    if (document.documentElement.lang === "fr") {
        type_query = "incident-%3E%3Eincident_type_f.plfts.";
    }
    return AUTOCOMPLETE_URL + "?or=(or(incident-%3E%3Ecompany_name.plfts." + term + ",incident-%3E%3Etrade_name.plfts." + term + ")," + type_query + term + ")" + "&limit=" + AUTOCOMPLETE_QUERY_LIMIT;

}

/**
 * After recieving the query, parse the terms and identify them to users
 * @param term
 * @param data
 * @returns {Array}
 */
function processAutoCompleteTerms(term, data) {
    var suggestions = [];
    var unique_company = {};
    var unique_trade = {};
    var unique_type = {};
    if (!term) return [];
    term=term.toLowerCase();
    //TODO cleanup nested map object maybe?
    for (var i = 0; i < data.length; i++) {
        var inc_trade = "";
        var obj = data[i];
        if (obj.incident.trade_name) {
            for (var j = 0; j < obj.incident.trade_name.length; j++) {
                var word = obj.incident.trade_name[j];
                if (word.toLowerCase().indexOf(term) > -1) {
                    if (!unique_trade.hasOwnProperty(word)) {
                        suggestions.push((word + " " + _MDI_OPEN_TYPE + _MDI_DEVICE_TYPE + _MDI_CLOSE_TYPE));
                        unique_trade[word] = 1;
                        if (suggestions.length >= MAX_AUTOCOMPLETE_LIST) return suggestions;
                    }
                }
            }
        }
        if (obj.incident.company_name) {
            for (var j = 0; j < obj.incident.company_name.length; j++) {
                var word = obj.incident.company_name[j];
                if (word.toLowerCase().indexOf(term) > -1) {
                    if (!unique_company.hasOwnProperty(word)) {
                        suggestions.push((word + " " + _MDI_OPEN_TYPE + _MDI_COMPANY_TYPE + _MDI_CLOSE_TYPE));
                        unique_company[word] = 1;
                        if (suggestions.length >= MAX_AUTOCOMPLETE_LIST) return suggestions;
                    }
                }
            }
        }
        var inc_type = obj.incident.incident_type_e;
        if (document.documentElement.lang == "fr") {
            inc_type = obj.incident.incident_type_f;
        }

        if(inc_type.toLowerCase().indexOf(term) > -1) {
            if (!unique_type.hasOwnProperty(inc_type)) {
                suggestions.push((inc_type + " " + _MDI_OPEN_TYPE + _MDI_REPORT_TYPE + _MDI_CLOSE_TYPE));
                unique_type[inc_type] = 1;
                if (suggestions.length >= MAX_AUTOCOMPLETE_LIST) return suggestions;
            }
        }

    }
    return suggestions;
}

/**
 * Gets the raw request and parses it. Used to pass to the results page
 */
function passRequestToResults() { //TODO delete

    var queryString = $(SEARCH_BOX_ID).val();
    var results = "";

    //TODO parse with lucene?
    /* require(['proj_dep/vendor/lucene-query-parser.js'], function (lucenequeryparser) {
         // Use the Lucene Query Parser library here
         var queryString = $("#search").val();

         try {
             results = lucenequeryparser.parse(queryString);
         } catch (e) {
             console.error("There was an error with the query " + e)
             results = queryString; //TODO make a default query?
         }
         _parseQuery(results);
         console.log(results);
     });*/
    queryString = $.trim(queryString);
    var search = queryString.split(" ");

    //removes illegals
    /* illegal.forEach((def) => {
         const i = $.inArray(def, search);
         if (i > -1) search.splice(i, 1);
     });*/
    if (search.length > 0) {
        //window.location.href = resultPageURL + "?q=" + search.join("%20");
        window.location.href = _MDI_RESULTS_PAGE_NAME + "?q=" + encodeURI(queryString);
    }
}


function split(val) {
    //splitting on space
    return val.split(/]\s+/);
}

function splitSpace(val) {
    //splitting on space
    return val.split(/\s+/);
}

function extractLast(term) {
    var temp = split(term).pop();
    if (temp == ' ') temp = "";
    return temp;
}

function autocompleteInit() {
    $("#search")
    // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {

            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            } else if (event.keyCode === $.ui.keyCode.SPACE) {
                $(".ui-menu-item").hide();
            }
        })
        .autocomplete({
            source: function (request, response) {
                // delegate back to autocomplete, but extract the last term
                var term = $.trim(request.term);
                if (term) {
                    term = extractLast(request.term)
                }
                $.ajax({
                    url: getTermQuery(term),
                    dataType: "json",
                    cache: true,
                    success: function (data) {
                        var dataList = processAutoCompleteTerms(term, data);
                        dataList.splice(MAX_AUTOCOMPLETE_LIST);
                        response(dataList);
                    }
                });
            },
            minLength: 2,
            search: function () {
                // custom minLength
                var term = extractLast(this.value);
                if (term.length < 2) {
                    return false;
                }
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                // remove the current input
                terms.pop();
                // add the selected item
                //add the closing bracket back
                for (var i = 0; i < terms.length; i++) {
                    terms[i] = terms[i] + "]";
                }
                terms.push(ui.item.value);
                // add placeholder
                terms.push(" ");
                this.value = terms.join(" ");
                return false;
            }
        });
}

/**
 * Manages the state of the search ui
 */
function updateDateState() {
    if ($("#is-date-range").is(":checked")) {
        $("#date-group").toggleClass('hidden visible');
    } else {
        $("#date-group").toggleClass('visible hidden');
        $("#startdate").val(null);
        $("#enddate").val(null);
    }
}

/**
 * Parses the query using lucene. Constructs the terms for the api TODO delete
 * @param query - valid lucene query
 * @returns {string}
 */
function _parseQuery(query) {
    var result = "";
    console.log(query);
    if (!query || !query.left) return result;
    var ptr = query;

    //process the first one in case there is no right
    if (!ptr.right) {
        console.log("no pointer right")
        result += _getLuceneTerm(ptr);
    }
    while (ptr && ptr.right) {
        var prefix = "";
        var suffix = "";
        var separator = "";
        var operator = "";
        if (ptr.operator) operator = ptr.operator.toLowerCase();
        /* if(ptr.operator){
             prefix=prefix+ ptr.operator.toLowerCase()+"(";
             suffix=")";
             separator=",";
         }*/
        if (ptr.left) {
            result += prefix + _getLuceneTerm(ptr.left) + SPACE_STRING + operator + SPACE_STRING;
        }
        if (ptr.right && !ptr.right.left) {
            result += separator + _getLuceneTerm(ptr.right) + suffix;
        }
        ptr = ptr.right;
    }

    return result;

}

/**
 * Expectes a lucene formatted term TODO:delete
 * @param node
 * @private
 */
function _getLuceneTerm(node) {
    var isField = false;
    var result = "";
     if(node.field !== LUCENE_IMPLICIT){
        isField = true;
    }
    if (node.term) {
        //ilike
    }
    if (isField) {
        //todo encode as URL or wait till end?
        result = node.field + "=ilike." + node.term;
    } else {
        //TODO basically no column identifier
    }

    return result;
}
