/**
 * Created by dkilty on 05/01/2017.
 * Lists that are common and static, i.e. not loaded from a dynamic source
 */


(function () {
    'use strict';

    angular
        .module('commonStaticLists', ['hpfbConstants']);

})();

(function () {
    'use strict';

    angular
        .module('commonStaticLists')
        .factory('CommonLists', getService);


    /* @ngInject */
    getService.$inject = ['YES', 'NO'];
    function getService(YES, NO) {

        var service = {
            getYesNoList: _getYesNoArray,
            getYesValue: _getYes,
            getNoValue: _getNo()
        };
        return service;

        ////////////////

        function _getYes() {
            return YES;
        }

        function _getNo() {
            return NO;
        }


        function _getYesNoArray() {

            return (
                [
                    YES,
                    NO
                ]
            )
        }

    }

})();


