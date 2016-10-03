/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', ['activeIngListModule', 'nonMedIngListModule', 'containerTypeListModule', 'materialIngListModule', 'roaModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationRecordModule')
        .component('cmpFormulationRecord', {
            templateUrl: './app/components/formulations/tpl-formulation-record.html',
            controllerAs: 'formulRecCtrl',
            controller: formulationRecCtrl,
            bindings: {
                record: '<'
            }

        });

    function formulationRecCtrl() {

    }
})();
