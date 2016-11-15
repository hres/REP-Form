/**
 * Created by dkilty on 29/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('relatedActivityList', ['activityRecord','expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('relatedActivityList')
        .component('cmpRelatedActivityList', {
            templateUrl: 'app/scripts/components/relatedActivityList/tpl-related-activity-list.html',
            bindings: {
                activities: '<',
                onUpdate: '&',
                getNewActivity:'&',
                isAmend: '<',
                activityTypes: '&'
            },
            controller: activityListCtrl,
            controllerAs: 'activityListCtrl'
        });

    activityListCtrl.$inject = ['$filter'];

    function activityListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid=true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.formAmend = false;
        vm.activityList = [];
        vm.resetCollapsed = false;
        vm.activityTypeList = [];
        vm.columnDef = [
            {
                label: "ACTIVITY_TYPE",
                binding: "regActivityType",
                width: "80"
            },
            {
                label: "CONTROL_NUM",
                binding: "dstsControlNumber",
                width: "10"
            },
            {
                label: "DOSSIER_ID",
                binding: "dossierId",
                width: "10"
            }

        ];
        vm.$onInit = function () {
            //local var from binding
           vm.activityList = vm.activities;
            vm.activityTypeList = vm.activityTypes({isPilot: false}); //is pilot

        };

        vm.$onChanges=function(changes){
            if(changes.activities) {
                if(changes.activities.currentValue) {
                    vm.activityList = changes.activities.currentValue;
                }
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
            }

        };


        vm.deleteActivity = function (aID) {
            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {actvityId: aID}, true)[0]);
            vm.activityList.splice(idx, 1);
            vm.onUpdate({newList: vm.activityList});
            vm.selectRecord = -1;
            vm.isDetailsValid = true; //case that incomplete record is deleted
            vm.resetCollapsed = !vm.resetCollapsed;
        };

        vm.addActivity = function () {
            var defaultActivity=vm.getNewActivity();
            vm.activityList.push(defaultActivity);
            vm.isDetailsValid = true; //set to true to exapnd
            vm.selectRecord=(vm.activityList.length - 1);

            vm.isDetailsValid = false;
        };

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        };
        vm.onUpdateActivityRecord = function (activity) {

            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {activityId:activity.activityId}, true)[0]
            );
            vm.activityList[idx] = angular.copy(activity);
            vm.isDetailsValid = true;
            vm.resetCollapsed = !vm.resetCollapsed;
        };

        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {
            if ((isInvalid&& isTouched)) {
                return true
            }
            return false
        };


    }
})();