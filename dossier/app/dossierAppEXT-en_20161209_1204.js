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
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            //  $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);
})();