/**
 * Created by dkilty on 8/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList2', ['contactRecord','expandingTable','errorSummaryModule'])
})();

(function () {
    'use strict';

    angular
        .module('contactList2')
        .component('cmpCompanyContactList', {
            templateUrl: 'app/scripts/components/contactList/tpl-contact-list.html',
            controller: contactListCtrl,
            controllerAs: 'contactListCtrl',
            bindings: {
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&',
                isAmend: '<',
                companyService:'<',
                showErrorSummary:'<',
                errorSummaryUpdate:'<'
            }
        });
    contactListCtrl.$inject = ['$filter','CompanyService'];
    function contactListCtrl($filter,CompanyService) {
        var vm = this;
        vm.selectRecord = -1; //the record to select
        vm.isDetailValid=true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.allRolesSelected=false;
        vm.contactList = [];
        vm.formAmend = false;
        vm.resetCollapsed = false;//used to signal expanding table collapse
        vm.updateSummary=0; //sends signal to update error summary object
        vm.showSummary=false; //flag to control error summary visibility
        vm.columnDef = [
            {
                label: "FIRSTNAME",
                binding:"givenName",
                width:"25"
            },
            {
                label: "LASTNAME",
                binding:"surname",
                width:"30"
            },
            {
                label: "JOBTITLE",
                binding:"title",
                width:"25"
            },
            {
                label: "ROLES",
                binding:"roleConcat",
                width:"20"
            }
        ];


        vm.alias = {
            "roleMissing": {
                "type": "fieldset",
                "parent": "fs_roleMissing"
            },
            "contactRolesValid": {
                "type": "element",
                "target": "addContact"
            }
        };
        vm.exclusions = {
            "contactRec.contactRecForm": "true"
        };


        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.focused = false;
            //vm.contactList = vm.contacts; //HERE Is how it is bound
            //updateRolesConcat();
            //vm.allRolesSelected = vm.isAllContactRolesSelected();
        };
        vm.$onChanges = function (changes) {
            if (changes.contacts) {
                vm.contactList = changes.contacts.currentValue;
                updateRolesConcat();
                vm.allRolesSelected = vm.isAllContactRolesSelected();
                vm.isDetailValid=true;
                vm.updateErrorSummaryState()
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState()
            }
        };

        vm.updateErrorSummaryState=function(){
            vm.updateSummary= vm.updateSummary+1;
        };


        function updateRolesConcat() {
            if (!vm.contactList) return;
            for (var i = 0; i < vm.contactList.length; i++) {

                _setRolesConcat(vm.contactList[i]);
            }


        }

        //this is needed on load. Bit of a hack
        //TODO move to a service?
        function _setRolesConcat(contactModel) {
            var roles = contactModel.addressRole;
            var result = "";

            if (roles.manufacturer) {
                result = result + " MFR"
            }
            if (roles.billing) {
                result = result + " BILL"
            }
            if (roles.mailing) {
                result = result + " MAIL"
            }
            if (roles.repPrimary) {
                result = result + " REP1"
            }
            if (roles.repSecondary) {
                result = result + " REP2"
            }
            contactModel.roleConcat = result;
        }


        vm.setValid=function(value){

            vm.isDetailValid=value; //this is a shared value
        };

        vm.showError = function () {
            // !vm.contactListForm.$pristine
            return(!vm.isAllContactRolesSelected());
           /* if ((!vm.isAllContactRolesSelected() )) {
                return true
            }
            return false*/
        };

        vm.onUpdateContactRecord = function (record) {

             var idx = vm.contactList.indexOf(
             $filter('filter')(vm.contactList, {contactId: record.contactId}, true)[0]
             ); //TODO fix filter
             vm.contactList[idx] = angular.copy(record);
            vm.allRolesSelected= vm.isAllContactRolesSelected();
            vm.resetCollapsed = !vm.resetCollapsed;

        };

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            vm.onUpdate({newList: vm.contactList});
            vm.isDetailValid = true; //case that incomplete record
            vm.allRolesSelected= vm.isAllContactRolesSelected();
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.updateErrorSummaryState();

        };

        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = vm.getNewContact();
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.selectRecord=(vm.contactList.length - 1);
            vm.isDetailValid= false;
            vm.showSummary=false;
        };

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
        };


        vm.disableAddContact = function () {
            //TODO don't hard code length?
            if(!vm.contactList) return false; //should never happen
            return (!(vm.contactList.length < 5 && vm.isDetailValid))

        };

        /**
         * @ngdoc method checks if all the contact roles have been selected
         * @returns {boolean}
         */
            //TODDO move this to the service
        vm.isAllContactRolesSelected=function(){
            var rolesSelected = 0;
            var repPrimarySelected=false;
            var repSecondarySelected=false;

            if (!vm.contactList) return false;
          var companyRole= vm.companyService.createContactRole();
            var numKeys=vm.companyService.getNumberKeys(companyRole);
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
            //primary has to be selected at least
            if (rolesSelected === (numKeys - 1) && (repPrimarySelected && !repSecondarySelected)) {
                return true;
            }

            return false;
        }
    }

})();
