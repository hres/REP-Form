/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('lifecycleList', ['filterLists'])
})();

(function () {
    'use strict';

    angular
        .module('lifecycleList')
        .component('cmpLifecycleList', {
            templateUrl: 'app/scripts/components/lifecycleList/tpl-lifecycle-list.html',
            bindings: {
                records: '<',
                onUpdate: '&',
                isAmend: '&',
                getNewTransaction: '&',
                deprecateSequence: '&', //bit of a hack
                showErrors: '&',
                isEctd: '<'
            },
            controller: lifecycleListCtrl,
            controllerAs: 'lifeListCtrl'
        });

    lifecycleListCtrl.$inject = ['$filter', 'sequenceOrderDescendingFilter'];

    function lifecycleListCtrl($filter, sequenceOrderDescendingFilter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.lifecycleList = [];
        vm.setCollapsed = 0;
        vm.deletableIndex = 0;
        vm.oneRecord="";

        vm.columnDef = [
            {
                label: "SEQUENCE_NUM",
                binding: "sequence",
                width: "8"
            },
            {
                label: "CONTROL_NUMBER",
                binding: "controlNumber",
                width: "8"
            },
            {
                label: "DATE_SUBMITTED",
                binding: "dateFiled",
                width: "10"
            },
            {
                label: "REG_ACTIVITY",
                binding: "activityType",
                width: "10"
            },
            {
                label: "SEQUENCE_DESCRIPT",
                binding: "sequenceConcat",
                width: "70"
            }
        ]

        vm.$onInit = function () {
            //local var from binding
            // vm.lifecycleList = vm.records;

        }


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.lifecycleList = changes.records.currentValue;
                /* if (!vm.lifecycleList || vm.lifecycleList.length === 0) {

                    vm.isDetailsValid = true;
                 }*/
                vm.setValid(!vm.lifecycleList || vm.lifecycleList.length === 0)
                vm.updateErrorState();
            }
        }

        vm.deleteRecord = function (aID) {
            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: aID}, true)[0]);
            vm.lifecycleList.splice(idx, 1);
            vm.onUpdate({newList: vm.lifecycleList});
            vm.selectRecord = 0;
            vm.isDetailsValid = true; //case that incomplete record is deleted
            vm.deprecateSequence();
            vm.updateErrorState();
        }

        vm.lastRecordSequence = function () {

            if (!vm.lifecycleList) {
                //this case should never happen, should always be empty array
                return 0;
            }
            return (vm.lifecycleList.length - 1);
        }
        vm.updateErrorState = function () {
            if (!vm.lifecycleList || vm.lifecycleList.length === 0) {
                vm.oneRecord = "";
            } else {
                vm.oneRecord = "is value";

            }

        }

        vm.addTransaction = function () {
            var defaultTransaction = vm.getNewTransaction();
            vm.lifecycleList.unshift(defaultTransaction);
            vm.selectRecord = 0; //need to generate a change
            vm.setCollapsed++;
            vm.isDetailsValid = false;
            vm.updateErrorState();
        }


        vm.isAddDisabled = function () {
            return (!vm.isDetailsValid || (!vm.isEctd && vm.lifecycleList.length > 0))

        }

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        }

        vm.onUpdateLifecycleRecord = function (record) {

            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: record.sequence}, true)[0]
            );

            record.dateFiled = convertDate(record.dateFiled);
            record.startDate = convertDate(record.startDate);
            record.endDate = convertDate(record.endDate);
            vm.lifecycleList[idx] = angular.copy(record);
            vm.isDetailsValid = true;
        }
        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            if ((isTouched && isInvalid) || (vm.showErrors() && isInvalid)) {
                return true
            }
            return false
        };
        function convertDate(value) {
            if (!value) return value;
            var aDate = new Date(value);
            var month = +(aDate.getMonth() + 1)
            if (month < 10) {
                month = '0' + month;
            }
            var day = aDate.getDate()
            if (day < 10) {
                day = '0' + day;
            }
            var result = aDate.getFullYear() + '-' + month + '-' + day;
            return result;
        }

    }
})();