/**
 * Created by dkilty on 02/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('animalSourcedRecord', [])
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
                onDelete: '&',
                showErrors: '&',
            }
        });

    animalSourcedController.$inject=['DossierLists'];

    function animalSourcedController(DossierLists){
        var vm = this;
        vm.animalsList = DossierLists.getAnimalSources();
        vm.yesNoUnknownList = DossierLists.getYesNoUnknownList();
        vm.model = {};

        vm.$onInit = function(){

        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }


        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };

        vm.showError = function (ctrl) {
            if(!ctrl){
                console.warn("No control found in animalSourced-record");
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showErrors()) )
        }

    }
})();