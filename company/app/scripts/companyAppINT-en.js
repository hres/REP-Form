(function () {
    'use strict';
    angular
        .module('companyApp', [
            'pascalprecht.translate',
            'companyMain',
            'companyLoadService',
            'translations'
        ])
})();
//TODO replace with service for incrememnting version
(function () {
    'use strict';
    angular
        .module('companyApp')
        .controller('MainController', MainController);

    function MainController() {

        var vm = this;
        vm.formType = 'INT';

    }
})();

(function () {
    'use strict';
    angular
        .module('companyApp')
        .config(['$translateProvider', function ($translateProvider) {

            $translateProvider.preferredLanguage('en');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader
        }]);
})();