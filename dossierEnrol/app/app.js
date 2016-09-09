(function () {
'use strict';


    //TODO: Lazy load modules
angular.module('dossierApp', ['pascalprecht.translate', 'dossierModule']);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['dossierApp']);
    });
})();

