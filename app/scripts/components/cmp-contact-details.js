/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactModule', [
            'addressRole',
            'dataLists'
        ])
})();

(function () {
    'use strict';

    angular
        .module('contactModule').
        component('cmpContactDetails',{
            templateUrl: 'app/views/tpl-contact-details.html',
            controller: contactCtrl,

            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                onDelete: '&',
                isAmend: '&',
                updateValid: '&',//tells parent that the details are valid/not valid
                checkRoles: '&'
            }
    });


    contactCtrl.$inject = ['$scope', 'getContactLists', 'getRoleLists']
    function contactCtrl($scope, getContactLists, getRoleLists) {
        var vm = this;

        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.salutationList = getContactLists.getSalutationList();
        vm.contactRoleList = getRoleLists.getContactRoles();
        vm.langCorrespondance = getContactLists.getLanguages();
        vm.$onInit = function () {
            console.log("creating a contact "+vm.checkRoles({roleValue:'ff'}));

            vm.disableRepRole=vm.checkRoles({roleValue:''})
            ///vm.disableRepRole=true
            vm.contactModel = {
                isDetailValid: false,
                contactId: "",
                amendRecord: false,
                addressRole: {
                    manufacturer: false,
                    mailing: false,
                    billing: false,
                    importer: false
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
            if (vm.contactRecord) {
                vm.contactModel = vm.contactRecord; //workaround
                //angular.extend(vm.contactModel, vm.contactRecord);
            }
        }
        //TODO rename
        vm.$onChanges=function(){
             console.log("changes details")
            vm.disableRepRole=vm.checkRoles({roleValue:''})
        }

        vm.delete = function () {
            vm.onDelete({contactId: vm.contactModel.contactId});
        }


        vm.onContactRoleUpdate = function (newRole) {
            vm.contactModel.addressRole = newRole
            vm.updateContactModel();
        }

        vm.updateContactModel = function () {
         vm.contactModel.isDetailValid = $scope.contactForm.$valid;
            vm.updateValid({validState:vm.contactModel.isDetailValid});
         //vm.onUpdate({contact: vm.contactModel});
        }
        /**
         * @ngdoc method condition by which to show an error
         * @param control
         * @returns {boolean}
         */
        vm.showError = function (control) {
            if (control.$invalid&& !control.$pristine) {
                return true;
            }
        }
        /**
         * @ngdoc method -determines if the fields should be readonly by default
         * @returns {boolean}
         */
        vm.setNotEditable=function(){
            if(vm.isAmend() &&!vm.contactModel.amendRecord){
                return true;
            }
            return false
        }
    }

})();