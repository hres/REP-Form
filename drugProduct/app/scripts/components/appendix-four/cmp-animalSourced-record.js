/**
 * Created by dkilty on 02/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('animalSourcedRecord', ['errorMessageModule'])
})();

(function () {
    'use strict';

    angular
        .module('animalSourcedRecord')
        .component('cmpAnimalSourcedRecord', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-animalSourced-record.html',
            controller: animalSourcedController,
            controllerAs:'animalSrcCtrl',
            bindings: {
                record: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors: '<',
                isFocus: '<',
                cancelFocus: '&'
            }
        });

    animalSourcedController.$inject=['DossierLists','$scope'];

    function animalSourcedController(DossierLists,$scope){
        var vm = this;
        vm.showDetailErrors=false;
        vm.updateRecord = 0; //triggers and error update
        vm.animalsList = DossierLists.getAnimalSources();
        vm.yesNoUnknownList = DossierLists.getYesNoUnknownList();
        vm.model = {};
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.$onInit = function(){
            _setIdNames();
            vm.showDetailErrors=false;
        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };

        vm.saveRecord = function () {
        	if(vm.model.animalType.length === 0 
                    || !vm.model.animalType.trim()
                    || vm.model.animalDetail.length === 0 
                    || !vm.model.animalDetail.trim()
                    ) {
        	  vm.showDetailErrors = true;
        	}
            vm.updateRecord = vm.updateRecord + 1;
            vm.onUpdate({rec: vm.model});
            
        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };

        vm.showError = function (ctrl) {
            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.roleMissingId = "roleMissing" + scopeId;
            vm.systemRoleId = "system_role" + scopeId;
            vm.animalTypeId="animal_type"+scopeId;
            vm.animalTypeDetailId="animal_details"+scopeId;
        }


    }
})();