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
                title: '@', /*deprecated*/
                listItems: '<',
                columnDef:'<',
                disableSelection:'<',
                selectRecord: '<',
                resetToCollapsed: '<',
                disableErrColumn:'@',
                transcludeName:'@'
            }
        });
    expandingTableCtrl.$inject = ['$filter'];
    function expandingTableCtrl($filter) {
        var vm = this;
        vm.focused = false;
        vm.columnDefinitions={};
        vm.disableExpand=false;
        vm.tableRowExpanded = false;
        vm.tableRowIndexCurrExpanded = "";
        vm.tableRowIndexPrevExpanded = "";
        vm.numberCols=1;
        vm.disableErrorCol=false;
        vm.dayDataCollapse = _createArray(0, true);
        vm.formName="";
        vm.$onInit = function () {
            if(vm.listItems) {
                vm.dayDataCollapse = _createArray(vm.listItems.length, true);
            }
        };

        vm.getExpandedState = function (row) {
            if (row === vm.tableRowIndexCurrExpanded) {
                return true;
            }
            return false
        };

        vm.$onChanges = function (changes) {

            if(changes.transcludeName){

                vm.formName=changes.transcludeName.currentValue;
            }

            if (changes.listItems) {
                if(vm.listItems) {
                    vm.dayDataCollapse = _createArray(vm.listItems.length, true);
                }else{
                    //should never happen
                    vm.dayDataCollapse = _createArray(0, true);
                }
                vm.resetTableRow();
            }

            /**
             Resets the table to collapsed. Note this  is not a true reset
             If a valid index is selected, toggles (Expands) the row after a reset.
             This allows expanding the same row index after a row has been added at the beginning
             For a true reset, first set select record to -1
             */
            if(changes.resetToCollapsed){
                // if(changes.resetToCollapsed.currentValue){
                    vm.resetTableRow();
                    if (!changes.selectRecord) {
                        updateTableRow(vm.selectRecord);
                    }
                //}
            }
            if(changes.selectRecord){
                var selectIndex=parseInt(changes.selectRecord.currentValue);
                if(selectIndex>=0) {
                    vm.selectTableRow(selectIndex);
                }else{
                    vm.resetTableRow();
                }
            }
            if(changes.disableSelection){
                vm.disableExpand=changes.disableSelection.currentValue;
            }

            if(changes.columnDef) {
                vm.numberCols=changes.columnDef.currentValue.length;
                vm.columnDefinitions = _recalculateColumnDefs(changes.columnDef.currentValue, (vm.numberCols));
                _setNumberColumns()
            }
            if(changes.disableErrColumn){
                vm.disableErrorCol=changes.disableErrColumn.currentValue;
                vm.numberCols=vm.columnDef.length;
                _setNumberColumns();
            }

        };

        function _setNumberColumns(){
            if( vm.disableErrorCol){
                //caret only
                vm.numberCols= vm.numberCols+1;
            }else{
                //caret + error
                vm.numberCols= vm.numberCols+2;
            }
        }

        /**
         * Recalculates the column defs based on the caret column and the error columne
         * Assumes that the column definitions provided total 100%
         * @param colDefs
         * @private
         */
        function _recalculateColumnDefs(colDefs,numCols){
            var caretWidth=2;
            var errorWidth=5;
            var totalWidth=caretWidth+errorWidth;
            var toSubtract=totalWidth/numCols;
            var result=[];
            //dont' bother recalc if only the caret
            if(vm.disableErrorCol){
                return (colDefs);
            }
            for(var i=0;i<numCols;i++){
                var oneDef=angular.copy(colDefs[i]);
                if(oneDef.width>toSubtract) {
                    oneDef.width = oneDef.width - toSubtract;
                }
                result.push(oneDef);
            }
            return result;
        }
        function updateTableRow(textIndex) {
            var selectIndex = parseInt(textIndex);
            if (selectIndex >= 0) {
                vm.selectTableRow(selectIndex);
            }

        }
        //TODO get value from a service!!
        /**
         * Translates when a form is invalid to localized text
         * @returns {*}
         */
        vm.formInError=function(aForm){
            if(!aForm) return ('N'); //should never happen
            if(aForm.$invalid){
                return ('Y')
            }
            return ('N')
        };

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
        };
        /**
         * @ngdoc resets the table to a collapsed state
         */
        vm.resetTableRow = function () {
            vm.tableRowIndexPrevExpanded = "";
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            if(vm.listItems) {
                vm.dayDataCollapse = _createArray(vm.listItems.length, true);
            }else{
                _createArray(0, true);
            }

        };

        vm.dayDataCollapseFn = function () {
            for (var i = 0; vm.listItems.length - 1; i += 1) {
                vm.dayDataCollapse.append('true');
            }
        };
        vm.selectTableRow = function (index) {
            //if selection
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
