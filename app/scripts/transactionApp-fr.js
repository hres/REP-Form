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
            'numberFormat'
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
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: 'app/resources/countries-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/address-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/stateProvinces-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    },
                    {
                     prefix: 'app/resources/fileIO-',
                     suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/messages-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/contact-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/transaction-',
                        suffix: '.json'
                    }
                ]
            })
            $translateProvider.preferredLanguage('fr');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
        }]);
})();
