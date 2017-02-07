/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('skinModule', [])
})();


(function () {
    'use strict';

    angular
        .module('skinModule')
        .component('cmpSkinSystem', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-skin.html',
            controllerAs: 'sysCtrl',
            controller: skinSystemController,
            bindings: {
                record: '<',
                otherUpdate: '&',
                concatUpdate: '&'
            }

        });
    function skinSystemController() {
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

        vm.updateErrorState = function () {
            var keys = Object.keys(vm.model);
            for (var i = 0; i < keys.length; i++) {
                var val = vm.model[keys[i]];
                if (val) {
                    if (keys[i] === 'otherSkin') {
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

        vm.detailsChanged = function (alias, value) {

            vm.concatUpdate({'alias': alias, 'value': value});
            vm.updateErrorState();
        };

        vm.otherChanged = function () {
            var state = false;
            if (vm.model.otherSkin) {
                state = true;
            } else {
                state = false;
                vm.model.otherDetails = "";
            }
            vm.otherUpdate();
            vm.updateErrorState();
            return state;
        }
    }
})();
