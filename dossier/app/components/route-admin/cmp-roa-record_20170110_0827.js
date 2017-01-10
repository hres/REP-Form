/**
 * Created by dkilty on 10/31/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaRecord', [])
})();

(function () {
    'use strict';

    angular
        .module('roaRecord')
        .component('cmpRoaRecord', {
            templateUrl: './app/components/route-admin/tpl-roa-record_20170110_0827.html',
            controller: roaRecordController,
            controllerAs:'roaRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&'
            }
        });

    roaRecordController.$inject=['DossierLists'];

    function roaRecordController(DossierLists){
        var vm = this;
        vm.roaList = DossierLists.getRoa();
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
        vm.isRoaOther = function () {
           if(vm.model.roa==DossierLists.getOtherValue()){
               return true;
           }else{
               vm.model.otherRoaDetails="";
               return false;
           }
        };

    }
})();