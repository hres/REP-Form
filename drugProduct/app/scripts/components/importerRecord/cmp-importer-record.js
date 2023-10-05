/**
 * Created by steveZhao on 05/25/2018.
 */

(function () {
    'use strict';

    angular
        .module('importerRecordModule',
            [
                'hpfbConstants',
                'dataLists',
                'filterLists',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('importerRecordModule')
        .component('cmpImporterRecord', {
            templateUrl: 'app/scripts/components/importerRecord/tpl-importer-record.html',
            controller: importerRecordController,
            controllerAs:'importerRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                onUpdate: '&',
                showErrors: '<',
                isFocus: '<',
                cancelFocus: '&',
                htIndxList:'<',
                updateErrorSummary:'&'
            }
        });

    importerRecordController.$inject = ['getCountryAndProvinces', '$translate', 'CANADA', 'USA', '$scope'];
    function importerRecordController(getCountryAndProvinces, $translate, CANADA, USA, $scope) {
        var vm = this;
        vm.lang = $translate.proposedLanguage() || $translate.use();

        vm.model = {
            importerId: "",
            importerName: "",
            street: "",
            city: "",
            country: {
                "id": "CAN",
                "en": "Canada",
                "fr": "Canada"
            },
            countryHtml: "Canada",
            countryDisplay:"CAN",
            stateLov: "",
            stateText: "",
            postalCode: "",
            phone: "",
            phoneExt: "",
            fax: "",
            email: "",
            routingId: ""
        };

        vm.canadianPostalCodePattern = '^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$';
        // vm.usaZipCode = '^[0-9]{5}(?:-[0-9]{4})?$';
        // vm.hideProvinceText = true;
        vm.updateSummary=0; //triggers and error summary update
        vm.countryList= getCountryAndProvinces.getCountries();
        vm.fdId="";
        vm.phoneReg=/^([0-9]{10,25}$)/;
        vm.faxReg=/^([0-9]{10,25}$)/;
        vm.routingIdReg=/^([0-9A-Za-z-]*$)/;
        vm.emailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.postalErrorList = [{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_POSTAL"}];

        vm.showDetailErrors=false;
        vm.min5Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"}
        ];
        vm.emailError=[{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_EMAIL_FORMAT"}];
        vm.phoneError=[{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_PHONE_FORMAT"}];
        vm.faxError=[{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_FAX_FORMAT"}];
        vm.routingIdError=[{type: "pattern", displayAlias: "MSG_ERR_PHONE_FORMAT"}];

        vm.$onInit = function(){
            vm.showDetailErrors=false;
            if (vm.record) {
                vm.model = vm.record;
                vm.provListLabel = getProvinceListLabel();
                vm.postalLabel = getPostalLabel();
                // vm.isPostalRequired = isPostalRequiredFn();
                vm.provinces = getProvinceStateList();
                // vm.hideProvinceText = getProvinceTextState();
                // vm.postalPattern = getPostalPattern();
                // vm.hideProvinceDdl = !vm.hideProvinceText;
            }
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };
        vm.updateErrorSummaryState=function(){
            vm.updateSummary= vm.updateSummary+1;
        };

        /**
         * Updates the display value for the object for summary display
         */
        // vm.countryChanged=function(){
        //     console.log("jang test:" + vm.model.country.id);
        //     if( vm.model.country.id !== undefined ) {
        //         vm.model.countryDisplay = vm.model.country.id;
        //         vm.provListLabel = getProvinceListLabel();
        //         vm.postalLabel = getPostalLabel();
        //         // vm.isPostalRequired = isPostalRequiredFn();
        //         vm.provinces = getProvinceStateList();
        //         // vm.hideProvinceText = getProvinceTextState();
        //         vm.postalPattern = getPostalPattern();
        //         // vm.hideProvinceDdl = !vm.hideProvinceText;
        //         vm.isCountryCanada();
        //     }
        //     else {
        //         vm.model.countryHtml = "";
        //         vm.model.countryDisplay = "";
        //         // vm.isPostalRequired = false;
        //         // vm.hideProvinceText = false;
        //         // vm.hideProvinceDdl = !vm.hideProvinceText;
        //     }
        //     vm.updateErrorSummaryState();
        // };
        //
        // vm.isCountryCanada=function(){
        //     if(!vm.model || !vm.model.country){
        //         vm.postalErrorList = [{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_POSTAL"}];
        //         return false;
        //     }
        //     else if(vm.model.country.id===CANADA){
        //         vm.postalErrorList = [{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_POSTAL"}];
        //         return true;
        //     }else{
        //         vm.postalErrorList = [{type: "required", displayAlias: "MSG_ERR_MAND"},{type: "pattern", displayAlias: "MSG_ERR_ZIP"}];
        //     }
        //     return false
        // };


        /**
         * @ngdoc method formats canadian postal code to upper and space
         */
        vm.postalCodeChanged=function(){
            var postal=vm.model.postalCode;
            if(!postal) return;
            postal= postal.toUpperCase();
            // if(postal.length==6 && vm.model.country.id === CANADA){
            if(postal.length==6){
                postal=postal.substring(0,3)+" "+postal.substring(3,postal.length)
            }
            vm.model.postalCode=postal;
            vm.updateErrorSummaryState();
        };
        // var getProvinceTextState = function () {
        //
        //     var isCanOrUsa = isPostalRequiredFn();
        //
        //     if (isCanOrUsa) {
        //         vm.model.stateText = "";
        //
        //     } else {
        //         vm.model.stateList = "";
        //     }
        //
        //     return isCanOrUsa;
        // };

        // var isPostalRequiredFn = function () {
        //     return (vm.model.country.id === CANADA || vm.model.country.id === USA);
        // };

        var getProvinceStateList = function () {

            // if (vm.model.country.id === CANADA) {
                return getCountryAndProvinces.getProvinces();

            // }
            // else if (vm.model.country.id === USA) {
            //     return getCountryAndProvinces.getUSStates();
            // }
        };

        var getProvinceListLabel = function () {
            var label = (vm.model.country.id === USA) ? "STATE" : "PROVINCE";
            return label;
        };


        var getPostalLabel = function () {
            var label = (vm.model.country.id === USA) ? "ZIP" : "POSTAL";
            return label;
        };

        // var getPostalPattern = function () {
        //     var postalPtrn = null;
        //     if (vm.model.country.id === USA) {
        //         postalPtrn = /^[0-9]{5}(?:-[0-9]{4})?$/;
        //     } else if (vm.model.country.id === CANADA) {
        //         postalPtrn = /^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/;
        //     }
        //
        //     return postalPtrn;
        // };

        // vm.countryChange = function() {
        //     var found = false;
        //     for(var i = 0; i < vm.countryList.length; i++) {
        //         var option =vm.countryList[i];
        //         if(option[vm.lang] === vm.model.countryHtml) {
        //             vm.model.country = option;
        //             found = true;
        //             break;
        //         }
        //     }
        //     if( ! found ){
        //         vm.model.countryHtml = "";
        //         if(vm.model.country !== undefined && vm.model.country.id !== ""){
        //             vm.model.country = {};
        //         }
        //         vm.model.countryDisplay = "";
        //     }
        //     vm.countryChanged();
        // };

        vm.saveRecord = function()  {
            if (vm.importerForm.$valid) {
                vm.model.importerId = "importerid_" + $scope.$id;
                if (vm.record) {
                    vm.onUpdate({importer: vm.model});
                }
                vm.importerForm.$setPristine();
                vm.showDetailErrors=false;
                vm.updateErrorSummaryState();
                vm.model.focusImporterId = false;
            } else {
                vm.showDetailErrors=true;
                //vm.makeFocused();
                vm.updateErrorSummaryState();
            }
        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.importerId})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.impId="importerid"+scopeId;
            vm.importerNameId="importer_company_name"+scopeId;
            vm.streetId = "STREET" + scopeId;
            vm.cityId = "CITY" + scopeId;
            vm.countryId = "COUNTRY" + scopeId;
            // vm.stateTextId = "proveState" + scopeId;
            vm.stateListId = "province" + scopeId;
            vm.postalId = "postal" + scopeId;
            vm.faxId="fax_number" + scopeId;
            vm.phoneNumberId="phoneNumber" + scopeId;
            vm.phoneExtId="phoneExt" + scopeId;
            vm.contactEmailId="contactEmail" + scopeId;
            vm.routingIdentifierId="routing_id" + scopeId;
            vm.co5aRefid = 'co5a_ref' + scopeId;
        }
    }
})();