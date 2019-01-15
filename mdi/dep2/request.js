const search = window.location.search.substr(1);
const documentURL = "https://rest-dev.hres.ca/mdi/mdi_search";
const limit = 25;
const pagesAllowed = 5;
var page = 0;


$(document).ready(() => {

    var q;
    var queries = search.split("&");
    var queryObj = {};

    console.log("Search is " + search);
    console.log(queries)
    queries.forEach((query) => {

        if (query.indexOf("=") > -1) {
            var qc = query.split("=");
            queryObj[qc[0]] = decodeURIComponent(qc[1]);
        }
    });

    if (queryObj.hasOwnProperty("q")) q = (queryObj.q).split(" ");
    if (queryObj.hasOwnProperty("page") && !isNaN(queryObj.page)) page = parseInt(queryObj.page) - 1;
    //remove brackets
    for(let i=0;i<q.length;i++){
        let _q=q[i];
        if (_q.indexOf("(") > -1 || _q.indexOf(")") > -1 ||q.length==0){
            q.splice(q.indexOf(_q), 1);
            i=i-1; //dont increment
        }
    }

    console.log("qis "+q);

    $("#terms").text(q.join(" "));
    console.log(q);
    if (q) {
        requestDocuments(q);
    } else {
        end();
    }
});



function requestDocuments(q) {

    var url = documentURL;
    if(q[0].length>0){ //TODO hacks
       //https://rest-dev.hres.ca/mdi/mdi_search?&offset=0&limit=25
        console.log("greater  than zero")
        url = documentURL + "?select=incident.incident_id";
        q.forEach((_q) => {
            //https://rest-dev.hres.ca/mdi/mdi_search?select=incident.incident_id&search=fts.123
            //https://rest-dev.hres.ca/mdi/mdi_search?select=incident.incident_id&search=fts.onetouch&search=fts.ultra&search=fts.blood&offset=0&limit=25
            url += ("&search=fts." + _q);
        });
    }else{
        url = documentURL + "?";
    }

    url+="&offset="+page;
    url+="&limit="+limit;
    console.log(url)
    const range = (page * limit) + "-" + (((page + 1) * limit) - 1);

    $.ajax({
        url: url,
        method: "GET",
        beforeSend: (xhr) => {

            xhr.setRequestHeader('Range-Unit', 'items');
            xhr.setRequestHeader('Range', range);
            xhr.setRequestHeader('Prefer', 'count=exact');
        },
        success: (data, status, xhr) => {

            var content = xhr.getResponseHeader('Content-Range');
            console.log(content);
            populateTable2(data);
            createPagination(content);
        },
        error: (err) => {
            console.log("error");
            end();
        }
    });

}

/***
 * Create a function similar to the dpd function
 * @param data
 */
function populateTable2(data) {

    var body = "";
    //const drugPageURL = document.documentElement.lang == "fr" ? "drug-fr.html" : "drug.html";
    data.forEach((d) => {

        var trade_names="";
        var company_names="";
        var risk_classes="";

        console.log(d);
        console.log("date "+d.incident.receipt_date);
        if(d.incident.trade_name) {
            d.incident.trade_name.forEach(function (tname) {
                trade_names += tname + "<br>"
            });
            trade_names=trade_names.substring(0,trade_names.length-4);
        }
        if(d.incident.company_name) {
            d.incident.company_name.forEach(function (name) {
                company_names += name + "<br>"
            });
            company_names=company_names.substring(0,company_names.length-4);
        }
        if(d.incident.device_detail) {
            d.incident.device_detail.forEach(function (detail) {
                risk_classes += detail.risk_classification + "<br>"
            });
            risk_classes=risk_classes.substring(0,risk_classes.length-4);
        }
        body += "<tr>" +
            "<td>" + d.incident.incident_id + "</td>" +
            "<td>" + trade_names + "</td>" +
            "<td>" + company_names + "</td>" +
            "<td>" + ((document.documentElement.lang == "fr") ?   d.incident.hazard_severity_code_f :   d.incident.hazard_severity_code_e) + "</td>" +
            "<td>" +risk_classes + "</td>" +
            "<td>" + ((document.documentElement.lang == "fr") ?   d.incident.incident_type_f :   d.incident.incident_type_e) + "</td>" +""+
            "<td ><span>" +d.incident.receipt_date+ "</span></td>" +
            "</tr>";
    });

    $("#drug-table").attr("hidden", false);
    $("#table-content").html(body);
    $("#pagination").attr("hidden", false);
    $("#empty").attr("hidden", true);
}

function createPagination(content) {

    var range = (content.split("/"))[0];
    var start = parseInt((range.split("-"))[0]) + 1;
    var end = parseInt((range.split("-"))[1]) + 1;

    var total = (content.split("/"))[1];

    $("#count").text("(Displaying results " + start + " - " + end + " of " + total + ")");

    const totalPages = Math.ceil(total / limit);
    const pageMedian = Math.ceil(pagesAllowed / 2);
    const pageDeviation = Math.floor(pagesAllowed / 2);

    var currentPage = page + 1;
    var pageArray = [];

    if (currentPage < pageMedian) {
        for (var i = 0; i < pagesAllowed; i++) {
            if (i < totalPages) pageArray.push(i + 1);
        }

        makePages(pageArray, currentPage);
    } else if (currentPage + pageDeviation > totalPages) {
        for (var i = 0; i < pagesAllowed; i++) pageArray.unshift(totalPages - i);

        makePages(pageArray, currentPage);
    } else {
        for (var i = 0; i < pagesAllowed; i++) pageArray.push((currentPage - pageDeviation) + i);

        makePages(pageArray, currentPage);
    }
}

function makePages(pageArray, current) {

    for (var i = 0; i < pagesAllowed; i++) {
        if (i < pageArray.length) {
            var btn = "btn-default";

            if (pageArray[i] == current) {
                btn = "btn-primary";
            }

            $("#pg-" + i).addClass(btn).html(pageArray[i]).attr("onclick", "travel(" + pageArray[i] + ")");
        } else {
            $("#pg-" + i).css("display", "none");
        }
    }
}

function travel(page) {

    var searchComponents = search.split("&");
    var q;

    searchComponents.forEach((c) => {

        if (c.startsWith("q=")) q = c;
    });
    console.log("travelling")
    window.location.href = "results.html?" + q + "&page=" + page;
}

function end() {

    $("#drug-table").attr("hidden", true);
    $("#pagination").attr("hidden", true);
    $("#empty").attr("hidden", false);
}

function makeDate(iso) {

    const d = new Date(iso);
    const month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()

    return d.getFullYear() + "-" + month + "-" + day;
}
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
    //console.log(csv);

    if (window.navigator.msSaveBlob) { // IE 10+
        //alert('IE' + csv);
        window.navigator.msSaveOrOpenBlob(new Blob([csv], { type: "text/plain;charset=utf-8;" }), filename)
    }
    else {
        $(this).attr({ 'download': filename, 'href': csvData, 'target': '_blank' });
    }
}

