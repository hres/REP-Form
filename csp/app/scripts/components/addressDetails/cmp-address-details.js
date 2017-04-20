/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    angular
        .module('addressModule', [
            'hpfbConstants',
            'dataLists',
            'filterLists',
            'ui.select'

        ])
})();

(function () {
    'use strict';
    angular
        .module('addressModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpAddressDetails', {
            templateUrl: 'app/scripts/components/addressDetails/tpl-address-details.html',
            controller: addressCtrl,
            controllerAs: 'adr',
            bindings: {
                addressRecord: '<',
                onUpdate: '&', //no longer used TBD should be removed
                showErrors: '&',
                isAmend: '<',
                updateErrorSummary:'&'
            }
        });
    addressCtrl.$inject = ['getCountryAndProvinces','$translate','CANADA','USA'];

    function addressCtrl( getCountryAndProvinces,$translate, CANADA,USA) {

        var vm = this;
        vm.isEditable = true;
        //put model updates in ng-change but defer on blur. Now model updates on blur only if it changed
        vm.ngModelOptSetting = {updateOn: 'blur'};
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.addressModel = {
            addressID: "",
            isDetailValid: false,
            street: "",
            city: "",
            country: "",
            countryDisplay:"",
            stateLov: "",
            stateText: "",
            postalCode: ""
        };

        vm.canadianPostalCodePattern = '^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$';

        vm.usaZipCode = '^[0-9]{5}(?:-[0-9]{4})?$';
        vm.hideProvinceText = false;
        vm.countryList= getCountryAndProvinces.getCountries();
        vm.postalError="MSG_ERR_POSTAL";
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
        };
        /**
         * @ngdoc method updates if the model changes
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.addressRecord) {
                vm.addressModel = changes.addressRecord.currentValue;
                vm.countryChanged();
            }
            if (changes.isAmend) {
                vm.isEditable = changes.isAmend.currentValue;
            }
        };
        /**
         * Updates the display value for the object for summary display
         */
        vm.countryChanged=function(){
            vm.addressModel.countryDisplay=vm.addressModel.country.id;
            vm.provListLabel = getProvinceListLabel();
            vm.postalLabel = getPostalLabel();
            vm.isPostalRequired = isPostalRequiredFn();
            vm.provinces = getProvinceStateList();
            vm.hideProvinceText = getProvinceTextState();
            vm.postalPattern = getPostalPattern();
            vm.hideProvinceDdl = !vm.hideProvinceText;
            vm.isCountryCanada();
            vm.updateErrorSummary();
        };

        vm.isCountryCanada=function(){
          if(!vm.addressModel || !vm.addressModel.country){
              vm.postalError="MSG_ERR_POSTAL";
              return false;
          }
           else if(vm.addressModel.country.id===CANADA){
                vm.postalError="MSG_ERR_POSTAL";
                return true;
            }else{
                vm.postalError="MSG_ERR_ZIP";
            }
            return false
        };

        vm.showError = function (ctrl) {

            if (!ctrl) {
                return false
            }
            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }
            return false
        };


        vm.onDeleteButtonClick = function () {
            vm.onDelete({addressId: vm.addressModel.addressID});
        };

        vm.onDiscardButtonClick = function () {
            vm.addressModel = angular.extend({}, vm.addressRecord);
            vm.addressForm.$setPristine();
        };


       /* vm.onSelectedCountryChange = function () {


        }
*/
        vm.onAddressRoleUpdate = function (newRole) {
            //  vm.addressModel.addressRole = newRole;
            // vm.updateAddressModel();

        };

        /**
         * @ngdoc method formats canadian postal code to upper and space
         */
        vm.postalCodeChanged=function(){
            var postal=vm.addressModel.postalCode;
            if(!postal) return;
            postal= postal.toUpperCase();
            if(postal.length==6 && vm.addressModel.country.id === CANADA){
                postal=postal.substring(0,3)+" "+postal.substring(3,postal.length)
            }
            vm.addressModel.postalCode=postal;
            vm.updateErrorSummary();
        };
        var getProvinceTextState = function () {

            var isCanOrUsa = isPostalRequiredFn();

            if (isCanOrUsa) {
                vm.addressModel.stateText = "";

            } else {
                vm.addressModel.stateList = "";
            }

            return isCanOrUsa;
        };

        var isPostalRequiredFn = function () {
            return (vm.addressModel.country.id === CANADA || vm.addressModel.country.id === USA);
        };

        var getProvinceStateList = function () {

            if (vm.addressModel.country.id === CANADA) {
                return getCountryAndProvinces.getProvinces();

            }
            else if (vm.addressModel.country.id === USA) {
                return getCountryAndProvinces.getUSStates();
            }
        };

        var getProvinceListLabel = function () {
            var label = (vm.addressModel.country.id === USA) ? "STATE" : "PROVINCE";
            return label;
        };


        var getPostalLabel = function () {
            var label = (vm.addressModel.country.id === USA) ? "ZIP" : "POSTAL";
            return label;
        };

        var getPostalPattern = function () {
            var postalPtrn = null;
            if (vm.addressModel.country.id === USA) {
                postalPtrn = /^[0-9]{5}(?:-[0-9]{4})?$/;
            } else if (vm.addressModel.country.id === CANADA) {
                postalPtrn = /^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/;
            }

            return postalPtrn;
        }

    }

})();


