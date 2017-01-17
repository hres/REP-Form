(function () {
    'use strict';
    angular
        .module('transactionApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'fileIO',
            'services',
            'dataLists',
            'transactionInfo',
            'addressModule',
            'contactModule25',
            'contactModule26',
            'contactModule',
            'transactionService',
            'transactionLoadService',
            'filterLists',
            'lcDetailsModule',
            'numberFormat',
            'ui.bootstrap',
            'translations',
            'fileIO',
            'ngSanitize'
        ])

})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .controller('MainController', MainController);

    //  MainController.$inject = ['TransactionService','hpfbFileProcessing','$filter']

    function MainController() {

        var vm = this;
        vm.userType;
    }
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('fr');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader
        }]);
})();
