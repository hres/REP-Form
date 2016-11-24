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
            'filterLists',
            'lcDetailsModule',
            'numberFormat',
            'ui.bootstrap',
            'translations'
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
            $translateProvider.preferredLanguage('fr');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
        }]);
})();
