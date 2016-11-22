(function () {
'use strict';


    //TODO: Lazy load modules
    angular.module('dossierApp', ['pascalprecht.translate', 'dossierModule'])
    .controller('MainController', MainController);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['dossierApp']);
    })

    function MainController() {
            var vm = this;
            vm.formType = 'EXT';

        }


})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .config(['$translateProvider', function ($translateProvider) {
            /*   $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: './resources/dossier-dosageform-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/fileIO-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/dossier-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/dossier-general-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/applicationInfo-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/contact-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/appendix4-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/dossier-msg-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/messages-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/general-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/scheduleA-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/formulation-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/roa-',
                        suffix: '.json'
                    },
                    {
                        prefix: './resources/countries-',
                        suffix: '.json'
                    }

                ]
             });*/
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            //  $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);
})();