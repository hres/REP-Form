/**
 * Created by Abdessamad on 8/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('srcCountryListModule', ['dataLists', 'srcCountryRecordModule', 'ui.select', 'hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('srcCountryListModule')
        .component('cmpSrcCountryList', {
            templateUrl: 'app/scripts/components/source-country-list/tpl-src-country-list.html',
            controller: srcCountryListController,
            controllerAs: 'srcCountryListCtrl',
            bindings: {
                withUnknown: '<',
                listItems: '<',
                onUpdate: '&', //seems redundant, but used as a messaging mech. when something changes
                onDelete: '&',
                showErrors:'&',
                isFileLoaded: '<',
                fieldLabel: '@',
                updateErrorSummary:'&'
            }
        });

    srcCountryListController.$inject = ['$filter', 'getCountryAndProvinces','UNKNOWN','$scope'];


    function srcCountryListController($filter, getCountryAndProvinces,UNKNOWN,$scope) {
        var vm = this;
        var countries = getCountryAndProvinces.getCountries();
        var unknownRec=getCountryAndProvinces.getUnknownCountryRecord();
        vm.baseCountries = angular.copy(countries);
        vm.baseCountries.unshift(unknownRec);
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
        vm.emptyModel = {"id": "", "country": "","unknownCountryDetails":"","display":""};


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
                setUnknownCountryState(changes.withUnknown.currentValue);
            }
            if (changes.listItems) {
                vm.model.list = changes.listItems.currentValue;
                //vm.updateCountryList();
            }
            // if(changes.showErrors){
            //
            //     vm.showDetailErrors=changes.showErrors.currentValue;
            // }
            if (changes.isFileLoaded) {
                if (changes.isFileLoaded.currentValue) {
                    vm.requiredFlag = false;
                }
            }
        };

        vm.$postLink = function () {
            if(!vm.isFileLoaded) {
                vm.addNew();
            }
        };

        function setUnknownCountryState(isUnknown) {
            if (isUnknown) {
                vm.countryList =vm.baseCountries;
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
            vm.requiredFlag = false;
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
                    if(vm.model.list[j].country && vm.model.list[j].country.id && vm.model.list[j].country.id !== UNKNOWN)
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

        vm.updateRecord = function(){
            vm.selectRecord = -1;
            vm.requiredFlag = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
        };
        vm.setFocus = function () {
            vm.isFocus = true;
        };
        vm.cancelFocus = function () {
            vm.isFocus = false;
        }

        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();