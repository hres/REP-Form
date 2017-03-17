/**
 * Created by dkilty on 8/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressRecord', ['addressModule', 'addressRole','filterLists','importerProducts','hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('addressRecord')
        .component('cmpAddressRecord', {
            templateUrl: 'app/scripts/components/addressRecord/tpl-address-record.html',
            controller: addressRecCtrl,
            controllerAs: 'addressRec',

            bindings: {
                addressRecord: '<',
                onUpdate: '&',
                updateValid: '&',
                checkRoles: '&',
                onDelete: '&',
                isAmend: '<',
                isDetailValid: '&',
                isRoleSelected: '&',
                recordIndex:'<'
            }
        });
    addressRecCtrl.$inject = ['$scope','CANADA'];
    function addressRecCtrl($scope,CANADA) {
        var vm = this;
        vm.savePressed = false;
        vm.isContact = false;
        vm.isEditable = true;
        vm.formAmend = false;
        vm.isImporter=false;
        vm.addressRecForm = "";
        //TODO get  model from a servide
        vm.addressModel = {
            addressID: 1,
            companyName: "",
            amendRecord: false,
            addressRole: {
                manufacturer: false,
                mailing: false,
                billing: false,
                importer: false
            },
            street: "",
            city: "",
            provLov: "",
            stateList: "",
            stateText: "",
            country: "",
            postalCode: "",
            importerProducts: {
                selectedProducts: "",
                dossierIdList: []
            }
        };
        /*
        * Sends the message up to determine if a row has already been selected.
        * This merss
         */
        vm.isOneSelected = function (type) {
            return (vm.isRoleSelected({roleName: type, id: vm.addressModel.addressID}));
        };
        vm.$onInit = function () {
        };
        //TODO move to service
        function _getRolesConcat() {
            var addressRoles = vm.addressModel.addressRole;
            var result = "";

            if (addressRoles.manufacturer) {
                result = result + " MFR,"
            }
            if (addressRoles.billing) {
                result = result + " BILL,"
            }
            if (addressRoles.mailing) {
                result = result + " MAIL,"
            }
            if (addressRoles.importer) {
                result = result + " IMP,"
            }
            result = result.substring(0, result.length - 1);
            return result
        }

        /**
         * Determines if a canadian importer role has been selected
         * @returns {boolean} true -if importer
         */
        vm.notCanadianManufact=function(){
            if(!vm.addressModel) return false;
            return (vm.addressModel.addressRole.manufacturer===true &&vm.addressModel.country.id!==CANADA);

        };

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges = function (changes) {
            //how this is currently wired, this will never fire!
            if (changes.addressRecord) {
                vm.addressModel = angular.copy(changes.addressRecord.currentValue);
                vm.addressModel.roleConcat = _getRolesConcat();
                vm.setEditable();
                vm.importerProductState(vm.addressModel.addressRole.importer);
                //angular.element(saveAddress).trigger('focus');
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
                vm.setEditable();
            }
        };

        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({addressId: vm.addressModel.addressID});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            if (vm.addressRecForm.$pristine) return;
            var currRecord = vm.addressRecord;
            vm.addressModel = angular.copy(currRecord);
            vm.setEditable(); //case of amend
            vm.addressRecForm.$setPristine();
            vm.isDetailValid({state: vm.addressRecForm.$valid});
            vm.savePressed = false;
        };
        //TODO obsolete?
        vm.onAddressRoleUpdate = function (newRole) {
            var aRole = {};
            angular.extend(aRole, newRole);
            vm.addressModel.addressRole = aRole;
            vm.updateAddressModel2();
        };

        vm.importerProductState=function(state){
            vm.isImporter=state;
            if(!vm.isImporter){
                 vm.addressModel.importerProducts={
                    "selectedProducts":"",
                    "dossierIdList":[]
                };
            }else if( vm.addressModel.importerProducts.dossierIdList.length===0){
                vm.addressModel.importerProducts.dossierIdList.push({dossierId:""})
            }
        };

        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid = function () {
            vm.isDetailValid({state: (vm.addressRecForm.$valid && !vm.addressRecForm.$dirty)});
        };

        $scope.$watch('addressRec.addressRecForm.$dirty', function () {
            if (vm.addressRecForm.$dirty) {
                vm.isDetailValid({state: false})
            }
        }, true);

        /**
         * Updates the contact model used by the save button
         */
        vm.updateAddressModel2 = function () {
            vm.addressModel.roleConcat = _getRolesConcat();
            if (vm.addressRecForm.$valid) {
                     vm.isDetailValid({state: true});
                    vm.addressRecForm.$setPristine();
                    vm.onUpdate({rec: vm.addressModel});
            }
            vm.savePressed = true;
        };
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors = function () {

            return (vm.savePressed)
        };

        /**
         * Controls errors state of an individual UI control. Since cannot pass the control for some reason
         * pass the needed state variables... very annoying
         * @param isTouched
         * @param isInvalid
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )) {
                return true
            }
            return false
        };



        /**
         * @ngdoc method used to determine if record should be editable. Used for amend
         * @returns {boolean}
         */
        vm.setEditable = function () {

            vm.isEditable = !(vm.formAmend && !vm.addressModel.amendRecord);
        }

    }


})();