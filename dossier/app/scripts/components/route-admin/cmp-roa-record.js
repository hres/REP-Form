/**
 * Created by dkilty on 10/31/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaRecord', ['ui.select'])

})();

(function () {
    'use strict';

    angular
        .module('roaRecord')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpRoaRecord', {
            templateUrl: 'app/scripts/components/route-admin/tpl-roa-record.html',
            controller: roaRecordController,
            controllerAs:'roaRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '&'
            }
        });

    roaRecordController.$inject=['DossierLists','$translate'];

    function roaRecordController(DossierLists, $translate){
        var vm = this;
        vm.roaList = DossierLists.getRoa();
        vm.model = {};
        vm.lang = $translate.proposedLanguage() || $translate.use();

        vm.$onInit = function(){
            if(!vm.lang){
            vm.lang='en'; //TODO magic numbers
            }
        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
            }
        };

        /**
         * This is done strictly to update the summary table.
         * @param item
         * @param model
         */
        vm.roaChanged=function(item, model){
            vm.model.display=vm.model.roa.id;
        };


        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };

        vm.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (isInvalid && vm.showErrors()) )
        };
        vm.isRoaOther = function () {
           if(vm.model.roa.id==DossierLists.getOtherValue()){
               return true;
           }else{
               vm.model.otherRoaDetails="";
               return false;
           }
        };

    }
})();