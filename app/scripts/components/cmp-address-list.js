/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressList', ['addressModule'])
})();

(function () {
    'use strict';

    angular
        .module('addressList')
        .component('cmpAddressList', {
            templateUrl: 'app/views/tpl-address-list.html',
            bindings: {
                formName: '<',
                addresses: '<',
                onUpdate: '&',
                getNewAddress:'&',
                isAmend:'&'
            },
            controller: addressListCtrl
        });

    addressListCtrl.$inject = ['$filter'];

    function addressListCtrl($filter) {

        var vm = this;
        vm.detailsValid = true;

        vm.$onChanges=function(changes){

            vm.addressList=changes.addresses.currentValue;

        }
        vm.$onInit = function () {
            console.log("Address list onInit")
            vm.detailsValid = true;
            vm.focused = false;
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            vm.tableRowIndexPrevExpanded = "";
            vm.dayDataCollapse = [true, true, true, true, true, true];
            vm.transactionShow = 0;
            vm.newAdrFormShow = false;
            vm.addressList = vm.addresses;
        }

        vm.deleteAddress = function (aID) {
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: aID}, true)[0]);
            vm.addressList.splice(idx, 1);
            vm.onUpdate({newList:vm.addressList});
            vm.detailsValid = true; //case that incomplete record is deleted
            if (vm.addressList.length == 0) {
                vm.resetTableRow();
            } else {
                //deleted so this setting should be false
                vm.tableRowExpanded = false;
                vm.tableRowIndexCurrExpanded = "";
            }
        }

        vm.addAddress = function () {
            var defaultAddress=vm.getNewAddress()
            //create a new address record and update the addresses
            vm.addressList.push(defaultAddress);
            vm.selectTableRow((vm.addressList.length - 1), "");
            vm.detailsValid = false;
            vm.onUpdate({newList:vm.addressList});
        }

        vm.updateValid=function(detailValid){
            vm.detailsValid = detailValid;
        }
        vm.onUpdateAddressRecord = function (address) {
            console.log("AddressList: onUpdateAddressRecord")
            vm.detailsValid = address.isDetailValid;
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.addressList[idx] = address;
          //  vm.onUpdate({address: address}); USED TO update a level up
        }

        vm.resetTableRow = function () {
            vm.tableRowIndexPrevExpanded = "";
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
        }

        vm.dayDataCollapseFn = function () {
            for (var i = 0; vm.addressList.length - 1; i += 1) {
                vm.dayDataCollapse.append('true');
            }
        };
        /**
         * @ngdoc selectTableRow -select the table row to expand
         * @param index
         * @param adrId
         */
        vm.selectTableRow = function (index, adrId) {
            if (!vm.detailsValid) return; //TODO activate error handling
            if (vm.dayDataCollapse === 'undefined') {
                vm.dayDataCollapse = vm.dayDataCollapseFn();
            } else {
                    //case no previous row was expanded
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