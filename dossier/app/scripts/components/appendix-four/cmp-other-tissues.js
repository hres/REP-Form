/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('otherTissuesModule', [])
})();


(function () {
    'use strict';

    angular
        .module('otherTissuesModule')
        .component('cmpOtherTissuesSystem', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-other-tissue.html',
            controllerAs: 'sysCtrl',
            controller: otherTissueSystemController,
            bindings: {
                record: '<',
                otherUpdate: '&',
                concatUpdate: '&'
            }

        });
    function otherTissueSystemController() {
        var vm = this;
        vm.model = {};
        vm.isSelected = "";
        vm.$onInit = function () {

        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = (changes.record.currentValue);
                vm.updateErrorState();
            }
        };

        vm.detailsChanged = function (alias, value) {

            vm.concatUpdate({'alias': alias, 'value': value});
            vm.updateErrorState();
        };


        vm.updateErrorState = function () {
            var keys = Object.keys(vm.model);
            for (var i = 0; i < keys.length; i++) {
                var val = vm.model[keys[i]];
                if (val) {
                    if (keys[i] === 'otherFluids') {
                        if (!vm.model.otherDetails) {
                            vm.isSelected = "";
                            return
                        }
                        vm.isSelected = "selected";
                        return;
                    } else {
                        vm.isSelected = "selected";
                        return;
                    }
                }
            }
            vm.isSelected = ""
        };
        vm.otherChanged = function () {
            var state = false;
            if (vm.model.otherFluids) {
                state = true;
            } else {
                state = false;
                vm.model.otherDetails = "";
            }
            vm.otherUpdate();
            vm.updateErrorState();
            return state;
        };

        vm.showErrorMissing=function(){

            return (vm.otherForm.$dirty && vm.otherForm.$invalid);
        };

    }
})();
