/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule',
        ['formulationsModule',
         'hpfbConstants',
         'appendixFourModule',
         'alertModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: 'app/scripts/components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabsCtrl',
        bindings: {
            formulationList : '<',
            appendix4List : '<',
            recordChanged: '&',
            service: '<',
            errorSummaryUpdate:'<',
            showErrorSummary:'<',
            isFileLoaded:'<',
            updateErrorSummary:'&',
            setSelectedTab:'<'
        }
    });

    tabsCtrl.$inject = ['$scope', 'FRENCH'];


    function tabsCtrl($scope, FRENCH) {

        var vm = this;
        vm.showSummary=false;
        vm.updateSummary=0;
        vm.alerts = [false]; //for help boxes
        vm.tabs = [
            {
                label: "FORMULATIONS",
                selected: true,
                disabled: false,
                errors: true,
                form: {}
            },
            {
                label: "APPENDIX4",
                selected: false,
                disabled: false,
                errors: false,
                form: {}
            }
        ];
        vm.$onInit = function () {

        };
        vm.$onChanges=function(changes){
            if(changes.errorSummaryUpdate){
                vm.updateSummary=changes.errorSummaryUpdate.currentValue;

            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
            }
            if(changes.setSelectedTab){

                if(changes.setSelectedTab.currentValue) {
                 var index=changes.setSelectedTab.currentValue.id;
                    if(index>-1) {
                    vm.selectTab(index);
                    }
                }
            }

        };

        /***
         * Selects the visible tab based on a zero based index
         * @param idx
         */
        vm.selectTab = function (idx) {

            if(idx>vm.tabs.length){
                console.warn("Invalid tab index "+idx);
                return;
            }

            for (var i = 0; i < vm.tabs.length; i++) {
                vm.tabs[i].selected = false;
                if (idx !== i) {
                    vm.tabs[i].errors = vm.tabs[i].form.$invalid;
                }
            }
                vm.tabs[idx].selected = true;
            //vm.tabs[idx].errors= vm.tabs[idx].form.$invalid
        };

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };

        /**
         * Determines if form is in french
         * @returns {boolean}
         */
        vm.isFrench = function(){
            return(vm.lang===FRENCH);
        };
    }

})();
