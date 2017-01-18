/**
 * Created by dkilty on 8/26/2016.
 */
/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('applicationInfoService', [])
})();


(function () {
    'use strict';
    angular
        .module('applicationInfoService')
        .factory('ApplicationInfoService', ApplicationInfoService)

    function ApplicationInfoService() {
        function ApplicationInfoService() {
            //constructor here
        };

        /**
         * @ngdoc method gets the current date formatted as YYYY-MM-DD
         * @returns {string}
         * @private
         */
        ApplicationInfoService.prototype.getTodayDate = function () {
            var d = new Date();
            var isoDate = d.getFullYear() + '-'
                + pad(d.getMonth() + 1) + '-'
                + pad(d.getDate())
            return (isoDate)
            function pad(n) {
                return n < 10 ? '0' + n : n
            }
        };
        ApplicationInfoService.prototype.incrementMinorVersion = function (enrolmentVersion) {
            var result;
            if (!enrolmentVersion) {
                result = "0.1";
            } else {
                var parts = enrolmentVersion.split('.')
                var dec = parseInt(parts[1]);
                result = parts[0] + "." + (dec + 1);

            }
            return (result);
        };
        /**
         * Increments the major version. Sets the minor to false
         */
        ApplicationInfoService.prototype.incrementMajorVersion = function (enrolmentVersion) {
            var result;
            if (!enrolmentVersion) {
                result = "1.0";
            } else {
                var parts = enrolmentVersion.split('.')
                var whole = parseInt(parts[0]);
                result = (whole + 1) + ".0"
            }
            return result;
        };
        ApplicationInfoService.prototype.getApplicationStatusList = function () {
            return (["NEW", "AMEND", "APPROVED"])
        };
        ApplicationInfoService.prototype.getApprovedType = function () {
            return "APPROVED";
        };
        ApplicationInfoService.prototype.getAmendType = function () {
            return "AMEND";
        };

        // Return a reference to the object
        return ApplicationInfoService;
    }


})();
