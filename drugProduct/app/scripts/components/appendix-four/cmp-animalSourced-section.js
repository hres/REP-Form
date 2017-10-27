/**
 * Created by dkilty on 02/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('animalSourcedSection',['animalSourcedList','countryListModule','numberFormat','errorMessageModule'])
})();

(function () {
    'use strict';

    angular
        .module('animalSourcedSection')
        .component('cmpAnimalSourcedSection', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-animalSourced-section.html',
            bindings: {
                records: '<',
                showErrors: '&',
                updateErrorSummary:'&'
            },
            controller: animalSourcedSectionController,
            controllerAs: 'animalSectCtrl'
        });

    animalSourcedSectionController.$inject = ["$filter",'DossierLists','$scope'];

    function animalSourcedSectionController($filter,DossierLists,$scope) {

        var vm = this;
        vm.yesNoUnknownList=DossierLists.getYesNoUnknownList();
        vm.model={};
        vm.model.animalSrcSection=[];
        vm.oneAnimal = "";
        vm.oneCountry = "";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberErrors= [{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}];


        vm.$onInit = function () {
            _setIdNames();
            vm.noAnimalSrc();
            vm.noCountrySrc();
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
            console.log("updating country list")
            vm.noCountrySrc();

        };
        vm.updateAnimalSourceList=function(list){
            vm.model.animalSrcList = list;
            vm.noAnimalSrc();//update the error state
        };
        /**
         * Error indicator. There must be at least one anumal source record
         * @returns {boolean}
         */
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
                console.log("found a country")
                vm.oneCountry = "selected";
                return false;
            }
            vm.oneCountry = "";
            return true;
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.oneAnimalId="msg_err_one_animal"+scopeId;
            vm.animalSectionRecordId = "anSectForm" + scopeId;
            vm.cellLineId="cellLine" + scopeId;
            vm.controlledPopId="controlledPop"+scopeId;
            vm.ageAnimalsId="ageAnimals"+scopeId;
            vm.isBiotechId="biotechderived"+scopeId;
            vm.noCountryId="msg_err_one_cntry_origin"+scopeId;
        }
        $scope.$watch('animalSectCtrl.anSectForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

    }
})();