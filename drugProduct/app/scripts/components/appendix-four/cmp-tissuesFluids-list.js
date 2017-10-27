/**
 * Created by dkilty on 04/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('tissuesFluidsList', [
            'tissuesFluidsRecord',
            'expandingTable',
            'errorSummaryModule',
            'errorMessageModule'
        ])
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
                service: '<',
               // errorSummaryUpdate:'<', //sending a signal that the error summary should be updated
               // showErrorSummary:'<', //flag to show or hide the error summary
                updateErrorSummary:'&' //function to update the list of error summmaries
            },
            controller: tissuesFluidsListController,
            controllerAs: 'tissuesListSrcCtrl'
        });

    tissuesFluidsListController.$inject = ["$filter", "$scope"];

    function tissuesFluidsListController($filter, $scope) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        //vm.dosService="";
        vm.oneRecord = "";
        //define empty model
        vm.model = {};
        vm.model.tissuesFluidsList = [];
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
        //error asummary setup
        vm.exclusions = {};
        vm.transcludeList = {
            "cmp-tissues-fluids-record": "true"
        };
        vm.alias = {
            "msg_err_one_tissue": {
                "type": "element",
                "target": "addTissuesRec"
            }

        };
        vm.updateSummary=0;

        vm.$onInit = function () {
            //init code here
            vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
            vm.resetToCollapsed = true;
            _setIdNames();
            vm.noTissueRecs();
            vm.transcludeList = {
                "cmp-tissues-fluids-record": "true"
            };
        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.tissuesFluidsList = changes.records.currentValue;
            }
            /*if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
                vm.showErrors();
            }*/
           /* if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }*/
        };
        vm.showErrors=function(){
            return vm.showSummary;
        }

        vm.setValid = function (value) {
            vm.isDetailValid = value;
        };
        vm.addNew = function () {
            var maxID = getMaxID();
            var item = {"id": maxID + 1, "systemType": "", detailsConcat: "", system: {}, otherDetails: ""}; //TODO call a service for this

            vm.model.tissuesFluidsList.push(item);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.setRecord(vm.model.tissuesFluidsList.length - 1);
        };
        vm.deleteRecord = function (recId) {

            var idx = vm.model.tissuesFluidsList.indexOf(
                $filter('filter')(vm.model.tissuesFluidsList, {id: recId}, true)[0]);
            vm.model.tissuesFluidsList.splice(idx, 1);
        };
       /* vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };*/

        vm.setRecord = function (value) {
            resetMe();
            vm.selectRecord = -1;
            vm.selectRecord = value;

        };
        function resetMe() {
            vm.resetToCollapsed = !vm.resetToCollapsed;

        }


        function getMaxID() {
            var id = 0;
            for (var i = 0; i < vm.model.tissuesFluidsList.length; i++) {
                if (vm.model.tissuesFluidsList[i].id > id) {
                    id = vm.model.tissuesFluidsList[i].id;
                }
            }
            return (id);
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
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.tissuesListFormRecordId = "tissueListForm" + scopeId;
            vm.oneTissueId = "msg_err_one_tissue" + scopeId;
            vm.addTissuesRecId="addTissuesRec" + scopeId;
        }

    }
})();