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
    angular.module('addressModule').component('cmpAddressDetails', {
        templateUrl: 'app/views/tpl-address-details.html',
        controller: addressCtrl,
        controllerAs: 'adr',
        bindings: {
            addressRecord: '<',
            selectedCountry: '<', // The current selected country
            onUpdate: '&',
            onDelete: '&',
            isAmend: '&',
            updateValid:'&' //tells parent that the details are valid/not valid
        }
    });

    addressCtrl.$inject = ['$scope', 'getCountryAndProvinces', 'getCountriesISO3166'];

    function addressCtrl($scope, getCountryAndProvinces, getCountriesISO3166) {

        var vm = this;
        //put model updates in ng-change but defer on blur. Now model updates on blur only if it changed

        vm.$onInit = function () {
            vm.ngModelOptSetting = {updateOn: 'blur'}
            console.log("one init address details")
            vm.addressModel = {
                addressID: "",
                isDetailValid: false,
                amendRecord: false,
                addressRole: {
                    manufacturer: false,
                    mailing: false,
                    billing: false,
                    importer: false
                },
                companyName: "",
                street: "",
                city: "",
                country: "",
                stateLov: "",
                stateText:"",
                postalCode: ""

            };
            vm.canadianPostalCodePattern = '^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$';

            vm.usaZipCode = '^[0-9]{5}(?:-[0-9]{4})?$';
            //"^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$"

            vm.hideProvinceText = false;
            vm.countries = getCountriesISO3166.getCountryList3Letter();
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
        vm.onDeleteButtonClick = function () {
            console.log("delete button click: " + vm.addressModel.addressID);
            vm.onDelete({addressId: vm.addressModel.addressID});
        }

        vm.onDiscardButtonClick = function () {
            vm.addressModel = angular.extend({}, vm.addressRecord);
            $scope.addressForm.$setPristine();
        }


        vm.$onChanges = function (changes) {
            //console.log("AddressDetails onChanges being called")
        };

        vm.onSelectedCountryChange = function (newValue) {
            vm.addressModel.country = newValue;
            //console.log("cmpAddress onSelectedCountryChange newValue: " + newValue);
            // setCountry(vm.addressModel.country);
            //vm.provinceTextState();
            vm.provListLabel = getProvinceListLabel();
            vm.postalLabel = getPostalLabel();
            vm.isPostalRequired = isPostalRequiredFn();
            vm.provinces = getProvinceStateList();
            vm.hideProvinceText = getProvinceTextState();
            vm.postalPattern = getPostalPattern();
            vm.hideProvinceDdl = !vm.hideProvinceText;
            //update the country value into the model
            vm.updateAddressModel();
        }

        vm.onAddressRoleUpdate = function (newRole) {
            vm.addressModel.addressRole = newRole;
            vm.updateAddressModel();

        }
        //update the data model for the main form
        vm.updateAddressModel = function () {
            vm.addressModel.isDetailValid = $scope.addressForm.$valid;
            vm.updateValid({validState:vm.addressModel.isDetailValid});
           // vm.onUpdate({address: vm.addressModel});
        }

        vm.setNotEditable=function(){
            if(vm.isAmend() &&!vm.addressModel.amendRecord){
                return true;
            }
            return false
        }

        vm.showError = function (control) {
            if (control.$invalid &&!control.$pristine) {
                return true;
            }
        }
        var getProvinceTextState = function () {

            var isCanOrUsa = isPostalRequiredFn();

            if (isCanOrUsa) {
                vm.addressModel.stateText = null;

            } else {
                vm.addressModel.stateList = null;
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


