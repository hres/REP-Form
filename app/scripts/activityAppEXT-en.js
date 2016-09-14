/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate',
            'activityMain'
        ])
})();

(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    //MainController.$inject = ['CompanyService', 'hpfbFileProcessing', '$filter', '$scope']


    function MainController() {
        var vm = this;
        vm.formType = 'EXT';
    }
})();

(function () {
    'use strict';
    angular
        .module('activityApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [
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
                        prefix: 'app/resources/activityInfo-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/activityList-',
                        suffix: '.json'
                    }

                ]
            });
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);
})();