if ("undefined" == typeof wet) var wet = {};
"undefined" == typeof wet.builder && (wet.builder = {});
wet.builder.serverRefTop = function (a, h) {
    return serverPage.serverRefTop(a)
};
wet.builder.serverTop = function (a, h) {
    return serverPage.serverTop(a)
};
wet.builder.serverRefBottom = function (a, h) {
    return serverPage.serverRefBottom(a)
};
wet.builder.serverBottom = function (a, h) {
    return serverPage.serverBottom(a)
};
wet.builder.appTop = function (a, h) {
    return applicationPage.appTop(a)
};
wet.builder.appFooter = function (a, h) {
    return applicationPage.appFooter(a)
};
wet.builder.environment = function (a, h) {
    return ("esdcqat" == a.cdnEnv ? "https://cdn-canada.services.gc.qat/app/cls/WET" : "esdcnonprod" == a.cdnEnv ? "https://s2tst-cdn-canada.sade-edap.prv/app/cls/WET" : "esdcprod" == a.cdnEnv ? "https://ssl-templates.services.gc.ca/app/cls/WET" : "localhost" == a.cdnEnv ? "../../../.." : "https://www.canada.ca/etc/designs/canada/cdts") + "/gcweb/v4_0_27/"
};
wet.builder.refTop = function (a, h) {
    a = a || {};
    return "\t\t\x3c!--[if gte IE 9 | !IE ]>\x3c!--\x3e<link href='" + '../wet-boew/assets/favicon.ico\' rel="icon" type="image/x-icon"><link rel="stylesheet" href=\'' + "../wet-boew/css/theme.min.css'><link rel=\"stylesheet\" href='" + "../wet-boew/css/cdtsfixes.css'>" + (!0 == a.isApplication ? '<link rel="stylesheet" href=\'' + wet.builder.environment(a) + "cdts/cdtsapps.css'>" : "") + "\x3c!--<![endif]--\x3e\x3c!--[if lt IE 9]><link href='" +
        '../wet-boew/assets/favicon.ico\' rel="shortcut icon" /><link rel="stylesheet" href=\'' + "../wet-boew/css/ie8-theme.min.css' /><script src=\"" + ("external" == a.jqueryEnv ? "https://ajax.googleapis.com/ajax/libs" : wet.builder.environment(a) + "js/") + 'jquery/1.11.1/jquery.min.js" integrity="sha256-VAvG3sHdS5LqTT+5A/aeq/bZGa/Uj04xKxY8KM/w9EE= sha384-UM1JrZIpBwVf5jj9dTKVvGiiZPZTLVoq4sfdvIe9SBumsvCuv6AHDNtEiIb5h1kU sha512-nhY06wKras39lb9lRO76J4397CH1XpRSLfLJSftTeo3+q2vP7PaebILH9TqH+GRpnOhfAGjuYMVmVTOZJ+682w==" crossorigin="anonymous">\x3c/script><script src=\'' +
        wet.builder.environment(a) + "js/ie8-wet-boew.min.js'>\x3c/script><![endif]--\x3e\x3c!--[if lte IE 9]><![endif]--\x3e" + (null != a.webAnalytics ? "dev" == a.webAnalytics ? '<script src="//assets.adobedtm.com/caacec67651710193d2331efef325107c23a0145/satelliteLib-78cf42deb149c9766cbaaa6151e252b9b67c0200-staging.js">\x3c/script>' : '<script src="//assets.adobedtm.com/caacec67651710193d2331efef325107c23a0145/satelliteLib-78cf42deb149c9766cbaaa6151e252b9b67c0200.js">\x3c/script>' : "")
};
wet.builder.top = function (a, h) {
    a = a || {};
    var b = '\t\t<ul id="wb-tphp"><li class="wb-slc"><a class="wb-sl" href="#wb-cont">Passer au contenu principal</a></li><li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Passer \u00e0 \u00ab&#160;\u00c0 propos de ce site&#160;\u00bb</a></li>' + (!0 == a.topSecMenu ? '<li class="wb-slc visible-md visible-lg"><a class="wb-sl" href="#wb-sec">Passer au menu de la section</a></li>' : "") + '</ul><header role="banner"><div id="wb-bnr" class="container">';
    if (null != a.lngLinks) {
        for (var b = b + ('<section id="wb-lng" class="' + (!1 != a.siteMenu ? "visible-md visible-lg " : "") + 'text-right"><h2 class="wb-inv">S\u00e9lection de la langue</h2><div class="row"><div class="col-md-12"><ul class="list-inline margin-bottom-none">'), e = a.lngLinks, f = e.length, c = 0; c < f; c++) var d = e[c], b = b + ('<li><a lang="' + soy.$$escapeHtml(d.lang) + '" href="' + soy.$$escapeHtml(d.href) + '">' + soy.$$escapeHtml(d.text) + "</a></li>");
        b += "</ul></div></div></section>"
    }
    b += '<div class="row"><div class="brand col-xs-8 col-sm-9 col-md-6">' +
        (!1 != a.siteMenu ? '<a href="https://www.canada.ca/fr.html">' : "") + '<object type="image/svg+xml" tabindex="-1" data=\'' + '../wet-boew/assets/sig-blk-fr.svg\'></object><span class="wb-inv"> Gouvernement du Canada / <span lang="en">Government of Canada</span></span>' + (!1 != a.siteMenu ? "</a>" : "") + '</div><section class="wb-mb-links col-xs-4 col-sm-3 ' + (!1 != a.siteMenu ? "visible-sm visible-xs" : "") + (!1 == a.siteMenu ? " hide" : "") + '" id="wb-glb-mn"><h2>Recherche et menus</h2><ul class="list-inline text-right chvrn"><li><a href="#mb-pnl" title="Recherche et menus" aria-controls="mb-pnl" class="overlay-lnk" role="button"><span class="glyphicon glyphicon-search"><span class="glyphicon glyphicon-th-list"><span class="wb-inv">Recherche et menus</span></span></span></a></li></ul><div id="mb-pnl"></div></section>' +
        (!1 != a.search ? '<section id="wb-srch" class="col-xs-6 text-right visible-md visible-lg"><h2>Recherche</h2><form action="https://www.canada.ca/fr/sr.html" method="get" name="cse-search-box" role="search" class="form-inline"><div class="form-group"><label for="wb-srch-q" class="wb-inv">Recherchez le site Web</label><input name="cdn" value="canada" type="hidden"><input name="st" value="s" type="hidden"><input name="num" value="10" type="hidden"><input name="langs" value="fr" type="hidden"><input name="st1rt" value="1" type="hidden"><input name="s5bm3ts21rch" value="x" type="hidden"><input id="wb-srch-q" list="wb-srch-q-ac" class="wb-srch-q form-control" name="q" type="search" value="" size="27" maxlength="150" placeholder="Rechercher dans Canada.ca"><input type="hidden" name="_charset_" value="UTF-8"><datalist id="wb-srch-q-ac">\x3c!--[if lte IE 9]><select><![endif]--\x3e\x3c!--[if lte IE 9]></select><![endif]--\x3e</datalist></div><div class="form-group submit"><button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="wb-srch-sub"><span class="glyphicon-search glyphicon"></span><span class="wb-inv">Recherche</span></button></div></form></section>' :
            "") + "</div></div>" + (!1 != a.siteMenu ? '<nav role="navigation" id="wb-sm" class="wb-menu visible-md visible-lg" data-trgt="mb-pnl" data-ajax-replace="../wet-boew/sitemenu/sitemenu-fr.html" typeof="SiteNavigationElement"><div class="container nvbar"><h2>Menu des sujets</h2><div class="row"><ul class="list-inline menu"><li><a href="https://www.canada.ca/fr/services/emplois.html">Emplois</a></li><li><a href="https://www.canada.ca/fr/services/immigration-citoyennete.html">Immigration</a></li><li><a href="https://voyage.gc.ca/">Voyage</a></li><li><a href="https://www.canada.ca/fr/services/entreprises.html">Entreprises</a></li><li><a href="https://www.canada.ca/fr/services/prestations.html">Prestations</a></li><li><a href="https://www.canada.ca/fr/services/sante.html">Sant\u00e9</a></li><li><a href="https://www.canada.ca/fr/services/impots.html">Imp\u00f4ts</a></li><li><a href="https://www.canada.ca/fr/services.html">Autres services</a></li></ul></div></div></nav>' :
            '<div id="wb-sm" class="visible-xs visible-sm visible-md visible-lg"></div>');
    if (!1 != a.breadcrumbs) {
        b += '<nav role="navigation" id="wb-bc" property="breadcrumb"><h2>Vous \u00eates ici :</h2><div class="container"><div class="row"><ol class="breadcrumb">';
        if (null != a.breadcrumbs) for (e = a.breadcrumbs, f = e.length, c = 0; c < f; c++) d = e[c], b += "<li>" + (null != d.acronym ? '<abbr title="' + soy.$$escapeHtml(d.acronym) + '">' : "") + (null != d.href ? '<a href="' + soy.$$escapeHtml(d.href) + '">' : "") + soy.$$escapeHtml(d.title) + (null != d.href ?
            "</a>" : "") + (null != d.acronym ? "</acronym>" : "") + "</li>"; else b += '<li><a href="https://www.canada.ca/fr.html">Accueil</a></li>';
        b += "</ol></div></div></nav>"
    }
    return b + "</header>"
};
wet.builder.preFooter = function (a, h) {
    a = a || {};
    var b = "\t\t\t";
    if (!1 != a.pagedetails) {
        b += '<div class="row pagedetails">' + (null != a.showFeedback ? !1 != a.showFeedback ? '<div class="col-sm-6 col-lg-4 mrgn-tp-sm"><a href="' + soy.$$escapeHtml(a.showFeedback) + '" class="btn btn-default btn-block">Signaler un probl\u00e8me ou une erreur sur cette page</a></div>' : "" : '<div class="col-sm-6 col-lg-4 mrgn-tp-sm"><a href="https://www.canada.ca/fr/signaler-probleme.html" class="btn btn-default btn-block">Signaler un probl\u00e8me ou une erreur sur cette page</a></div>');
        if (!1 != a.showShare) {
            b += '<div class="col-sm-3 mrgn-tp-sm pull-right">';
            if (null != a.showShare) {
                for (var b = b + '<div class="wb-share" data-wb-share=\'{"filter": [', e = a.showShare, f = e.length, c = 0; c < f; c++) b += '"' + soy.$$escapeHtml(e[c]) + '"' + (c != f - 1 ? ", " : "");
                b += '], "lnkClass": "btn btn-default btn-block"}\'></div>'
            } else b += '<div class="wb-share" data-wb-share=\'{"lnkClass": "btn btn-default btn-block"}\'></div>';
            b += "</div>"
        }
        b += '<div class="datemod col-xs-12 mrgn-tp-lg"><dl id="wb-dtmd">' + (null != a.screenIdentifier ?
            '<dt>Identificateur d\'\u00e9cran&#160;:&#32;</dt><dd property="identifier">' + soy.$$escapeHtml(a.screenIdentifier) + "</dd>" : "") + (null != a.dateModified ? '<dt>Date de modification&#160;:&#32;</dt><dd><time property="dateModified">' + soy.$$escapeHtml(a.dateModified) + "</time></dd>" : "") + (null != a.versionIdentifier ? '<dt>Version&#160;:&#32;</dt><dd property="version">' + soy.$$escapeHtml(a.versionIdentifier) + "</dd>" : "") + "</dl></div></div>"
    }
    return b
};
wet.builder.secmenu = function (a, h) {
    for (var b = '\t\t\t<h2 id="wb-sec-h" class="wb-inv">Menu de la section</h2>', e = a.sections, f = e.length, c = 0; c < f; c++) {
        for (var d = e[c], b = b + ('<section class="list-group menu list-unstyled"><h3>' + (null != d.sectionLink ? '<a href="' + soy.$$escapeHtml(d.sectionLink) + '"' + (!0 == d.newWindow ? ' target="_blank"' : "") + ">" : "") + soy.$$escapeHtml(d.sectionName) + (!0 == d.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + (null != d.sectionLink ? "</a>" : "") + '</h3><ul class="list-group menu list-unstyled">'),
                 d = d.menuLinks, l = d.length, k = 0; k < l; k++) {
            var g = d[k];
            if (null != g.subLinks) {
                for (var b = b + ('<li><a href="' + soy.$$escapeHtml(g.href) + '" class="list-group-item"' + (!0 == g.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(g.text) + (!0 == g.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + '</a><ul class="list-group menu list-unstyled">'), g = g.subLinks, p = g.length, n = 0; n < p; n++) var m = g[n], b = b + ('<li><a href="' + soy.$$escapeHtml(m.subhref) + '" class="list-group-item"' + (!0 == m.newWindow ?
                    ' target="_blank"' : "") + ">" + soy.$$escapeHtml(m.subtext) + (!0 == m.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + "</a></li>");
                b += "</ul></li>"
            } else b += '<li><a href="' + soy.$$escapeHtml(g.href) + '" class="list-group-item"' + (!0 == g.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(g.text) + (!0 == g.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + "</a></li>"
        }
        b += "</ul></section>"
    }
    return b
};
wet.builder.footer = function (a, h) {
    a = a || {};
    var b = '\t\t<footer role="contentinfo" id="wb-info">';
    if (!1 != a.showFooter) {
        b += '<nav role="navigation" class="container wb-navcurr"><h2 class="wb-inv">Au sujet du gouvernement</h2><ul class="list-unstyled colcount-sm-2 colcount-md-3">';
        if (null != a.contactLinks) for (var e = a.contactLinks, f = e.length, c = 0; c < f; c++) var d = e[c], b = b + (0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '">Contactez-nous</a></li>' : ""); else b += '<li><a href="https://www.canada.ca/fr/contact.html">Contactez-nous</a></li>';
        b += '<li><a href="https://www.canada.ca/fr/gouvernement/min.html">Minist\u00e8res et organismes</a></li><li><a href="https://www.canada.ca/fr/gouvernement/fonctionpublique.html">Fonction publique et force militaire</a></li><li><a href="https://www.canada.ca/fr/nouvelles.html">Nouvelles</a></li><li><a href="https://www.canada.ca/fr/gouvernement/systeme/lois.html">Trait\u00e9s, lois et r\u00e8glements</a></li><li><a href="https://www.canada.ca/fr/transparence/rapports.html">Rapports \u00e0 l\'\u00e9chelle du gouvernement</a></li><li><a href="http://pm.gc.ca/fra">Premier ministre</a></li><li><a href="https://www.canada.ca/fr/gouvernement/systeme.html">Comment le gouvernement fonctionne</a></li><li><a href="http://ouvert.canada.ca/">Gouvernement ouvert</a></li></ul></nav><div class="brand"><div class="container"><div class="row"><nav class="col-md-10 ftr-urlt-lnk"><h2 class="wb-inv">\u00c0 propos du site</h2><ul><li><a href="https://www.canada.ca/fr/sociaux.html">M\u00e9dias sociaux</a></li><li><a href="https://www.canada.ca/fr/mobile.html">Applications mobiles</a></li><li><a href="https://www1.canada.ca/fr/nouveausite.html">\u00c0 propos de Canada.ca</a></li><li><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a></li><li><a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialit\u00e9</a></li>'
    } else {
        b +=
            '<div id="transactFooter"></div><div class="brand"><div class="container"><div class="row"><nav class="col-md-10 ftr-urlt-lnk"><h2 class="wb-inv">\u00c0 propos du site</h2><ul>';
        if (null != a.contactLinks) for (e = a.contactLinks, f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '">Coordonn\u00e9es</a></li>' : ""; else b += '<li><a href="https://www.canada.ca/fr/contact.html">Coordonn\u00e9es</a></li>';
        b += (null != a.termsLink ? '<li><a href="' + soy.$$escapeHtml(a.termsLink) + '">Avis</a></li>' :
            '<li><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a></li>') + (null != a.privacyLink ? '<li><a href="' + soy.$$escapeHtml(a.privacyLink) + '">Confidentialit\u00e9</a></li>' : '<li><a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialit\u00e9</a></li>')
    }
    return b += '</ul></nav><div class="col-xs-6 visible-sm visible-xs tofpg"><a href="#wb-cont">Haut de la page <span class="glyphicon glyphicon-chevron-up"></span></a></div><div class="col-xs-6 col-md-2 text-right"><object type="image/svg+xml" tabindex="-1" role="img" data=\'' +
        '../wet-boew/assets/wmms-blk.svg\' aria-label="Symbole du gouvernement du Canada"></object></div></div></div></div></footer>'
};
wet.builder.refFooter = function (a, h) {
    a = a || {};
    return "\t\t\x3c!--[if gte IE 9 | !IE ]>\x3c!--\x3e<script src='" + ("external" == a.jqueryEnv ? "https://ajax.googleapis.com/ajax/libs/" : "../wet-boew/js/") + 'jquery/2.1.4/jquery.min.js\' >\x3c/script><script src=\'' +
        "../wet-boew/js/wet-boew.js'>\x3c/script>\x3c!--<![endif]--\x3e\x3c!--[if lt IE 9]><script src='" + wet.builder.environment(a) + "js/ie8-wet-boew2.min.js'>\x3c/script><![endif]--\x3e<script src='" + "../wet-boew/js/theme.min.js'>\x3c/script>" + (!0 == a.exitScript && null != a.exitURL ? '<script data-id="exitScript" data-token="' + soy.$$escapeHtml(a.exitURL) + '" ' + (null != a.exitDomains ? 'data-token-domains="' + soy.$$escapeHtml(a.exitDomains) + '" ' : "") + (!1 == a.displayModal ? 'data-token-modal="false" ' : "") + "src='" +
            wet.builder.environment(a) + 'cdts/exitScript.js\'>\x3c/script><a id="sExitModalLink" class="wb-lbx lbx-modal wb-inv" title="" href="#sExitModal">Avis de sortie s\u00e9curis\u00e9e</a><section id="sExitModal" class="mfp-hide modal-dialog modal-content overlay-def"><header class="modal-header"><h2 class="modal-title">Avertissement</h2></header><div class="modal-body"><p>' + (null != a.exitMsg ? soy.$$escapeHtml(a.exitMsg) : "Vous \u00eates sur le point de quitter un site s\u00e9curis\u00e9. Voulez-vous continuer?") +
            '</p></div><div class="modal-footer"><button type="button" class="btn btn-primary popup-modal-dismiss pull-left" id="eCancel"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;Annuler</button><button type="button" class="btn btn-default popup-modal pull-right" id="eOK">Oui&nbsp;<span class="glyphicon glyphicon-arrow-right"></span></button></div></section>' : "") + (!0 == a.isApplication ? "<script src='" + wet.builder.environment(a) + "cdts/cdtscustom.js'>\x3c/script>" : "") + (null != a.webAnalytics ? '<script type="text/javascript">_satellite.pageBottom();\x3c/script>' :
            "")
};
if ("undefined" == typeof applicationPage) var applicationPage = {};
applicationPage.appTop = function (a, h) {
    var b = '\t\t<ul id="wb-tphp"><li class="wb-slc"><a class="wb-sl" href="#wb-cont">Passer au contenu principal</a></li><li class="wb-slc visible-sm visible-md visible-lg"><a class="wb-sl" href="#wb-info">Passer \u00e0 \u00ab&#160;' + (!0 == a.topCusMenu ? "Liens connexes" : "\u00c0 propos de cette application Web") + "&#160;\u00bb</a></li>" + (!0 == a.topSecMenu ? '<li class="wb-slc visible-md visible-lg"><a class="wb-sl" href="#wb-sec">Passer au menu de la section</a></li>' : "") +
        '</ul><header role="banner"><div id="wb-bnr" class="container"><div class="row"><div class="brand col-xs-9 col-sm-8 col-md-6"><object type="image/svg+xml" tabindex="-1" data=\'' + '../wet-boew/assets/sig-blk-fr.svg\'></object><span class="wb-inv"> Gouvernement du Canada / <span lang="en">Government of Canada</span></span></div>';
    if (null != a.lngLinks) {
        for (var b = b + '<section id="wb-lng" class="text-right col-xs-3 col-sm-4 col-md-6"><h2 class="wb-inv">S\u00e9lection de la langue</h2><ul class="list-inline margin-bottom-none">',
                 e = a.lngLinks, f = e.length, c = 0; c < f; c++) var d = e[c], b = b + ('<li><a lang="' + soy.$$escapeHtml(d.lang) + '" href="' + soy.$$escapeHtml(d.href) + '">' + soy.$$escapeHtml(d.text) + "</a></li>");
        b += "</ul></section>"
    }
    b += (null != a.customSearch ? '<section id="wb-srch" class="text-right col-xs-3 col-sm-4 col-md-6 visible-md visible-lg">' + ("test" == a.customSearch ? '<h2>Recherche</h2><form action="#" method="post" name="cse-search-box" role="search" class="form-inline"><div class="form-group"><label for="wb-srch-q" class="wb-inv">Recherchez le site Web</label><input id="wb-srch-q" list="wb-srch-q-ac" class="wb-srch-q form-control" name="q" type="search" value="" size="27" maxlength="150" placeholder="Recherche"><datalist id="wb-srch-q-ac">\x3c!--[if lte IE 9]><select><![endif]--\x3e\x3c!--[if lte IE 9]></select><![endif]--\x3e</datalist></div><div class="form-group submit"><button type="submit" id="wb-srch-sub" class="btn btn-primary btn-small" name="wb-srch-sub"><span class="glyphicon-search glyphicon"></span><span class="wb-inv">Recherche</span></button></div></form>' :
        "") + "</section>" : "") + '</div></div><div class="app-bar"><div class="container"><div class="row">' + (null != a.appSettings || null != a.signOut || null != a.signIn ? '<section class="col-xs-12 col-sm-7">' : '<section class="col-xs-12">');
    e = a.appName;
    f = e.length;
    for (c = 0; c < f; c++) d = e[c], b += 0 == c ? '<h2 class="wb-inv">Nom de l\'application Web</h2><a class="app-name" href="' + soy.$$escapeHtml(d.href) + '">' + soy.$$escapeHtml(d.text) + "</a>" : "";
    b += "</section>";
    if (null != a.appSettings || null != a.signOut || null != a.signIn) {
        b += '<nav class="col-sm-5 hidden-xs hidden-print" role="navigation"><h2 class="wb-inv">Menu des param\u00e8tres du compte</h2><ul class="app-list-account list-unstyled">';
        if (null != a.appSettings) for (e = a.appSettings, f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Param\u00e8tres du compte</a></li>&#32;' : "";
        if (null != a.signOut) for (e = a.signOut, f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Fermer la session</a></li>' : ""; else if (null != a.signIn) for (e = a.signIn,
                                                                                                                                                                                                                                                                                                               f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Ouvrir une session</a></li>' : "";
        b += "</ul></nav>"
    }
    b += "</div></div></div>";
    if (null != a.customSearch || null != a.menuPath || null != a.menuLinks || !0 == a.topSecMenu || null != a.appSettings || null != a.signOut || null != a.signIn) {
        b += '<div class="app-bar-mb container visible-xs-block hidden-print">' + (null != a.menuPath || null != a.menuLinks || !0 == a.topSecMenu || null != a.customSearch ?
            '<nav role="navigation"><h2 class="wb-inv">' + (null != a.menuPath || null != a.menuLinks || !0 == a.topSecMenu ? "Menu" + (null != a.customSearch ? " et recherche" : "") : "Recherche") + '</h2><ul class="app-list-main list-unstyled">' + (null != a.menuPath || null != a.menuLinks || !0 == a.topSecMenu ? '<li class="wb-mb-links" id="wb-glb-mn"><a href="#mb-pnl" aria-controls="mb-pnl" class="btn overlay-lnk" role="button">Menu</a><h2>Menu</h2></li>' : "") + (null != a.customSearch ? '<li><a href="#app-srch-mb" title="Recherche" aria-controls="app-srch-mb" class="btn overlay-lnk" role="button"><span class="glyphicon-search glyphicon" aria-hidden="true"></span><span class="wb-inv">Recherche</span></a></li>' :
            "") + '</ul><div id="mb-pnl"></div>' + (null != a.customSearch ? '<section id="app-srch-mb" class="wb-overlay modal-content overlay-def wb-bar-t">' + ("test" == a.customSearch ? '<div class="modal-header"><h3 class="modal-title">Recherche</h3></div><div class="modal-body"><form action="#" method="post" name="cse-search-box" role="search" class="form-inline"><div class="input-group"><label for="app-srch-q-mb" class="wb-inv">Recherchez le site Web</label><input id="app-srch-q-mb" list="app-srch-q-ac-mb" class="app-srch-q-mb form-control" name="q" type="search" value="" size="27" maxlength="150"><datalist id="app-srch-q-ac-mb">\x3c!--[if lte IE 9]><select><![endif]--\x3e\x3c!--[if lte IE 9]></select><![endif]--\x3e</datalist><span class="input-group-btn"><button type="submit" id="app-srch-sub-mb" class="btn btn-primary btn-small" name="app-srch-sub-mb"><span class="glyphicon-search glyphicon"></span><span class="wb-inv">Recherche</span></button></span></div></form></div>' :
            "") + "</section>" : "") + "</nav>" : "");
        if (null != a.appSettings || null != a.signOut || null != a.signIn) {
            b += '<nav role="navigation"><h2 class="wb-inv">Menu des param\u00e8tres du compte</h2><ul class="app-list-account list-unstyled">';
            if (null != a.appSettings) for (e = a.appSettings, f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Param\u00e8tres du compte</a></li>&#32;' : "";
            if (null != a.signOut) for (e = a.signOut,
                                            f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Fermer la session</a></li>' : ""; else if (null != a.signIn) for (e = a.signIn, f = e.length, c = 0; c < f; c++) d = e[c], b += 0 == c ? '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="btn"><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Ouvrir une session</a></li>' : "";
            b += "</ul></nav>"
        }
        b += "</div>";
        if (null != a.menuLinks) {
            b += '<nav role="navigation" id="wb-sm" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg" typeof="SiteNavigationElement"><div class="pnl-strt container nvbar"><h2 class="wb-inv">Menu de navigation principal</h2><div class="row"><ul class="list-inline menu" role="menubar">';
            e = a.menuLinks;
            f = e.length;
            for (c = 0; c < f; c++) if (d = e[c], null != d.subLinks) {
                for (var b = b + ("<li><a" + (null != d.href ? ' href="' + soy.$$escapeHtml(d.href) + '"' : "") + ' class="item"' + (!0 == d.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(d.text) + (!0 == d.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + '</a><ul class="sm list-unstyled" id="s2" role="menu">'), d = d.subLinks, l = d.length, k = 0; k < l; k++) var g = d[k], b = b + (k == l - 1 ? '<li class="slflnk"><a href="' + soy.$$escapeHtml(g.subhref) +
                    '"' + (!0 == g.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(g.subtext) + (!0 == g.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + "</a></li>" : '<li><a href="' + soy.$$escapeHtml(g.subhref) + '"' + (!0 == g.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(g.subtext) + (!0 == g.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + "</a></li>");
                b += "</ul></li>"
            } else b += '<li><a href="' + soy.$$escapeHtml(d.href) + '" class="item"' +
                (!0 == d.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(d.text) + (!0 == d.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' : "") + "</a></li>";
            b += "</ul></div></div></nav>"
        } else null != a.menuPath && (b += '<nav role="navigation" id="wb-sm" data-ajax-replace="' + soy.$$escapeHtml(a.menuPath) + '" data-trgt="mb-pnl" class="wb-menu visible-md visible-lg" typeof="SiteNavigationElement"></nav>')
    }
    if (null != a.breadcrumbs) {
        b += '<nav role="navigation" id="wb-bc" property="breadcrumb"><h2>Vous \u00eates ici :</h2><div class="container"><div class="row"><ol class="breadcrumb">';
        e = a.breadcrumbs;
        f = e.length;
        for (c = 0; c < f; c++) d = e[c], b += "<li>" + (null != d.acronym ? '<abbr title="' + soy.$$escapeHtml(d.acronym) + '">' : "") + (null != d.href ? '<a href="' + soy.$$escapeHtml(d.href) + '">' : "") + soy.$$escapeHtml(d.title) + (null != d.href ? "</a>" : "") + (null != d.acronym ? "</abbr>" : "") + "</li>";
        b += "</ol></div></div></nav>"
    }
    return b + "</header>"
};
applicationPage.appFooter = function (a, h) {
    a = a || {};
    var b = '\t\t<footer role="contentinfo" id="wb-info">';
    if (null != a.footerSections) {
        for (var b = b + '<nav role="navigation" class="container wb-navcurr"><h2 class="wb-inv">Liens connexes</h2><ul class="list-unstyled colcount-sm-2 colcount-md-3">', e = a.footerSections, f = e.length, c = 0; c < f; c++) var d = e[c], b = b + ('<li><a href="' + soy.$$escapeHtml(d.href) + '"' + (!0 == d.newWindow ? ' target="_blank"' : "") + ">" + soy.$$escapeHtml(d.text) + (!0 == d.newWindow ? '<span class="wb-inv"> Ce lien ouvrira dans une nouvelle fen\u00eatre</span>' :
            "") + "</a></li>");
        b += "</ul></nav>"
    }
    return b += '<div class="brand"><div class="container"><div class="row"><nav class="col-md-10 ftr-urlt-lnk"><h2 class="wb-inv">\u00c0 propos de cette application Web</h2><ul>' + (null != a.contactLink ? '<li><a href="' + soy.$$escapeHtml(a.contactLink) + '">Coordonn\u00e9es</a></li>' : '<li><a href="https://www.canada.ca/fr/contact.html">Coordonn\u00e9es</a></li>') + (null != a.termsLink ? '<li><a href="' + soy.$$escapeHtml(a.termsLink) + '">Avis</a></li>' : '<li><a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a></li>') +
        (null != a.privacyLink ? '<li><a href="' + soy.$$escapeHtml(a.privacyLink) + '">Confidentialit\u00e9</a></li>' : '<li><a href="https://www.canada.ca/fr/transparence/confidentialite.html">Confidentialit\u00e9</a></li>') + '</ul></nav><div class="col-xs-6 visible-sm visible-xs tofpg"><a href="#wb-cont">Haut de la page <span class="glyphicon glyphicon-chevron-up"></span></a></div><div class="col-xs-6 col-md-2 text-right"><object type="image/svg+xml" tabindex="-1" role="img" data=\'' + '../wet-boew/assets/wmms-blk.svg\' aria-label="Symbole du gouvernement du Canada"></object></div></div></div></div></footer>'
};
