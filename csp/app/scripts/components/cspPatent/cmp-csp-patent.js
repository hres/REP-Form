/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspPatent', [
            'numberFormat',
            'errorMessageModule',
            'hpfbConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspPatent')
        .component('cmpCspPatent', {
            templateUrl: 'app/scripts/components/cspPatent/tpl-csp-patent.html',
            controller: cspPatentController,
            controllerAs: 'cspPatentCtrl',
            bindings: {
                record: '<',
                showErrors: '&',
                updateErrorSummary:'&',
                language:'<'
            }
        });

    cspPatentController.$inject = ['$scope','FRENCH'];
    function cspPatentController($scope,FRENCH) {

        var vm = this;
        vm.model="";
        vm.min7Error = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_7NUM"}];

        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            _setIDNames();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){
                vm.model=changes.record.currentValue;
            }
            if(changes.language){
                vm.lang=changes.language.currentValue;
            }
        };

        /**
         * Creates the ids for all the ui elements
         * @private
         */
        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.patentNumId = "patentNum" + scopeId;
            vm.dateFiledId = "dateFiled" + scopeId;
            vm.dateGrantedId = "dateGranted" + scopeId;
            vm.dateExpiryId = "dateExpiry" + scopeId;
        }

        $scope.$watch('cspPatentCtrl.patentForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

        vm.isFrench=function(){
            return vm.lang===FRENCH;
        };
    }
})();