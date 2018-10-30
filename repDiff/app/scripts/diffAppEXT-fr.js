/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('diffFormApp', [
            'pascalprecht.translate',
            'translations',
            'diffMain',
            'repCommon'
        ])
})();

// https://github.com/angular-ui-tree/angular-ui-tree


(function () {
    'use strict';
    angular
        .module('diffFormApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$translate'];
    function MainController($translate) {
        var vm = this;

    }
})();
//test
(function () {
    'use strict';
    angular
        .module('diffFormApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('fr');
            /* $translateProvider.useStaticFilesLoader({
             files: [{
             prefix: '/app/i18n/dossierXml-',
             suffix: '.json'
             }, {
             prefix: '/app/i18n/companyXml-',
             suffix: '.json'
             }, {
             prefix: '/app/i18n/transactionXml-',
             suffix: '.json'
             }, {
             prefix: '/app/i18n/activityXml-',
             suffix: '.json'
             }

             ]
             });*/


            // $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);
            // $translateProvider.forceAsyncReload(true); //needed for the custom loader

        }]);
})();