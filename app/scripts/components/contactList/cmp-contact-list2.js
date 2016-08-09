/**
 * Created by dkilty on 8/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList2', [])
})();

(function () {
    'use strict';

    angular
        .module('contactList2')
        .component('cmpContactList2', {
            templateUrl: 'app/scripts/components/contactList/tpl-contact-list2.html',
            controller: contactListCtrl,
            controllerAs: 'contactListCtrl',
            bindings: {
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&',
                isAmend: '&'
            }
        });
    contactListCtrl.$inject = ['$filter']
    function contactListCtrl($filter) {
        var vm = this;
        vm.selectRecord=0; //the record to select
        vm.isDetailValid=true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.contactList = [];
        vm.columnDef = [
            {
                label: "First Name",
                binding:"givenName"
            },
            {
                label: "Last Name",
                binding:"surname"
            },
            {
                label: "Title",
                binding:"title"
            },
            {
                label: "Role",
                binding:"roleConcat"
            },
        ]
        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.temp = vm.countContacts();
            //vm.detailsValid = true;
            vm.focused = false;
            vm.contactList = vm.contacts; //HERE Is how it is bound
        }
        vm.$onChanges = function (changes) {
            if(changes.contacts && changes.contacts.currentValue) {
                vm.contactList = changes.contacts.currentValue;
            }
        }

        vm.setValid=function(value){
            vm.isDetailValid=value; //this is a shared value

        }

        vm.onUpdateContactRecord = function (record) {

             var idx = vm.contactList.indexOf(
             $filter('filter')(vm.contactList, {contactId: record.contactId}, true)[0]
             ); //TODO fix filter
             vm.contactList[idx] = angular.copy(record);

            // vm.isDetailValid=record.isDetailValid;
        }

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            vm.onUpdate({newList: vm.contactList});
            vm.isDetailValid = true; //case that incomplete record
            vm.temp = vm.countContacts()
            if (vm.contactList.length == 0) {
                /*vm.resetTableRow();*/
            } else {
                //deleted so this setting should be false
                //TODO make generic
                /*vm.tableRowExpanded = false;
                 vm.tableRowIndexCurrExpanded = "";*/
            }
        }

        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = vm.getNewContact()
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.isDetailValid=true;
            vm.selectRecord=(vm.contactList.length - 1);
            vm.isDetailValid= false;
        }



        vm.countContacts = function () {
            if (!vm.contactList) return 0;
            for (var i = 0; i < vm.contactList.length; i++) {
                //todo account roles
            }

            return (vm.contactList.length)
        }




        /**
         * @ngdoc method - checks if all the roles have been selected
         * @param roleToCheck (optional) returns if a role has been selected.
         *                     If no value check if all roles have been selected
         * @returns {boolean}
         */
        vm.isREPRoleSelected = function (roleToCheck,recordID) {
            var rolesSelected = 0;
            //if no role to check, see if all selected
            if (!vm.contactList) return false;
            for (var i = 0; i < vm.contactList.length; i++) {
                if (vm.contactList[i].addressRole[roleToCheck] == true) {
                    //don't count it if it is the existing record
                    if(vm.contactList[i].contactId!==recordID) {
                        rolesSelected = rolesSelected + 1;
                    }
                    if(rolesSelected>0) {
                        return true;
                    }
                }
            }
            return false;
        }

    }


})();
