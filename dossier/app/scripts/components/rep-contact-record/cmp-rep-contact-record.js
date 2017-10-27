/**
 * Created by dkilty on 8/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactModule25',
            [
                'contactModule',
                'errorSummaryModule',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('contactModule25')
        .component('cmpRepContactRecord', {
            templateUrl: 'app/scripts/components/rep-contact-record/tpl-rep-contact-record.html',
            controller: contactRecCtrl,
            controllerAs: 'contactRec',
            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                onDelete: '&',
                isDetailValid: '&',
                isAmend: '<',
                errorSummaryUpdate: '&', /* used to message that a parent errorSummary needs updating */
                showErrorSummary: '<'
            }
        });
    contactRecCtrl.$inject = ['$scope'];

    function contactRecCtrl($scope) {
        var vm = this;
        vm.savePressed = false;
        vm.formAmend = false;
        vm.isContact = true; //used to set the state of the role
        vm.isNotEditable = false;
        vm.contactModel = {};
        vm.editState = true;

        //vm.summaryName = "";
        vm.updateSummary = 0; //triggers and error summary update
        vm.setSummaryFocus = 0; //sets the summary focus
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}]
        vm.showSummary = false;

        vm.$onInit = function () {
            //after init do not initialise variables here onchanges is called first
            vm.updateErrorSummaryState();
            //vm.showSummary = false;
        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        vm.focusOnSummary = function () {

            vm.setSummaryFocus = vm.setSummaryFocus + 1;
        };
        vm.showRecordSummary = function () {
            return ((vm.savePressed || vm.showSummary));
        };


        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges = function (changes) {
            //how this is currently wired, this will never fire!
            if (changes.contactRecord) {
                vm.contactModel = angular.copy(changes.contactRecord.currentValue);
                vm.setEditableState();
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
                vm.setEditableState();
            }

            /** Messaging for Showing the error summary **/
            if (changes.showErrorSummary) {
                vm.showSummary = changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
        };

        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({contactId: vm.contactModel.repRole});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            if (vm.contactRecForm.$pristine) return;
            var currRecord = vm.contactRecord;
            vm.contactModel = angular.copy(currRecord);
            vm.setEditableState();
            //since we are reverting back to the last save should be pristine
            vm.contactRecForm.$setPristine();
            vm.isDetailValid({state: vm.contactRecForm.$valid});
            vm.savePressed = false;
        };

        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not deprecated?
         */
        vm.updateValid = function () {
            vm.isDetailValid({state: (vm.contactRecForm.$valid && !vm.contactRecForm.$dirty)});
        };
        /**
         * If the form is dirty always set that it is not valid
         */
        $scope.$watch('contactRec.contactRecForm.$dirty', function () {
            //if statement redundant?
            if (vm.contactRecForm.$dirty) {
                vm.isDetailValid({state: false})
            }
        }, true);

        /**
         * Updates the contact model used by the save button
         */
        vm.updateContactModel = function () {
            if (vm.contactRecForm.$valid) {
                //vm.contactModel.isDetailValid = true; TODO remove
                vm.isDetailValid({state: true});
                vm.contactRecForm.$setPristine();
                vm.onUpdate({contact: vm.contactModel});
                vm.savePressed = false;
                vm.errorSummaryUpdate(); //updating parent
            }
            else {
                vm.savePressed = true;
                vm.errorSummaryUpdate(); //updating parent
                vm.updateErrorSummaryState(); //updating current
                vm.focusOnSummary();
            }

        };
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors = function () {
            return ((vm.savePressed || vm.showSummary));
        };

        vm.setEditableState = function () {

            if (!vm.formAmend) {
                vm.editState = true;
            } else if (vm.formAmend && vm.contactModel.amend) {
                vm.editState = true;
            } else {
                vm.editState = false;
            }
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.repContactFormId = "repContactDetailsForm" + scopeId;

        }

        $scope.$watch('contactRec.contactRecForm.$error', function () {
            vm.updateErrorSummaryState();
        }, true);


    }


})();