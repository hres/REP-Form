/**
 * Created by dkilty on 03/04/2017.
 */


(function () {
    'use strict';
    angular
        .module('cspApp', [
            'pascalprecht.translate',
            'translations',
            'ngMessages',
            'ngAria',
            'ngSanitize',
            'cspMain',
            'dataLists',
            'cspLoadService'
        ])
})();
(function () {
    'use strict';
    angular
        .module('cspApp')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;
        vm.formType = 'INT';
    }
})();

(function () {
    'use strict';
    angular
        .module('cspApp')
        .config(['$translateProvider','$locationProvider','$httpProvider', function ($translateProvider, $locationProvider, $httpProvider) {

            $locationProvider.html5Mode(
                {enabled : true,
                    requireBase: false,
                    rewriteLinks : false});

            $translateProvider.preferredLanguage('fr');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader

            // Prevents caching of ALL file types in this form
            // because previous version of code introduced browser-related errors
            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        }]);
})();