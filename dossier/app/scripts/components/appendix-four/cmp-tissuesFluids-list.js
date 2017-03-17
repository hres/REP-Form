/**
 * Created by dkilty on 04/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('tissuesFluidsList',['tissuesFluidsRecord','expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('tissuesFluidsList')
        .component('cmpTissuesFluidsList', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-tissuesFluids-list.html',
            bindings: {
                records: '<',
                showErrors: '&',
                service: '<'
            },
            controller: tissuesFluidsListController,
            controllerAs: 'tissuesListSrcCtrl'
        });

    tissuesFluidsListController.$inject = ["$filter"];

    function tissuesFluidsListController($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        //vm.dosService="";
        vm.oneRecord="";
        //define empty model
        vm.model={};
        vm.model.tissuesFluidsList=[];
        vm.columnDef = [
            {
                label: "SYSTEM_TYPE",
                binding: "systemType",
                width: "20"
            },
            {
                label: "SYSTEM_DETAILS",
                binding: "detailsConcat",
                width: "40",
                isHtml: true
            },
            {
                label: "SYSTEM_OTHER",
                binding: "otherDetails",
                width: "40"
            }
        ];

        vm.$onInit = function () {
            //init code here
            vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
            vm.resetToCollapsed = true;
            vm.noTissueRecs();
        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.tissuesFluidsList=changes.records.currentValue;
            }
            /* if(changes.service){
             vm.dosService=changes.service.currentValue;
             }*/
        };


        vm.setValid=function(value){
            vm.isDetailValid = value;
        };
        vm.addNew = function() {
            var maxID = getMaxID();
            var item = {"id": maxID + 1, "systemType": "", detailsConcat: "", system: {}, otherDetails: ""}; //TODO call a service for this

            vm.model.tissuesFluidsList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            vm.selectRecord=(0);
            vm.selectRecord=(vm.model.tissuesFluidsList.length-1);
        };
        vm.deleteRecord=function(recId){

            var idx = vm.model.tissuesFluidsList.indexOf(
                $filter('filter')(vm.model.tissuesFluidsList, {id: recId}, true)[0]);
            vm.model.tissuesFluidsList.splice(idx, 1);
        };


        function getMaxID(){
            var id=0;
            for(var i=0;i<vm.model.tissuesFluidsList.length;i++){
                if(vm.model.tissuesFluidsList[i].id>id){
                    id=vm.model.tissuesFluidsList[i].id;
                }
            }
            return(id);
        }

        vm.noTissueRecs = function () {

            if (vm.model.tissuesFluidsList.length > 0) {
                vm.oneRecord = "selected";
                return false;
            }
            vm.oneRecord = "";
            return true;

        };
        vm.disableAdd = function () {

            if (vm.noTissueRecs()) {
                return false;
            }
            return (vm.tissuesListForm.$invalid)
        };
        vm.systemAlreadyUsed = function (systemVal) {
            var systemExists = 0;
            for (var i = 0; i < vm.model.tissuesFluidsList.length; i++) {
                if (vm.model.tissuesFluidsList[i].systemType === systemVal) {
                    systemExists++;
                }
            }
            if (systemExists > 1) {
                return true;
            }
            return false;
        }


    }
})();