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
        .module('contactModule')
        .component('cmpContactDetails',{
            templateUrl: 'app/scripts/components/contactDetails/tpl-contact-details.html',
            controller: contactCtrl,
            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                isAmend: '<',
                showErrors: '&',
            }
    });

    contactCtrl.$inject = ['getContactLists']
    function contactCtrl( getContactLists) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.salutationList = getContactLists.getSalutationList();
        vm.langCorrespondance = getContactLists.getLanguages();
        vm.phoneReg=/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
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
        vm.$onInit = function () {

           if (vm.contactRecord) {
                //doesn't copy as this is a dumb component
                vm.contactModel = vm.contactRecord;
            }
        }
        //TODO rename
        vm.$onChanges=function(changes){
            if(changes.contactRecord){
                vm.contactModel = changes.contactRecord.currentValue;

            }

        }
        vm.showError=function(ctrl){
            if((ctrl.$invalid && ctrl.$touched) || (vm.showErrors()&&ctrl.$invalid )){
                return true
            }
            return false
        }


        /**
         * @ngdoc method -determines if the fields should be readonly by default
         * @returns {boolean}
         */
            //TODO refactor
        vm.setNotEditable=function(){
            if (vm.isAmend) {
                return true;
            }
            return false
        }
    }

})();

