/**
 * Created by dkilty on 8/6/2016.
 */


(function () {
    'use strict';

    angular
        .module('contactModule26', ['contactModule25', 'expandingTable', 'repContactService'])
})();

(function () {
    'use strict';

    angular
        .module('contactModule26')
        .component('cmpRepContactList', {
            templateUrl: 'app/scripts/components/repContactList/tpl-rep-contact-list.html',
            controller: contactListCtrl,
            controllerAs: 'contactListCtrl',
            bindings: {
                contacts: '<',
                //  onUpdate: '&',
                // getNewContact: '&',
                showListErrors: '&',
                parentDirty: '<',
                isAmend: '<',
                showErrorSummary:'<'
            }
        });
    contactListCtrl.$inject = ['$filter', 'RepContactService'];
    function contactListCtrl($filter, RepContactService) {
        var vm = this;
        vm.selectRecord = -1; //the record to select
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.contactList = [];
        vm.oneRecord = ""; //using required as the validaiton
        vm.isParentDirty = false; //tracks whether the parent form has been dirtied
        vm.formAmend = false;
        vm.resetCollapsed = false;
        var repContactService = new RepContactService();
        vm.columnDef = [
            {
                label: "FIRSTNAME",
                binding: "givenName",
                width: "40"
            },

            {
                label: "LASTNAME",
                binding: "surname",
                width: "40"
            },
            {
                label: "ONE_ROLE",
                binding: "repRole",
                width: "20"
            }
        ];
        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.focused = false;
            // vm.contactList = vm.contacts;
        };
        vm.$onChanges = function (changes) {
            if (changes.contacts) {
                vm.contactList = changes.contacts.currentValue;
                vm.isDetailValid=true; //if left false,will lock out
                vm.updateErrorState();
            }
            if (changes.parentDirty) {
                vm.isParentDirty = changes.parentDirty.currentValue;
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
            }
            if(changes.showErrorSummary){

                vm.showSummmary=changes.showErrorSummary.currentValue;
            }

        };

        /**
         * Determines if a user should be able to add another contact
         * Rules: if there are more than one contacts or the details are not valid (record in progress),
         * cannot add a contact.
         * @returns {*}
         */
        vm.isAddContact = function () {
            if (vm.contactList.length > 1) {

                return false;
            }
            return (vm.isDetailValid);
        };

        vm.showNoRecordError = function (isInvalid) {
            return ((vm.isParentDirty && isInvalid  ) || (vm.showListErrors() && isInvalid));
        };

        vm.setValid = function (value) {
            vm.isDetailValid = value; //this is a shared value
        };

        vm.showError = function () {

            return (vm.contactListForm.$invalid && !vm.contactListForm.$pristine) || (vm.contactListForm.$invalid && vm.showListErrors());
        };

        vm.onUpdateContactRecord = function (record) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {repRole: record.repRole}, true)[0]
            ); //TODO fix filter
            vm.contactList[idx] = angular.copy(record);
            vm.updateErrorState();
            vm.contactListForm.$setPristine();
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.disableAdd();
        };
        /***
         * Tracks if no records
         */
        vm.updateErrorState = function () {
            if (vm.contactList && vm.contactList.length > 0) {
                vm.oneRecord = "is value";
            } else {
                vm.oneRecord = "";
            }

        };
        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {repRole: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            //check if only one record
            //todo get Alternate
            if (vm.contactList.length === 1 && vm.contactList[0].repRole !== "PRIMARY") {
                vm.contactList[0].repRole = "PRIMARY";
                var temp=angular.copy(vm.contactList);
                vm.contactList=[];
                vm.contactList=temp;
            }

            //vm.onUpdate({newList: vm.contactList});
            vm.updateErrorState();
            vm.disableAdd();
            vm.setValid(true);
            vm.selectRecord = -1;
            vm.resetCollapsed = !vm.resetCollapsed;
        };
        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = repContactService.createRepContact(vm.contactList);
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.selectRecord = (vm.contactList.length - 1);
            vm.setValid(false);
        };

        vm.disableAdd = function () {
            if (!vm.contactList) return false;
            var isInvalid = !vm.isDetailValid || vm.contactList.length == 2 || (vm.contactList.length > 0 && vm.contactListForm.$invalid);
               // || (vm.contactListForm.$valid && vm.contactListForm.$dirty);

            return isInvalid;

        }

    }

})();
