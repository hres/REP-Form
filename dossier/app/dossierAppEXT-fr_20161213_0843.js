(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('dossierApp', ['pascalprecht.translate', 'dossierLoadModule', 'dossierModule', 'dataLists', 'translations'])
        .controller('MainController', MainController)

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['dossierApp']);
    })
    MainController.$inject = ['$translate', 'getCountryAndProvinces']
    function MainController($translate, getCountryAndProvinces) {
        var vm = this;
        vm.formType = 'EXT';
    }
})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.preferredLanguage('fr');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader
        }]);
})();
