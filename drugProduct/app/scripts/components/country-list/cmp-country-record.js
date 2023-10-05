/**
 * Created by dkilty on 10/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('countryRecordModule',
            [   'ui.select',
                'hpfbConstants',
                'errorMessageModule'
            ])
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
            templateUrl: 'app/scripts/components/country-list/tpl-country-record.html',
            controller: countryRecordController,
            controllerAs:'countryRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '<',
                countryList:'<',
                updateCountryList:'<',
                updateRecord: '&',
                onError: '&',
                fieldsetLabel:'@',
                isFocus: '<',
                cancelFocus: '&'
            }
        });

    countryRecordController.$inject = ['$scope','$filter','$translate','UNKNOWN'];
    function countryRecordController($scope,$filter, $translate, UNKNOWN) {
        var vm = this;

        vm.model = {"id": "", "country": "","unknownCountryDetails":"","display":"", saveButton:""};
        vm.countries=[];
        vm.onChangeCount = 0;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.showDetailErrors=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.countryFilter = "countryRecCtrl.model.display";
        vm.$onInit = function(){
            vm.showDetailErrors=false;
            _setIdNames();
            vm.countryList = vm.updateCountryList();
        };
        /**
         * Updates the display value for the object for summary display
         */
        vm.countryFound = function() {
            var found = false;
            for(var i = 0; i < vm.countries.length; i++){
                if(vm.countries[i][vm.lang] === vm.model.display){
                    vm.model.country = vm.countries[i];
                    found = true;
                    break;
                }
            }
            if( ! found) {
                    vm.model.display = "";
                    vm.model.country = {};
                    vm.model.saveButton = "novalue";
                    vm.showDetailErrors = true;
            }
            return found;
            // if(vm.countryChanged()){
            //     vm.countryList = vm.updateCountryList();
            //     vm.updateRecord();
            //     vm.clearFilter($scope);
            // } else {
            //     vm.onError();
            // }

        };

        vm.countryChanged = function() {
            var found = false;
            for(var i = 0; i < vm.countries.length; i++){
                if(vm.countries[i][vm.lang] === vm.model.display){
                    found = true;
                    vm.model.saveButton = "";
                    break;
                }
            }
            if( ! found) {
                vm.model.display = "";
                vm.model.country = {};
                vm.model.saveButton = "novalue";
                vm.showDetailErrors = true;
            }
            vm.cancelFocus();
        };

        vm.$onChanges = function (changes) {
            if(changes.countryList){
                vm.countries=changes.countryList.currentValue;
            }
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
               // if (vm.model.id && vm.model.country) {
                    vm.model.saveButton = "loaded";
                //}
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };

        vm.saveRecord = function () {
            if(vm.countryFound()){
                vm.countryList = vm.updateCountryList();
                vm.updateRecord();
                vm.clearFilter($scope);
                vm.model.saveButton = "saved";
                // } else {
                //     vm.onError();
            }
        };

        vm.deleteRecord = function()  {
            vm.clearFilter($scope);
            vm.onDelete({id: vm.model.id});
        };


        vm.showError = function (ctrl) {
            if(!ctrl ) return false;
            if(vm.model.country == "" && vm.model.display != ""){
                return true;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        vm.isUnknown=function(){
            if(!vm.model || !vm.model.country){
                return false;
            }
            if(vm.model.country.id===UNKNOWN){
                return true;
            }
            return false;
        };
        vm.clearFilter = function($scope){
            $scope.countryFilter = "";
        }
        vm.isRequired = function(){
            if(vm.model.country == ""){
                return "";
            }
            else {
                return vm.model.display;
            }
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.countryId="country_name" + scopeId;
            vm.unknownCountryId="unknown_country_details" + scopeId;
            vm.countryListId = "countryListId" + scopeId;
        }
    }
})();