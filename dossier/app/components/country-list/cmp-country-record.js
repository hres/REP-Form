/**
 * Created by dkilty on 10/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('countryRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('countryRecordModule')
        .component('cmpCountryRecord', {
            templateUrl: './app/components/country-list/tpl-country-record.html',
            controller: countryRecordController,
            controllerAs:'countryRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&',
                countryList:'<',
                fieldsetLabel:'@'
            }
        });


    function countryRecordController(){
        var vm = this;

        vm.model = {};
        vm.countries=[];
        vm.$onInit = function(){

        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }
            if(changes.countryList){
                vm.countries=changes.countryList.currentValue;
            }
        };

        vm.deleteRecord = function()  {
            console.log("deleting ....."+vm.model.id)
            vm.onDelete({id: vm.model.id})
        };


        vm.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && vm.showErrors()) )
        }

        vm.isUnknown=function(){
            if(vm.model.name==='UNKNOWN'){ //TODO constants service

                return true;
            }
            return false;
        }
    }
})();