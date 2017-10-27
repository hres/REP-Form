/**
 * Created by dkilty on 02/11/2016.
 */


(function () {
    'use strict';

    angular
        .module('animalSourcedList',['animalSourcedRecord','expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('animalSourcedList')
        .component('cmpAnimalSourcedList', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-animalSourced-list.html',
            bindings: {
                records: '<',
                showErrors: '&',
                onUpdate: '&' //seems redundant, but used as a messaging mech. when something changes
            },
            controller: animalSourcedListController,
            controllerAs: 'animalListCtrl'
        });

    animalSourcedListController.$inject = ["$filter"];

    function animalSourcedListController($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        vm.oneRecord="";
        //define empty model
        vm.model={};
        vm.model.animalSrcList=[];
        vm.columnDef = [
            {
                label: "ANIMAL_TYPE",
                binding: "animalType",
                width: "40"
            },
            {
                label: "ANIMAL_TYPE_DETAILS",
                binding: "animalDetail",
                width: "60"
            }
        ];

        vm.$onInit = function () {
            //init code here
            vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
            vm.resetToCollapsed = true;
            vm.oneRecord="";
        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.animalSrcList=changes.records.currentValue;
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
            var item = {"id": maxID + 1, "animalType": "",animalDetail:""}; //TODO call a service for this
            vm.model.animalSrcList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            vm.selectRecord=(0);
            vm.selectRecord=(vm.model.animalSrcList.length-1);
            vm.onUpdate({list: vm.model.animalSrcList});
        };
        vm.deleteRecord=function(recId){
            var idx = vm.model.animalSrcList.indexOf(
                $filter('filter')(vm.model.animalSrcList, {id: recId}, true)[0]);
            vm.model.animalSrcList.splice(idx, 1);
            vm.onUpdate({list: vm.model.animalSrcList});
        };


        function getMaxID(){
            var id=0;
            for(var i=0;i<vm.model.animalSrcList.length;i++){
                if(vm.model.animalSrcList[i].id>id){
                    id=vm.model.animalSrcList[i].id;
                }
            }
            return(id);
        }

    }
})();