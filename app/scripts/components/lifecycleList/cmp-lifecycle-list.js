/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('lifecycleList', [])
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
                deprecateSequence: '&' //bit of a hack
            },
            controller: lifecycleListCtrl,
            controllerAs: 'lifecycleListCtrl'
        });

    lifecycleListCtrl.$inject = ['$filter'];

    function lifecycleListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.lifecycleList = [];
        vm.columnDef = [
            {
                label: "SEQUENCE_NUM",
                binding: "sequence",
                width: "15"
            },
            {
                label: "CONTROL_NUMBER",
                binding: "controlNumber",
                width: "15"
            },
            {
                label: "DATE_SUBMITTED",
                binding: "dateFiled",
                width: "15"
            },
            {
                label: "SEQUENCE_DESCRIPT",
                binding: "sequenceConcat",
                width: "55"
            }
        ]

        vm.$onInit = function () {
            //local var from binding
            vm.lifecycleList = vm.records;

        }

        vm.$onChanges = function (changes) {
            /* if(changes.addresses && changes.addresses.currentValue) {
             vm.lifecycleList = changes.addresses.currentValue;
             }*/
            if (changes.records) {
                vm.lifecycleList = changes.records.currentValue;
                if (!vm.lifecycleList || vm.lifecycleList.length === 0) {
                    vm.isDetailsValid = true;
                }
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
        }

        vm.addTransaction = function () {
            var defaultTransaction = vm.getNewTransaction();
            vm.lifecycleList.push(defaultTransaction);
            vm.isDetailsValid = true; //set to true to exapnd

            vm.selectRecord = (vm.lifecycleList.length - 1);
            console.log("The select record is " + vm.selectRecord)
            vm.isDetailsValid = false;
        }

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        }
        vm.onUpdateLifecycleRecord = function (record) {

            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: record.sequence}, true)[0]
            );
            console.log("This is the idx " + idx)
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
        vm.showError = function () {
            if ((vm.lifecycleListForm.$invalid && !vm.lifecycleListForm.$pristine)) {
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