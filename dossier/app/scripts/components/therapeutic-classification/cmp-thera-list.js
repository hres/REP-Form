/**
 * Created by dkilty 10/26/2016
 */

(function () {
    'use strict';

    angular
        .module('theraClass',['theraClassRecord'])
})();

(function () {
    'use strict';

    angular
        .module('theraClass')
        .component('cmpTheraList', {
            templateUrl: 'app/scripts/components/therapeutic-classification/tpl-thera-list.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: theraListCtrl,
            controllerAs: 'theraCtrl'
        });

    theraListCtrl.$inject = ["$filter"];

    function theraListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        vm.oneRecord="";
        vm.model={};
        vm.model.theraList=[];
        vm.columnDef = [
            {
                label: "THERA_CLASS_NAME",
                binding: "name",
                width: "100"
            }
        ];

        vm.$onInit = function () {
            //local var from binding
            // vm.lifecycleList = vm.records;

        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.theraList=changes.records.currentValue;

            }
        };

            /**
             * @ngdoc method determines the state of the list errors
             *
             * @returns {boolean}
             */
            vm.showError = function (isTouched, isInvalid) {

               // if ((vm.isParentDirty && isInvalid) || (vm.showErrors() && isInvalid)) {
                    return true;
               // }
               // return false
            };

        vm.setValid=function(value){
            vm.isDetailValid = value;
        };
        vm.addNew = function() {
            var maxID = getMaxID();
            var item = {"id": maxID + 1, "name": ""};
            vm.model.theraList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            vm.selectRecord=(0);
            vm.selectRecord=(vm.model.theraList.length-1);
        };
        vm.deleteRecord=function(recId){

            var idx = vm.model.theraList.indexOf(
                $filter('filter')(vm.model.theraList, {id: recId}, true)[0]);
            vm.model.theraList.splice(idx, 1);
        };


        function getMaxID(){
            var id=0;
            for(var i=0;i<vm.model.theraList.length;i++){
                if(vm.model.theraList[i].id>id){
                    id=vm.model.theraList[i].id;
                }
            }
            return(id);
        }

        }
})();