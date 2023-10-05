(function () {
    'use strict';

    angular
        .module('updateLang', []);

})();
/***
 * Directive for set lang attribute of.html tag to 'en'
 * Options: use set-condition to indicate set lang attribute of not
 */
(function () {
    'use strict';

    angular
        .module('updateLang')
        .directive('updateLang', updateLangCtrl);

    function updateLangCtrl() {
        var directive = {

            link: link,
            restrict: 'A',
            require: '?ngModel'
        };
        return directive;

        function link(scope, element, attrs) {
            if(attrs.setCondition == 'CAS_NUMfr'){
                element.attr("lang", "en" );
            }
        }
    }

})();