/**
 * Created by hcuser on 27/10/2016.
 */

(function () {
    'use strict';

    angular
        .module('theraClassRecord', ['errorMessageModule'])
})();

(function () {
    'use strict';

    angular
        .module('theraClass')
        .component('cmpTheraRecord', {
            templateUrl: 'app/scripts/components/therapeutic-classification/tpl-thera-record.html',
            controller: therapeuticClassCtrl,
            controllerAs:'theraRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&'
            }
        });

    therapeuticClassCtrl.$inject=['$scope'];
    function therapeuticClassCtrl($scope){
        var vm = this;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.model = {};

        vm.$onInit = function(){
            _setIdNames();
        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }
        };


        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };


        vm.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && vm.showErrors()) )
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.theraNameId = "thera_class_name" + scopeId;

        }

    }
})();