/**
 * Created by Abdessamad on 8/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('countryListModule', ['dataLists', 'countryRecordModule', 'ui.select', 'hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('countryListModule')
        .component('cmpCountryList', {
            templateUrl: 'app/scripts/components/country-list/tpl-country-list.html',
            controller: countryListController,
            controllerAs: 'countryListCtrl',
            bindings: {
                withUnknown: '<',
                listItems: '<',
                onUpdate: '&', //seems redundant, but used as a messaging mech. when something changes
                onDelete: '&',
                showErrors:'<',
                fieldLabel: '@',
                updateErrorSummary:'&'
            }
        });

    countryListController.$inject = ['$filter', 'getCountryAndProvinces','UNKNOWN','$scope'];


    function countryListController($filter, getCountryAndProvinces,UNKNOWN,$scope) {
        var vm = this;
        vm.baseCountries = getCountryAndProvinces.getCountries();
        vm.countryList = "";
        vm.model = {};
        vm.isDetailValid = true;
        vm.resetToCollapsed = true;
        vm.noCountries=""; //TODO deprecate
        vm.showDetailErrors=false;
        vm.selectRecord = 0;
        vm.columnDef = [
            {
                label: vm.fieldLabel,
                binding: "display",
                width: "100"
            }
        ]

        vm.hasUnknown = false;
        vm.emptyModel = {"id": "", "country": "","unknownCountryDetails":"","display":""};


        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
            if (angular.isUndefined(vm.model.list)) { //TODO should be comimg from parent
                vm.model.list = [];
            }
            //should never happen,fallback...
            if (angular.isUndefined(vm.countryList)) {
                setUnknownCountryState(vm.withUnknown)
            }
        }

        vm.$onChanges = function (changes) {
            if (changes.withUnknown) {
                setUnknownCountryState(changes.withUnknown.currentValue);
            }
            if (changes.listItems) {
                vm.model.list = changes.listItems.currentValue;
            }
            if(changes.showErrors){

                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };
        function setUnknownCountryState(isUnknown) {
            var countries = angular.copy(vm.baseCountries);
            if (isUnknown) {
                var unknownRec=getCountryAndProvinces.getUnknownCountryRecord();
                countries.unshift(unknownRec);
                vm.countryList =countries;
                vm.hasUnknown = true;
                vm.columnDef = [
                    {
                        label: vm.fieldLabel,
                        binding: "display",
                        width: "50"
                    },
                    {
                        label: "UNKNOWN_COUNTRY_DETAILS",
                        binding: "unknownCountryDetails",
                        width: "50"
                    },
                ]
            } else {
                vm.countryList = countries;
                vm.hasUnknown = false;
                vm.emptyModel = {"id": "", "country": "","unknownCountryDetails":"","display":""};
                vm.columnDef = [
                    {
                        label: vm.fieldLabel,
                        binding: "display",
                        width: "100"
                    }
                ]

            }

        }

        vm.addNew = function () {
            var maxID = getListMaxID();
            var item = angular.copy(vm.emptyModel);
            item.id = (getListMaxID() + 1);
            (vm.model.list).push(item);
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            setRecord(vm.model.list.length - 1);
            //vm.editRecord(item);
            vm.onUpdate({list: vm.model.list});

        };

        function setRecord(value) {
            vm.selectRecord = value;

        }

        vm.deleteRecord = function (_id) {


            var idx = vm.model.list.indexOf(
                $filter('filter')(vm.model.list, {id: _id}, true)[0]
            );
            if (idx < 0) return;

            vm.model.list.splice(idx, 1);
             vm.onUpdate({list:vm.model.list});
        };



        function getListMaxID() {

            var out = 0;
            var list = vm.model.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id > out) {
                        out = list[i].id;
                    }
                }
            }
            return out;

        }
        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.noCountryId="no_country"+scopeId;
        }
        vm.noCountry=function(){
            if(! vm.model.list || vm.model.list.length===0){
                vm.noCountries="";
                return true;
            }
            vm.noCountries="values";
            return false;
        };
        vm.disableAddButton=function(){
            if(vm.noCountry()) return false;
            return(vm.countryListForm.$invalid);
        };


        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();