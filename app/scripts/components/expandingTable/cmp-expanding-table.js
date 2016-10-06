/**
 * Created by dkilty on 8/6/2016.
 */
(function () {
    'use strict';

    angular
        .module('expandingTable', [])
})();

(function () {
    'use strict';

    angular
        .module('expandingTable')
        .component('cmpExpandingTable', {
            templateUrl: 'app/scripts/components/expandingTable/tpl-expanding-table.html',
            controller: expandingTableCtrl,
            controllerAs: 'expandTblCtrl',
            transclude:true,
            bindings: {
                listItems: '<',
                columnDef:'<',
                disableSelection:'<',
                selectRecord: '<',
                resetToCollapsed: '<'
            }
        });
    expandingTableCtrl.$inject = ['$filter']
    function expandingTableCtrl($filter) {
        var vm = this;
        vm.focused = false;
        vm.disableExpand=false;
        vm.tableRowExpanded = false;
        vm.tableRowIndexCurrExpanded = "";
        vm.tableRowIndexPrevExpanded = "";
        vm.numberCols=_getNumberKeys(vm.columnDef)
        vm.dayDataCollapse=_createArray(vm.listItems.length,true);
        vm.$onInit = function () {
        }

        vm.getExpandedState = function (row) {
            if (row === vm.tableRowIndexCurrExpanded) {
                return true;
            }
            return false
        }

        vm.$onChanges = function (changes) {

           if (changes.listItems) {
               vm.dayDataCollapse=_createArray(vm.listItems.length,true);
               console.log("in changes ..."+vm.dayDataCollapse)
               vm.resetTableRow();
           }

            /**
             Resets the table to collapsed. Note this  is not a true reset
             If a valid index is selected, toggles (Expands) the row after a reset.
             This allows expanding the same row index after a row has been added at the beginning
             For a true reset, first set select record to -1
             */
            if(changes.resetToCollapsed){
                if(changes.resetToCollapsed.currentValue){
                    vm.resetTableRow();
                    if (!changes.selectRecord) {
                        updateTableRow(vm.selectRecord);
                    }
                }
            }
            if(changes.selectRecord){
                var selectIndex=parseInt(changes.selectRecord.currentValue);
                console.log("the selected record is "+selectIndex)
                if(selectIndex>=0) {
                    vm.selectTableRow(selectIndex);
                }else{
                    vm.resetTableRow()
                }
            }
            if(changes.disableSelection){
                vm.disableExpand=changes.disableSelection.currentValue;
            }
        }
        function updateTableRow(textIndex) {
            var selectIndex = parseInt(textIndex);
            if (selectIndex >= 0) {
                vm.selectTableRow(selectIndex);
            }

        }


        /**
         * Utility function for determining the number of columns to create
         * @param myobj
         * @returns {number}
         * @private
         */
        function _getNumberKeys(myobj){
            var count = 0;
            for (var k in myobj) {
                if (myobj.hasOwnProperty(k)) count++;
            }
            return count;
        }

        /**
         * Creates an array of the specified size and default values
         * @param arraySize
         * @param initialVal
         * @returns {Array}
         * @private
         */
         function _createArray(arraySize,initialVal){
         var anArray = [];
         for (var i = 0; i < arraySize; i++) anArray.push (initialVal);
         return anArray
         }

        vm.deletedRow=function(){
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
        }
        /**
         * @ngdoc resets the table to a collapsed state
         */
        vm.resetTableRow = function () {
            vm.tableRowIndexPrevExpanded = "";
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            vm.dayDataCollapse = _createArray(vm.listItems.length, true);

        }

        vm.dayDataCollapseFn = function () {
            for (var i = 0; vm.listItems.length - 1; i += 1) {
                vm.dayDataCollapse.append('true');
            }
        };
        vm.selectTableRow = function (index) {
            //if selection
            console.log("is disable "+vm.disableExpand)
         if (vm.disableExpand) return;
            if (vm.dayDataCollapse === 'undefined') {
                vm.dayDataCollapse = vm.dayDataCollapseFn();
            } else {

                if (vm.tableRowExpanded === false && vm.tableRowIndexCurrExpanded === "") {
                    vm.tableRowIndexPrevExpanded = "";
                    vm.tableRowExpanded = true;
                    vm.tableRowIndexCurrExpanded = index;
                    // vm.storeIdExpanded = storeId;
                    vm.dayDataCollapse[index] = false;
                } else if (vm.tableRowExpanded === true) {
                    if (vm.tableRowIndexCurrExpanded === index) {
                        vm.tableRowExpanded = false;
                        vm.tableRowIndexCurrExpanded = "";
                        vm.dayDataCollapse[index] = true;
                    } else {
                        vm.tableRowIndexPrevExpanded = vm.tableRowIndexCurrExpanded;
                        vm.tableRowIndexCurrExpanded = index;
                        //  vm.storeIdExpanded = storeId;
                        vm.dayDataCollapse[vm.tableRowIndexPrevExpanded] = true;
                        vm.dayDataCollapse[vm.tableRowIndexCurrExpanded] = false;
                    }
                }
            }
        }


    }



})();
