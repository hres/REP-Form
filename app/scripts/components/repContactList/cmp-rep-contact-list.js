/**
 * Created by dkilty on 8/6/2016.
 */


(function () {
    'use strict';

    angular
        .module('contactModule26', ['contactModule25', 'expandingTable'])
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
                onUpdate: '&',
                getNewContact: '&',
                /* isAmend: '&'*/
                /*companyService:'<'*/
            }
        });
    contactListCtrl.$inject = ['$filter']
    function contactListCtrl($filter) {
        var vm = this;
        vm.selectRecord = -1; //the record to select
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.contactList = [];
        vm.columnDef = [
            {
                label: "FIRST_NAME",
                binding: "givenName",
                width: "40"
            },

            {
                label: "LAST_NAME",
                binding: "surname",
                width: "40"
            },
            {
                label: "ROLE",
                binding: "repRole",
                width: "20"
            }
        ]
        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.focused = false;
            vm.contactList = vm.contacts; //HERE Is how it is bound
        }
        vm.$onChanges = function (changes) {
            if (changes.contacts) {
                console.log("changes to contact List")
                vm.contactList = changes.contacts.currentValue;
            }

        }
        vm.isAddContact = function () {
            if (vm.contactList.length > 1) {

                return false;
            }
            return (vm.isDetailValid);
        }

        vm.setValid = function (value) {
            vm.isDetailValid = value; //this is a shared value
        }

        vm.showError = function () {

            if ((vm.contactListForm.$invalid && !vm.contactListForm.$pristine)) {
                return true
            }
            return false
        }

        vm.onUpdateContactRecord = function (record) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {repRole: record.repRole}, true)[0]
            ); //TODO fix filter
            vm.contactList[idx] = angular.copy(record);

        }

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {repRole: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            //check if only one record
            //todo get Alternate
            if (vm.contactList.length === 1 && vm.contactList[0].repRole !== "PRIMARY") {
                vm.contactList[0].repRole = "PRIMARY"
            }

            vm.onUpdate({newList: vm.contactList});
            vm.setValid(true);
            vm.selectRecord = -1

        }
        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = vm.getNewContact()
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.setValid(true);
            vm.selectRecord = (vm.contactList.length - 1);
            vm.setValid(false);
        }
    }

})();
