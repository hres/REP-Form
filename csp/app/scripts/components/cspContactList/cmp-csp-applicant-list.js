/**
 * Created by dkilty on 4/24/2017.
 */


/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspContactList', [
            'cspApplicant'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspContactList')
        .component('cmpCspApplicantList', {
            templateUrl: 'app/scripts/components/cspContactList/tpl-csp-applicant-list.html',
            controller: cspApplicantListController,
            controllerAs: 'cspApplListCtrl',
            bindings: {
                record: '<',
                showErrors: '&',
                addApplicant:'&',
                deleteApplicant: '&',
                updateErrorSummary: '&'
            }
        });

    //cspApplicantListController.$inject = ['$scope'];
    function cspApplicantListController() {

        var vm = this;
        vm.model="";

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){

                vm.model=changes.record.currentValue;
            }
        };
    }
})();
