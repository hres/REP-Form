/**
 * Created by dkilty on 10/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('srcCountryRecordModule',
            [   'ui.select',
                'hpfbConstants',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('srcCountryRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpSrcCountryRecord', {
            templateUrl: 'app/scripts/components/source-country-list/tpl-src-country-record.html',
            controller: srcCountryRecordController,
            controllerAs:'srcCountryRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '<',
                countryList:'<',
                updateCountryList:'<',
                updateRecord:'&',
                onError: '&',
                fieldsetLabel:'@',
                isFocus: '<',
                cancelFocus: '&'
            }
        });

    srcCountryRecordController.$inject = ['$scope','$filter','$translate','UNKNOWN'];
    function srcCountryRecordController($scope,$filter, $translate, UNKNOWN) {
        var vm = this;

        vm.model = {"id": "", "country": "","unknownCountryDetails":"","display":""};
        vm.countries=[];
        vm.onChangeCount = 0;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.showDetailErrors=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.srcCountryFilter = "srcCountryRecCtrl.model.display";

        vm.$onInit = function(){
            vm.showDetailErrors=false;
            vm.countryList = vm.updateCountryList();
            _setIdNames();
        };
        /**
         * Updates the display value for the object for summary display
         */
        vm.countryChanged=function(value){
            var found = false;
            for(var i = 0; i < vm.countries.length; i++){
                if(vm.countries[i][vm.lang] === vm.model.display){
                    vm.model.country = vm.countries[i];
                    found = true;
                    break;
                }
            }
            if(found){
                vm.countryList = vm.updateCountryList();
                vm.updateRecord();
                vm.clearFilter($scope);
                if(vm.isUnknown) {
                	$("#"+vm.countryId).focus();
                }
            } else {
                vm.model.display = "";
                if (vm.model.country) {
                    vm.model.country = {};
                }
                vm.onError();
            }

        };


        vm.$onChanges = function (changes) {
            if(changes.countryList && vm.onChangeCount < 2){
                vm.countries=changes.countryList.currentValue;
            }
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                 vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };

        vm.saveRecord = function () {
			if(vm.model.country.length === 0 
			        || vm.model.unknownCountryDetails.lengh === 0
			        ) {
			  vm.showDetailErrors = true;
			}
            if(vm.countryChanged()){
                vm.countryList = vm.updateCountryList();
                vm.updateRecord();
                vm.clearFilter($scope);
                // } else {
                //     vm.onError();
            }
        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            if(vm.model.country == "" && vm.model.display != ""){
                return true;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        vm.isUnknown=function(){
            if(!vm.model || !vm.model.country){
                return false;
            }
            return (vm.model.country.id === UNKNOWN);
        };
        vm.clearFilter = function($scope){
            $scope.srcCountryFilter = "";
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.countryId="country_name" + scopeId;
            vm.unknownCountryId="unknown_country_details" + scopeId;
            vm.countryListId = "srcCountryList" + scopeId;
        }
    }
})();