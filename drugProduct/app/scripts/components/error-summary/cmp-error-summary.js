/**
 * Created by dkilty on 3/18/2017.
 */


(function () {
    'use strict';

    angular
        .module('errorSummaryModule', [
            'focus-if'
        ])
})();

(function () {
    'use strict';

    angular
        .module('errorSummaryModule')
        .component('cmpErrorSummary', {
            templateUrl: 'app/scripts/components/error-summary/tpl-error-summary.html',
            controller: errorSummaryController,
            controllerAs: 'errSummaryCtrl',

            bindings: {
                formRef: '<',
                showErrors: '<',
                updateErrors: '<',
                nameSuffix: '@', /** What to add to the id of the error summary to be able to find it **/
                formPreamble: '@', /** What to name the heading should say about the section **/
                makeFocused: '<',
                setHeadingLevel: '@',
                exclusionList: '<',
                transcludeList:'<', //used for expander lists, the name of an error summary in an expanding table entry
                formId: '<',
                aliasList: '<',
                expandRecord:'&',
                selectTab:'&'

            }
        });
    errorSummaryController.$inject = ['$scope','$location','$anchorScroll'];

    function errorSummaryController($scope,$location,$anchorScroll) {
        var vm = this;
        vm.parentRef = null;
        vm.errorArray = [];
        vm.uniqueErrorList = {};
        //vm.prevValue = {};
        vm.isVisible = false;
        vm.nameAddendum = "";
        vm.rootError = "";
        vm.isFocusInput = 0;

        vm.exclusions={};
        vm.alias={};
        vm.transcludeNames={};

        vm.headingPreamble = "";
        vm.headerLevel = "";
        vm.startFormId = "";

        vm.$onInit = function () {

        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {

            if (changes.setHeadingLevel) {

                if (angular.isDefined(changes.setHeadingLevel.currentValue)) {
                    vm.headerLevel = (changes.setHeadingLevel.currentValue).toLowerCase();
                }
            }

            if (changes.nameSuffix) {
                vm.nameAddendum = "-" + changes.nameSuffix.currentValue;
            }
            if (changes.formPreamble) {
                vm.headingPreamble = changes.formPreamble.currentValue;
            }

            if (changes.exclusionList) {

                vm.exclusions = changes.exclusionList.currentValue;
            }
            if (changes.aliasList) {

                vm.alias = changes.aliasList.currentValue;
            }

            //the base form that this error summary is checking for
            if (changes.formRef) {
                vm.getErrorsSumm(changes.formRef.currentValue.$error, changes.formRef.currentValue.$name);
            }

            if (changes.showErrors) {
                vm.isVisible = changes.showErrors.currentValue;
               // console.log("error summary is visible "+vm.headingPreamble+" "+vm.isVisible)
            }

            if (changes.updateErrors) {
                if (vm.formRef) {
                    //pass in the form name and the error object
                    //should I run it if hidden?
                    if (vm.isVisible) {
                        vm.getErrorsSumm(vm.formRef.$error, vm.formRef.$name);
                    }
                }
            }
            if (changes.makeFocused) {
                if ((changes.makeFocused.currentValue)) {
                    vm.isFocusInput = vm.isFocusInput + 1;
                }
            }
            if (changes.formId) {
                /* used for the jquery ordering. This gives the starting id **/
               // console.log("This is formId "+ changes.formId.currentValue);
                vm.startFormId = changes.formId.currentValue;
            }
            if(changes.transcludeList){
                if(changes.transcludeList.currentValue) {
                    vm.transcludeNames = changes.transcludeList.currentValue;
                }

            }
        };
        /***
         * Determines if the summary is visible
         * @returns {boolean|*|Array}
         */
        vm.calcIsVisible = function () {
            var summaryIsVisible = _isErrorSummaryVisible();
            if (!summaryIsVisible) {
                //if it is not visible brodcast it so others are hidden
                $scope.$emit('childErrorSummaryHide', +vm.nameAddendum);
            }
            return (summaryIsVisible);
        };

        /**
         * Used for the error summary to expand a record
         * @param errorRecord
         */
        vm.scrollTo=function(errorRecord){
            var hashId="";
            if(!errorRecord) return;
            if(errorRecord.isSummary){
                hashId='errors-summary-'+errorRecord.name;
            }else{
                hashId=errorRecord.name;
            }
          //  console.log("hashID "+hashId)
           // console.log("index "+errorRecord.exIndex)
            vm.expandRecord({index: errorRecord.exIndex});
            $location.hash(hashId);
            $anchorScroll();
        };

        vm.selectVisibleTab=function(errorRecord){
            var hashId='errors-summary-'+errorRecord.name;
            //console.log("selectVisible "+errorRecord.tabId);
            vm.selectTab({index:errorRecord.tabId});
            //$location.hash(hashId);
            //$anchorScroll();
        }

        vm.isSummaryLink=function(errorRecord){

            return(errorRecord.isSummary && (!angular.isDefined(errorRecord.toExpand)) &&(!angular.isDefined(errorRecord.tabId)));
        };

        vm.isTabLink=function(errorRecord){

            return(errorRecord.isSummary &&(angular.isDefined(errorRecord.tabId)));
        };
        vm.isExpanderLink=function(errorRecord){

            return angular.isDefined(errorRecord.toExpand);
        };



        function _isErrorSummaryVisible() {
            return (vm.isVisible && (vm.errorArray && vm.errorArray.length > 0));
        }

        $scope.$on('childErrorSummaryHide', function (event, data) {
            // $scope.mainData.logs = $scope.mainData.logs + '\nMainController - receive EVENT "' + event.name + '" with message = "' + data.message + '"';
            if (_isErrorSummaryVisible()) {
                var errorSummaryBroadcastName = data.message;
                for (var i = 0; i < vm.errorArray.length; i++) {
                    var errorRecord = errorArray[i];
                    if (errorRecord.isSummary && errorRecord.name === errorSummaryBroadcastName) {
                        vm.errorArray.splice(i, 1);
                    }
                }
            }
        });

        /**
         * Main functionality for getting hte errors
         * @param myformErrors
         * @param name
         */
        vm.getErrorsSumm = function (myformErrors, name) {
            vm.errorArray = [];
            vm.uniqueErrorList = {};
            _getErr(myformErrors, vm.uniqueErrorList, name);
            var newErrors = _sortErrorsByDomOrder();
            if (!angular.equals(vm.errorArray, newErrors)) {
                vm.errorArray = newErrors;
            }
        };


        //gets all the errors from error objects
        function _getErr(errorObj, resultsList, parent) {
            var keys = Object.keys(errorObj);
            var newList = {};
            for (var i = 0; i < keys.length; i++) {
                var record = errorObj[keys[i]];
                //expecting an array
                if (!(record instanceof Array)) {
                    record = [record];
                }
                for (var j = 0; j < record.length; j++) {

                    //configure for the tests
                    var numIndex=record[j].$name.lastIndexOf("_");
                    var transcludeName="";
                    //parse for a transclude name. Used for comparison below
                    if(numIndex>0) {
                        transcludeName = record[j].$name.substring(0, numIndex);
                    };
                    //case this is a form- assumes format <controlller>.<formName>
                    if (record[j].$invalid === true && record[j].$name.indexOf('.') > 0) {
                        //it is assumed that if it is in the exclusion list it is a summary
                        if (vm.exclusions && vm.exclusions.hasOwnProperty(record[j].$name)) {
                            //only process this as a summary if it is in the exclusions list
                          //  console.log("the name is "+record[j].$name);
                            var tabIndex=vm.exclusions[record[j].$name].indexOf('tab_');
                            var tabId=-1;
                            if(tabIndex>-1){
                               tabId=vm.exclusions[record[j].$name].substr(tabIndex+4);
                               tabId=parseInt(tabId)
                            }
                            angular.merge(resultsList, _createSummaryRecord(record[j].$name, keys[i], parent,tabId));
                        }
                        else {
                            _getErr(record[j].$error, resultsList, record[j].$name);
                        }
                    }
                    // case this is a transclude i.e. the expanding table
                    else if (vm.transcludeNames.hasOwnProperty(transcludeName)) {
                        var exIndex = record[j].$name.indexOf(transcludeName);
                        //extract the index it is the string length +1. By convention there is an underscore
                        var expandIndex = record[j].$name.substring(exIndex+transcludeName.length+1);
                        //make an object that will cause expand and focus on
                        angular.merge(resultsList,_createExpanderRecord(record[j].$name,transcludeName,keys[i],parent,expandIndex));
                    }
                    else if (record[j].$invalid === true && !resultsList.hasOwnProperty(record[j].$name)) {
                        var result = _processRecord(record[j].$name, keys[i], parent)
                        angular.merge(resultsList, result);
                    }
                }
            }
        }

        //gets the name parts
        function _scrubFieldName(rawName) {
            var separator = '_';
            var index = rawName.lastIndexOf(separator);
            var cleanedName = "";
            if (index > -1) {
                cleanedName = rawName.substring(0, index);
            } else {
                cleanedName = rawName;
            }
            return cleanedName;
        }

        /**
         * Gets the element scope. By convention it is the value after the last underscore
         * @param rawName
         * @returns {Number}
         * @private
         */
        function _getElementScope(rawName) {
            var separator = '_';
            var nameSplit = rawName.split(separator);
            var scopeId = parseInt(nameSplit[nameSplit.length - 1]);
            if (!angular.isNumber(scopeId)) {
                scopeId = "";
            }
            return scopeId;
        };

        /**
         * Processes a non summary record. Checks for aliases and processes accordingly
         * @param error_Name - the name of the error from angular error object
         * @param errorType - the type of error required, pattern etc
         * @param parent - the name of the form that the field originates
         * @returns {{}} jsonobj with description information
         * @private
         */
        function _processRecord(error_Name, errorType, parent) {
            var result = {};
            var scrubName = _scrubFieldName(error_Name);
            var scopeId = _getElementScope(error_Name);
            var errorKey = "TYPE_" + errorType.toUpperCase();
            var destId = error_Name;
            if (vm.alias && vm.alias.hasOwnProperty(scrubName)) {
                var aliasRec = vm.alias[scrubName];
                switch (aliasRec.type.toLowerCase()) {
                    case "fieldset":
                        var searchId = aliasRec.parent + "_" + scopeId;
                        var destObj = $("#" + searchId).find('input:visible:first');
                        if (destObj.length > 0) {
                            destId = destObj[0].id;
                        }
                        break;
                    case "element":
                        destId = aliasRec.target + "_" + scopeId;
                        break;
                    case "elementnoid":
                        destId = aliasRec.target;
                        break;
                    case "pattern":
                        if (errorType === "pattern") {
                            errorKey = aliasRec.errorType;
                        }
                        break;
                    case "select2":
                        var searchId = aliasRec.name + "_match" + scopeId;
                        //TODO make angular friendly
                        var destObj = $("#" + searchId);
                        if (destObj.length > 0) {
                            destId = searchId;
                        }
                        break;
                    case "min":
                        if (errorType === "min") {
                            errorKey = aliasRec.errorType;
                        }
                        break;
                    case "max":
                        if (errorType === "max") {
                            errorKey = aliasRec.errorType;
                        }
                        break;
                    case "minlength":
                        if (errorType === "minlength") {
                            errorKey = aliasRec.errorType;
                        }
                        break;
                    case "maxlength":
                        if (errorType === "maxlength") {
                            errorKey = aliasRec.errorType;
                        }
                        break;

                    case "buttonsearch":
                        errorKey =  "TYPE_REQUIRED";
                            $.each($('button', '#' + vm.startFormId), function (k) {
                            var temp_attr = $(this).attr('id');
                            if (temp_attr && temp_attr.indexOf(aliasRec.buttonName)>-1) {
                              destId=temp_attr;
                            }
                        });
                        break;
                    default:
                        console.warn("No type found " + aliasRec.type);
                        break;
                }
            }
            result[error_Name] = {
                name: destId,
                translateKey: scrubName.toUpperCase(),
                type: errorKey,
                parent: parent,
                concat: parent + '.' + error_Name,
                isSummary: false
            };
            return result;
        }

        //TODO cleanup  this function, inefficient
        function _sortErrorsByDomOrder() {
            var domFieldList = {};
            //TODO make angular friendly
            //get all the inputs and assign order index
            $.each($('input, select ,textarea', '#' + vm.startFormId), function (k) {
                var temp_attr = $(this).attr('id');
                if (temp_attr) {
                    domFieldList[temp_attr] = k;
                }
            });
            //console.log(domFieldList)
            //delete anything in the not in the list
            //TODO refactor? seems inefficient
            var keyList = Object.keys(domFieldList);
          //  console.log(keyList);
            for (var p = 0; p < keyList.length; p++) {
                //specifically handled the angular bootstrap ui-select
                if(keyList[p].indexOf("focusser-")>-1){
                    //find the parent
                    var parentName=angular.element(document.querySelector('#'+keyList[p])).parent().attr('name');
                    if(parentName){
                        keyList[p]=parentName;
                    }
                }
                if (!vm.uniqueErrorList[keyList[p]]) {
                    keyList.splice(p, 1);
                        p--;
                }
            }
            var sortedDomJsonList = {};
            //create a json where the key is the name, and the value is the index (ie the position it should be
            //this allows lookup by name and gets the index
            for (var v = 0; v < keyList.length; v++) {
                sortedDomJsonList[keyList[v]] = v;
            }
            //console.log(sortedDomJsonList)
            //create an array
            var newErrors = Object.keys(vm.uniqueErrorList).map(function (k) {
                return vm.uniqueErrorList[k]
            });
            //sort errors
            var notDefined = {};
            if (newErrors.length > 0) {
                var i = 0;
                while (i < newErrors.length) {
                    var currRec = newErrors[i];
                    var targetName = currRec.name;
                    var destIndex = sortedDomJsonList[targetName];
                    if (angular.isDefined(destIndex) && destIndex !== i) {
                        var tempRec = angular.copy(newErrors[destIndex]);
                        newErrors[destIndex] = angular.copy(currRec);
                        newErrors[i] = angular.copy(tempRec);
                    } else {

                        if (!angular.isDefined(destIndex)) {
                            notDefined[currRec.name] = {rec: currRec, pos: i};
                        }
                        i++;
                    }
                }
            }
            _sortUnknowns(notDefined, newErrors);
            return newErrors;
        }

        /**
         * For errors not found in dom using jquery, try to find where they belong based on scope id
         * If found place after the last same scope vale
         * @param unknownJson
         * @param sortList
         * @private
         */
        function _sortUnknowns(unknownJson, sortList) {
            //try and find scope
            //create array
            var unknownArray = Object.keys(unknownJson).map(function (k) {

                return unknownJson[k]
            });
            for (var i = 0; i < unknownArray.length; i++) {
                var unknownRec = unknownArray[i];
                var unknownName = unknownRec.rec.name;
                var scopeIndex = _getElementScope(unknownName);
                if (angular.isNumber(scopeIndex)) {
                    for (var g = sortList.length - 1; g >= 0; g--) {
                        var sortRec = sortList[g];
                        var sortScope = _getElementScope(sortRec.name);
                        if (angular.isNumber(sortScope) && sortScope === scopeIndex && unknownName !== sortRec.name) {
                            sortList.move(unknownRec.pos, g + 1);
                            break;
                        }
                    }
                }
            }
        }

        Array.prototype.move = function (from, to) {
            if (to < 0) to = 0;
            if (to >= this.length) to = this.length - 1;
            this.splice(to, 0, this.splice(from, 1)[0]);
        };


        /**
         *  Used to create a summary record. Generally used when new forms are defined
         *  i.e. get a dot syntax of myController.myFormName
         * @param name- the name to give to the record, and the translate key
         * @param type - type of error that occured i.e. required etc
         * @param parent- parent ot this dom object
         * @param tabID- optional tabId for selecting a tab
         * @returns {{}}
         * @private
         */
        function _createSummaryRecord(name,type,parent,tabId){
            var result = {};
            if(!angular.isDefined(tabId)) tabId=-1;
            result[name] = {
                name: name,
                type: type,
                translateKey: name.toUpperCase(),
                parent: parent,
                concat: parent + '.' + name,
                tabId:tabId,
                isSummary: true
            };
            return result;
        };

        function _createExpanderRecord(name,transcludeName,type,parent, expanderIndex){
            var result = {};
            result[name] = {
                name: name,
                type: type,
                translateKey: transcludeName.toUpperCase(),
                parent: parent,
                concat: parent + '.' + name,
                isSummary: true,
                toExpand:true,
                exIndex:parseInt(expanderIndex)
            };
            return result;
        };

    }//end controller

})();
