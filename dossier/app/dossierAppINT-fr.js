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
            vm.formType = 'INT';

        }


})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: 'app/resources/dossier-dosageform-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/fileIO-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/dossier-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/dossier-general-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/applicationInfo-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/contact-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/appendix4-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/dossier-msg-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/messages-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/scheduleA-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/formulation-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/roa-',
                        suffix: '.json'
                    }

                ]
            });
            $translateProvider.preferredLanguage('fr');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            //  $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);
})();