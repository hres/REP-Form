/**
 * Created by dkilty on 10/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('countryRecordModule', ['ui.select'])
})();

(function () {
    'use strict';

    angular
        .module('countryRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpCountryRecord', {
            templateUrl: './app/components/country-list/tpl-country-record_20170106_1415.html',
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

    countryRecordController.$inject = ['$filter']
    function countryRecordController($filter) {
        var vm = this;

        vm.model = {};
        vm.countries=[];
        vm.$onInit = function(){

        };

        vm.$onChanges = function (changes) {

            if(changes.countryList){
                vm.countries=changes.countryList.currentValue;
            }
            if (changes.record) {
                vm.model = changes.record.currentValue;
                if (vm.model.name) {
                    vm.model.pair = $filter('findCountryObject')(vm.countries, vm.model.name);
                    //TODO get object
                }
            }

        };

        vm.deleteRecord = function()  {
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