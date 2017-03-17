/**
 * Created by dkilty on 9/1/2016.
 */


(function () {
    'use strict';

    angular
        .module('numberFormat', []);

})();
/***
 * Directive for restricting user input to numbers
 * Options: use only-max to indicate the number of digits (integer)
 *  use flag intNeg (ie  only-digits="intNeg") to indicate to allow negative numbers
 *  Currently this directive only supports integers
 */
(function () {
    'use strict';

    angular
        .module('numberFormat')
        .directive('onlyDigits', digitsCtrl);

    function digitsCtrl() {
        var directive = {

            link: link,
            restrict: 'A',
            require: '?ngModel'
        };
        return directive;

        function link(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var isNumber = false;
                var max = -1;
                var ignore = false;
                var tempVal = "" + inputValue;
                if (attrs['type'] && attrs['type'] === 'number') {
                    isNumber = true;
                }

                if (attrs['onlyMax']) {
                    max = parseInt(attrs['onlyMax']);
                }
                var regexIntNeg = /[^0-9-]/g;
                var integerReg = /[^0-9]/g; //default
                var regexValue = integerReg;
                if (attrs['onlyDigits'] == 'intNeg') {
                    regexValue = regexIntNeg;
                } else if (attrs['onlyDigits']==='false') {
                    ignore=true;
                }
                else {
                    regexValue = integerReg;
                }
                if (ignore) {
                    return inputValue;
                }
                var transformedInput = tempVal.replace(regexValue, '');
                if (max > 0) {
                    transformedInput = transformedInput.substring(0, max);
                }
                if (transformedInput !== tempVal) {
                    if (isNumber && transformedInput) {
                        transformedInput = parseFloat(transformedInput)
                    }
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }

})();



