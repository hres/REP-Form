(function () {
    'use strict';
    angular
        .module('companyApp', [
            'companyMain'
        ])
})();
//TODO replace with service for incrememnting version
(function () {
    'use strict';
    angular
        .module('companyApp')
        .controller('MainController', MainController);

    //MainController.$inject = ['CompanyService', 'hpfbFileProcessing', '$filter', '$scope']

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
                        prefix: 'app/resources/applicationInfo-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/companyInfo-',
                        suffix: '.json'
                    }
                ]
            })
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
        }]);
})();