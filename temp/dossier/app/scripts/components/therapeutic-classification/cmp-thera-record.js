/**
 * Created by hcuser on 27/10/2016.
 */

(function () {
    'use strict';

    angular
        .module('theraClassRecord', [])
})();

(function () {
    'use strict';

    angular
        .module('theraClass')
        .component('cmpTheraRecord', {
            templateUrl: 'app/scripts/components/therapeutic-classification/tpl-thera-record.html',
            controller: therapeuticClassCtrl,
            controllerAs:'theraRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&'
            }
        });


    function therapeuticClassCtrl(){
        var vm = this;

        vm.model = {};

        vm.$onInit = function(){

        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }
        };


        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };


        vm.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && vm.showErrors()) )
        }


    }
})();