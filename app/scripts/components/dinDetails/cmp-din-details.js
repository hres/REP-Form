/**
 * Created by dkilty on 8/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('dinModule', [])
})();

(function () {
    'use strict';

    angular
        .module('dinModule')
        .component('cmpDinDetails', {
            templateUrl: 'app/scripts/components/dinDetails/tpl-din.html',
            controller: dinDetailsCtrl,
            controllerAs: 'dinCtrl',

            bindings: {
                dinRecord: '<',
                dinIndex:'<',
                deleteDin:'&',
                showErrors: '&',
                setReadonly: '&'
            }
        });
   dinDetailsCtrl.$inject = [];

    function  dinDetailsCtrl() {
        var vm = this;
        vm.record={}
        vm.detailsIndex=0;
        vm.$onInit = function () {
        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.dinRecord) {
                vm.record=changes.dinRecord.currentValue
            }
            if(changes.dinIndex){
                vm.detailsIndex=changes.dinIndex.currentValue;
            }
        };
        vm.delete=function(){
            vm.deleteDin({dinIndex:vm.detailsIndex})
        }
        vm.showError=function(isTouched,isInvalid){
            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )){
                return true
            }
            return false
        }
    }
})();