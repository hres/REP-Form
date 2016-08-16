/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    angular
        .module('addressModule', [
            'addressRole',
            'countrySelect',
            'dataLists'
        ])
})();

(function () {
    'use strict';
    angular
        .module('addressModule')
        .component('cmpAddressDetails', {
            templateUrl: 'app/scripts/components/addressDetails/tpl-address-details.html',
            controller: addressCtrl,
            controllerAs: 'adr',
            bindings: {
                addressRecord: '<',
                onUpdate: '&',
                showErrors: '&',
                isAmend: '<'
            }
        });
    addressCtrl.$inject = [ 'getCountryAndProvinces', 'getCountriesISO3166'];

    function addressCtrl( getCountryAndProvinces, getCountriesISO3166) {

        var vm = this;
        //put model updates in ng-change but defer on blur. Now model updates on blur only if it changed
        vm.ngModelOptSetting = {updateOn: 'blur'};

        vm.addressModel = {
            addressID: "",
            isDetailValid: false,
            companyName: "",
            street: "",
            city: "",
            country: "",
            stateLov: "",
            stateText: "",
            postalCode: ""

        };
        vm.canadianPostalCodePattern = '^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$';

        vm.usaZipCode = '^[0-9]{5}(?:-[0-9]{4})?$';
        vm.hideProvinceText = false;
        vm.countries = getCountriesISO3166.getCountryList3Letter();
        vm.$onInit = function () {

            if (vm.addressRecord) {
                //vm.addressModel = angular.extend({},vm.addressRecord); THIS causes focus grief
                vm.addressModel = vm.addressRecord;
                vm.provListLabel = getProvinceListLabel();
                vm.postalLabel = getPostalLabel();
                vm.isPostalRequired = isPostalRequiredFn();
                vm.provinces = getProvinceStateList();
                vm.hideProvinceText = getProvinceTextState();
                vm.postalPattern = getPostalPattern();
                vm.hideProvinceDdl = !vm.hideProvinceText;

            }
        }
        /**
         * @ngdoc method updates if the model changes
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.addressRecord) {
                vm.addressModel = changes.addressRecord.currentValue;
            }
        };
        vm.showError = function (ctrl) {
            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }
            return false
        }

        vm.onDeleteButtonClick = function () {
            vm.onDelete({addressId: vm.addressModel.addressID});
        }

        vm.onDiscardButtonClick = function () {
            vm.addressModel = angular.extend({}, vm.addressRecord);
            vm.addressForm.$setPristine();
        }


        vm.onSelectedCountryChange = function (newValue) {
            vm.addressModel.country = newValue;
            vm.provListLabel = getProvinceListLabel();
            vm.postalLabel = getPostalLabel();
            vm.isPostalRequired = isPostalRequiredFn();
            vm.provinces = getProvinceStateList();
            vm.hideProvinceText = getProvinceTextState();
            vm.postalPattern = getPostalPattern();
            vm.hideProvinceDdl = !vm.hideProvinceText;

        }

        vm.onAddressRoleUpdate = function (newRole) {
            //  vm.addressModel.addressRole = newRole;
            // vm.updateAddressModel();

        }

        /**
         * @ngdoc method formats canadian postal code to upper and space
         */
        vm.postalCodeChanged=function(){
            var postal=vm.addressModel.postalCode;
            if(!postal) return;
            postal= postal.toUpperCase();
            if(postal.length==6 && vm.addressModel.country === 'CAN'){
                postal=postal.substring(0,3)+" "+postal.substring(3,postal.length)
            }
            vm.addressModel.postalCode=postal;
        }
        var getProvinceTextState = function () {

            var isCanOrUsa = isPostalRequiredFn();

            if (isCanOrUsa) {
                vm.addressModel.stateText = "";

            } else {
                vm.addressModel.stateList = "";
            }

            return isCanOrUsa;
        }

        var isPostalRequiredFn = function () {
            return (vm.addressModel.country === 'CAN' || vm.addressModel.country === 'USA');
        }

        var getProvinceStateList = function () {

            if (vm.addressModel.country === 'CAN') {
                return getCountryAndProvinces.getProvinces();

            }
            else if (vm.addressModel.country === 'USA') {
                return getCountryAndProvinces.getUSStates();
            }
        }

        var getProvinceListLabel = function () {
            var label = (vm.addressModel.country === 'USA') ? "STATE" : "PROVINCE";
            return label;
        }


        var getPostalLabel = function () {
            var label = (vm.addressModel.country === 'USA') ? "ZIP" : "POSTAL";
            return label;
        }

        var getPostalPattern = function () {
            var postalPtrn = null;
            if (vm.addressModel.country === 'USA') {
                postalPtrn = /^[0-9]{5}(?:-[0-9]{4})?$/;
            } else if (vm.addressModel.country === 'CAN') {
                postalPtrn = /^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/;
            }

            return postalPtrn;
        }

    }

})();


