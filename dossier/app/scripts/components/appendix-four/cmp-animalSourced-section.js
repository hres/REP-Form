/**
 * Created by dkilty on 02/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('animalSourcedSection',['animalSourcedList','countryListModule','numberFormat'])
})();

(function () {
    'use strict';

    angular
        .module('animalSourcedSection')
        .component('cmpAnimalSourcedSection', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-animalSourced-section.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: animalSourcedSectionController,
            controllerAs: 'animalSectCtrl'
        });

    animalSourcedSectionController.$inject = ["$filter",'DossierLists'];

    function animalSourcedSectionController($filter,DossierLists) {

        var vm = this;
        vm.yesNoUnknownList=DossierLists.getYesNoUnknownList();
        vm.model={};
        vm.model.animalSrcSection=[];
        vm.oneAnimal = "";
        vm.oneCountry = "";

        vm.$onInit = function () {
            //init code here
            vm.noAnimalSrc()
        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model=changes.records.currentValue;
            }
        };

        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function (ctrl) {
            if(!ctrl){
                console.warn("No control animalSourced-section");
                return false;
            }
           return((ctrl.$invalid && ctrl.$touched)||(ctrl.$invalid && vm.showErrors()))
        };

        vm.updateCountryList = function (list) {

            vm.model.countryList = list;
           // self.onUpdate({model:self.model});

        };
        vm.noAnimalSrc = function () {
            if (vm.model.animalSrcList.length > 0) {
                vm.oneAnimal = "selected";
                return false;
            }
            vm.oneAnimal = "";
            return true;
        };
        vm.noCountrySrc = function () {
            if (vm.model.countryList.length > 0) {
                vm.oneCountry = "selected";
                return false;
            }
            vm.oneCountry = "";
            return true;
        }



    }
})();