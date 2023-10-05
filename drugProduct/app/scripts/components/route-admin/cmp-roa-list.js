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
                showErrors: '<',
                isFileLoaded: '<',
                updateErrorSummary:'&'
            },
            controller: roaListCtrl,
            controllerAs: 'roaCtrl'
        });

    roaListCtrl.$inject = ["$filter","$scope"];

    function roaListCtrl($filter,$scope) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        vm.noROAValues=""; //used to track if no ROA recorad have been seleected
        vm.showDetailErrors=false;
        vm.requiredFlag = true; //use to signal expanding table extend an empty record
        vm.model={};
        vm.model.roaList=[];
        vm.isFocus = false;
        vm.columnDef = [
            {
                label: "ROA_LBL",
                binding: "display",
                width: "40"
            },
            {
                label: "OTHER_ROA_DETAILS",
                binding: "otherRoaDetails",
                width: "60",
                isHtml: "true"
            }
        ];

        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
        };


        vm.$onChanges = function (changes) {

            if (changes.records&&changes.records.currentValue) {
                vm.model.roaList=changes.records.currentValue;
                vm.noROA();
            }

            if(changes.showErrors){

                vm.showDetailErrors=changes.showErrors.currentValue;
            }
            if (changes.isFileLoaded) {
                if (changes.isFileLoaded.currentValue) {
                    vm.requiredFlag = false;
                }
            }
        };

        vm.$postLink = function () {
            if(!vm.isFileLoaded) {
                vm.addNew();
            }
        };


        vm.setValid=function(value){
            vm.isDetailValid = value;
        };
        vm.addNew = function() {
            var maxID = getMaxID();
            //make roa field not an object to trigger validation!!
            var item = {"id": maxID + 1, "roa": "", 'otherRoaDetails': "",display:"", saveButton:""};
            vm.model.roaList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            // vm.selectRecord=(0);
            vm.selectRecord=(vm.model.roaList.length-1);
            vm.noROA();
        };

        vm.noROA=function(){
            if(! vm.model.roaList || vm.model.roaList.length===0){
                vm.noROAValues="";
                return true;
            }
            vm.noROAValues="values";
            return false;
        };

        vm.deleteRecord=function(recId){

            var idx = vm.model.roaList.indexOf(
                $filter('filter')(vm.model.roaList, {id: recId}, true)[0]);
            vm.model.roaList.splice(idx, 1);
            vm.noROA();
            vm.requiredFlag = false;
        };

        vm.disableAddButton=function(){
            if(vm.noROA()) return false;
            vm.resetToCollapsed= !vm.resetToCollapsed;
            return(vm.roaListForm.$invalid);
            vm.resetToCollapsed= !vm.resetToCollapsed;
        };

        function getMaxID(){
            var id=0;
            if(!vm.model ||!vm.model.roaList) return id;
            for(var i=0;i<vm.model.roaList.length;i++){
                if(vm.model.roaList[i].id>id){
                    id=vm.model.roaList[i].id;
                }
            }
            return(id);
        }
        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;

            vm.noRoaId="no_roa"+scopeId;
        }

        vm.setRecord=function(value){
            resetMe();
            vm.selectRecord=value;

        }
        vm.resetMe = function(){
            vm.requiredFlag = false;
            vm.resetToCollapsed = false;
        }
        vm.updateRecord = function(){
            // vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.selectRecord = -1;
            vm.requiredFlag = false;
            vm.resetToCollapsed = !vm.resetToCollapsed;
        }
        vm.onError = function(){
            vm.resetToCollapsed = true;
        }
        vm.setFocus = function () {
            vm.isFocus = true;
        }
        vm.cancelFocus = function () {
            vm.isFocus = false;
        }


      /*  $scope.$watch('roaCtrl.roaListForm.$error', function () {
            vm.updateErrorSummary();
        }, true);*/

    }
})();