/**
 * Created by dkilty on 16/01/2017.
 */
/**
 * @ngdoc module declaration for datalists
 */
(function () {
    'use strict';
    angular
        .module('activityLists', []);

})();

(function () {
    'use strict';

    angular
        .module('activityLists')
        .factory('ActivityListFactory', getService);

    /* @ngInject */
    getService.inject = ['$http', '$q','$filter','$translate'];
    function getService($http,$q, $filter,$translate) {
        var vm = this;
        vm.feeClassArray = [];
        vm.raTypeArray=[];
        vm.BIOLOGICAL=  "B14-20160301-02"; //biological
        vm.NC_raType="B02-20160301-050";
        vm.SANDS_raType="B02-20160301-082";
        vm.SNDS_raType="B02-20160301-084";
        vm.DIN_raType="no used- deprecated?";
        var service = {
            getFeeClassList: _getfeeClassArray,
            //createFeeClassList:_createfeeClassArray,
            getRaTypeList: _getRaTypeArray,
            //createRaTypeList:_createRaTypeArray,
            getActivityLeadList:_getActivityLeadArray,
            getBiologicalLeadValue:_getBiologicalLead,
            getSANDSRaTypeValue:_getSANDS_raType,
            getSNDSTypeValue: _getSNDS_raType,
            getNCTypeValue:  _getNC_raType,
            getDINTypeValue:  _getDIN_raType
        };
        return service;


        /**
         * Gets the fee class list. If the list has not been retrieved, gets from http request
         * @returns {*}
         * @private
         */
        function _getfeeClassArray(){
            if(! vm.feeClassArray|| vm.feeClassArray.length===0) {
                return _loadFeeType()
            }else {
                return (vm.feeClassArray);
            }
        }

        /**
         * Gets the feetype list by http request
         * Json path hard coded in function
         * @returns {*}
         * @private
         */
        function _loadFeeType(){
            var deferred = $q.defer();
            var feeClassUrl ="../data/feeClass.json";
            $http.get(feeClassUrl).
            success(function(data, status, headers, config) {
                var lang = $translate.proposedLanguage() || $translate.use();
                var newList = _createSortedArray(data, lang);
                vm.feeClassArray=newList;
                deferred.resolve(newList);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        /**
         * Deprecrated. Was used by the load service for transalations TODO: remove?
         * @param value
         * @private
         */
        function _createfeeClassArray(value){
            vm.feeClassArray=value;
        }

        /**
         * Gets the Regulatory activity type list. if doesn't exist, makes an http request
         * @returns {*}
         * @private
         */
        function _getRaTypeArray(){

            if(!vm.raTypeArray||vm.raTypeArray.length===0) {
                   return _loadRaType()
            }else {
                return (vm.raTypeArray);
            }
        }

        /**
         * Regulatory Activity type http request apparatus. Waits via a promise
         * @returns {*}
         * @private
         */
        function _loadRaType(){
            var deferred = $q.defer();
            var raTypeUrl ="../data/raType.json";
            $http.get(raTypeUrl).
            success(function(data, status, headers, config) {
                var lang = $translate.proposedLanguage() || $translate.use();
                        var newList =  _createRaTypeSortedArray(data, lang);

                       vm.raTypeArray=newList;
                deferred.resolve(newList);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });
            return deferred.promise;
        }

        /**
         * Deprectated. Was used by load service . TODO: remove?
         * @param value
         * @private
         */
        function _createRaTypeArray(value){

            vm.raTypeArray=value;
        }

        /**
         * Gets the activity lead array. Hard coded as the biological entry has business logic
         * @returns {string[]}
         * @private
         */
        function _getActivityLeadArray(){
            return (
                [
                    "B14-20160301-09", //Pharmaceutical
                    vm.BIOLOGICAL, //Biological
                    "B14-20160301-10", //Post-Market Pharmacovigilance
                    "B14-20160301-07" //Drug Master File
                ]
            );
        }

        /**
         * Returns the biological Activity Lead value
         * @returns {string}
         * @private
         */
        function _getBiologicalLead(){
            return vm.BIOLOGICAL;
        }

        /**
         * Returns
         * @returns {string}
         * @private
         */
        function _getNC_raType(){
            return  vm.NC_raType;
        }
        function _getSANDS_raType(){
            return vm.SANDS_raType;
        }
        function _getSNDS_raType(){
            return vm.SNDS_raType;
        }
        function _getDIN_raType(){
            return vm.DIN_raType;
        }

        function _createSortedArray(jsonList, lang) {
            var result = [];
            angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                result.push(sortedObject);
            });
            return result;
        }

        function _createRaTypeSortedArray(jsonList, lang) {
            var result = [];
            angular.forEach($filter('orderByLocale')(jsonList, lang), function (sortedObject) {
                // filter out this type :"id":"B02-20160301-038","en":"Level 3 - Notice of Change (Post-Notice of Compliance Changes - Level III)"
                if(sortedObject.id!=="B02-20160301-038") {
                    result.push(sortedObject);
                }
            });
            return result;
        }

        //


    }//end service function
})();