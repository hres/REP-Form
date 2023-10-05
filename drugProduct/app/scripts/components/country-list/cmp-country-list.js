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
                isFileLoaded: '<',
                updateErrorSummary:'&',
                addButtonLabel: '@'
            }
        });

    countryListController.$inject = ['$filter', 'getCountryAndProvinces','UNKNOWN','$scope'];


    function countryListController($filter, getCountryAndProvinces,UNKNOWN,$scope) {
        var vm = this;
        vm.baseCountries = getCountryAndProvinces.getCountries();
        vm.countries = angular.copy(vm.baseCountries);
        vm.countryList = "";
        vm.model = {};
        vm.isDetailValid = true;
        vm.resetToCollapsed = true;
        vm.noCountries=""; //TODO deprecate
        vm.showDetailErrors=false;
        vm.requiredFlag = true; //use to signal expanding table extend an empty record
        vm.selectRecord = -1;
        vm.isFocus = false;
        vm.columnDef = [
            {
                label: vm.fieldLabel,
                binding: "display",
                width: "100"
            }
        ];

        vm.hasUnknown = false;
        vm.emptyModel = {"id": "", "country": "","unknownCountryDetails":"","display":"", saveButton:""};


        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
            if (angular.isUndefined(vm.model.list)) { //TODO should be comimg from parent
                vm.model.list = [];
            }
            //should never happen,fallback...
            if (angular.isUndefined(vm.countryList)) {
                setUnknownCountryState(vm.withUnknown);
            }
            vm.countryList = vm.updateCountryList();
        };

        vm.$onChanges = function (changes) {
            if (changes.withUnknown) {
                //setUnknownCountryState(changes.withUnknown.currentValue);
            }
            if (changes.listItems) {
                vm.model.list = changes.listItems.currentValue;
                //vm.updateCountryList();
            }
            if(changes.showErrors){

                vm.showDetailErrors=changes.showErrors.currentValue;
            }
            if (changes.isFileLoaded) {
                if (changes.isFileLoaded.currentValue) {
                    vm.requiredFlag = false;
                }
            }
        };

        vm.$postLink = function () {
            if(!vm.isFileLoaded) {
                vm.requiredFlag = true;
                vm.addNew();
            }
        };

        function setUnknownCountryState(isUnknown) {
            if (isUnknown) {
                var unknownRec=getCountryAndProvinces.getUnknownCountryRecord();
                vm.countries.unshift(unknownRec);
                vm.countryList =vm.countries;
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
                        width: "50",
                        isHtml: "true"
                    }
                ]
            } else {
                vm.countryList = vm.countries;
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
            item.display = "";
            item.id = (getListMaxID() + 1);
            (vm.model.list).push(item);
            // setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            setRecord(vm.model.list.length - 1);
            //vm.editRecord(item);
            vm.onUpdate({list: vm.model.list});
            vm.countryList = vm.updateCountryList();
        };

        function setRecord(value) {
            vm.selectRecord = value;

        }

        vm.deleteRecord = function (_id) {
            var aList = vm.deleteRecFromList(vm.model.list, _id);
            vm.updateCountryList();
            vm.onUpdate({list:aList});
            vm.updateRecord();
        };

        vm.deleteRecFromList = function (_list, _id) {
            var idx = _list.indexOf(
                $filter('filter')(_list, {id: _id}, true)[0]
            );
            if (idx >= 0) _list.splice(idx, 1);
            return _list;
        };

        //to fix duplicate countries selected bug
        vm.updateCountryList = function () {
            var base = angular.copy(vm.baseCountries);
            if(vm.model.list && vm.model.list.length > 0) {
                var idx;
                for (var j = 0; j < vm.model.list.length; j++) {
                    if(vm.model.list[j].country && vm.model.list[j].country.id)
                    {
                        idx = base.indexOf(
                            $filter('filter')(base, {id: vm.model.list[j].country.id}, true)[0]
                        );
                        if (idx >= 0) base.splice(idx, 1);
                    }
                }
                vm.countryList = base;
                return base;
            }
            return null;
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
            if(! vm.model.list || vm.model.list.length===0 || vm.model.list[0].country == ""){
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

        vm.updateRecord = function(){
            vm.selectRecord = -1;
            vm.requiredFlag = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
        }
        vm.onError = function(){
            if(vm.model.list[0].country == ""){
                vm.resetToCollapsed = true;
            }
        }
        vm.setFocus = function () {
            vm.isFocus = true;
        }
        vm.cancelFocus = function () {
            vm.isFocus = false;
        }

        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();