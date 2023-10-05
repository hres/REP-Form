/**
 * Created by steve zhao on 7/2/2018.
 */

(function () {
    'use strict';

    angular
        .module('disinfectantTypeModule', ['hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('disinfectantTypeModule')
        .component('cmpDisinfectantType', {
            templateUrl: 'app/scripts/components/disinfectantType/tpl-disinfectant-type.html',
            controller: disinfectantTypeCtrl,
            controllerAs: 'disiTypeCtrl',
            bindings: {
                record: '<',
                onUpdate: '&',
                showErrors: '&',
                updateErrorSummary: '&'

            }
        });

    disinfectantTypeCtrl.$inject = ['ENGLISH', '$translate'];
    function disinfectantTypeCtrl(ENGLISH, $translate) {

        var vm = this;
        vm.isReq = true;
        vm.isSelected = "";
        vm.alerts = [false];
        vm.lang = $translate.proposedLanguage() || $translate.use();

        vm.model = {
            hospital: false,
            foodProcessing: false,
            medicalInstruments: false,
            domestic: false,
            barn: false,
            institutionalIndustrial: false
        };
        vm.$onInit = function () {
            if (vm.record) {
                vm.model = vm.record;
            }
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = (changes.record.currentValue);
                vm.updateState();
                vm.updateErrorSummary();
            }
        };


        /**
         *
         * @returns {boolean}
         */
        vm.updateState = function () {
            var obj = vm.model;

            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrValue === true) {
                    vm.isSelected = true;
                    vm.updateErrorSummary();
                    return true;
                }
            }
            vm.isSelected = "";
            vm.updateErrorSummary();
            return false;
        };

        vm.showError = function (ctrl) {
            return (ctrl.$invalid || (vm.showErrors() && ctrl.$invalid));
        };

        /**
         * Specical show error function as relying on a hiddend field
         * @returns {boolean}
         */
        vm.showErrorMissing = function () {

            return ((vm.disiTypeForm.$touched && !vm.isSelected) || (vm.showErrors() && !vm.isSelected));
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

        /*
        Makes an instruction visible baseed on an index passed in
        Index sets the UI state in the alerts array
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Determines if the current language is french
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang!== ENGLISH);
        };

    }//end controller

})();