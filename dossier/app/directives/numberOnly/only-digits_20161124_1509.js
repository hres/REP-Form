/**
 * Created by dkilty on 9/1/2016.
 */


(function () {
    'use strict';

    angular
        .module('numberFormat', []);

})();

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
                } else {
                    regexValue = integerReg
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



