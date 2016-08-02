/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList', ['contactModule'])
})();

(function () {
    'use strict';

    angular
        .module('contactList')
        .component('cmpContactList',{
            templateUrl: 'app/views/tpl-contact-list.html',
            controller: contactListCtrl,
            bindings: {
                formName: '<',
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&',
                isAmend: '&'
            }
        });
    contactListCtrl.$inject = ['$filter']
    function contactListCtrl($filter){
        var vm = this;
        //vm.detailsValid = true; //TODO new
        vm.contactList = [];
        vm.$onInit = function () {
            console.log("Contactlist is amend "+vm.isAmend())
            vm.detailsValid = true;
            vm.focused = false;
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            vm.tableRowIndexPrevExpanded = "";
            vm.dayDataCollapse = [true, true, true, true, true];
            vm.transactionShow = 0;
            vm.newAdrFormShow = false;
            vm.contactList = vm.contacts; //HERE Is how it is bound

        }

        vm.$onChanges=function(changes){
            console.log("*****on changes::contactList"+JSON.stringify(changes))
            // if(changes.addresses.previousValue.length>0) return;
            vm.contactList=changes.contacts.currentValue;
        }

        vm.deleteContact = function(cID){

            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx,1);
            vm.onUpdate({newList:vm.contactList});
            vm.detailsValid = true; //case that incomplete record
            if (vm.contactList.length == 0) {
                vm.resetTableRow();
            } else {
                //deleted so this setting should be false
                //TODO make generic
                vm.tableRowExpanded = false;
                vm.tableRowIndexCurrExpanded = "";
            }
        }
        vm.resetTableRow = function () {
            vm.tableRowIndexPrevExpanded = "";
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
        }
        vm.updateValid=function(detailValid){
            vm.detailsValid = detailValid;
        }
        vm.addContact = function () {
            var defaultContact = vm.getNewContact()
            vm.contactList.push(defaultContact);
            vm.selectTableRow((vm.contactList.length - 1), "");
            vm.detailsValid = false;
            vm.onUpdate({newList: vm.contactList});
            vm.isREPRoleSelected();
        }
        /**
         * @ngdoc method - checks if all the roles have been selected
         * @param roleToCheck (optional) returns if a role has been selected.
         *                     If no value check if all roles have been selected
         * @returns {boolean}
         */
       vm.isREPRoleSelected=function(roleToCheck){
            var rolesSelected=0;
            //if no role to check, see if all selected
            if(!vm.contactList) return false;
            if(!roleToCheck) {
                for (var i = 0; i < vm.contactList.length; i++) {
                    if (vm.contactList[i].contactRole) {
                        //TODO check for values?
                        rolesSelected = rolesSelected + 1;
                    }
                }
                if (rolesSelected > 1) {
                    console.log("roles are greater than")
                    return true
                }
            }else{
                for (var i = 0; i < vm.contactList; i++) {
                    if (vm.contactList[i].contactRole==roleToCheck) {
                        return true;
                    }
                }
            }
            console.log("roles false")
            return false;
        }

        /**
         * @ngdoc method updates the individual filed records
         * @param contact
         */
        vm.onUpdateContactRecord = function () {
            vm.detailsValid = $scope.contactForm.$valid;
            //vm.updateValid({validState:vm.addressModel.isDetailValid});
               /* var idx = vm.contactList.indexOf(
                    $filter('filter')(vm.contactList, {contactId: contact.contactId}, true)[0]
                );
                vm.contactList[idx] = contact;*/
                //vm.onUpdate({newList:vm.contactList});
        }

        vm.dayDataCollapseFn = function () {
            for (var i = 0; vm.contactList.length - 1; i += 1) {
                vm.dayDataCollapse.append('true');
            }
        };
        vm.selectTableRow = function (index, contactId) {
            if (!vm.detailsValid) return; //TODO activate error handling
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
