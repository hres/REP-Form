/**
 * Created by dkilty 10/26/2016
 */

(function () {
    'use strict';

    angular
        .module('theraClass', ['theraClassRecord'])
})();

(function () {
    'use strict';

    angular
        .module('theraClass')
        .component('cmpTheraList', {
            templateUrl: 'app/scripts/components/therapeutic-classification/tpl-thera-list.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: theraListCtrl,
            controllerAs: 'theraCtrl'
        });

    theraListCtrl.$inject = ["$filter","$scope"];

    function theraListCtrl($filter,$scope) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.resetToCollapsed = true;
        vm.noThera = ""; //used for validation, need at least one therapeutic classification
        vm.model = {};
        vm.model.theraList = [];
        vm.columnDef = [
            {
                label: "THERA_CLASS_NAME",
                binding: "name",
                width: "100"
            }
        ];

        vm.$onInit = function () {
            _setIdNames();
            vm.noTheraRecs();
        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.theraList = changes.records.currentValue;
                vm.noTheraRecs();
            }
        };

        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            // if ((vm.isParentDirty && isInvalid) || (vm.showErrors() && isInvalid)) {
            return true;
            // }
            // return false
        };


        vm.addNew = function () {
            var maxID = getMaxID();
            maxID=maxID+1;
            var item = {"id": maxID , "name": ""};
            vm.model.theraList.push(item);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.selectRecord = (0);
            vm.selectRecord = (vm.model.theraList.length - 1);
            vm.noTheraRecs();
        };
        vm.deleteRecord = function (recId) {

            var idx = vm.model.theraList.indexOf(
                $filter('filter')(vm.model.theraList, {id: recId}, true)[0]);
            vm.model.theraList.splice(idx, 1);
            vm.noTheraRecs();
        };

        vm.disableAddButton=function(){
            if(vm.noTheraRecs()) return false;
            return(vm.theraListForm.$invalid);
        };


        function getMaxID() {
            var id = 0;
            for (var i = 0; i < vm.model.theraList.length; i++) {
                if (parseInt(vm.model.theraList[i].id) > id) {
                    id = vm.model.theraList[i].id;
                }
            }
            return (id);
        }

    /**
    * Manages errors for no Thera
        * @returns {boolean}
    */
        vm.noTheraRecs = function () {

            if (!vm.model || !vm.model.theraList) {
                vm.noThera = "";
                return false;
            }
            if (vm.model.theraList.length === 0) {
                vm.noThera = "";
                return true;
            }
            vm.noThera = "theraVals";
            return false;
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.noTheraId="no_theraVal"+scopeId;
            vm.addTheraId="addTheraClass"+scopeId;
        }


    }
})();