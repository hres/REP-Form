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
        vm.formType = 'EXT';
    }
})();

(function () {
    'use strict';
    angular
        .module('cspApp')
        .config(['$translateProvider', function ($translateProvider) {

            $translateProvider.preferredLanguage('fr');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader
        }]);
})();