"use strict";
/**
 * @ngdoc service
 * @name common:util-common
 *
 * @description Service for common, generic functionality that can be used against all forms
 *
 *
 * */

(function () {

    angular
        .module('repCommon', ['hpfbConstants', 'pascalprecht.translate'])
})();


(function () {
    angular
        .module('repCommon')
        .factory('repUtil', repUtilCtrl);

    repUtilCtrl.$inject = ['$window','$translate', '$location', 'FRENCH'];

    function repUtilCtrl($window, $translate, $location, FRENCH) {

        var service = {
            openExternalLink:_openExternalHelpLink,
            openInternalLink:_openInternalHelpLink
        };
        return service;

        ////////////////////////////

        /**
         * Gets the current language used by angular translate
         * @returns {string|*|object}
         * @private
         */
        function _getCurrentLang() {
            return ($translate.proposedLanguage() || $translate.use());
        }


        /**
         *
         * @param externalLink_en - the full url for the english page and subsection
         * @param externalLink_fr - the full url for the english page and subsection
         *
         */
        function _openExternalHelpLink (externalLink_en, externalLink_fr) {

            var helpUrl = "";
            if (_getCurrentLang === FRENCH) {
                $window.open(externalLink_fr);
            } else {
                $window.open(externalLink_en);
            }
        }

        /**
         * Opens a url to the help pages
         * @param page_en
         * @param page_fr
         */
       function _openInternalHelpLink (page_en, page_fr) {
            var url = $location.absUrl() ;//this is the only one that seems to work
            var split = url.split('/');
            var length = url.length - split[split.length - 1].length;
            var newUrl = url.substring(0, length);
            var enPage = newUrl + page_en; //complete url for the english page
            var frPage = newUrl + page_fr; //complete url for the french page
            console.log("new url" + newUrl);
            _openExternalHelpLink(enPage, frPage);
        }
    }
})();



