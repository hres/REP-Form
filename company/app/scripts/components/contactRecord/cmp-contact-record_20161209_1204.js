/**
 * Created by dkilty on 8/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactRecord', ['addressRole','contactModule'])
})();

(function () {
    'use strict';

    angular
        .module('contactRecord')
        .component('cmpContactRecord', {
            templateUrl: 'app/scripts/components/contactRecord/tpl-contact-record_20161209_1204.html',
            controller: contactRecCtrl,
            controllerAs: 'contactRec',
            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                updateValid:'&',
                checkRoles:'&',
                onDelete:'&',
                isAmend: '<',
                isDetailValid:'&',
                isRoleSelected:'&'
            }
        });
        contactRecCtrl.$inject=['$scope']
    function contactRecCtrl($scope) {
        var vm = this;
        vm.savePressed=false;
        vm.isContact=true; //used to set the state of the role
        vm.isEditable = false;
        vm.formAmend = false;
       //TODO get role model from a servide

        vm.contactModel={
                roleConcat:"",
                contactId: "",
                amendRecord: false,
                addressRole: {
                    manufacturer: false,
                    mailing: false,
                    billing: false,
                    repPrimary:false,
                    repSecondary:false
                },
                contactRole: "",
                salutation: "",
                givenName: "",
                surname: "",
                initials: "",
                title: "",
                phone: "",
                PhoneExt: "",
                fax: ""
            };
        vm.isOneSelected=function(type){
            return(vm.isRoleSelected({roleName:type,id:vm.contactModel.contactId}));
        }
        vm.$onInit = function () {
            /*//after init do not initialise variables here onchanges is called first
                var rec=vm.trackRecordCtrl.trackRecord();
                //only bind if there is a record. Should never happen that there is no record
                if(rec) {
                    vm.contactModel = angular.copy(rec);

                    angular.element(saveContact).trigger('focus');
             }*/
        }
        //todo move to service
        function _getRolesConcat(){
            var addressRoles=vm.contactModel.addressRole;
            var result="";

            if(addressRoles.manufacturer){
                result = result + " MFR"
            }
            if(addressRoles.billing){
                result= result+" BILL"
            }
            if(addressRoles.mailing){
                result= result+" MAIL"
            }
            if(addressRoles.repPrimary){
                result= result+" REP1"
            }
            if(addressRoles.repSecondary){
                result= result+" REP2"
            }
            return result
        }

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges=function(changes){
            //how this is currently wired, this will never fire!
            if (changes.contactRecord) {
                vm.contactModel = angular.copy(changes.contactRecord.currentValue);
                vm.contactModel.roleConcat = _getRolesConcat();
                vm.setEditable();
                //angular.element(saveContact).trigger('focus');
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
                vm.setEditable();
            }
        }

        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({contactId: vm.contactModel.contactId});
        }
        /* @ngdoc method -discards the changes and reverts to the model
        *
         */
        vm.discardChanges=function(){
            if(vm.contactRecForm.$pristine) return;
            var currRecord = vm.contactRecord;
            vm.contactModel =angular.copy(currRecord);
            vm.setEditable()
            //since we are reverting back to the last save should be pristine
            vm.contactRecForm.$setPristine();
            vm.isDetailValid({state:vm.contactRecForm.$valid});
            vm.savePressed=false;
        }

        vm.onContactRoleUpdate = function (newRole) {
            var aRole={};
            angular.extend(aRole,newRole)
            vm.contactModel.addressRole = aRole;
            vm.updateContactModel2();
            vm.setEditable();
        }
        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid=function(){
            vm.isDetailValid({state:(vm.contactRecForm.$valid && !vm.contactRecForm.$dirty) });
        }
        /**
         * If the form is dirty always set that it is not valid
         */
        $scope.$watch('contactRec.contactRecForm.$dirty', function() {
            //if statement redundant?
            if(vm.contactRecForm.$dirty) {
                vm.isDetailValid({state:false})
            }
        }, true);

        /**
         * Updates the contact model used by the save button
         */
        vm.updateContactModel2 = function () {
            vm.contactModel.roleConcat=_getRolesConcat();
          if(vm.contactRecForm.$valid) {
             // vm.contactModel.isDetailValid=true;
              vm.isDetailValid({state:true})
              vm.contactRecForm.$setPristine() ;
                vm.onUpdate({contact: vm.contactModel});
            }
            vm.savePressed=true;
        }
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors=function(){

            return(vm.savePressed)
        }
        /**
         * @ngdoc method used to determine if record should be editable. Used for amend button
         * @returns {boolean}
         */
        vm.setEditable = function () {

            if (!vm.formAmend) {
                vm.isEditable = true
            } else if (vm.formAmend && vm.contactModel.amendRecord) {
                vm.isEditable = true;
            } else {
                vm.isEditable = false;
            }
        }

    }


})();