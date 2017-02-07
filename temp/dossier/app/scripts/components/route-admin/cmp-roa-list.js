/**
 * Created by dkilty on 10/31/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaListModule',['roaRecord'])
})();

(function () {
    'use strict';

    angular
        .module('roaListModule')
        .component('cmpRoaList', {
            templateUrl: 'app/scripts/components/route-admin/tpl-roa-list.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: roaListCtrl,
            controllerAs: 'roaCtrl'
        });

    roaListCtrl.$inject = ["$filter"];

    function roaListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        vm.oneRecord="";
        vm.model={};
        vm.model.roaList=[];
        vm.columnDef = [
            {
                label: "ROA_LBL",
                binding: "display",
                width: "40"
            },
            {
                label: "OTHER_ROA_DETAILS",
                binding: "otherRoaDetails",
                width: "60"
            }
        ];

        vm.$onInit = function () {

        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.roaList=changes.records.currentValue;

            }
        };


        vm.setValid=function(value){
            vm.isDetailValid = value;
        };
        vm.addNew = function() {
            var maxID = getMaxID();
            var item = {"id": maxID + 1, "roa": {id:"",label_en:"",label_fr:""}, 'otherRoaDetails': "",display:""};
            vm.model.roaList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            vm.selectRecord=(0);
            vm.selectRecord=(vm.model.roaList.length-1);
        };

        vm.deleteRecord=function(recId){

            var idx = vm.model.roaList.indexOf(
                $filter('filter')(vm.model.roaList, {id: recId}, true)[0]);
            vm.model.roaList.splice(idx, 1);
        };


        function getMaxID(){
            var id=0;
            for(var i=0;i<vm.model.roaList.length;i++){
                if(vm.model.roaList[i].id>id){
                    id=vm.model.roaList[i].id;
                }
            }
            return(id);
        }

    }
})();