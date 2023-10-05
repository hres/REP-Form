/**
 * Created by SteveZhao on 5/25/2018.
 */
(function () {
    'use strict';

    angular
        .module('speciesListModule', ['dataLists', 'speciesRecordModule', 'ui.select', 'hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('speciesListModule')
        .component('cmpSpeciesList', {
            templateUrl: 'app/scripts/components/speciesList/tpl-species-list.html',
            controller: speciesListController,
            controllerAs: 'speciesListCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors:'<',
                updateErrorSummary:'&'
            }
        });

    speciesListController.$inject = ['$filter','$scope'];

    function speciesListController($filter, $scope) {
        var vm = this;
        vm.model = {};
        vm.isDetailValid = true;
        vm.resetToCollapsed = true;
        vm.showDetailErrors=false;
        vm.selectRecord = -1;
        vm.isFocus = false;
        vm.columnDef = [
            {
                label: "VET_SPECIES_SUBTYPES",
                binding: "specSubt",
                width: "40"
            },
            {
                label: "IS_TREAT_FP",
                binding: "isTreatFPACasted",
                width: "10",
                isHtml: "true"
            },
            {
                label: "WITHDRAWAL",
                binding: "timeCombined",
                width: "50",
                isHtml: "true"
            }
        ];

        vm.emptyModel = {
            speciesId: "",
            species: "",
            subtypes: "",
            specSubt: "",
            isTreatFPA: "",
            withdrawalDays: "",
            withdrawalHours: "",
            timeCombined: ""
        };


        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
            if (angular.isUndefined(vm.model.list)) {
                vm.model.list = [];
            }
        };

        vm.$onChanges = function (changes) {
            if (changes.listItems) {
                vm.model.list = changes.listItems.currentValue;
            }

            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };

        vm.addNew = function () {
            var item = angular.copy(vm.emptyModel);
            if (vm.model.list && vm.model.list.length > 0) {
                item.speciesId = getNextSpeciesId();
            } else {
                item.speciesId = 1;
            }
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

        function getNextSpeciesId() {
            var nextId = 1;
            for( var i = 0; i < vm.model.list.length; i++){
                if(Number(vm.model.list[i].speciesId) >= nextId){
                    nextId = Number(vm.model.list[i].speciesId) + 1;
                }
            }
            return nextId;
        }

        vm.saveRecord = function (species) {
            var idx = vm.model.list.indexOf(
                $filter('filter')(vm.model.list, {speciesId: species.speciesId}, true)[0]
            );
            if (idx < 0) return;

            vm.selectRecord = -1;
            vm.requiredFlag = false;
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.model.list[idx] = species;
            vm.onUpdate({list:vm.model.list});
        };

        vm.deleteRecord = function (_id) {
            var idx = vm.model.list.indexOf(
                $filter('filter')(vm.model.list, {speciesId: _id}, true)[0]
            );
            if (idx < 0) return;

            vm.model.list.splice(idx, 1);
             vm.onUpdate({list:vm.model.list});
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
        }

        vm.disableAddButton=function(){
            if(vm.model.list.length === 0) return false;
            return(vm.speciesListForm.$invalid);
        };

        vm.setFocus = function(){
            vm.isFocus = true;
        };

        vm.cancelFocus = function(){
            vm.isFocus = false;
        };


        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();