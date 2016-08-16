/**
 * Created by dkilty on 8/14/2016.
 */

(function () {
    'use strict';
    angular
        .module('applicationInfo', [])
})();


(function () {
    'use strict';
    angular
        .module('applicationInfo')
        .component('cmpApplicationInfo', {
            templateUrl: 'app/scripts/components/expandingTable/tpl-expanding-table.html',
            controller: ApplInfoCtrl,
            controllerAs: 'infoCtrl',
            //transclude:true,
            bindings: {
                record: '<',
                userType: '<'
            }
        });

    function ApplInfoCtrl() {

        vm.isExtern = function () {
            if (vm.userType == "EXT") {
                return true;
            }
            return false;
        }


        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                incrementMajorVersion();
            } else {
                incrementMinorVersion();
            }
            // var writeResult=_company.transformToFileObj(vm.company);
            // return writeResult;
        }

        function updateDate() {
            if (vm.record) {
                vm.record.dateSaved = _getTodayDate();
            }
        }

        function _getTodayDate() {
            var d = new Date();
            var isoDate = d.getFullYear() + '-'
                + pad(d.getMonth() + 1) + '-'
                + pad(d.getDate())
            return (isoDate)
            function pad(n) {
                return n < 10 ? '0' + n : n
            }
        }

        function incrementMinorVersion() {
            if (!vm.record.enrolmentVersion) {
                vm.record.enrolmentVersion = "0.1";
            } else {
                var parts = vm.record.enrolmentVersion.split('.')
                var dec = parseInt(parts[1]);
                var result = parts[0] + "." + (dec + 1);
                vm.record.enrolmentVersion = result;
            }
        }

        /**
         * Increments the major version. Sets the minor to false
         */
        function incrementMajorVersion() {
            if (!vm.record.enrolmentVersion) {
                vm.record.enrolmentVersion = "1.0";
            } else {
                var parts = vm.record.enrolmentVersion.split('.')
                var whole = parseInt(parts[0]);
                var result = (whole + 1) + ".0"
                vm.record.enrolmentVersion = result;
            }
        }

        vm.isExtern = function () {
            if (vm.userType == "EXT") {
                return true;
            }
            return false;
        }


    }


})();