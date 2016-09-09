/**
 * Created by dkilty on 8/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList', ['contactRecord','expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('contactList')
        .component('cmpContactList', {
            templateUrl: './components/contact/tpl-contact-list.html',
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
        vm.allRolesSelected=false;
        vm.contactList = [];
        vm.columnDef = [
            {
                label: "FIRST_NAME",
                binding:"givenName",
                width:"25"
            },
            {
                label: "LAST_NAME",
                binding:"surname",
                width:"30"
            },
            {
                label: "JOB_TITLE",
                binding:"title",
                width:"25"
            },
            {
                label: "ROLES",
                binding:"roleConcat",
                width:"20"
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
            if(changes.contacts && changes.contacts.currentValue) {
                vm.contactList = changes.contacts.currentValue;
            }
        }

        vm.setValid=function(value){

            vm.isDetailValid=value; //this is a shared value
        }

        vm.showError = function () {

            if ((vm.contactListForm.$invalid && !vm.contactListForm.$pristine)) {
                return true
            }
            return false
        }

        vm.onUpdateContactRecord = function (record) {

            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: record.contactId}, true)[0]
            ); //TODO fix filter
            vm.contactList[idx] = angular.copy(record);
            vm.allRolesSelected= vm.isAllContactRolesSelected();
            // vm.isDetailValid=record.isDetailValid;
        }

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            vm.onUpdate({newList: vm.contactList});
            vm.isDetailValid = true; //case that incomplete record
            vm.allRolesSelected= vm.isAllContactRolesSelected();

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
        /**
         * @ngdoc method checks if all the contact roles have been selected
         * @returns {boolean}
         */
        vm.isAllContactRolesSelected=function(){
            var rolesSelected = 0;
            var repPrimarySelected=false;
            var repSecondarySelected=false;
            if (!vm.contactList) return false;
            var companyRole={};//= vm.companyService.createContactRole();
            var numKeys={};//vm.companyService.getNumberKeys(companyRole);

            for(var i=0;i<vm.contactList.length;i++) {
                var obj = vm.contactList[i].addressRole;
                for (var key in obj) {
                    var attrName = key;
                    var attrValue = obj[key];
                    if (attrValue && companyRole.hasOwnProperty(attrName)) {
                        rolesSelected++;
                        if(key==="repPrimary") repPrimarySelected=true;
                        if(key==="repSecondary") repSecondarySelected=true;
                    }
                }
            }
            if(rolesSelected===numKeys){
                return true;
            }
            if(rolesSelected===(numKeys-1) &&(repPrimarySelected &&!repSecondarySelected)){
                return true;
            }
            return false;
        }
    }

})();