/**
 * Created by dkilty on 9/1/2016.
 */


/**
 * Created by hcuser on 20/05/2016.
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
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }

})();


