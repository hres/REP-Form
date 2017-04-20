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
                setHeadingLevel: '@'

            }
        });
    errorSummaryController.$inject = ['$scope'];

    function errorSummaryController($scope) {
        var vm = this;
        vm.parentRef = null;
        vm.errorArray = [];
        vm.uniqueErrorList = {};
        vm.prevValue = {};
        vm.isVisible = false;
        vm.nameAddendum = "";
        vm.rootError = "";
        vm.isFocusInput = 0;
        vm.exclusions = {
            "contactListCtrl.contactListForm": "true",
            "contactRec.contactRecForm": "true",
            "addressListCtrl.addressListForm": "true",
            "addressRec.addressRecForm": "true"
        };
        vm.alias = {
            "roleMissing": {
                "type": "fieldset",
                "parent": "fs_roleMissing"
            },
            "contactRolesValid":{
                "type":"button",
                "parent":"",
                "target":"addContact"
            },
            "addressRolesValid":{
                "type":"button",
                "parent":"",
                "target":"addAddressBtn"
            },
            "phoneNumber":{
                "type":"pattern",
                "errorType":"MSG_ERR_PHONE_FORMAT"
            },
            "country":{
                "type":"select2",
                "name":"country"
            }
        };


        vm.headingPreamble = "";
        vm.headerLevel = "";
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
            ;
            if (changes.exclusionList) {

                vm.exclusions = changes.exclusionList.currentValue;
            }


            //the base form that this error summary is checking for
            if (changes.formRef) {
                vm.getErrorsSumm(changes.formRef.currentValue.$error, changes.formRef.currentValue.$name);
            }

            if (changes.showErrors) {
                vm.isVisible = changes.showErrors.currentValue;
            }

            if (changes.updateErrors) {
                if (vm.formRef) {
                    console.log(vm.formRef.$error);
                    //pass in the form name and the error object
                    vm.getErrorsSumm(vm.formRef.$error, vm.formRef.$name);
                }
            }
            if (changes.makeFocused) {
                if ((changes.makeFocused.currentValue)) {
                    console.log("make it focused")
                    vm.isFocusInput = vm.isFocusInput + 1;
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

        vm.getErrorsSumm = function (myformErrors, name) {
            vm.errorArray = [];
            vm.uniqueErrorList = {};
            _getErr(myformErrors, vm.uniqueErrorList, name);

            var newErrors = Object.keys(vm.uniqueErrorList).map(function (k) {
                return vm.uniqueErrorList[k]
            });
            if (!angular.equals(vm.prevValue, newErrors)) {
                vm.errorArray = newErrors;
            }
        };

        //gets all the errors from error objects
        function _getErr(errorObj, resultsList, parent) {
            var keys = Object.keys(errorObj);
            var newList = {};
            for (var i = 0; i < keys.length; i++) {
                var record = errorObj[keys[i]];

                for (var j = 0; j < record.length; j++)

                    if (record[j].$invalid === true && record[j].$name.indexOf('.') > 0) {

                    //it is assummed that if it is in the exclusion list it is a summary
                    if (vm.exclusions.hasOwnProperty(record[j].$name)) {
                            var result = {};
                            result[record[j].$name] = {
                                name: record[j].$name,
                                type: keys[i],
                                translateKey: record[j].$name.toUpperCase(),
                                parent: parent,
                                concat: parent + '.' + record[j].$name,
                                isSummary: true
                            };
                            angular.merge(resultsList, result);

                        } else {
                            _getErr(record[j].$error, resultsList, record[j].$name);
                        }

                    } else if (record[j].$invalid === true && !resultsList.hasOwnProperty(record[j].$name)) {

                        var result = _processRecord(record[j].$name, keys[i], parent)
                        angular.merge(resultsList, result);
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
        };
        function _getElementScope(rawName) {
            var separator = '_';
            var index = rawName.lastIndexOf(separator);
            var scopeId = "";
            if (index > -1) {
                scopeId = rawName.substring(index + 1, rawName.length);
            } else {
                scopeId = "";
            }
            return scopeId;

        }

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
            var errorKey="TYPE_"+errorType.toUpperCase();
            var destId = error_Name;
            if (vm.alias.hasOwnProperty(scrubName)) {
                var aliasRec = vm.alias[scrubName];
                switch (aliasRec.type.toLowerCase()) {
                    case "fieldset":
                        var searchId = aliasRec.parent + "_" + scopeId;
                        var destObj = $("#" + searchId).find('input:visible:first');
                        if (destObj.length > 0) {
                            destId = destObj[0].id;
                        }
                        break;
                    case "button":
                        destId=aliasRec.target+ "_" + scopeId;
                        break;
                    case "pattern":
                        if(errorType==="pattern") {
                            errorKey = aliasRec.errorType;
                        }
                        break;
                    case "select2":
                        var searchId = aliasRec.name + "_match" + scopeId;
                        var destObj = $("#" + searchId);
                        if (destObj.length>0) {
                            destId = searchId;
                        }
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
    }//end controller

})();